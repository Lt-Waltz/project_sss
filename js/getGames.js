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
    httpRequest.timeout = 1500;
    httpRequest.ontimeout = function () {
        console.log("Timed out! Haetaan uudestaan.");
        ajaxRequest(currency, theAppIds[currentId-1], false);
    };
    httpRequest.send();
}

function addGameToList() {
    // TODO Tää funktio luo sen pelin siihen listaan.
    if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        var game_info = JSON.parse(httpRequest.responseText);
        console.log(game_info); // Tässä tekee sen pelin login sijasta.

        var tr = document.createElement("tr");
        var td = document.createElement("td"); // colspan="4"
        var header = document.createElement("img"); // height="100" width="auto" style="float: left" src= game_info...
        var div1 = document.createElement("div"); // style="overflow: hidden; margin-left: ~10px; width: 465px; (margin-right: 0px; padding-right: 0px;) float: left"
        var name = document.createElement("h2");
        name.innerText = ; // Pelin nimi. game_info...
        var genres = document.createElement("p");
        genres.innerText = ; //Pelin genret.
        var div2 = document.createElement("div"); // style="float: right; width: 265px; margin-top: ~30px"
        var discount = document.createElement("p");
        discount.innerText = ; // Alennusprosentti. (jos on)
        var price = document.createElement("");
        price.innerText = ; // Hinta (hinta alennuksella jos on)

        if (idAmount > 0) {
            ajaxRequest(currency, theAppIds[currentId], true);
        } else {
            currentId = 0;
        }
    } else if (httpRequest.readyState === 4 && httpRequest.status === 502) {
        console.log("Phpstorm vittuilee. Haku ei onnistunut. Haetaan uudestaan.");
        ajaxRequest(currency, theAppIds[currentId-1], false);
    }
}