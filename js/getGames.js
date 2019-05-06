window.onload = function () {
    var httpRequest;
    if (window.XMLHttpRequest) {
        httpRequest = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        try {
            httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e) {
            try {
                httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (e) {}
        }
    }

    httpRequest.open("GET", "php/getAllGames.php");
    httpRequest.send();
    return false;
}

function searchGames() {
    var select = document.getElementById("dropDownMenu");
    var option = select.options[select.selectedIndex].value;
    var searchQ = document.getElementById("searchField").value;

    ajaxRequest(option, searchQ);
}

function ajaxRequest(option, searchQ) {
    var httpRequest;
    if (window.XMLHttpRequest) {
        httpRequest = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        try {
            httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e) {
            try {
                httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (e) {}
        }
    }

    httpRequest.onreadystatechange = addGameToList;

    httpRequest.open("GET", "php/gameSearch?q=" + searchQ + "&option=" + option);
    httpRequest.send();
}

function addGameToList() {
    console.log("haettu!");
    // TODO Tää funktio luo sen pelin siihen listaan.
}