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

    httpRequest.open("GET", "php/getAllGames.php", false);
    httpRequest.send();
    return false;
}

function searchGames() {
    var select = document.getElementById("dropDownMenu");
    var option = select.options[select.selectedIndex].value;
    var searchQ = document.getElementById("searchField").value;

    if(option === "search") {
        alert('Please select what type of search you are making with the "Search by" menu.');
    } else if(option === "name") {
        ajaxRequest(option, searchQ);
    } else {
        ajaxRequest(option, searchQ);
    }
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

    httpRequest.onreadystatechange = callback;

    httpRequest.open("GET", "php/gameSearch?option=" + option + "&q=" + searchQ);
    httpRequest.send();
}

function callback() {

}