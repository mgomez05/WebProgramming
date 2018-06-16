
// Custom Marker icon for MBTA map (a picture of a train) 
var trainIcon = {url: "train-small.png"};

// Info window for different stations
var infoWindow;


// Takes a latitude and a longitude and returns a position object
function makePosition(latitude, longitude) {
    return {lat: latitude, lng: longitude};
}

// Makes a station object with a latitude, longitude, and name
function makeStation(lat, lng, name, stopID)
{
    return {lat: lat, lng: lng, name: name, stopID: stopID};
}

// Makes a marker for the coordinate passed as an argument
// If an icon is specified, use it as the image for the marker
// Otherwise, use the default google icon
function makeMarker(position, icon) 
{
 
    var marker = new google.maps.Marker({position: makePosition(position.lat, position.lng), 
                                         map: map});

    if (icon != null) marker.setIcon(icon);

    return marker;
}

// Makes a marker for each station in an array of stations
function makeStationMarkers(stations)
{
    for (i = 0; i < stations.length; i++) 
    {
        var currentStation = stations[i];
        var marker = makeMarker(currentStation, trainIcon);
        marker.addListener('click', function() { onStationMarkerClick(currentStation) });
    }
}

// Makes a marker for the user's current location
function makeCurrentLocationMarker(position)
{
    marker = makeMarker(position, null);

    // Set up listener that calls onCurrentLocationMarkerClick() when the marker is clicked 
    marker.addListener('click', function() { onCurrentLocationMarkerClick(position) });
}

function onStationMarkerClick(station)
{
    displayTrainInfo(station);
}

// Called when the marker at the user's current location is clicked
function onCurrentLocationMarkerClick(position)
{
    var currentLocationInfoWindow = new google.maps.InfoWindow;
      
    // Finds index of closest station in the stations array
    // and the distance to it in miles
    closestStation = findClosestStation(position, stations);

    // Set up infowindow at current position with 
    // the index of the closest station in the stations array and
    // distance to the closest station in miles
    currentLocationInfoWindow.setPosition(position);
    currentLocationInfoWindow.setContent("Closest to station " + closestStation.station.name + " with distance of " + closestStation.distance + " miles");
    currentLocationInfoWindow.open(map);                                    
}

// Finds the station in an array of stations that is closest to currentPosition
function findClosestStation(currentPosition, stations)
{
    var minHavResult = 1000000000000000;
    var minIndex = -1;
    var minStation = null;

    var havResults = [];

    // Loop through different locations and see which one is the closest
    for (var i = 0; i < stations.length; i++)
    {
        var havResult = doHaversine(currentPosition, stations[i]);
        havResults.push(havResult);

        if (havResult < minHavResult) 
        {
            minHavResult = havResult;
            minIndex = i;
            minStation = stations[i];
        } 
    }

    var closestPosition = {index: minIndex, distance: minHavResult, station: minStation};

    return closestPosition;
}

function toRadians(degrees)
{
    return degrees * Math.PI / 180;
}

function doHaversine(position1, position2)
{
    // Radius of earth in meters
    var R = 6371e3; 

    // Convert latitudes to radians
    var lat1 = toRadians(position1.lat);
    var lat2 = toRadians(position2.lat);

    // Get deltas for latitude and longitudes
    var dLat = toRadians(position2.lat - position1.lat);
    var dLng = toRadians(position2.lng - position1.lng);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1)   * Math.cos(lat2)   *
            Math.sin(dLng/2) * Math.sin(dLng/2);

    var c =  2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
    var d = R * c;

    // Convert to miles
    var d = d * 0.000621371;

    return d;
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

