"use strict";

var React = require('react');
var ReactDOM = require("react-dom");

var SearchDistance = React.createClass({
  PropTypes: {

  },
  render() {
    return(
      <select id="geocode" name="geocode">
        <option class="geo" value="">&nbsp;&nbsp;&nbsp;2&nbsp;</option>
        <option class="geo" value="">&nbsp;&nbsp;&nbsp;5&nbsp;</option>
        <option class="geo" value="">&nbsp;&nbsp;10&nbsp;</option>
        <option class="geo" value="">&nbsp;&nbsp;20&nbsp;</option>
        <option class="geo" value="">&nbsp;&nbsp;30&nbsp;</option>
        <option class="geo" value="">&nbsp;&nbsp;40&nbsp;</option>
        <option class="geo" value="">&nbsp;&nbsp;50&nbsp;</option>
        <option class="geo" value="">&nbsp;&nbsp;100&nbsp;</option>
      </select>
    );
  }
});