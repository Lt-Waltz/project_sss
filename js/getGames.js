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
    var oldGames = document.getElementsByClassName("searchResultContainer");
    while (oldGames[0]) {
        oldGames[0].parentNode.removeChild(oldGames[0]);
    }
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
        if (theAppIds[0] != 0) {
            ajaxRequest(currency, theAppIds[currentId], true);
        } else {
            alert("No results");
        }
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
    if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        var game_info = JSON.parse(httpRequest.responseText);
        console.log(game_info); // Tässä tekee sen pelin login sijasta.

        if (game_info[0] !== "not a game" && game_info[0] !== "no price") {
            var tr = document.createElement("tr");
            tr.className = "searchResultContainer";
            var td = document.createElement("td"); // colspan="4"
            td.setAttribute("colspan", "4");

            var game_url = 'https://store.steampowered.com/app/';
            var game_name_url = game_info[1].replace(/[ ]+/g, '_');
            game_name_url = game_name_url.replace(/[^a-zA-Z0-9_]+/g, '');

            if (game_info[0] == "priced") {
                game_url += game_info[5] + '/' + game_name_url + '/';
                var header = document.createElement("img"); // src= game_info...
                header.src = game_info[2];
                header.alt = "header image";
                var div1 = document.createElement("div");
                div1.className = "nameContainer";
                var name = document.createElement("h2");
                name.innerText = game_info[1]; // Pelin nimi.
                var genres = document.createElement("p");
                var genresText = "";
                for (var i=0; i<game_info[4].length; i++) {
                    if (i==game_info[4].length-1) {
                        genresText += game_info[4][i]["description"];
                    } else {
                        genresText += game_info[4][i]["description"] + ", ";
                    }
                }
                genres.innerText = genresText; //Pelin genret.
                div1.appendChild(name);
                div1.appendChild(genres);
                var div2 = document.createElement("div");
                div2.className = "priceContainer";
                if (game_info[3]["discount_percent"] != 0) {
                    var discount = document.createElement("p");
                    discount.className = "discountPercentage";
                    discount.innerText = "-" + game_info[3]["discount_percent"] + "%"; // Alennusprosentti. (jos on)
                    var price = document.createElement("p");
                    price.innerHTML = "<s>" + game_info[3]["initial_formatted"] + "</s></br>" + game_info[3]["final_formatted"]; // Hinta (hinta alennuksella jos on)
                    div2.appendChild(discount);
                } else {
                    var price = document.createElement("p");
                    price.innerText = game_info[3]["final_formatted"];
                }
                price.className = "discountPrice";
                div2.appendChild(price);
                td.appendChild(header);
                td.appendChild(div1);
                td.appendChild(div2);
            } else if (game_info[0] == "priced genreless") {
                game_url += game_info[4] + '/' + game_name_url + '/';
                var header = document.createElement("img"); // src= game_info...
                header.src = game_info[2];
                header.alt = "header image";
                var div1 = document.createElement("div");
                div1.className = "nameContainer";
                var name = document.createElement("h2");
                name.innerText = game_info[1]; // Pelin nimi.
                div1.appendChild(name);
                var div2 = document.createElement("div");
                div2.className = "priceContainer";
                if (game_info[3]["discount_percent"] != 0) {
                    var discount = document.createElement("p");
                    discount.className = "discountPercentage";
                    discount.innerText = "-" + game_info[3]["discount_percent"] + "%"; // Alennusprosentti. (jos on)
                    var price = document.createElement("p");
                    price.innerHTML = "<s>" + game_info[3]["initial_formatted"] + "</s></br>" + game_info[3]["final_formatted"]; // Hinta (hinta alennuksella jos on)
                    div2.appendChild(discount);
                } else {
                    var price = document.createElement("p");
                    price.innerText = game_info[3]["final_formatted"];
                }
                price.className = "discountPrice";
                div2.appendChild(price);
                td.appendChild(header);
                td.appendChild(div1);
                td.appendChild(div2);
            } else if (game_info[0] == "free") {
                game_url += game_info[4] + '/' + game_name_url + '/';
                var header = document.createElement("img"); // src= game_info...
                header.src = game_info[2];
                header.alt = "header image";
                var div1 = document.createElement("div");
                div1.className = "nameContainer";
                var name = document.createElement("h2");
                name.innerText = game_info[1]; // Pelin nimi.
                var genres = document.createElement("p");
                var genresText = "";
                for (var i=0; i<game_info[3].length; i++) {
                    if (i==game_info[3].length-1) {
                        genresText += game_info[3][i]["description"];
                    } else {
                        genresText += game_info[3][i]["description"] + ", ";
                    }
                }
                genres.innerText = genresText; //Pelin genret.
                div1.appendChild(name);
                div1.appendChild(genres);
                var div2 = document.createElement("div");
                div2.className = "priceContainer";
                var price = document.createElement("p");
                price.className = "discountPrice";
                price.innerText = "Free"; // Hinta (hinta alennuksella jos on)
                div2.appendChild(price);
                td.appendChild(header);
                td.appendChild(div1);
                td.appendChild(div2);
            } else if (game_info[0] == "free genreless") {
                game_url += game_info[3] + '/' + game_name_url + '/';
                var header = document.createElement("img"); // src= game_info...
                header.src = game_info[2];
                header.alt = "header image";
                var div1 = document.createElement("div");
                div1.className = "nameContainer";
                var name = document.createElement("h2");
                name.innerText = game_info[1]; // Pelin nimi.
                div1.appendChild(name);
                var div2 = document.createElement("div");
                div2.className = "priceContainer";
                var price = document.createElement("p");
                price.className = "discountPrice";
                price.innerText = "Free"; // Hinta (hinta alennuksella jos on)
                div2.appendChild(price);
                td.appendChild(header);
                td.appendChild(div1);
                td.appendChild(div2);
            } else if (game_info[0] == "coming priced") {
                game_url += game_info[5] + '/' + game_name_url + '/';
                var header = document.createElement("img"); // src= game_info...
                header.src = game_info[2];
                header.alt = "header image";
                var div1 = document.createElement("div");
                div1.className = "nameContainer";
                var name = document.createElement("h2");
                name.innerText = game_info[1]; // Pelin nimi.
                var genres = document.createElement("p");
                var genresText = "";
                for (var i=0; i<game_info[4].length; i++) {
                    if (i==game_info[4].length-1) {
                        genresText += game_info[4][i]["description"];
                    } else {
                        genresText += game_info[4][i]["description"] + ", ";
                    }
                }
                genres.innerText = genresText; //Pelin genret.
                div1.appendChild(name);
                div1.appendChild(genres);
                var div2 = document.createElement("div");
                div2.className = "priceContainer";
                if (game_info[3]["discount_percent"] != 0) {
                    var discount = document.createElement("p");
                    discount.className = "discountPercentage";
                    discount.innerText = "-" + game_info[3]["discount_percent"] + "%"; // Alennusprosentti. (jos on)
                    var price = document.createElement("p");
                    price.innerHTML = "<s>" + game_info[3]["initial_formatted"] + "</s></br>" + game_info[3]["final_formatted"]; // Hinta (hinta alennuksella jos on)
                    div2.appendChild(discount);
                } else {
                    var price = document.createElement("p");
                    price.innerText = game_info[3]["final_formatted"];
                }
                price.className = "discountPrice";
                div2.appendChild(price);
                td.appendChild(header);
                td.appendChild(div1);
                td.appendChild(div2);
            } else if (game_info[0] == "coming") {
                game_url += game_info[4] + '/' + game_name_url + '/';
                var header = document.createElement("img"); // src= game_info...
                header.src = game_info[2];
                header.alt = "header image";
                var div1 = document.createElement("div");
                div1.className = "nameContainer";
                var name = document.createElement("h2");
                name.innerText = game_info[1]; // Pelin nimi.
                var genres = document.createElement("p");
                var genresText = "";
                for (var i=0; i<game_info[3].length; i++) {
                    if (i==game_info[3].length-1) {
                        genresText += game_info[3][i]["description"];
                    } else {
                        genresText += game_info[3][i]["description"] + ", ";
                    }
                }
                genres.innerText = genresText; //Pelin genret.
                div1.appendChild(name);
                div1.appendChild(genres);
                var div2 = document.createElement("div");
                div2.className = "priceContainer";
                var price = document.createElement("p");
                price.className = "discountPrice";
                price.innerText = "Coming Soon"; // Hinta (hinta alennuksella jos on)
                div2.appendChild(price);
                td.appendChild(header);
                td.appendChild(div1);
                td.appendChild(div2);
            }
            name.setAttribute("title", game_info[1]);
            header.setAttribute("onclick", "window.open('" + game_url + "');");
            header.setAttribute("style", "cursor: pointer;");
            name.setAttribute("onclick", "window.open('" + game_url + "');");
            name.setAttribute("style", "cursor: pointer;");
            tr.appendChild(td);
            // TODO Lajittelu mekanismi tähän alle.
            var games = document.getElementsByClassName("searchResultContainer");
            if (games.length !== 0) {
                for (var i=0; i<games.length; i++) {
                    var game_name = games[i].querySelector("td > div.nameContainer > h2").textContent;
                    if (document.getElementsByClassName("1")[0].id === "name") {
                        if (games.length === 1) {
                            if (game_info[1].localeCompare(game_name) === 1) {
                                document.getElementsByClassName("gamesContainer")[0].insertBefore(tr, games[i].nextElementSibling);
                            } else {
                                document.getElementsByClassName("gamesContainer")[0].insertBefore(tr, games[i]);
                            }
                        } else {
                            if (game_info[1].localeCompare(game_name) === 1) {
                                document.getElementsByClassName("gamesContainer")[0].insertBefore(tr, games[i].nextElementSibling);
                            }
                            if (i === 0) {
                                if (game_info[1].localeCompare(game_name) === -1) {
                                    document.getElementsByClassName("gamesContainer")[0].insertBefore(tr, games[i]);
                                }
                            }
                        }
                    } else if (document.getElementsByClassName("1")[0].id === "price") {

                    } else if (document.getElementsByClassName("1")[0].id === "discount_percent") {

                    } else if (document.getElementsByClassName("1")[0].id === "discount_amount") {

                    }
                    
                }
            } else {
                document.getElementsByClassName("gamesContainer")[0].appendChild(tr);
            }
            //document.getElementsByClassName("searchResultContainer")[0].querySelector("td > div.nameContainer > h2").textContent;
            // localeCompare
            //document.getElementsByClassName("1")[0].id;
            //document.getElementsByClassName("searchResultContainer")[i]; (.length)

        } // Not a game tai hinnaton if-lauseen loppu
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