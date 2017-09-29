import React from 'react';
import PropTypes from 'prop-types';
import {
  WebView,
  View,
  Text,
  Button,
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
      $('a.file-thumb').unbind('click')
      $('a.file-thumb').click(function(e) {
        if( !$(this).has('img').length ) return;
        if( e.button == 1 ) return;
        e.preventDefault();
        
        var url = $(this).attr('href');
        var type = url.split('.'); type=type[type.length-1].toLowerCase();
        var flg = $(this).has('.-expanded').length ? true : false;
        var html = '';
  
  
        if(type=='webm') {
          html = '<div class="-expanded" style="margin: 0.2em; display:block;">';
          html+= '<div>[<span class="expanded-close text-button">收回</span>]</div>';
          html+= '<video controls loop autoplay muted style="max-width:100%;" src="' + url + '"></video>';
          html+= '</div>';
        }
        else {
          html = '<div class="-expanded" style="margin: 0.2em; display:block;"><img class="expanded-element expanded-close" style="max-width:100%;  cursor:pointer;" src="' + url + '"></img></div>';
        }
        $(this).hide();
        $(this).after(html);
        
        $(this).next('div.-expanded').find('.expanded-close').click(function(e) {
          $(this).closest('.-expanded').parent().children('.file-thumb').each(function() {
            if( !$(this).has('img').length ) return;
            $(this).show();
          });
          
          var cur = $(this).closest('.post').offset().top;
          var h1 = $(window).scrollTop();
          var h2 = h1 + $(window).innerHeight();
          if(cur<h1 || cur>h2) $('html,body').animate({scrollTop:cur}, 0);
          
          $(this).closest('.-expanded').remove();
        });
      }); 
    }());
`;

export default class Board extends React.Component {
  constructor(props) {
    super(props);

    this.error = this.error.bind(this);
    this.parseHTML = this.parseHTML.bind(this);

    this.state = {
      loading: false,
      fail: false,
      html: '',
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
      this.parseHTML(newUrl);
    }
  }

  parseHTML(url) {
    this.setState({
      loading: true,
      fail: false,
      html: '',
    });

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw Error(res.statusText);
        }

        return res;
      })
      .then(res => res.text())
      .then((body) => {
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
        let ruleBeRemoved = '#header,#toplink,#postform,#del,#footer,#topiclist,center,.top,input,.-del-button,.rlink';
        // switch page
        ruleBeRemoved += ',#page_switch,.page_switch';
        // Monitor Javascript
        ruleBeRemoved += ",script:not([src*='common'])";
        // ugly line
        ruleBeRemoved += ',hr:nth-last-child(-n+2)';
        // it only be used in ads.
        ruleBeRemoved += ',style,.ads_right';
        $(ruleBeRemoved).remove();

        // Prevent click link
        $("a:not([class='file-thumb'])").attr('href', 'javascript:void(0)');

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
      AdMobInterstitial.setAdUnitID(ADMOB_INTERSTITIAL_AD_UNIT_ID);
      AdMobInterstitial.setTestDeviceID('EMULATOR');
      AdMobInterstitial.requestAd(AdMobInterstitial.showAd());
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
          injectedJavaScript={injectJSCode}
          onNavigationStateChange={(navState) => {
            console.log('onNavigationStateChange', navState);
          }}

          onError={() => { this.setState({ fail: true }); }}
          // renderError={ErrView}
          automaticallyAdjustContentInsets
          // iOS only
          onShouldStartLoadWithRequest={(event) => {
            console.log('onShoudleStartLoadWithRequest', event);
            return true;
          }}
          allowsInlineMediaPlayback
          dataDetectorTypes="none"
          scalesPageToFit={false}
          // android only
          domStorageEnabled
          javaScriptEnabled
        />
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        >
          <Button
            title="上一頁"
            color="white"
            disabled={!forwardUrl}
            onPress={() => {
              console.log(forwardUrl);
              this.parseHTML(url + forwardUrl);
            }}
          />
          <Button
            title="下一頁"
            color="white"
            disabled={!nextUrl}
            onPress={() => {
              console.log(nextUrl);
              this.parseHTML(url + nextUrl);
            }}
          />
        </View>
        <AdMobBanner
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
