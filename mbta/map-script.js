
function makePosition(latitude, longitude) {
    return {lat: latitude, lng: longitude};
}

var map;

var southStation = makePosition(42.352271, -71.05524200000001);
var andrew       = makePosition(42.330154, -71.05765);
var porter       = makePosition(42.3884,   -71.11914899999999);
      

    
      
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
	    center: southStation,
	    zoom: 12
        });

    var southStaionMarker = new google.maps.Marker({position: southStation, map: map});
    var AndrewMarker      = new google.maps.Marker({position: andrew, map: map});
    var PorterMarker      = new google.maps.Marker({position: porter, map: map});
    /*var HarvardMarker     = new google.maps.Marker({position: southStation, map: map});
      var JFKUMassMarker    = new google.maps.Marker({position: southStation, map: map});
      var AndrewMarker      = new google.maps.Marker({position: southStation, map: map});*/

}
