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
        let ruleBeRemoved = '#header,#toplink,#postform,#del,#footer,#page_switch,.page_switch,#topiclist,center,.top,input,.-del-button,.rlink';
        // Monitor Javascript
        ruleBeRemoved += ",script:not([src*='common'])";
        // ugly line
        ruleBeRemoved += ',hr:nth-last-child(-n+2)';
        // it only be used in ads.
        ruleBeRemoved += ',style';
        $(ruleBeRemoved).remove();

        // Prevent click link
        $("a:not([class='file-thumb'])").attr('href', 'javascript:void(0)');

        $('html')
          .css('background', '#1D1F21')
          .css('color', '#C5C8C6');

        $('.qlink,a:link,.text-button')
          .css('color', '#81A2BE')
          .css('text-decoration', 'none');

        $('.reply')
          .css('background', '#282A2E');

        $('.title')
          .css('color', '#B294BB');

        $('.id3')
          .css('color', 'rgba(255,255,21,0.8)');

        return $.html();
      })
      .then((html) => {
        this.setState({
          html,
          fail: false,
          loading: false,
        });
      })
      .catch(() => {
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
    const { html, loading, fail } = this.state;

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
            paddingBottom: 20,
          }}
          >網路連線失敗，請檢查網路狀態後再重新整理</Text>
          <Button title="重新整理" onPress={this.error} />
        </View>);
    }

    return (
      <WebView
        source={{
          html,
          baseUrl: url,
        }}
        injectedJavaScript={injectJSCode}
        // onNavigationStateChange={()=> {console.log("Change")}}
        onError={() => { this.setState({ fail: true }); }}
        // renderError={ErrView}
        automaticallyAdjustContentInsets={false}
        // iOS only
        allowsInlineMediaPlayback
        dataDetectorTypes="none"
        scalesPageToFit={false}
        // android only
        domStorageEnabled
        javaScriptEnabled={false}
      />
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
