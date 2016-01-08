"use strict";

var React = require('react');
var ReactDOM = require("react-dom");

var SearchWord = React.createClass({
  PropTypes: {

  },
  render() {
    return(
      <span class="search-word">
        <input type="text" id="query" name="q" value="" placeholder="例）あけおめ" style="width:230px;" />
      </span>
    );
  }
});