// Send a subway trains request
function displayTrainInfo(station) 
{   
    var url = "https://defense-in-derpth.herokuapp.com/redline/schedule.json?stop_id="+ station.stopID;

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            jsonData = JSON.parse(xhttp.responseText);
            jsonData2 = jsonData["data"];

            contentString = "<h3>" + station.name + " Schedule:" + "</h3>";

            for (i = 0; i < jsonData2.length; i++)
            {
                var arrayElement  = jsonData2[i]["attributes"];

                // Get attributes from JSON
                var arrivalTime   = arrayElement["arrival_time"];
                var departureTime = arrayElement["departure_time"];
                var direction     = arrayElement["direction_id"]; 

                if (direction = "1") direction = "Northbound to Alewife"
                else                 direction = "Southbound to Ashmont/Braintree";
                
                if (arrivalTime == null) arrivalTime = "N/A";
                else                     arrivalTime = cleanUpDateString(arrivalTime);                 
                
                if (departureTime == null) departureTime = "N/A"
                else                       departureTime = cleanUpDateString(departureTime);               
            
                contentString +=  "<p>" + (i + 1) + ". " +
                                  "Arrival: "   + arrivalTime   + ", " + 
                                  "Departure: " + departureTime + ", " +
                                  "Direction: " + direction + 
                                  '</p>';
            }

            infoWindow.setPosition(makePosition(station.lat, station.lng));
            infoWindow.setContent(contentString);
            infoWindow.open(map);
        }
    }

    xhttp.open("GET", url, true);

    xhttp.send();
}

function cleanUpDateString(dateString)
{
    date = new Date(dateString);
    dateString = date.toLocaleTimeString();  

    return dateString;
}


var map;

// Red line stations
var southStation      = makeStation(42.352271,   -71.05524200000001, "South Station",     "place-sstat");
var andrew            = makeStation(42.330154,   -71.05765,          "Andrew",            "place-andrw");
var porter            = makeStation(42.3884,     -71.11914899999999, "Porter",            "place-portr");
var harvard           = makeStation(42.373362,   -71.118956,         "Harvard",           "place-harsq");
var JFKUMass          = makeStation(42.320685,   -71.052391,         "JFK/UMass",         "place-jfk"  );
var savin             = makeStation(42.31129,    -71.053331,         "Savin Hill",        "place-shmnl");
var park              = makeStation(42.35639457, -71.0624242,        "Park Street",       "place-pktrm");
var broadway          = makeStation(42.342622,   -71.056967,         "Broadway",          "place-brdwy");
var northQuincy       = makeStation(42.275275,   -71.029583,         "North Quincy",      "place-nqncy");
var shawmut           = makeStation(42.29312583, -71.06573796000001, "Shawmut",           "place-smmnl");
var davis             = makeStation(42.39674,    -71.121815,         "Davis Square",      "place-davis");
var alewife           = makeStation(42.395428,   -71.142483,         "Alewife",           "place-alfcl");
var kendallMIT        = makeStation(42.36249079, -71.08617653,       "Kendall/MIT",       "place-knncl");
var charlesMGH        = makeStation(42.361166,   -71.070628,         "Charles/MGH",       "place-chmnl");
var downtownCrossing  = makeStation(42.355518,   -71.060225,         "Downtown Crossing", "place-dwnxg");
var quincyCenter      = makeStation(42.251809,   -71.005409,         "Quincy Center",     "place-qnctr");
var quincyAdams       = makeStation(42.233391,   -71.007153,         "Quincy Adams",      "place-qamnl");
var ashmont           = makeStation(42.284652,   -71.06448899999999, "Ashmont",           "place-asmnl");
var wollaston         = makeStation(42.2665139,  -71.0203369,        "Wollaston",         "place-wlsta");
var fieldsCorner      = makeStation(42.300093,   -71.061667,         "Fields Corner",     "place-fldcr");
var centralSquare     = makeStation(42.365486,   -71.103802,         "CentralSquare",     "place-cntsq");
var braintree         = makeStation(42.2078543,  -71.0011385,        "Braintree",         "place-brntn");

