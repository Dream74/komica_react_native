import React from 'react';
import PropTypes from 'prop-types';
import {
  WebView,
  Button,
} from 'react-native';

const injectJSCode = `
    (function(){ 
      /*
      // remove un-used areas.
      toplink: 
      postform: 發文
      center: 廣告
      top: 分隔線
      page_switch: 切換分頁
      del: 檢舉/刪除文章的功能
      footer: 版權、統計人數
      input: 刪除文章的選項
      -del-button: 刪除文章按鈕
      rlink: 回應文章按鈕
      header: 看板描述
      */
      document.querySelectorAll('#toplink,#postform,#del,#footer,center,.top,input,.-del-button,.rlink').forEach((e) => e.remove());

      /* 關閉回文 */
      $('div > div.post-head > span.qlink').unbind('click');

      // 整個版面顏色 html
      // background, color
      document.querySelector("html").style.background = '#';
      // 回文顏色 .reply
    }());
`;

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.error = this.error.bind(this);
  }

  error() {
    this.refs.mainWebView.reload();
  }

  render() {
    const { url } = this.props;

    return (
      <WebView
        source={{ uri: url }}
        injectedJavaScript={injectJSCode}
        // onNavigationStateChange={()=> {console.log("Change")}}
        renderError={() => <Button title="Refresh" onPress={this.error} />}
        ref="mainWebView"
        // iOS only
        allowsInlineMediaPlayback
        dataDetectorTypes="none"
        scalesPageToFit={false}
        // android only
        domStorageEnabled
        javaScriptEnabled
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
