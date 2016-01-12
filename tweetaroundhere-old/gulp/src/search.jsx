"use strict";

var React = require('react');
var ReactDOM = require("react-dom");

var SearchForm = React.createClass({
  PropTypes: {
    distances: React.PropTypes.array,
  },
  getDefaultProps: function() {
    return {
      distances: [2, 5, 10, 20, 30, 40, 50, 100],
      units: "km"
    };
  },
  getInitialState: function() {
    return {
      query: '',
      within: 20,
      rpp: 20,
      zoom: 10
    };
  },
  _handleQueryChange: function(e) {
    this.setState({query: e.target.value});
  },
  _handleDistanceChange: function(e) {
    this.setState({distance: e.target.value});
  },
  _handleSubmit: function(e) {
    e.preventDefault();
    var query = this.state.query.trim();
    var distance = this.state.distance;
    var rpp = this.state.rpp;
    var zoom = this.state.zoom;
    if (!distance || !rpp || !zoom) {
      return;
    }
    this.props.onSearchSubmit({
      query: query,
      distance: distance,
      rpp: rpp,
      zoom: zoom
    });
    this.setState({
      query: query,
      distance: distance,
      rpp: rpp,
      zoom: zoom
    });
  },
  render: function() {
    var selectOptions = this.props.distances.map(function(distance) {
      return <option className="geo" key={distance} value={distance}>&nbsp;&nbsp;&nbsp;{distance}&nbsp;</option>;
    });
    var queryPlaceholder = '例）あけおめ';
    return (
      <form name="form" method="get" onSubmit={this._handleSubmit}>
        半径
        <select id="geocode" name="geocode" value={this.state.distance} onChange={this._handleDistanceChange}>
          {selectOptions}
        </select>
        &nbsp;km&nbsp;圏内圏内&nbsp;&nbsp;
        <span className="search-word">
          <input type="text" id="query" name="q" value={this.state.query} placeholder={queryPlaceholder} onChange={this._handleQueryChange} style={{width: 230 + 'px'}} />
        </span>
        &nbsp;
        <input type="hidden" id="rpp" name="rpp" value={this.state.rpp} />
        <input type="hidden" id="zoom" name="zoom" value={this.state.zoom} />
        <button id="submit_post"> 検 索 </button>
      </form>
    );
  }
});

var SearchBox = React.createClass({
  PropTypes: {
    requestUrl: React.PropTypes.string.isRequired
  },
  _loadTweetsFromServer: function() {
  },
  _handleSearchSubmit: function() {
    // submit form
    $.ajax({
      url: this.props.requestUrl,
      method: "POST",
      crossDomain: true,
      dataType: "json",
      cache: false,
      data: {
        q: decodeURI(query),
        geocode: this.state.lat + ',' + this.state.lng + ',' + this.state.within + this.props.units
      },
      // context: document.body,
      success: function(data) {
        for(var i in data.statuses) {
          // console.log(data.statuses[i]);
          console.log('name: '+data.statuses[i].user.name);
          console.log('screen_name: @'+data.statuses[i].user.screen_name);
          console.log('created_at: '+data.statuses[i].created_at);
          console.log('text: '+data.statuses[i].text);
        }
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.requestUrl, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function() {
    this._loadTweetsFromServer();
  },
  render: function() {
    return (
      <div className="">
        <SearchForm onSearchSubmit={this._handleSearchSubmit} />
      </div>
    );
  }
});

ReactDOM.render(
  <SearchBox requestUrl="http://twttr-rest.appspot.com/search" />,
  document.getElementById('searchBox')
);

