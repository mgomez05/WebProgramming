function parse()
{
    var xhttp = new XMLHttpRequest();

    var messages = document.getElementById("messages");

    xhttp.onreadystatechange = function() 
    {

        if (this.readyState == 4 && this.status == 200) 
        {
            console.log(xhttp.responseText);

            // Parse the JSON Data
            jsonParsed = JSON.parse(xhttp.responseText);

            // Put the JSON data in the messages innerHTML
            for (i = 0; i < jsonParsed.length; i++) 
            {
                      var message = jsonParsed[i].content;
                      var name    = jsonParsed[i].username;
                      
                      messages.innerHTML += "<p class='message'>" + message + " <span class='author'>" + name + "</span>" + "</p>";
            }
        
            //messages.innerHTML = xhttp.responseText;
        }
    };

    xhttp.open("GET", "data.json", true);

    xhttp.send();
}