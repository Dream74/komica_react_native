import React from 'react';
import PropTypes from 'prop-types';
import {
  WebView,
  View,
  Text,
  Button,
} from 'react-native';

import cio from 'cheerio-without-node-native';

const injectJSCode = `
    (function(){ 
      /* 關閉回文 */
      $('div > div.post-head > span.qlink').unbind('click');
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
      return (
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >
          <Text style={{
            fontSize: 24,
            paddingBottom: 20,
            color: '#a1fbe2',
          }}
          >載入中</Text>

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
