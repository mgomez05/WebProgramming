
function makePosition(latitude, longitude) {
    return {lat: latitude, lng: longitude};
}

function makeMarker(lat, lon) {
    var marker = new google.maps.Marker({position: makePosition(lat, lon), map: map});
}

var map;

var southStation      = makePosition(42.352271,   -71.05524200000001);

    
      
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
	    center: southStation,
	    zoom: 12
        });

    var southStaionMarker = makeMarker(southStation.lat, southStation.lng);
    
    
    var andrew            = makeMarker(42.330154,   -71.05765);
    var porter            = makeMarker(42.3884,     -71.11914899999999);
    var harvard           = makeMarker(42.373362,   -71.118956);
    var JFKUMass          = makeMarker(42.320685,   -71.052391);
    var savin             = makeMarker(42.31129,    -71.053331);
    var park              = makeMarker(42.35639457, -71.0624242);
    var broadway          = makeMarker(42.342622,   -71.056967);
    var northQuincy       = makeMarker(42.275275,   -71.029583);
    var shawmut           = makeMarker(42.29312583, -71.06573796000001);
    var davis             = makeMarker(42.39674,    -71.121815);
    var alewife           = makeMarker(42.395428,   -71.142483);
    var kendallMIT        = makeMarker(42.36249079, -71.08617653);
    var charlesMGH        = makeMarker(42.361166,   -71.070628);
    var downtownCrossing  = makeMarker(42.355518,   -71.060225);
    var quincyCenter      = makeMarker(42.251809,   -71.005409);
    var quincyAdams       = makeMarker(42.233391,   -71.007153);
    var ashmont           = makeMarker(42.284652,   -71.06448899999999);
    var wollaston         = makeMarker(42.2665139,  -71.0203369);
    var fieldsCorner      = makeMarker(42.300093,   -71.061667);
    var centralSquare     = makeMarker(42.365486,   -71.103802);
    var braintree         = makeMarker(42.2078543,  -71.0011385);
      
    //new google.maps.Marker({position: southStation, map: map});
    //var AndrewMarker      = new google.maps.Marker({position: andrew, map: map});
    //var PorterMarker      = new google.maps.Marker({position: porter, map: map});
    /*var HarvardMarker     = new google.maps.Marker({position: southStation, map: map});
      var JFKUMassMarker    = new google.maps.Marker({position: southStation, map: map});
      var AndrewMarker      = new google.maps.Marker({position: southStation, map: map});*/

}
