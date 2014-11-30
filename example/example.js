			var map,popup;
			var aktLayer;
			var feat;
			var spatial_layer;
			var school;
			var select;
			var drawings;
			
            OpenLayers.Control.Click = OpenLayers.Class(OpenLayers.Control, {                
                defaultHandlerOptions: {
                    'single': true,
                    'double': false,
                    'pixelTolerance': 0,
                    'stopSingle': false,
                    'stopDouble': false
                },

                initialize: function(options) {
                    this.handlerOptions = OpenLayers.Util.extend(
                        {}, this.defaultHandlerOptions
                    );
                    OpenLayers.Control.prototype.initialize.apply(
                        this, arguments
                    ); 
                    this.handler = new OpenLayers.Handler.Click(
                        this, {
                            'click': this.trigger
                        }, this.handlerOptions
                    );
                }, 

                trigger: function(e) {
                    delete school.params.CQL_FILTER;
					school.redraw();
                }

            });
			
			function init(){
				
                map = new OpenLayers.Map('map', {
                    controls: [],
					theme: null  
                });
				
				map.aktLayer=6;
				//потрібні шари
				school = new OpenLayers.Layer.WMS(
                    "LNU",
                    "http://localhost:8080/geoserver/wms",
                    {layers: "Lnu",
                     transparent: "true"}
                );
				var roads = new OpenLayers.Layer.WMS(
                    "Ukraine Roads",
                    "http://localhost:8080/geoserver/wms",
                    {layers: "roads",
                     transparent: "true"}
                );
				var borders = new OpenLayers.Layer.WMS(
                    "Ukraine",
                    "http://localhost:8080/geoserver/wms",
                    {layers: "UKR_adm1",
                     transparent: "true"}
                );
				 var world = new OpenLayers.Layer.WMS(
                    "Global Map",
                    "http://localhost:8080/geoserver/wms",
                    {layers: 'World'},{/*'displayInLayerSwitcher':false*/} 
                );
				var gwc = new OpenLayers.Layer.WMS(
                    "Global Imagery",
                    "http://maps.opengeo.org/geowebcache/service/wms",
					
                    {layers: "bluemarble"},
                    {/*'displayInLayerSwitcher':false,*/tileOrigin: new OpenLayers.LonLat(-180, -90)}
                );
				
				
				//презентаційні шари
				var political = new OpenLayers.Layer.WMS("State Boundaries",
					"http://demo.opengeo.org/geoserver/wms", 
					{'layers': 'topp:tasmania_state_boundaries', transparent: true, format: 'image/gif'},
					{isBaseLayer: false}
				);
		
				/*var roads = new OpenLayers.Layer.WMS("Roads",
					"http://demo.opengeo.org/geoserver/wms", 
					{'layers': 'topp:tasmania_roads', transparent: true, format: 'image/gif'},
					{isBaseLayer: false}
				);*/
		
				var cities = new OpenLayers.Layer.WMS("Cities",
					"http://demo.opengeo.org/geoserver/wms", 
					{'layers': 'topp:tasmania_cities', transparent: true, format: 'image/gif'},
					{isBaseLayer: false}
				);
		
				var water = new OpenLayers.Layer.WMS("Bodies of Water",
					"http://demo.opengeo.org/geoserver/wms", 
					{'layers': 'topp:tasmania_water_bodies', transparent: true, format: 'image/gif'},
					{isBaseLayer: false}
				);
				
				
				spatial_layer = new OpenLayers.Layer.Vector("WFS", {'displayInLayerSwitcher':false,
					strategies: [new OpenLayers.Strategy.BBOX()],
					protocol: new OpenLayers.Protocol.WFS({
						url:  "http://localhost:8080/geoserver/wfs",
						//url: "http://demo.opengeo.org/geoserver/wms",
						featureType: "UKR_adm1"
						//featureType: "topp:tasmania_water_bodies"
					})
				});
				select = new OpenLayers.Layer.Vector(
				"Selection", {
				styleMap:new OpenLayers.Style(OpenLayers.Feature.Vector.style["select"]),'displayInLayerSwitcher':false
				});
				
				var ls=new OpenLayers.Control.LayerSwitcherRadio(/*{'ascending':false}*/);
				ls.useLegendGraphics = true;
				ls.onChangeActiveLayer =  function () { refreshSpanActiveLayer() };
				var drawings = new OpenLayers.Layer.Vector("Spatial",{'displayInLayerSwitcher':false});
				map.addLayer(drawings);
				
				
				vlayer = new OpenLayers.Layer.Vector( "Editable" ,{'displayInLayerSwitcher':false});
				map.addLayer(vlayer);
				map.addControl(ls);
                map.addControl(new OpenLayers.Control.Permalink());
                map.addControl(new OpenLayers.Control.ScaleLine());
                map.addControl(new OpenLayers.Control.Permalink('permalink'));
                map.addControl(new OpenLayers.Control.MousePosition());
                map.addControl(new OpenLayers.Control.KeyboardDefaults());
				map.addControl(new OpenLayers.Control.Navigation({
					dragPanOptions: {
						enableKinetic: true
					}
					}));
				map
				map.addControl(new OpenLayers.Control.Zoom());
				map.addControl(new OpenLayers.Control.Attribution());
				
				var click = new OpenLayers.Control.Click();
                map.addControl(click);
                click.activate();
				
				
				var info = new OpenLayers.Control.WMSGetFeatureInfo({
					url: 'http://localhost:8080/geoserver/wms',
					//url: 'http://demo.opengeo.org/geoserver/wms',					
					title: 'Identify features by clicking',
					text:"Info",
					queryVisible: true,
					eventListeners: {
						getfeatureinfo: function(event) {
						popup=new OpenLayers.Popup.FramedCloud(
								"chicken", 
								map.getLonLatFromPixel(event.xy),
								null,
								event.text,
								null,
								true,onPopupClose
							);
							
							map.addPopup(popup);
						}
					}
				});
				map.addControl(info);
				info.activate();
				
				
				 // style the sketch fancy
				var sketchSymbolizers = {
					"Point": {
						pointRadius: 4,
						graphicName: "square",
						fillColor: "white",
						fillOpacity: 1,
						strokeWidth: 1,
						strokeOpacity: 1,
						strokeColor: "#333333"
					},
					"Line": {
						strokeWidth: 3,
						strokeOpacity: 1,
						strokeColor: "#666666",
						strokeDashstyle: "dash"
					},
					"Polygon": {
						strokeWidth: 2,
						strokeOpacity: 1,
						strokeColor: "#666666",
						fillColor: "white",
						fillOpacity: 0.3
					}
				};
				var style = new OpenLayers.Style();
				style.addRules([
					new OpenLayers.Rule({symbolizer: sketchSymbolizers})
				]);
				var styleMap = new OpenLayers.StyleMap({"default": style});
				
				// allow testing of specific renderers via "?renderer=Canvas", etc
				var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
				renderer = (renderer) ? [renderer] : OpenLayers.Layer.Vector.prototype.renderers;
				
				var dist=new OpenLayers.Control.Measure(
					OpenLayers.Handler.Path,{
						persist: true,
						handlerOptions:{
							layerOptions:{
								renderers: renderer,
								styleMap: styleMap
								}
							},
							
						}	
				);
				dist.text="Measure";
				dist.events.on({
                    "measure": handleMeasurements,
                    "measurepartial": handleMeasurements
                });
				
				
				ls.maximizeControl();
				
				zb = new OpenLayers.Control.ZoomBox({
					title: "Zoom box: zoom clicking and dragging",
					text: "Zoom"
				});
				
				var drg=new OpenLayers.Control.Navigation({
					text: "Drag",
					title: "DragPan: draging the map",
					dragPanOptions: {
						enableKinetic: true
					}
					});
					
				var panel = new OpenLayers.Control.Panel({
					defaultControl: drg,
					createControlMarkup: function(control) {
						var button = document.createElement('button'),
							iconSpan = document.createElement('span'),
							textSpan = document.createElement('span');
						iconSpan.innerHTML = '&nbsp;';
						button.appendChild(iconSpan);
						if (control.text) {
							textSpan.innerHTML = control.text;
						}
						button.appendChild(textSpan);
						return button;
					}
				});
				var drw=new OpenLayers.Control.DrawFeature(vlayer, OpenLayers.Handler.Path,
						{title:'Draw a feature', text: 'Draw'});
				
				
				//Adding Layers to the map
				map.addLayers([world,gwc,roads,borders, school,/*gwc,political,roads,cities,water,*/spatial_layer,select]);
				
				
				
				
				feat = new OpenLayers.Control.GetFeature({
					protocol: OpenLayers.Protocol.WFS.fromWMSLayer(map.getLayersByName(map.layers[map.aktLayer].name)[0]),
					text:"Select",
					title:"Selects Object",
					box: true,
					hover: true,
					multipleKey: "shiftKey",
					toggleKey: "ctrlKey"
				});
				
				feat.events.register("featureselected", this, function(e) {
					select.addFeatures([e.feature]);
				});
				feat.events.register("featureunselected", this, function(e) {
					select.removeFeatures([e.feature]);
				});
				map.addControl(feat);
				feat.activate();
				var drawPoly = new OpenLayers.Control.DrawFeature(drawings, OpenLayers.Handler.Polygon,{title:'Spatial request', text: 'Spatial Request'});
				
				panel.addControls([
					drg,
					zb,
					drw,
					dist,
					info,
					feat,
					drawPoly,
					new OpenLayers.Control.ZoomToMaxExtent({
						title:"Zoom to the max extent",
						text: "World"
					}) 
				]);
				
				nav = new OpenLayers.Control.NavigationHistory({
					previousOptions: {
						title: "Go to previous map position",
						text: "Prev"
					},
					nextOptions: {
						title: "Go to next map position",
						text: "Next"
					},
					displayClass: "navHistory"
				});
				// parent control must be added to the map
				
				map.addControl(nav);
				panel.addControls([nav.next, nav.previous]);
				panel.addControls([click]);
				map.addControl(panel);
				
				
				
				
				drawings.events.on({
				beforefeatureadded: function(event) {
					var geometry = event.feature.geometry;
					spatial_layer.filter = new OpenLayers.Filter.Spatial({
						type: OpenLayers.Filter.Spatial.INTERSECTS,
						value: event.feature.geometry
					});
					spatial_layer.refresh({force: true});
					return false;
				}
				});
				
				
				
				
				
				
				map.setCenter([25.6,49.49],7);
				//map.setCenter([146,-42],7);
                
				
				
				
				
                if (!map.getCenter()) {
                    map.zoomToMaxExtent();
                }
            }
			function handleMeasurements(event) {
							var geometry = event.geometry;
							var units = event.units;
							var order = event.order;
							var measure = event.measure;
							var element = document.getElementById('output');
							var out = "";
							if(order == 1) {
								out += "measure: " + measure.toFixed(3) + " " + units;
							} else {
								out += "measure: " + measure.toFixed(3) + " " + units + "<sup>2</" + "sup>";
							}
							
							element.innerHTML = out;
						}
			function onPopupClose() {
			map.removePopup(popup);
			}
			function refreshSpanActiveLayer()
			{
				
				feat.protocol=OpenLayers.Protocol.WFS.fromWMSLayer(map.getLayersByName(map.layers[map.aktLayer].name)[0]);
				spatial_layer.protocol=OpenLayers.Protocol.WFS.fromWMSLayer(map.getLayersByName(map.layers[map.aktLayer].name)[0]);
			}