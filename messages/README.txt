README for Messages part 2
------------------

For this assignment, I made a website which sends an XmlHTTPRequest upon loading in order to receive json messaging data. The message was then parsed and displayed on the page in the inner html of the messages div. I also used some CSS styling to make things more interesting.

Correctly Implemented Aspects
-------------------------------
As requested in the assignment, I downloaded the messages.zip file, expanded it, and modified the lab.js file to open the file using an XHR request, parse the JSON data, and output the messages in the messages section of the HTML. I did not modify the HTML file and did not use jQuery. I also took the liberty of modifying the CSS file to style the messages a bit more.

Collaboration with Others
----------------------------
I did not collaborate with anyone else on this assignment.

Time Spent
----------------
I spent roughly 4 hours on this assignment.

Part 2 Response:
-----------------
The index.html doesn't work on chrome or safari, but it does work on firefox. This should not work because it is considered a cross-origin error.

Part 3 Response:
-----------------
Modifying the data.json request to the uri https://messagehub.herokuapp.com/messages.json did not work. In fact, unlike in part 2, it did not work in any of the browsers I tested (safari, chrome, or firefox).

Red Question Response:
------------------------
It is not possible to request data from a different origin (such as the one located herokuuapp.com) using an XMLHTTPRequest because of the same origin policy. In order for two pages to have the same origin, they must use the same protocol, and have the same host and port number. You can also not request them from your local machine for this reason. The herokuapp website and localhost:8000 do not have the same origin, and similarly, https://messagehub.herokuapp.com/messages.json and localhost:8000 do not have the same origin. Thus, my website, which is hosted at localhost:8000, cannot request data from those sources.
