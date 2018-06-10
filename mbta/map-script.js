
function makePosition(latitude, longitude) {
    return {lat: latitude, lng: longitude};
}


var trainIcon = {url: "train-small.png"};

function makeMarker(lat, lon) {

    var iconBase     = 'https://maps.google.com/mapfiles/kml/shapes/';
    var marker = new google.maps.Marker({position: makePosition(lat, lon), 
                                         icon: trainIcon,
                                         map: map});
}

// Creates a google maps polyline using the coordinateList argument
function createPath(coordinateList)
{
    // Create polyline object
    var path = new google.maps.Polyline(
      {
        path: coordinateList,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
      }
                                       );

    path.setMap(map);

    return path;
}

var map;

var southStation      = makePosition(42.352271,   -71.05524200000001);
var andrew            = makePosition(42.330154,   -71.05765);
var porter            = makePosition(42.3884,     -71.11914899999999);
var harvard           = makePosition(42.373362,   -71.118956);
var JFKUMass          = makePosition(42.320685,   -71.052391);
var savin             = makePosition(42.31129,    -71.053331);
var park              = makePosition(42.35639457, -71.0624242);
var broadway          = makePosition(42.342622,   -71.056967);
var northQuincy       = makePosition(42.275275,   -71.029583);
var shawmut           = makePosition(42.29312583, -71.06573796000001);
var davis             = makePosition(42.39674,    -71.121815);
var alewife           = makePosition(42.395428,   -71.142483);
var kendallMIT        = makePosition(42.36249079, -71.08617653);
var charlesMGH        = makePosition(42.361166,   -71.070628);
var downtownCrossing  = makePosition(42.355518,   -71.060225);
var quincyCenter      = makePosition(42.251809,   -71.005409);
var quincyAdams       = makePosition(42.233391,   -71.007153);
var ashmont           = makePosition(42.284652,   -71.06448899999999);
var wollaston         = makePosition(42.2665139,  -71.0203369);
var fieldsCorner      = makePosition(42.300093,   -71.061667);
var centralSquare     = makePosition(42.365486,   -71.103802);
var braintree         = makePosition(42.2078543,  -71.0011385);

var stations = [southStation, andrew, porter, harvard, JFKUMass, 
                savin, park, broadway, northQuincy, shawmut,
                davis, alewife, kendallMIT, charlesMGH, downtownCrossing, quincyCenter,
                quincyAdams, ashmont, wollaston, fieldsCorner, centralSquare, braintree];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
	    center: southStation,
	    zoom: 11
        });

    // Create a marker for each station
    for (i = 0; i < stations.length; i++)
    {
        makeMarker(stations[i].lat, stations[i].lng);
    }

    // Set points of the red line illustrating the path of MBTA
    var alewifeToJFKUMassCoordinates = [
        alewife,
        davis, porter, harvard, centralSquare,
        kendallMIT, charlesMGH, park, downtownCrossing,
        southStation, broadway, andrew, JFKUMass
      ];

    var alewifeToJFKUMass = createPath(alewifeToJFKUMassCoordinates);
    

    //var southStationMarker = makeMarker(southStation.lat, southStation.lng);
    
   
      
    //new google.maps.Marker({position: southStation, map: map});
    //var AndrewMarker      = new google.maps.Marker({position: andrew, map: map});
    //var PorterMarker      = new google.maps.Marker({position: porter, map: map});
    /*var HarvardMarker     = new google.maps.Marker({position: southStation, map: map});
      var JFKUMassMarker    = new google.maps.Marker({position: southStation, map: map});
      var AndrewMarker      = new google.maps.Marker({position: southStation, map: map});*/

}
