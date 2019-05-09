<?php

$q = $_REQUEST["q"];

$games_json = file_get_contents("../data/allGames.json");
$games_array = json_decode($games_json, true);
$all_appids = array();

for ($i = 0; $i < count($games_array['applist']['apps']); $i++) {
    if (stripos($games_array['applist']['apps'][$i]['name'], $q) !== false && count($all_appids) < 100) {
        array_push($all_appids, $games_array['applist']['apps'][$i]['appid']);
    }
}

if (empty($all_appids)) {
    array_push($all_appids, "0");
}

echo json_encode($all_appids);