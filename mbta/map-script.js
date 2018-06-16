

// Takes a latitude and a longitude and returns a position object
function makePosition(latitude, longitude) {
    return {lat: latitude, lng: longitude};
}

// Custom Marker icon for MBTA map (a picture of a train) 
var trainIcon = {url: "train-small.png"};

// Makes a marker for the coordinate passed as an argument
function makeMarker(position) 
{
    var iconBase     = 'https://maps.google.com/mapfiles/kml/shapes/';
    var marker = new google.maps.Marker({position: makePosition(position.lat, position.lng), 
                                         icon: trainIcon,
                                         map: map});
}

function makeCurrentLocationMarker(position)
{
    var marker = new google.maps.Marker({position: makePosition(position.lat, position.lng), 
                                         map: map});

    marker.addListener('click', function() {
        var currentLocationInfoWindow = new google.maps.InfoWindow;

        currentLocationInfoWindow.setPosition(position);
        currentLocationInfoWindow.setContent('This is your current location');
        currentLocationInfoWindow.open(map);


                                          });
}
// Creates a google maps polyline using the coordinateList argument
function createPath(coordinateList, color)
{
    // Create polyline object
    var path = new google.maps.Polyline(
      {
        path: coordinateList,
        geodesic: true,
        strokeColor: color,
        strokeOpacity: 1.0,
        strokeWeight: 2
      }
                                       );
    // Put the polyline path on the map  
    path.setMap(map);

    return path;
}

var map;

// Red line stations
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

// Orange line stations
var oakGrove         = makePosition(42.4353430165, -71.071189642);
var malden           = makePosition(42.4273133438, -71.073871851);
var wellington       = makePosition(42.4042955853, -71.0770046711);
var assembly         = makePosition(42.392811,     -71.077257);
var sullivan         = makePosition(42.3857548427, -71.0770797729);
var communityCollege = makePosition(42.3726383181, -71.0702776909);
var northStation     = makePosition(42.365512,     -71.061423);
var haymarket        = makePosition(42.362498,     -71.058996);
var stateStreet      = makePosition(42.358897,     -71.057795);
// downtown crossing         = makePosition(,);
var chinatown        = makePosition(42.352228,     -71.062892);
var tuftsMedical     = makePosition(42.349873,     -71.063795);
var backBay          = makePosition(42.3472772215, -71.0760390759);
var massAve          = makePosition(42.3415519196, -71.0832166672);
var ruggles          = makePosition(42.3356674788, -71.0905230045);
var roxbury          = makePosition(42.3315274209, -71.0954046249);
var jacksonSquare    = makePosition(42.3227388088, -71.1000823975);
var stonyBrook       = makePosition(42.3192008078, -71.1028289795);
var greenStreet      = makePosition(42.3105691548, -71.107313633);
var forestHills      = makePosition(42.300362,     -71.113411);

// Blue Line Stations
var wonderland     = makePosition(42.414246,     -70.992144);
var revereBeach    = makePosition(42.4071633648, -70.992193222);
var beachmont      = makePosition(42.3974187182, -70.992193222);
var suffolkDowns   = makePosition(42.3884015915, -71.0003578663);
var orientHeights  = makePosition(42.386676,     -71.006628);
var woodIsland     = makePosition(42.380797,     -71.023394);
var airport        = makePosition(42.3727334327, -71.035194397);
var maverick       = makePosition(42.36886,      -71.039926);
var aquarium       = makePosition(42.359456,     -71.05357);
//var stateStreet      = makePosition(42.300362,     -71.113411);
var govCenter      = makePosition(42.359297,     -71.059895);
var bowdoin        = makePosition(42.361457,     -71.062129);


// Commuter Rail Line: Fairmount
var newmarket         = makePosition(42.326701,  -71.066314);
var uphamsCorner      = makePosition(42.3191176, -71.0687222);
var fourCornersGeneva = makePosition(42.3050441, -71.0770153);
var talbotAve         = makePosition(42.2932,    -71.0784);
var mortonStreet      = makePosition(42.2810,    -71.0855);
var fairmount         = makePosition(42.2536,    -71.1193);
var readville         = makePosition(42.2384,    -71.1332);

var stations = [southStation, andrew, porter, harvard, JFKUMass, 
                savin, park, broadway, northQuincy, shawmut,
                davis, alewife, kendallMIT, charlesMGH, downtownCrossing, quincyCenter,
                quincyAdams, ashmont, wollaston, fieldsCorner, centralSquare, braintree];

var orangeStations = [oakGrove, malden, wellington, assembly, sullivan,
                      communityCollege, northStation, haymarket, stateStreet,
                      downtownCrossing,
                      chinatown, tuftsMedical, backBay, massAve, ruggles,
                      roxbury, jacksonSquare, stonyBrook, greenStreet,
                      forestHills];

var blueStations = [wonderland, revereBeach, beachmont, suffolkDowns, 
                    orientHeights, woodIsland, airport, maverick, 
                    aquarium, stateStreet, govCenter, bowdoin];

var fairmountStations =  [southStation, newmarket, uphamsCorner, fourCornersGeneva,
                         talbotAve, mortonStreet, fairmount, readville];