// Orange line stations
var oakGrove         = makeStation(42.4353430165, -71.071189642,  "Oak Grove");
var malden           = makeStation(42.4273133438, -71.073871851,  "Malen");
var wellington       = makeStation(42.4042955853, -71.0770046711, "Wellington");
var assembly         = makeStation(42.392811,     -71.077257,     "Assembly");
var sullivan         = makeStation(42.3857548427, -71.0770797729, "Sullivan");
var communityCollege = makeStation(42.3726383181, -71.0702776909, "Community College");
var northStation     = makeStation(42.365512,     -71.061423,     "North Station");
var haymarket        = makeStation(42.362498,     -71.058996,     "Haymarket");
var stateStreet      = makeStation(42.358897,     -71.057795,     "State Street");
// downtown crossing         = makeStation(,);
var chinatown        = makeStation(42.352228,     -71.062892,     "Chinatown");
var tuftsMedical     = makeStation(42.349873,     -71.063795,     "Tufts Medical");
var backBay          = makeStation(42.3472772215, -71.0760390759, "Back Bay");
var massAve          = makeStation(42.3415519196, -71.0832166672, "Mass Ave");
var ruggles          = makeStation(42.3356674788, -71.0905230045, "Ruggles");
var roxbury          = makeStation(42.3315274209, -71.0954046249, "Roxbury");
var jacksonSquare    = makeStation(42.3227388088, -71.1000823975, "Jackson Sqaure");
var stonyBrook       = makeStation(42.3192008078, -71.1028289795, "Stony Brook");
var greenStreet      = makeStation(42.3105691548, -71.107313633,  "Green Street");
var forestHills      = makeStation(42.300362,     -71.113411,     "Forest Hills");

// Blue Line Stations
var wonderland     = makeStation(42.414246,     -70.992144,     "Wonderland");
var revereBeach    = makeStation(42.4071633648, -70.992193222,  "Revere Beach");
var beachmont      = makeStation(42.3974187182, -70.992193222,  "Beachmont");
var suffolkDowns   = makeStation(42.3884015915, -71.0003578663, "Suffolk Downs");
var orientHeights  = makeStation(42.386676,     -71.006628,     "Orient Heights");
var woodIsland     = makeStation(42.380797,     -71.023394,     "Wood Island");
var airport        = makeStation(42.3727334327, -71.035194397,  "Airpot");
var maverick       = makeStation(42.36886,      -71.039926,     "Maverick");
var aquarium       = makeStation(42.359456,     -71.05357,      "Aquarium");
//var stateStreet      = makeStation(42.300362,     -71.113411);
var govCenter      = makeStation(42.359297,     -71.059895,     "Government Center");
var bowdoin        = makeStation(42.361457,     -71.062129,     "Bowdoin");


// Commuter Rail Line: Fairmount
var newmarket         = makeStation(42.326701,  -71.066314,  "Newmarket");
var uphamsCorner      = makeStation(42.3191176, -71.0687222, "Uphams");
var fourCornersGeneva = makeStation(42.3050441, -71.0770153, "Four Corners Geneva");
var talbotAve         = makeStation(42.2932,    -71.0784,    "Talbot Ave");
var mortonStreet      = makeStation(42.2810,    -71.0855,    "Morton Street");
var fairmount         = makeStation(42.2536,    -71.1193,    "Fairmount");
var readville         = makeStation(42.2384,    -71.1332,    "Readville");

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
function initMap() 
{
    
    // Create a new google map centered on south station and with zoom of 11
    // (higher zoom means more zoomed in)
    map = new google.maps.Map(document.getElementById('map'), {
	    center: southStation,
	    zoom: 11
        });

    // Create station marker for each type of station
    makeStationMarkers(stations);
    makeStationMarkers(orangeStations);
    makeStationMarkers(blueStations);
    makeStationMarkers(fairmountStations);
    makeStationMarkers(stations);

    infoWindow = new google.maps.InfoWindow;
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

    // Create geolocation marker at current position
    // -If browser allows geolocation and location can be retrieved, call "locationcallback"
    // -Otherwise, show an error message
    if (navigator.geolocation) 
    {
        navigator.geolocation.getCurrentPosition(locationCallback, locationErrorCallBack);
    } 
    else
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