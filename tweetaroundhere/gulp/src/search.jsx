"use strict";

var React = require('react');
var ReactDOM = require("react-dom");

// selectboxで指定した値をパラメータに設定
// ajaxでリクエスト
// 結果をオブジェクトにまとめてtweetコンポーネントに渡す

var SearchBox = React.createClass({
  PropTypes: {

  },
  loadTweetsFromServer: function() {
    $.ajax({
      url: this.props.requestUrl,
      method: "POST",
      crossDomain: true,
      dataType: "json",
      cache: false,
      data: {
        q: decodeURI(query),
        geocode: lat + ',' + lng + ',' + within + units
      },
      // context: document.body,
      success: function(data) {
        this.setState({data: data});
        // for(var i in data.statuses) {
          // console.log(data.statuses[i]);
          // console.log('name: '+data.statuses[i].user.name);
          // console.log('screen_name: @'+data.statuses[i].user.screen_name);
          // console.log('created_at: '+data.statuses[i].created_at);
          // console.log('text: '+data.statuses[i].text);
        // }
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.requestUrl, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function() {
    this.loadTweetsFromServer();
  },
  render() {
    return(
      <form name="form" method="get">
        半径<SearchDistance />&nbsp;km&nbsp;圏内圏内&nbsp;&nbsp;
        <SearchWord />&nbsp;
        <input type="hidden" id="rpp" name="rpp" value="" />
        <input type="hidden" id="zoom" name="zoom" value="" />
        <button id="submit_post"> 検 索 </button>
      </form>
    );
  }
});

ReactDOM.render(
  <SearchBox requestUrl="http://twttr-rest.appspot.com/search" />,
  document.getElementById('searchBox')
);