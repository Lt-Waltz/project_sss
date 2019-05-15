function sortByName() {
    var nameClass = document.getElementById("name");
    var priceClass = document.getElementById("price");
    var percentClass = document.getElementById("discount_percent");
    var amountClass = document.getElementById("discount_amount");
    var table = document.getElementsByClassName("gamesContainer")[0];
    if (nameClass.className === "none") {
        nameClass.setAttribute("class", "sort");
        priceClass.setAttribute("class", "none"); percentClass.setAttribute("class", "none"); amountClass.setAttribute("class", "none");
        priceClass.innerHTML = "Price &#9660;"; percentClass.innerHTML = "Discount Percentage &#9660;"; amountClass.innerHTML = "Discount Amount &#9660;";


    } else if (nameClass.className === "sort") {
        nameClass.setAttribute("class", "invert");
        nameClass.innerHTML = "Name &#9650;";
        for (var i=1; i<table.childNodes.length; i++){
            table.insertBefore(table.childNodes[i], table.childNodes[2]);
        }
    } else { // On invert
        nameClass.setAttribute("class", "sort");
        nameClass.innerHTML = "Name &#9660;";
        for (var i=1; i<table.childNodes.length; i++){
            table.insertBefore(table.childNodes[i], table.childNodes[2]);
        }
    }
}

function sortByPrice() {
    var nameClass = document.getElementById("name");
    var priceClass = document.getElementById("price");
    var percentClass = document.getElementById("discount_percent");
    var amountClass = document.getElementById("discount_amount");
    var table = document.getElementsByClassName("gamesContainer")[0];
    if (priceClass.className === "none") {
        priceClass.setAttribute("class", "sort");
        nameClass.setAttribute("class", "none"); percentClass.setAttribute("class", "none"); amountClass.setAttribute("class", "none");
        nameClass.innerHTML = "Name &#9660;"; percentClass.innerHTML = "Discount Percentage &#9660;"; amountClass.innerHTML = "Discount Amount &#9660;";


    } else if (priceClass.className === "sort") {
        priceClass.setAttribute("class", "invert");
        priceClass.innerHTML = "Price &#9650;";
        for (var i=1; i<table.childNodes.length; i++){
            table.insertBefore(table.childNodes[i], table.childNodes[2]);
        }
    } else { // On invert
        priceClass.setAttribute("class", "sort");
        priceClass.innerHTML = "Price &#9660;";
        for (var i=1; i<table.childNodes.length; i++){
            table.insertBefore(table.childNodes[i], table.childNodes[2]);
        }
    }
}

function sortByDiscount() {
    var nameClass = document.getElementById("name");
    var priceClass = document.getElementById("price");
    var percentClass = document.getElementById("discount_percent");
    var amountClass = document.getElementById("discount_amount");
    var table = document.getElementsByClassName("gamesContainer")[0];
    if (percentClass.className === "none") {
        percentClass.setAttribute("class", "sort");
        priceClass.setAttribute("class", "none"); nameClass.setAttribute("class", "none"); amountClass.setAttribute("class", "none");
        priceClass.innerHTML = "Price &#9660;"; nameClass.innerHTML = "Name &#9660;"; amountClass.innerHTML = "Discount Amount &#9660;";


    } else if (percentClass.className === "sort") {
        percentClass.setAttribute("class", "invert");
        percentClass.innerHTML = "Discount Percentage &#9650;";
        for (var i=1; i<table.childNodes.length; i++){
            table.insertBefore(table.childNodes[i], table.childNodes[2]);
        }
    } else { // On invert
        percentClass.setAttribute("class", "sort");
        percentClass.innerHTML = "Discount Percentage &#9660;";
        for (var i=1; i<table.childNodes.length; i++){
            table.insertBefore(table.childNodes[i], table.childNodes[2]);
        }
    }
}

function sortByDiscountAmount() {
    var nameClass = document.getElementById("name");
    var priceClass = document.getElementById("price");
    var percentClass = document.getElementById("discount_percent");
    var amountClass = document.getElementById("discount_amount");
    var table = document.getElementsByClassName("gamesContainer")[0];
    if (amountClass.className === "none") {
        amountClass.setAttribute("class", "sort");
        priceClass.setAttribute("class", "none"); percentClass.setAttribute("class", "none"); nameClass.setAttribute("class", "none");
        priceClass.innerHTML = "Price &#9660;"; percentClass.innerHTML = "Discount Percentage &#9660;"; nameClass.innerHTML = "Name &#9660;";


    } else if (amountClass.className === "sort") {
        amountClass.setAttribute("class", "invert");
        amountClass.innerHTML = "Discount Amount &#9650;";
        for (var i=1; i<table.childNodes.length; i++){
            table.insertBefore(table.childNodes[i], table.childNodes[2]);
        }
    } else { // On invert
        amountClass.setAttribute("class", "sort");
        amountClass.innerHTML = "Discount Amount &#9660;";
        for (var i=1; i<table.childNodes.length; i++){
            table.insertBefore(table.childNodes[i], table.childNodes[2]);
        }
    }
}