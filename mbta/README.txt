README for Lab 10 MBTA Map Part 2
--------------------------

For the second part of the MBTA lab, I added geolocation and infowindows to my map,
such that when a station marker is clicked it presents upcoming train information,
and when the current location marker is clicked, it shows the nearest station, the 
distance in miles to it, and a table of stations sorted by distance. It also
displays a polyline from the current location to the closest station.

Correctly Implemented Aspects
------------------------------
I have correctly implemented all aspects of the assignment. My web page determines the user's
location using the navigator.geolocation object and displays a marker at the user's determined
location (and the marker is distinct from the station markers). When this marker is clicked,
it displays the closest station to the user and the user's distance in miles to that station. The 
web page also displays a polyline between the user and the closest station (my web page
displays the line when the marker is clicked, rather than when the page is loaded, as it
was left up to our discretion on a piazza discussion). The webpage also displays
an infowindow when a station marker is clicked, which shows upcoming trains for that station that is
parsed from json data from the JSON API https://defense-in-derpth.herokuapp.com/redline.

The web page also handles potential errors such as receiving an empty response from the json API (as is the
case with Wollaston station) and clicking on stations that don't have place_ids (as is the case with 
stations that aren't on the red line).

In addition, I have implemented one of the Going Beyond items in the spec -- when clicked, the current 
location marker now also displays a table of stations sorted by distance from the current location. However,
I have gone slightly "beyond" this as well, as it shows the sorted distances to all stations on the map,
not just red line stations.

Collaboration Notes
--------------------
I have not collaborated or discussed this assignment with anyone else.

Time Spent
-----------
The assignment took me roughly 8 hours (with much time spent trying to figure out how to figure out which station was associated with a given marker).


