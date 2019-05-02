<?php

$steam_url = "http://api.steampowered.com/ISteamApps/GetAppList/v2";
$games_json = file_get_contents($steam_url);
file_put_contents("../data/allGames.json", $games_json);