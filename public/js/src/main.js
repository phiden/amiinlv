// Generated by CoffeeScript 1.6.1
(function(){var e={}.hasOwnProperty,t=function(t,n){function i(){this.constructor=t}for(var r in n)e.call(n,r)&&(t[r]=n[r]);i.prototype=n.prototype;t.prototype=new i;t.__super__=n.prototype;return t};window.App={Routers:{},Views:{},Models:{},Collections:{}};jQuery(function(){if($("#main").length>0){window.userLocation=new App.Models.Location;return window.view=new App.Views.Main}});App.Models.Location=function(e){function n(){return n.__super__.constructor.apply(this,arguments)}t(n,e);n.prototype.defaults={latitude:36.18,longitude:-114.14,withinLimits:!0};n.prototype.initialize=function(){return this.on("change",this.onChange)};n.prototype.url=function(){return this.instanceURL};n.prototype.fetchByAddress=function(e){this.instanceURL="/geocode";return this.fetch({data:{address:e}})};n.prototype.fetchByCurrentLocation=function(e){this.instanceURL="/check";return this.fetch({data:{latitude:e.coords.latitude,longitude:e.coords.longitude}})};n.prototype.getCurrentLocation=function(){var e;e=window.navigator.geolocation;return e?e.getCurrentPosition(_.bind(this.fetchByCurrentLocation,this),_.bind(this.onGetCurrentLocationFailure,this)):console.log("Browser does not support geolocation")};n.prototype.onGetCurrentLocationFailure=function(e){return this.trigger("currentlocation:failure")};n.prototype.onChange=function(){return this.get("withinLimits")?this.trigger("location:withinlimits"):this.trigger("location:outsidelimits")};n.prototype.reset=function(){return this.set(this.defaults)};return n}(Backbone.Model);App.Views.Main=function(e){function n(){return n.__super__.constructor.apply(this,arguments)}t(n,e);n.prototype.el="#main";n.prototype.initialize=function(){this.map=new App.Views.Map;this.question=new App.Views.Question;this.answer=new App.Views.Answer;this.$header=$(this.header);userLocation.on("location:withinlimits",_.bind(this.onWithinLimits,this));return userLocation.on("location:outsidelimits",_.bind(this.onOutsideLimits,this))};n.prototype.onWithinLimits=function(){return this.displayAnswer("Yes")};n.prototype.onOutsideLimits=function(){return this.displayAnswer("No")};n.prototype.displayAnswer=function(e){this.question.hide(_.bind(function(){return this.answer.show(e)},this));return this.map.refreshLocation()};return n}(Backbone.View);App.Views.Map=function(e){function n(){return n.__super__.constructor.apply(this,arguments)}t(n,e);n.prototype.el="#map";n.prototype.origin={latitude:36.18,longitude:-115.14};n.prototype.tilesURL="https://maps.nlp.nokia.com/maptiler/v2/maptile/newest/normal.day/{z}/{x}/{y}/256/png8?lg=eng&token=61YWYROufLu_f8ylE0vn0Q&app_id=qIWDkliFCtLntLma2e6O";n.prototype.attribution="CartoDB <a href='http://cartodb.com/attributions'>attribution</a>, &copy;2012 Nokia <a href='http://here.net/services/terms'>Terms of use</a>";n.prototype.zoom=12;n.prototype.initialize=function(){var e,t,n,r,i,s;n=new L.LatLng(this.origin.latitude,this.origin.longitude);r={center:n,zoom:this.zoom,dragging:!1,touchZoom:!1,scrollWheelZoom:!1,doubleClickZoom:!1,boxZoom:!1,keyboard:!1,zoomControl:!1};this.map=L.map("map",r);i={attribution:this.attribution,maxZoom:15};s=new L.TileLayer(this.tilesURL,i);this.map.addLayer(s);e={map:this.map,user_name:"cfa",table_name:"clv_boundary",query:"SELECT * FROM {{table_name}}",tile_style:"#{{table_name}}{ polygon-fill: red; polygon-opacity: 0.07; line-width: 1; line-color: #FFF;line-opacity: 1;polygon-comp-op: multiply;}"};t=new L.CartoDBLayer(e);return this.map.addLayer(t)};n.prototype.refreshLocation=function(){var e,t,n;e=userLocation.get("latitude");n=userLocation.get("longitude");t=new L.LatLng(e,n);return this.map.setView(t,this.zoom)};n.prototype.createMap=function(e){var t,n;n=e.layers[0].options.urlTemplate;t=new L.LatLng(this.origin.latitude,this.origin.longitude);return this.map=new L.map("map",cartodb.createLayer(this.map,this.endpoint).done(function(e){return""}).on("error",function(e){return console.log("The following error occurred: "+e)}))};return n}(Backbone.View);App.Views.Question=function(e){function n(){return n.__super__.constructor.apply(this,arguments)}t(n,e);n.prototype.el="#question";n.prototype.input="#input-location";n.prototype.events={"click #input-target":"onGetLocation","click #input-go":"onGo","submit form":"onSubmit"};n.prototype.onGetLocation=function(){console.log("get location");return userLocation.getCurrentLocation()};n.prototype.onGo=function(){this.setLocation();return!1};n.prototype.onSubmit=function(e){e.preventDefault();this.setLocation();return!1};n.prototype.setLocation=function(){var e;e=$(this.input).val();return userLocation.fetchByAddress(e)};n.prototype.hide=function(e){return this.$el.fadeOut(250,e)};return n}(Backbone.View);App.Views.Answer=function(e){function n(){return n.__super__.constructor.apply(this,arguments)}t(n,e);n.prototype.el="#answer";n.prototype.marker="#marker";n.prototype.initialize=function(){return this.$marker=$(this.marker)};n.prototype.show=function(e){this.$el.html(ich.answer({answer:e}));this.$marker.css("display","block");this.$marker.animate({opacity:1,top:"250"},250);return this.$el.fadeIn(250)};n.prototype.hide=function(){return $(this.marker).css("display","none")};n.prototype.drop=function(){return $(this.marker).animate({opacity:0},0)};return n}(Backbone.View)}).call(this);