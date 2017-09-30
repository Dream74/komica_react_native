import React from 'react';
import PropTypes from 'prop-types';
import {
  WebView,
  View,
  Text,
  Button,
  TouchableOpacity,
} from 'react-native';

import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'react-native-admob';
import cio from 'cheerio-without-node-native';

import { ADMOB_BANNDER_AD_UNIT_ID, ADMOB_INTERSTITIAL_AD_UNIT_ID } from '../config/ads';

const injectJSCode = `
    (function(){ 
      /* 關閉回文 */
      $('div > div.post-head > span.qlink').unbind('click');
    }());
`;

const SwitchPage = ({ baseUrl, forwardUrl, nextUrl, onPress }) => {
  if (forwardUrl === undefined && nextUrl === undefined) {
    return null;
  }

  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
    }}
    >
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignContent: 'center',
        }}
        onPress={() => {
          if (forwardUrl !== undefined) {
            console.log(forwardUrl);
            if (onPress) onPress(baseUrl + forwardUrl);
          }
        }}
        disabled={!forwardUrl}
      >
        <Text style={{ color: (!forwardUrl) ? '#3c4b63' : 'white', fontSize: 25 }}>上一頁</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignContent: 'center',
        }}
        onPress={() => {
          if (nextUrl !== undefined) {
            console.log(forwardUrl);
            if (onPress) onPress(baseUrl + nextUrl);
          }
        }}
        disabled={!nextUrl}
      >
        <Text style={{ color: (!nextUrl) ? '#3c4b63' : 'white', fontSize: 25 }}>下一頁</Text>
      </TouchableOpacity>
    </View>
  );
};

const WebViewGoback = ({ onPress }) => (
  <View style={{
    flexDirection: 'row',
    padding: 10,
  }}
  >
    <TouchableOpacity
      style={{
        justifyContent: 'center',
        alignContent: 'center',
      }}
      onPress={() => { onPress(); }}
    >
      <Text style={{ color: 'white', fontSize: 25 }}>返回看板</Text>
    </TouchableOpacity>
  </View>
);

SwitchPage.propTypes = {
  baseUrl: PropTypes.string,
  forwardUrl: PropTypes.string,
  nextUrl: PropTypes.string,
  onPress: PropTypes.func,
};

SwitchPage.defaultProps = {
  baseUrl: '',
  forwardUrl: undefined,
  nextUrl: undefined,
  onPress: undefined,
};

export default class Board extends React.Component {
  constructor(props) {
    super(props);

    this.error = this.error.bind(this);
    this.parseHTML = this.parseHTML.bind(this);

    this.state = {
      loading: false,
      fail: false,
      html: '',
      goback: false,
    };
  }

  componentDidMount() {
    const { url } = this.props;
    this.parseHTML(url);
  }

  componentWillReceiveProps(nextProps) {
    const newUrl = nextProps.url;
    const oldUrl = this.props.url;

    if (newUrl !== oldUrl) {
      this.setState({
        goback: false,
      });
      this.parseHTML(newUrl);
    }
  }

  parseHTML(url) {
    console.log('parseHTML', url);
    this.setState({
      loading: true,
      fail: false,
      html: '',
    });

    // url is image or video

    if ((/\.(gif|jpg|jpeg|tiff|png)$/i).test(url)) {
      console.log('Url', url, 'is image.');
      this.setState({
        html: `<html><body><img src='${url}'></body></html>`,
        forwardUrl: undefined,
        nextUrl: undefined,
        fail: false,
        loading: false,
      });
      return;
    }

    console.log('Url', url, 'is Web.');
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw Error(res.statusText);
        }

