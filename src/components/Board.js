import React from 'react';
import {
  WebView,
  Button,
} from 'react-native';

var DEFAULT_URL = 'http://rem.komica21.net/00/index.htm';

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
      document.querySelectorAll('#header,#toplink,#postform,#del,#footer,center,.top,input,.-del-button,.rlink').forEach((e) => e.remove());

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

  error(e) {
    this.refs.mainWebView.reload()
  }

  render() {
    return (
      <WebView
        renderError={ e => <Button title="Refresh" onPress={this.error}/> }
        ref="mainWebView"
        source={{uri: DEFAULT_URL}}
        domStorageEnabled={true}
        allowsInlineMediaPlayback={true}
        injectedJavaScript={injectJSCode}
        javaScriptEnabled={true}
        dataDetectorTypes='none'
        scalesPageToFit={false}
        onNavigationStateChange={()=> {console.log("Change")}}
      />
    );
  }
}