// Callback function that gets called when the google API scrip is loaded
function initMap() {
    
    // Create a new google map centered on south station and with zoom of 11
    // (higher zoom means more zoomed in)
    map = new google.maps.Map(document.getElementById('map'), {
	    center: southStation,
	    zoom: 11
        });

    // Create marker for each red line station
    for (i = 0; i < stations.length; i++) makeMarker(stations[i]);

    // Create marker for each orange line station
    for (i = 0; i < orangeStations.length; i++) makeMarker(orangeStations[i]);

    // Create marker for each blue line station
    for (i = 0; i < blueStations.length; i++) makeMarker(blueStations[i]);

    // Create marker for each fairmount line station
    for (i = 0; i < fairmountStations.length; i++) makeMarker(fairmountStations[i]);


    /******************/
    /* Red Line Paths */
    /******************/

    // Create points and then path from Alewife to JFKUMass
    var alewifeToJFKUMassPoints = [alewife, davis, porter, harvard, 
                                   centralSquare, kendallMIT, charlesMGH, 
                                   park, downtownCrossing, southStation, 
                                   broadway, andrew, JFKUMass];
    var alewifeToJFKUMassPath = createPath(alewifeToJFKUMassPoints, '#FF0000');
    
    // Create points and then path from JFKUMass to Ashmont
    var JFKUMassToAshmontPoints = [JFKUMass, savin, fieldsCorner, shawmut, ashmont];
    var JFKUMassToAshmontPath = createPath(JFKUMassToAshmontPoints, '#FF0000');

    // Create points and then path from JFKUMass to Braintree
    var JFKUMassToBraintreePoints = [JFKUMass, northQuincy, wollaston, quincyCenter, quincyAdams, braintree];
    var JFKUMassToBraintreePath = createPath(JFKUMassToBraintreePoints, '#FF0000');

    /*********************/
    /* Orange Line Paths */
    /*********************/
    var orangeLinePath = createPath(orangeStations, 'DarkOrange');

    /*********************/
    /* Blue Line Paths   */
    /*********************/
    var orangeLinePath = createPath(blueStations, 'DodgerBlue');

    // Fairmount line path
    var fairmountLinePath = createPath(fairmountStations, 'SlateBlue');


    // Create geolocation marker
    // Try HTML5 geolocation.

    infoWindow = new google.maps.InfoWindow;

    // If browser allows geolocation, do geolocation things
    if (navigator.geolocation) 
    {
        navigator.geolocation.getCurrentPosition(locationCallback, locationErrorCallBack);
    } 
    else // If Browser doesn't support Geolocation, show error message
    {
        handleLocationError(false, infoWindow, map.getCenter());
    }

}

// Called when there's an error getting the user's current location
// Displays an infowindow at the center of the map with an error message
function locationErrorCallBack() 
{
    handleLocationError(true, infoWindow, map.getCenter());
}

// Called when browser is permitted to access user's location
// Sets up an info window at the position specified
function locationCallback(position)
{    
      // Define a position variable
      var pos = {lat: position.coords.latitude,
                 lng: position.coords.longitude};

      /*// Set position and message of infoWindow
      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');

      // Open the infowindow, and center the map at the user's geolocation
      infoWindow.open(map);*/


      // Make a marker for current location with default icon
      makeCurrentLocationMarker(pos);

      map.setCenter(pos);

}

// Handles the case when there's an error displaying the user's location
function handleLocationError(browserHasGeolocation, infoWindow, pos) 
{
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' :
                                                  'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

// Commuter Rail Line: Fitchburg
/*porter
belmont
waverley
waltham
brandeisRoberts
kendalGreen
lincoln
concord
westConcord
southActon
littletonRoute495
ayer
shirley
northleominster
fitchburg
wachusett*/

// Commuter Rail Line: Framingham/Worcester
/*
southStation
backBay
yawkey
bostonLanding
newtonville
westNewton
auburndale
wellesleyFarms
wellesleyHills
wellesleySquare
natickCenter
westNatick
framingham
*/

// Commuter Rail Line: Franklin
/*southStation
backBay
ruggles
readville
endicott
dedhamCorpCenter
islington
norwoodDepot
norwoodCentral
windsorGardens
walpole
norfolk
franklin
forgePark495*/

// Commuter Rail Line: Greenbush
/*southStation
JFKUMass
quincyCenter
weymouthLandingEastBraintree
eastWeymouth
westHingham
nantasketJunction
cohasset
northScituate
greenbush*/

// Commuter Rail Line: Haverhill
/*northStation
malden
wyomingHill
melroseCedarPark
melroseHighlands
greenwood
wakefield
reading
northWilmington
ballardvale
andover
lawrence
bradford
haverhill*/

// Commuter Rail Line: Kingston/Plymouth
/*southStation
JFKUMass
quincyCenter
braintree
southWeymouth
abington
whitman
hanson
halifax
kingston
plymouth*/

// Commuter Rail Line: Lowell
/*northStation
westmMedford
wedgemere
winchesterCenter
andersonWoburn
wilmington
northBillerica
lowell*/

// Commuter Rail Line: Middleborough/Lakeville
/*southStation
JFKUMass
quincyCenter
braintree
holbrookRandolph
montello
brockton
campello
bridgewater
middleboroughLakeville
*/

// Commuter Rail Line: Needham
/*southStation
backBay
ruggles
forestHills
roslindaleVillage
bellevue
highland
westRoxbury
hersey
needhamJunction
needhamCenter
needhamHeights*/

// Commuter Rail Line: Newburyport/Rockport
/*northStation
chelsea
lynn
swampscott
salem
beverly
northBeverly
hamiltonWenham
ipswich
rowley
newburyport
montserrat
beverlyFarms
manchester
westGloucester
gloucester
rockport*/

// Commuter Rail Line: Providence/Stoughton
/*southStation
backBay
ruggles
hydePark
route128
cantonJunction
sharon
mansfield
attleboro
southAttleboro
providence*/

// Commuter Rail Line: Foxboro