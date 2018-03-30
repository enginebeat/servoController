//var d = new Date();
//document.getElementById("bV_Value").innerHTML = d.toLocaleTimeString();

var myVar = setInterval(myTimer, 1000);

function myTimer() {
    var d = new Date();
    document.getElementById("bV_Value").innerHTML = d.toLocaleTimeString();
}
