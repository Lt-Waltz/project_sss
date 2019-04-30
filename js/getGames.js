function searchGames() {
    var select = document.getElementById("dropDownMenu");
    var option = select.options[select.selectedIndex].value;

    if(option === "search") {
        alert('Please select what type of search you are making with the "Search by" menu.');
    } else if(option === "name") {
        ajaxRequest(option);
    } else {
        ajaxRequest(option);
    }
}

function ajaxRequest(selection) {

}