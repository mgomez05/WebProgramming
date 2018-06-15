function parse()
{
    var xhttp = new XMLHttpRequest();

    var messages = document.getElementById("messages");

    xhttp.onreadystatechange = function() 
    {

        if (this.readyState == 4 && this.status == 200) 
        {
            console.log(xhttp.responseText);

        
            messages.innerHTML = xhttp.responseText;
        }
    };

    xhttp.open("GET", "data.json", true);

    xhttp.send();
}