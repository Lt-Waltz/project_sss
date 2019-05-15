<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Steam Sale Searcher</title>

    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

    <link rel="stylesheet" type="text/css" href="css/styles.css">
    <script type="text/javascript" src="js/getGames.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous" />

</head>
<body>
<?php
            // Initialize the session
            session_start();
            $username = $_SESSION["username"];
?>
<!-- navbar -->
<div class="navContainer">
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
        <a id="start"  class="navbar-brand" href="#">Searcher</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
                <a class="nav-item nav-link" href="#" id="home"><?php echo strtoupper($username) ?></a>
                <a class="nav-item nav-link" href="#" id='logout'>Logout</a>
            </div>
        </div>
    </nav>
    <!-- /navbar -->
<!-- /container -->
<div class="mainContainer">
    <img id="banner" src="images/Banner.png" alt="Banner">

    <div class="searchContainer">
        <form action="javascript:searchGames()">
            <input id="searchButton" type="submit" value="&#8981;">
            <input id="searchField" type="text" placeholder="Search games...">
            <select id="dropDownMenu">
                <option selected value="EUR">Euro</option>
                <option value="USD">US Dollar</option>
                <option value="GBP">GB Pound</option>
                <option value="RUB">Russian Ruble</option>
                <option value="YEN">Japanese Yen</option>
                <option value="AUD">Australian Dollar</option>
            </select>
        </form>
    </div>
    <div id="tableContainer">
        <table class="gamesContainer">
            <tr>
                <th class="none" id="name">Name &#9660;</th> <!-- Sort kun valittu, none kun ei, invert kun toiseen suuntaan valittu. -->
                <th class="sort" id="price">Price &#9660;</th>
                <th class="none" id="discount_percent">Discount Percentage &#9660;</th>
                <th class="none" id="discount_amount">Discount Amount &#9660;</th>
            </tr>
            <!-- Javascript tekee tähän listan peleistä-->
        </table>
    </div>


    <!-- jQuery & Bootstrap 4 JavaScript libraries -->
    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>

    <script>
        // jQuery codes
        $(document).ready(function() {
            $(document).on('click', '#start', function () {
                document.location.reload(true);
            });

// show home page
            $(document).on('click', '#home', function () {
                window.open("home.php");
            });


// logout the user
            $(document).on('click', '#logout', function () {
                window.open("logout.php");
            });
            });



    </script>


</div>
</body>
</html>