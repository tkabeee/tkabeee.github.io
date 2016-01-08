"use strict";

var React = require('react');
var ReactDOM = require("react-dom");

var Tweet = React.createClass({
  propTypes: {
    user: React.PropType.shape({
      name: React.propTypes.string,
      screen_name: React.PropType.string,
      profile_image_url: React.PropType.string
    }),
    id_str: React.PropTypes.string,
    text: React.PropTypes.string,
    created_at: React.PropTypes.string
  },
  render() {
    return(
      <ol class="stream-list">
        <li class="stream-list-item">
          <div class="tweet">
            <div class="content">
              <div class="stream-item-header">
                <a class="account-group" href="/{this.props.user.screen_name}">
                  <img class="profile-avatar" src="{this.props.user.profile_image_url}"/>
                  <strong class="fullname">{this.props.user.name}</strong><span class="username"><s>@</s><b>{this.props.user.screen_name}</b></span>
                </a>
                <small class="time">
                  <a href="//twitter.com/{this.props.user.screen_name}/status/{this.props.id_str}" class="tweet-timestamp">
                    <span class="timestamp">{this.props.created_at}</span>
                  </a>
                </small>
              </div>
              <p class="tweet-text">{this.props.text}</p>
            </div>
          </div>
        </li>
      </ol>
    );
  }
});

ReactDOM.render(
  <Tweet />,
  document.getElementById("tweets")
);