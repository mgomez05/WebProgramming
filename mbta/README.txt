README for Lab 10 MBTA Map Part 2
--------------------------

For the second part of the MBTA lab, I added geolocation and infowindows to my map,
such that when a station marker is clicked it presents upcoming train information,
and when the current location marker is clicked it shows the nearest station
and the distance in miles to it, as well as a polyline connecting
the current location to the closest station.

Correctly Implemented Aspects
------------------------------
I have correctly implemented all aspects of the assignment. My web page determines the user's
location using the navigator.geolocation object and displays a marker at the user's determined
location (and the marker is distinct from the station markers). When this marker is clicked,
it displays the closest station to the user and the distance in miles from the current location
to that station. The web page also displays a polyline between the user and the closest station 
(however, mine does so when the marker is clicked, rather than when the page is loaded, as it
was left up to my discretion on a piazza discussion). And finally, the webpage also displays
an infowindow when a station marker is clicked that displays parsed json information from the JSON API
https://defense-in-derpth.herokuapp.com/redline indicating upcoming trains for that station.

The web page also handles potential errors such as receiving an empty response from the json API (as is the
case with Wollaston station) and clicking on stations that don't have place_ids (as is the case with 
stations that aren't on the red line).

Collaboration Notes
--------------------
I have not collaborated or discussed this assignment with anyone else.

Time Spent
-----------
The assignment took me roughly 8 hours (with much time spent trying to figure out how to figure out which station was associated with a given marker).


