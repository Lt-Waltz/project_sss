<?php

$q = $_REQUEST["q"];

$games_json = file_get_contents("../data/allGames");
$games_array = json_decode($games_json, true);

for ($i = 0; $i < count($games_array['applist']['apps']); $i++) {
    if (strpos($games_array['applist']['apps'][$i]['name'], 'test') !== false) {
        echo $games_array['applist']['apps'][$i]['name'];
    }
}