        return res;
      })
      .then(res => res.text())
      .then((body) => {
        console.log('parseHTML before');
        const $ = cio.load(body);

        const forwardUrl = $('#page_switch > table > tr > td:nth-child(1) > form').attr('action') || $('.page_switch > div.ul > div.forward > a').attr('href');
        const nextUrl = $('#page_switch > table > tr > td:nth-child(3) > form').attr('action') || $('.page_switch > div.ul > div.next > a').attr('href');

        /*
          header: 看板描述
          toplink: 
          postform: 發文
          del: 檢舉/刪除文章的功能
          footer: 版權、統計人數
          page_switch: 切換分頁
          topiclist:標題一覽
          center: 廣告
          top: 分隔線
          input: 刪除文章的選項
          -del-button: 刪除文章按鈕
          rlink: 回應文章按鈕
          script:not([src*='common']: 所有非必要的 JS, ex: GA, ...
          hr:nth-last-child(-n+2): 塞廣告的分割線
        */

        // remove un-used areas.
        let ruleBeRemoved = '#header,#toplink,#postform,#del,#footer,#topiclist,center,.top,input,.-del-button';
        // switch page
        ruleBeRemoved += ',#page_switch,.page_switch';
        // Monitor Javascript
        ruleBeRemoved += ",script:not([src*='common'])";
        // ugly line
        ruleBeRemoved += ',hr:nth-last-child(-n+2)';
        // it only be used in ads.
        ruleBeRemoved += ',style,.ads_right';

        // something...
        ruleBeRemoved += ',.qlink,.report_btn';

        $(ruleBeRemoved).remove();

        $('body').append(`<style type="text/css">
html {
    background: #1D1F21;
    color: #C5C8C6;
}

.reply {
    background: #282A2E;
}

.title {
    color: #B294BB;
}

.id, .id3 {
    color: rgba(255,255,21,0.8);
}

textarea {
    background-color: #CDCDCD;
}

a:link, .qlink, .text-button {
    color: #81A2BE;
    text-decoration: none;
}

.post:target { background: #181818; } 
.popup { background: #282A2E; }
</style>
<style type="text/css">
`);
        return {
          html: $.html(),
          forwardUrl,
          nextUrl,
        };
      })
      .then(({ html, forwardUrl, nextUrl }) => {
        console.log('parseHTML after');
        this.setState({
          html,
          forwardUrl,
          nextUrl,
          fail: false,
          loading: false,
        });
      })
      .catch((e) => {
        console.log('fetch error', e);
        this.setState({
          html: '',
          fail: true,
          loading: false,
        });
      });
  }

  error() {
    const { url } = this.props;
    this.parseHTML(url);
  }

  render() {
    const { url } = this.props;
    const { html, loading, fail, forwardUrl, nextUrl } = this.state;

    if (loading) {
      /* 這是跳整個全螢幕展開的廣告 */
      // AdMobInterstitial.setAdUnitID(ADMOB_INTERSTITIAL_AD_UNIT_ID);
      // AdMobInterstitial.setTestDeviceID('EMULATOR');
      // AdMobInterstitial.requestAd(AdMobInterstitial.showAd());
      return (
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >

          <AdMobBanner
            bannerSize="mediumRectangle"
            testDeviceID="EMULATOR"
            adUnitID={ADMOB_BANNDER_AD_UNIT_ID}
            adViewDidReceiveAd={() => { console.log('AdMobBanner', 'adViewDidReceiveAd'); }}
            didFailToReceiveAdWithError={(e) => { console.log('AdMobBanner', 'didFailToReceiveAdWithError', e); }}
            // adViewWillPresentScreen={() => { console.log('AdMobBanner', 'adViewWillPresentScreen'); }}
            // adViewWillDismissScreen={() => { console.log('AdMobBanner', 'adViewWillDismissScreen'); }}
            // adViewDidDismissScreen={() => {console.log('AdMobBanner', 'adViewDidDismissScreen'); }}
            // adViewWillLeaveApplication={() => { console.log('AdMobBanner', 'adViewWillLeaveApplication'); }}
          />


          <Text style={{
            fontSize: 24,
            padding: 30,
            color: '#a1fbe2',
          }}
          >網頁正在載入中</Text>

        </View>);
    } else if (fail) {
      return (
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >
          <Text style={{
            fontSize: 16,
            paddingBottom: 30,
            color: '#a1fbe2',
          }}
          >網路連線失敗，請檢查網路狀態後再重新整理</Text>

          <View style={{
            backgroundColor: '#a1fbe2',
          }}
          >
            <Button
              title="重新整理"
              onPress={this.error}
              color="black"
            />
          </View>

        </View>);
    }


    console.log('Render Loading WebView');
    return (
      <View style={{
        flex: 1,
      }}
      >
        <WebView
          ref="mainWebView"
          source={{
            html,
            baseUrl: url,
          }}
          // injectedJavaScript={injectJSCode}
          onNavigationStateChange={(navState) => {
            const { title } = navState;
            const updateUrl = navState.url;
            console.log('onNavigationStateChange', url, updateUrl);
            if (title === '' || updateUrl === undefined || url === updateUrl || !(/^https?:.+/i).test(updateUrl)) {
              return;
            }

            this.parseHTML(updateUrl);
            this.setState({ goback: true });
            console.log('onNavigationStateChange', navState);
          }}

          onLoadStart={() => { console.log('WebView onLoadStart Event'); }}
          onLoad={() => { console.log('WebView onLoad Event'); }}
          onError={() => { this.setState({ fail: true }); }}
          automaticallyAdjustContentInsets
          // iOS only
          allowsInlineMediaPlayback
          dataDetectorTypes="none"
          scalesPageToFit={false}
          bounces={false}
          // android only
          domStorageEnabled
          javaScriptEnabled
        />
        {WebViewGobackView}
        <SwitchPage
          baseUrl={url}
          forwardUrl={forwardUrl}
          nextUrl={nextUrl}
          onPress={(newUrl) => { this.parseHTML(newUrl); }}
        />
        <AdMobBanner
          style={{
            alignSelf: 'center',
          }}
          bannerSize="fullBanner"
          testDeviceID="EMULATOR"
          adUnitID={ADMOB_BANNDER_AD_UNIT_ID}
          adViewDidReceiveAd={() => { console.log('AdMobBanner', 'adViewDidReceiveAd'); }}
          didFailToReceiveAdWithError={(e) => { console.log('AdMobBanner', 'didFailToReceiveAdWithError', e); }}
          // adViewWillPresentScreen={() => { console.log('AdMobBanner', 'adViewWillPresentScreen'); }}
          // adViewWillDismissScreen={() => { console.log('AdMobBanner', 'adViewWillDismissScreen'); }}
          // adViewDidDismissScreen={() => {console.log('AdMobBanner', 'adViewDidDismissScreen'); }}
          // adViewWillLeaveApplication={() => { console.log('AdMobBanner', 'adViewWillLeaveApplication'); }}
        />
      </View>
    );
  }
}

Board.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
};

Board.defaultProps = {
  title: '綜合',
  url: 'http://rem.komica2.net/00/index.htm',
};
