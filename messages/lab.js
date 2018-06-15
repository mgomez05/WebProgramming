function parse()
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() 
    {

        if (this.readyState == 4 && this.status == 200) 
        {
            console.log(xhttp.responseText);
            document.getElementById("messages").innerHTML = xhttp.responseText;
        }
    };

    xhttp.open("GET", "data.json", true);

    xhttp.send();
}