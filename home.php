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
$username = strtoupper($_SESSION["username"]);
if (substr($username, -1) == "S") {
    $whose = "'";
}
else {
    $whose = "'S";
}
?>

<h1 id="homeheader"><?php echo $username . $whose?> HOME</h1>

<div class="row">
        <button type="button" class="btn btn-primary btn-block" onclick="resetpw()">Reset Password</button>
        <button type="button" class="btn btn-success btn-block" onclick="back()">Back</button>
        <button type="button" class="btn btn-danger btn-block" onclick="logout()">Logout</button>

</div>
<script>
    function logout() {
        window.open("logout.php");
    }
    function resetpw() {
        window.open("resetpassword.php");
    }
    function back() {
        window.open("searcher.php");
    }

</script>
</body>
</html>