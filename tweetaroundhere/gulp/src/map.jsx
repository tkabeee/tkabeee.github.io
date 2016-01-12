"use strict";

var React = require('react');
var ReactDOM = require("react-dom");

var MapBox = React.createClass({
  getDefaultProps: function() {
    return {
      units: "km"
    };
  },
  getInitialState: function() {
    return {
      query: "",
      lat: 35.689488,
      lng: 139.691706,
      within: 20,
      rpp: 20,
      zoom: 10,
      // latlng: new google.maps.LatLng(this.state.lat, this.state.lng)
    };
  },
  _initMap: function() {
    var self = this;
    this.gm = {};
    this.gm.map = new google.maps.Map(document.getElementById("mapCanvas"), {
      zoom:              this.state.zoom,
      center:            new google.maps.LatLng(this.state.lat, this.state.lng),
      mapTypeControl:    false,
      mapTypeId:         google.maps.MapTypeId.ROADMAP,
      panControl:        false,
      scaleControl:      false,
      zoomControl:       true,
      streetViewControl: false
    });

    this.gm.marker = new google.maps.Marker({
      map: this.gm.map,
      position: new google.maps.LatLng(this.state.lat, this.state.lng),
      draggable: true
    });

    this.gm.geocoder = new google.maps.Geocoder();
    this.gm.infoWindow = new google.maps.InfoWindow();

    this._updateMarkerPosition(this.state.lat, this.state.lng);
    this._setGeocodePosition();
    this._setDragEvent();
    this._createCircle();

    google.maps.event.addListener(self.gm.map, 'click', function(e) {
      self.state.lat = e.latLng.lat();
      self.state.lng = e.latLng.lng();

      self._setMarker();
      self._updateMarkerPosition(self.state.lat, self.state.lng);
      self._setGeocodePosition();
      self._setDragEvent();
      self._createCircle();
      // TODO: 初期検索を実行
      console.log('TODO:');
      // this.twsearch(Tws.query, lat, lng, Tws.within, Tws.units, Tws.rpp);
    });

    google.maps.event.addListener(self.gm.map, 'zoom_changed', function() {
      self._updateZoomLevel();
    });
  },
  _moveCenter: function(lat,lng) {
    var latLng = new google.maps.LatLng(lat,lng);
    this.gm.map.setCenter(latLng);
  },
  _openInfoWindow: function() {
    // this.tweet is undefined
    this.gm.infoWindow.setContent(this.tweet);
    this.gm.infoWindow.open(this.gm.map, this.gm.markers);
  },
  _closeInfoWindow: function() {
    this.gm.infoWindow.close();
  },
  _setGeocodePosition: function() {
    var self = this;
    self.gm.geocoder.geocode({
      latLng: self.gm.marker.getPosition()
    }, function(responses) {
      if (responses && responses.length > 0) {
        self._updateMarkerAddress(responses[0].formatted_address);
      } else {
        self._updateMarkerAddress('この場所の周辺情報を取得できませんでした。');
      }
    });
  },
  _setDragEvent: function() {
    var self = this;
    google.maps.event.addListener(self.gm.marker, 'dragstart', function() {
      self._updateMarkerAddress("Address 取得中…");
    });
    google.maps.event.addListener(self.gm.marker, 'drag', function() {
      self._updateMarkerPosition("取得中…","取得中…");
      self._updateZoomLevel();
    });
    google.maps.event.addListener(self.gm.marker, 'dragend', function() {
      self._updateMarkerPosition(self.state.lat, self.state.lng);
      self._setGeocodePosition();
      // TODO: マーカードラッグ後にtweet検索
      console.log('TODO:');
      // this.twsearch(Tws.query, Tws.lat, Tws.lng, Tws.within, Tws.units, Tws.rpp);
    });
  },
  // not use
  _createMarker: function() {
    var self = this;
    this.gm.icon = new google.maps.MarkerImage(
      'http://maps.google.co.jp/mapfiles/ms/icons/ltblue-dot.png',
      new google.maps.Size(20,34),
      new google.maps.Point(0,0),
      new google.maps.Point(0,34)
    );
    this.gm.shadow = new google.maps.MarkerImage(
      'http://maps.google.co.jp/mapfiles/ms/icons/msmarker.shadow.png',
      new google.maps.Size(59,32),
      new google.maps.Point(0,0),
      new google.maps.Point(5,32)
    );
    this.gm.markers = new google.maps.Marker({
      map: this.gm.map,
      icon: this.gm.icon,
      shadow: this.gm.shadow,
      position: new google.maps.LatLng(this.state.lat,this.state.lng)
    });
    google.maps.event.addListener(self.gm.markers, 'click', function() {
      self._openInfoWindow();
    });
    google.maps.event.addListener(self.gm.map, 'click', function() {
      self._closeInfoWindow();
    });
  },
  _setMarker: function() {
    this._deleteMarker();
    this.gm.marker = new google.maps.Marker({
      map: this.gm.map,
      position: new google.maps.LatLng(this.state.lat, this.state.lng),
      draggable: true
    });
  },
  _deleteMarker: function() {
    this.gm.marker.setMap(null);
  },
  // マーカーのポジション更新
  _updateMarkerPosition: function(lat, lng) {
    // var latLng = this.gm.marker.getPosition();
    // this.state.lat = latLng.lat().toFixed(6);
    // this.state.lng = latLng.lng().toFixed(6);
    document.getElementById("lat").textContent = lat;
    document.getElementById("lng").textContent = lng;
  },
  // マーカーの住所を更新
  _updateMarkerAddress: function(str) {
    document.getElementById("address").textContent = str;
  },
  // ズームレベルを更新
  _updateZoomLevel: function() {
    this.state.zoom = this.gm.map.getZoom();
  },
  _createCircle: function() {
    if (this.gm.circle) {
      this._deleteCircle();
    }
    this.gm.circle = new google.maps.Circle({
      center:        new google.maps.LatLng(this.state.lat, this.state.lng),
      fillColor:     '#ff4500',
      fillOpacity:   0.2,
      radius:        this.state.within*1000,
      strokeColor:   '#ff4500',
      strokeOpacity: 1,
      strokeWeight:  1
    });

    this.gm.circle.bindTo('center', this.gm.marker, 'position');
    this.gm.circle.setMap(this.gm.map);
  },
  _deleteCircle: function() {
    this.gm.circle.setMap(null);
  },
  render: function() {
    this._initMap();
    return (
      <div></div>
    );
  }
});

ReactDOM.render(
  <MapBox />,
  document.getElementById("mapCanvas")
);