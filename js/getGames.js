var httpRequest;
var idAmount = 0;
var currentId = 0;
var currency;
var theAppIds;

window.onload = function () {
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
    var searchQ = document.getElementById("searchField").value;

    appIds(searchQ);
    //ajaxRequest(option, searchQ);
}

function appIds(searchQ) {

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

    httpRequest.onreadystatechange = runAjax;
    httpRequest.open("GET", "php/getAppIds.php?q=" + encodeURIComponent(searchQ));
    httpRequest.send();
}

function runAjax() {
    if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        theAppIds = JSON.parse(httpRequest.responseText);
        idAmount = theAppIds.length;
        var select = document.getElementById("dropDownMenu");
        currency = select.options[select.selectedIndex].value;
        //console.log(theAppIds);
        ajaxRequest(currency, theAppIds[currentId], true);
    }
    if (httpRequest.readyState === 4 && httpRequest.status === 502) {
        alert("Search failed! Try again.\n(Blame Phpstorm for this...)");
    }
}

function ajaxRequest(option, appId, increment) {
    if (increment) {
        currentId++;
        idAmount--;
    }

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

    httpRequest.open("GET", "php/gameSearch.php?appId=" + appId + "&option=" + option);
    httpRequest.timeout = 2500;
    httpRequest.ontimeout = function () {
        console.log("Timed out! Haetaan uudestaan");
        ajaxRequest(currency, theAppIds[currentId-1], false);
    };
    httpRequest.send();
}

function addGameToList() {
    if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        console.log("Haku");
        /*var game_info = JSON.parse(httpRequest.responseText);
        console.log(game_info);*/
        console.log(httpRequest.responseText);
        if (idAmount > 0) {
            ajaxRequest(currency, theAppIds[currentId], true);
        }
    } else if (httpRequest.readyState === 4 && httpRequest.status === 502) {
        console.log("phpstorm vittuilee. haku ei onnistunut. Haetaan uudestaan");
        if (idAmount > 0) {
            ajaxRequest(currency, theAppIds[currentId-1], false);
        }
    }
    // TODO Tää funktio luo sen pelin siihen listaan.
}