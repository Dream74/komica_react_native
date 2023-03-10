import React from 'react';
import PropTypes from 'prop-types';
import {
  WebView,
  View,
} from 'react-native';

import urlLib from 'url';
import {
  AdMobBanner,
} from 'react-native-admob';
import cio from 'cheerio-without-node-native';

import { komica_board } from '../config/board';
import { ADMOB_BANNDER_AD_UNIT_ID } from '../config/ads';
import SwitchPage from './SwitchPage';
import WebViewGoback from './WebViewGoback';
import WebViewLoading from './WebViewLoading';
import WebViewFail from './WebViewFail';

const injectJSCode = `
    (function(){ 
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
      url: '',
      html: '',
      goback: false,
    };
  }

  componentWillMount() {
    const { url } = this.props;
    this.setState({
      url,
    });
  }

  componentDidMount() {
    const { url } = this.state;
    this.parseHTML(url);
  }

  componentWillReceiveProps(nextProps) {
    const newUrl = nextProps.url;
    const oldUrl = this.state.url;

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
      url,
      loading: true,
      fail: false,
      html: '',
    });

    // url is image or video

    if ((/\.(gif|jpe?g|png|webm)$/i).test(url)) {
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

    const nextHostname = urlLib.parse(url).hostname;
    const isKomicaWebSite = komica_board.some((board_category) => {
      const { data } = board_category;
      return data.some((e) => {
        const board_url = e.url;
        return urlLib.parse(board_url).hostname === nextHostname;
      });
    });
    if (isKomicaWebSite) {
      console.log('Url', url, 'is Komica Web Site.');
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
            header: ????????????
            toplink: 
            postform: ??????
            del: ??????/?????????????????????
            footer: ?????????????????????
            page_switch: ????????????
            topiclist:????????????
            center: ??????
            top: ?????????
            input: ?????????????????????
            -del-button: ??????????????????
            rlink: ??????????????????
            script:not([src*='common']: ?????????????????? JS, ex: GA, ...
            hr:nth-last-child(-n+2): ?????????????????????
            report-btn: ??????
          */

          // remove un-used areas.
          let ruleBeRemoved = '#header,#toplink,#del,#footer,#topiclist,center,.top,.-del-button,.report-btn';
          // post info
          ruleBeRemoved += ',#postinfo';
          ruleBeRemoved += ",input[name='sendbtn']";
          // remove article button
          ruleBeRemoved += ",input[value='delete']";
          // switch page
          ruleBeRemoved += ',#page_switch,.page_switch';
          // Monitor Javascript
          ruleBeRemoved += ",script:not([src*='common'])";
          // it only be used in ads.
          ruleBeRemoved += ',style,.ads_right';

          // something...
          ruleBeRemoved += ',.qlink,.report_btn';

          $(ruleBeRemoved).remove();

          $('textarea').attr('cols', '40');

          $('#postform_tbl>tr:last-child>td:last-child').append('<input type="submit" name="sendbtn" value="??? ???">');

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
  
  .post:target { 
      background: #181818; 
  }

  input[type='text'], textarea {
      width: 100%;
  }

  .popup { 
      background: #282A2E; 
  }

  input[type="submit"] {
    float:right;
  }

  .Form_bg {
      background: #3c4b63;
      color: #a1fbe2;
      font-size: 18px;
  }
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
      .then(body => ({
        html: body,
        forwardUrl: undefined,
        nextUrl: undefined,
      }))
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
    const rootUrl = this.props.url;
    const { url, html, loading, fail, forwardUrl, nextUrl, goback } = this.state;

    const WebViewGobackView =
      (goback) ? (<WebViewGoback
        onPress={() => {
          this.setState({ goback: false });
          this.parseHTML(rootUrl);
        }}
      />) : null;

    if (loading) {
      console.log('Render Loading');
      return (<WebViewLoading />);
    } else if (fail) {
      console.log('Render fail');
      return (<WebViewFail onError={this.error} />);
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
          injectedJavaScript={injectJSCode}
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

          renderLoading={<WebViewLoading />}
          renderError={<WebViewFail onError={this.error} />}
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
          baseUrl={rootUrl}
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
          didFailToReceiveAdWithError={(e) => { console.log('AdMobBanner', 'didFailToReceiveAdWithError', e); }}
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
  title: '??????',
  url: 'http://rem.komica2.net/00/index.htm',
};
