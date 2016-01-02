var Demo = {
  map: null,
  marker: null,
  markers: null,
  icon: null,
  shadow: null,
  geocoder: null,
  circle: null,
  zoom: null,
  infoWindow: null,
  tweet: null
};

(function($){

var Tws = {
  query: null,
  geocode: null,
  lat: null,
  lng: null,
  distance: null,
  within: null,
  units: null,
  rpp: null
};

var isMSIE = /*@cc_on!@*/false;

Demo.getTweet = function(html) {
  Demo.tweet = "<div class=\"jta-tweet-list-item-window\">" + html + "</div>";
};
Demo.moveCenter = function(lat, lng) {
  var LatLng = new google.maps.LatLng(lat,lng);
  Demo.map.setCenter(LatLng);
};
Demo.openInfoWindow = function() {
  Demo.infoWindow.setContent(Demo.tweet);
    Demo.infoWindow.open(Demo.map, Demo.markers);
};
Demo.closeInfoWindow = function() {
  Demo.infoWindow.close();
};
Demo.geocodePosition = function(pos) {
  Demo.geocoder.geocode({
      latLng: pos
    }, function(responses) {
      if (responses && responses.length > 0) {
          Demo.updateMarkerAddress(responses[0].formatted_address);
      } else {
          Demo.updateMarkerAddress('この場所の周辺情報を取得できませんでした。');
      }
  });
};
Demo.updateMarkerPosition = function(latLng) {
  $("#lat").text(latLng.lat().toFixed(6));
  $("#lng").text(latLng.lng().toFixed(6));
  Tws.lat = latLng.lat().toFixed(6);
  Tws.lng = latLng.lng().toFixed(6);
  Tws.setGeocode(latLng.lat().toFixed(6), latLng.lng().toFixed(6));
};
Demo.updateMarkerAddress = function(str) {
  $("#address").text(str);
};
Demo.updateZoomLevel = function(level) {
  $("#zoom").val(level);
};
/*
Demo.codeAddress = function() {
  var address = document.getElementById("address").value;
  Demo.geocoder.geocode({'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
          map.setCenter(results[0].geometry.location);
          Demo.marker = new google.maps.Marker({
            map: Demo.map,
            position: results[0].geometry.location,
        draggable: true
          });
      } else {
          alert("Geocode was not successful for the following reason: " + status);
      }
    });
};
*/
Demo.setMarker = function(lat, lng) {
  var LatLng = new google.maps.LatLng(lat, lng);
  Demo.marker = new google.maps.Marker({
      map: Demo.map,
      position: LatLng,
    draggable: true
    });
  Demo.geocodePosition(Demo.marker.getPosition());
};
Demo.createMarker = function(lat,lng) {
  Demo.icon = new google.maps.MarkerImage(
    'img/markers_twitter.png',
      new google.maps.Size(20,34),
      new google.maps.Point(0,0),
      new google.maps.Point(0,34)
  );
  Demo.shadow = new google.maps.MarkerImage(
    'http://maps.google.co.jp/mapfiles/ms/icons/msmarker.shadow.png',
      new google.maps.Size(59,32),
      new google.maps.Point(0,0),
      new google.maps.Point(5,32)
  );
  Demo.markers = new google.maps.Marker({
      map: Demo.map,
    icon: Demo.icon,
    shadow: Demo.shadow,
      position: new google.maps.LatLng(lat,lng)
  });
    google.maps.event.addListener(Demo.markers, 'click', function() {
    Demo.openInfoWindow();
  });
    google.maps.event.addListener(Demo.map, 'click', function() {
    Demo.closeInfoWindow();
  });
};
Demo.deleteMarker = function(marker) {
  marker.setMap(null);
};
Demo.createCircle = function() {
  var Lat  = $("#lat").text();
  var Lng  = $("#lng").text();
  var Str = $("#geocode").val().split(",");
  var Within = Str[2].match(/^[0-9]+/);
  Demo.circle = new google.maps.Circle({
    //center:        new google.maps.LatLng(lat, lng),
    fillColor:     '#ff4500',
    fillOpacity:   0.2,
    radius:        Within*1000,
    strokeColor:   '#ff4500',
    strokeOpacity: 1,
    strokeWeight:  1
  });
  Demo.circle.bindTo('center', Demo.marker, 'position');
  Demo.circle.setMap(Demo.map);
};
Demo.deleteCircle = function() {
  Demo.circle.setMap(null);
};
Demo.setDragEvent = function() {
  google.maps.event.addListener(Demo.marker, 'dragstart', function() {
      Demo.updateMarkerAddress("Address 取得中…");
   });
    google.maps.event.addListener(Demo.marker, 'drag', function() {
      Demo.updateMarkerPosition(Demo.marker.getPosition());
      Demo.updateZoomLevel(Demo.map.getZoom());
    });
    google.maps.event.addListener(Demo.marker, 'dragend', function() {
      Demo.geocodePosition(Demo.marker.getPosition());
      Demo.twsearch(Tws.query, Tws.lat, Tws.lng, Tws.within, Tws.units, Tws.rpp);
    });
};
Demo.init = function() {
  Tws.query  = (Tws.query)  ? Tws.query  : "";
  Tws.lat    = (Tws.lat)    ? Tws.lat    : 38.268215;
  Tws.lng    = (Tws.lng)    ? Tws.lng    : 140.8693558;
  Tws.within = (Tws.within) ? Tws.within : 20;
  Tws.units  = (Tws.units)  ? Tws.units  : "km";
  Tws.rpp    = (Tws.rpp)    ? Tws.rpp    : 20;
  var Zoom   = (Demo.zoom)  ? Demo.zoom  : 10;
  var LatLng = new google.maps.LatLng(Tws.lat, Tws.lng);

  Tws.setGeocode(Tws.lat, Tws.lng);
  Demo.map = new google.maps.Map(document.getElementById("map-canvas"), {
    zoom:              Zoom,
    center:            LatLng,
    mapTypeControl:    false,
    mapTypeId:         google.maps.MapTypeId.ROADMAP,
    panControl:        false,
    scaleControl:      false,
    zoomControl:       true,
    streetViewControl: false
  });
  Demo.marker = new google.maps.Marker({
    map: Demo.map,
    position: LatLng,
    draggable: true
  });
  Demo.geocoder = new google.maps.Geocoder();
  Demo.infoWindow = new google.maps.InfoWindow();
  Demo.updateMarkerPosition(Demo.marker.getPosition());
  Demo.geocodePosition(Demo.marker.getPosition());
  Demo.createCircle();
  // jTweetsAnywhere
  // Demo.twinit();
  Demo.twsearch(Tws.query, Tws.lat, Tws.lng, Tws.within, Tws.units, Tws.rpp);
  Demo.setDragEvent();
  google.maps.event.addListener(Demo.map, 'click', function(e) {
    var lat = e.latLng.lat();
    var lng = e.latLng.lng();
    Demo.deleteMarker(Demo.marker);
    Demo.setMarker(lat, lng);
    Demo.setDragEvent();
    Demo.updateMarkerPosition(Demo.marker.getPosition());
    if(Demo.circle) {
      Demo.deleteCircle();
    }
    Demo.createCircle();
    Demo.twsearch(Tws.query, lat, lng, Tws.within, Tws.units, Tws.rpp);
  });
  google.maps.event.addListener(Demo.map, 'zoom_changed', function() {
    Demo.updateZoomLevel(Demo.map.getZoom());
  });
};

Demo.twsearch = function(query, lat, lng, within, units, rpp){
  var $tweets = $('#tweets');
  $tweets.children().remove();
  $.ajax({
    url: "http://twttr-rest.appspot.com/search",
    method: "POST",
    crossDomain: true,
    data: {
      q: decodeURI(query),
      geocode: lat + ',' + lng + ',' + within + units
    },
    dataType: "json",
    context: document.body
  }).done(function(data) {
    // console.log(json);
    for(var i in data.statuses){
      // console.log(data.statuses[i]);
      // console.log('name: '+data.statuses[i].user.name);
      // console.log('screen_name: @'+data.statuses[i].user.screen_name);
      // console.log('created_at: '+data.statuses[i].created_at);
      // console.log('text: '+data.statuses[i].text);
    }
    Demo.twrender(data);
  });
};

Demo.twrender = function(data){
  var $container = $('#tweets');
  var ol = document.createElement('ol');
  ol.className = 'stream-list';

  for(var i in data.statuses){
    var li = document.createElement('li');
    var wrapDiv = document.createElement('div');
    var contentDiv = document.createElement('div');
    var headerDiv = document.createElement('div');
    var profAnchor = document.createElement('a');
    var profImg = document.createElement('img');
    var fullName = document.createElement('strong');
    var userName = document.createElement('span');
    var userNameStrike = document.createElement('s');
    var userNameBold = document.createElement('b');
    var timeWrap = document.createElement('small');
    var timeAnchor = document.createElement('a');
    var timeSpan = document.createElement('span');
    var textParag = document.createElement('p');

    profImg.className = 'profile-avatar';
    profImg.src = data.statuses[i].user.profile_image_url;

    fullName.appendChild(document.createTextNode(data.statuses[i].user.name));
    fullName.className = 'fullname';

    userNameStrike.appendChild(document.createTextNode('@'));
    userNameBold.appendChild(document.createTextNode(data.statuses[i].user.screen_name));
    userName.appendChild(userNameStrike);
    userName.appendChild(userNameBold);
    userName.className = 'username';

    profAnchor.appendChild(profImg);
    profAnchor.appendChild(fullName);
    profAnchor.appendChild(userName);
    profAnchor.className = 'account-group';
    profAnchor.href = 'http://twitter.com/' + data.statuses[i].user.screen_name;

    timeSpan.appendChild(document.createTextNode(Demo.twTimestampFormatter(data.statuses[i].created_at)));
    timeSpan.className = 'timestamp';

    timeAnchor.appendChild(timeSpan);
    timeAnchor.className = 'tweet-timestamp';
    timeAnchor.href = 'http://twitter.com/' + data.statuses[i].user.screen_name + '/status/' + data.statuses[i].id_str;

    timeWrap.appendChild(timeAnchor);
    timeWrap.className = 'time';

    headerDiv.appendChild(profAnchor);
    headerDiv.appendChild(timeWrap);
    headerDiv.className = 'stream-item-header';

    textParag.innerHTML = Demo.twReplace(data.statuses[i].text);
    textParag.className = 'tweet-text';

    contentDiv.appendChild(headerDiv);
    contentDiv.appendChild(textParag);
    contentDiv.className = 'content';

    wrapDiv.appendChild(contentDiv);
    wrapDiv.className = 'tweet';

    li.appendChild(wrapDiv);
    li.className = 'stream-list-item';

    ol.appendChild(li);
  }
  $container.append(ol);
};

Demo.twReplace = function(twt) {
  twt = twt.replace(/((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&amp;%@!&#45;\/]))?)/g,'<a href="$1">$1</a>');
  twt = twt.replace(/(^|\s)(@|＠)(\w+)/g,'$1<a href="http://www.twitter.com/$3">@$3</a>');
  twt = twt.replace(/(?:^|[^ーー゛゜々ヾヽぁ-ヶ一-龠ａ-ｚＡ-Ｚ０-９a-zA-Z0-9&_/>]+)[#＃]([ー゛゜々ヾヽぁ-ヶ一-龠ａ-ｚＡ-Ｚ０-９a-zA-Z0-9_]*[ー゛゜々ヾヽぁ-ヶ一-龠ａ-ｚＡ-Ｚ０-９a-zA-Z]+[ー゛゜々ヾヽぁ-ヶ一-龠ａ-ｚＡ-Ｚ０-９a-zA-Z0-9_]*)/ig, ' <a href="http://twitter.com/search?q=%23$1">#$1</a>');
  twt = twt.replace(/[\n\r]/g, "<br>");
  return twt;
};

Demo.twTimestampFormatter = function (a){
  var b = new Date,
      c = parseInt((b.getTime() - Date.parse(a)) / 1E3),
      d = "";
  if (c < 60) {
    d += c + " 秒" + (c == 1 ? "" : "") + "前";
  }
  else if (c < 3600) {
    b = parseInt((c + 30) / 60);
    d += b + " 分" + (b == 1 ? "" : "") + "前"
  }
  else if (c < 86400) {
    b = parseInt((c + 1800) / 3600);
    d += b + " 時間" + (b == 1 ? "" : "") + "前"
  }
  else
  {
    a = new Date(a);
    a.getHours();
    a.getMinutes();
    if (a.getFullYear() < b.getFullYear()) {
      d += a.getFullYear() + "年";
    }
    d += ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"][a.getMonth()] + a.getDate() + "日";
    // b = parseInt((c + 43200) / 86400);
    // d += " (" + b + "日" + (b == 1 ? "" : "s") + "前)"
  }
  return d;
};


Tws.setSearchItem = function() {
  if(location.search.length > 1) {
    var query = window.location.search.substring(1);
    var params = query.split("&");
    for(var i=0; i<params.length; i++) {
      var str = params[i].split("=");
      if(str[0]=="q") {
        Tws.query = decodeURI(str[1]);
      }
      if(str[0]=="geocode") {
        str[1] = decodeURIComponent(str[1]);
        var geo = str[1].split(",");
        Tws.lat = geo[0];
        Tws.lng = geo[1];
        Tws.distance = geo[2];
      }
      if(str[0]=="rpp") {
        Tws.rpp = Number(str[1]);
      }
      if(str[0]=="zoom") {
        Demo.zoom = Number(str[1]);
      }
    }
    }
};

Tws.setGeocode = function(lat, lng) {
  Tws.geocode = lat + "," + lng;
  $(".geo").each(function(idx){
    var self = $(this);
    switch (idx) {
      case 0:
        self.val(Tws.geocode + ",2km");
        break;
      case 1:
        self.val(Tws.geocode + ",5km");
        break;
      case 2:
        self.val(Tws.geocode + ",10km");
        break;
      case 3:
        self.val(Tws.geocode + ",20km");
        break;
      case 4:
        self.val(Tws.geocode + ",30km");
        break;
      case 5:
        self.val(Tws.geocode + ",40km");
        break;
      case 6:
        self.val(Tws.geocode + ",50km");
        break;
      case 7:
        self.val(Tws.geocode + ",100km");
        break;
    }
  });
};

Tws.setDistance = function() {
  var num;
  if(Tws.distance) {
    Tws.within = Tws.distance.match(/^[0-9]+/);
    Tws.units = Tws.distance.match(/[a-z]+$/i);
    if(Tws.within=="2") {
      num=0;
    } else if(Tws.within=="5") {
      num=1;
    } else if(Tws.within=="10") {
      num=2;
    } else if(Tws.within=="20") {
      num=3;
    } else if(Tws.within=="30") {
      num=4;
    } else if(Tws.within=="40") {
      num=5;
    } else if(Tws.within=="50") {
      num=6;
    } else if(Tws.within=="100") {
      num=7;
    } else {
      num=3;
    }
  } else {
    num=3;
  }
  $("#geocode option").eq(num).attr("selected", true);
};

$(document).ready(function(){
  var inputQuery = $("#query");
  // var placeHolder = "例）あけおめ";

  Tws.setSearchItem();
  Tws.setDistance();

  $.getJSON("js/pos.json", function(data){
      var rand = Math.floor(Math.random()*data.count);
      if(!Tws.lat) Tws.lat = data.pref[rand].lat;
      if(!Tws.lng) Tws.lng = data.pref[rand].lng;
  });

  if(Tws.query) {
    inputQuery.val(decodeURI(Tws.query));
  }
  if(Tws.rpp) {
    $("#rpp").val(Tws.rpp);
  } else {
    $("#rpp").val(20);
  }
  if(Demo.zoom) {
    $("#zoom").val(Demo.zoom);
  } else {
    $("#zoom").val(10);
  }
  if(isMSIE) {
    setTimeout(function(){
      Demo.init();
    }, 300);
  } else {
        setTimeout(function(){
            Demo.init();
        }, 300);
  }
  //Demo.dpinit(); //datepickerは使わなくなった
  $("#geocode").change(function(){
    if(Demo.circle) {
      Demo.deleteCircle();
    }
    Demo.createCircle();
    Demo.twsearch(Tws.query, Tws.lat, Tws.lng, Tws.within, Tws.units, Tws.rpp);
  });
  $(":input").keydown(function(e) {
    if (e.keyCode == 13) {
      // var allInputs = $(":input:visible");
      // for(i=0; i < allInputs.length; i++){
      //   if( allInputs[i].id == e.currentTarget.id){
      //     if(!allInputs[i+1]) return false;
      //     allInputs[i+1].focus();
      //     return false;
      //   }
      // }
    }
  });
  if(inputQuery.val() !== "") {
    inputQuery.addClass("focused");
  }
  inputQuery.focus(function(){
    var self = $(this);
    // if(self.val() === placeHolder) {
    //   self.val("").addClass("focused");
    // }
  }).blur(function(){
    var self = $(this);
    // if(self.val() === "") {
    //   self.val(placeHolder).removeClass("focused");
    // }
  });
  $("#submit_post").bind("click", function(){
    // if(inputQuery.val() === placeHolder) inputQuery.val("");
    $("form").submit();
  });
  $("#submit_post").keydown("keydown", function(e){
    if (e.keyCode == 13) {
      // if(inputQuery.val() === placeHolder) inputQuery.val("");
      $("form").submit();
    }
  });
});

})(jQuery);