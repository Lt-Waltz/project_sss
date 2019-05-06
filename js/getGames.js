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
};

function searchGames() {
    var select = document.getElementById("dropDownMenu");
    var option = select.options[select.selectedIndex].value;
    var searchQ = document.getElementById("searchField").value;

    ajaxRequest(option, searchQ);
}

var httpRequest;

function ajaxRequest(option, searchQ) {

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

    httpRequest.open("GET", "php/gameSearch.php?q=" + encodeURIComponent(searchQ) + "&option=" + option, false);
    httpRequest.send();
}

function addGameToList() {
    if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        console.log("Haku");
        console.log(httpRequest.responseText);
    } else if (httpRequest.readyState === 4 && httpRequest.status === 502) {
        console.log("hehe, haista vittu");
    }
    // TODO Tää funktio luo sen pelin siihen listaan.
}