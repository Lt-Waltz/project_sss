<?php

//$q = $_REQUEST["q"];
$currency = $_REQUEST["option"];
$appId = $_REQUEST["appId"];
/*
$games_json = file_get_contents("../data/allGames.json");
$games_array = json_decode($games_json, true);
$all_appids = array();

for ($i = 0; $i < count($games_array['applist']['apps']); $i++) {
    if (stripos($games_array['applist']['apps'][$i]['name'], $q) !== false) {
        array_push($all_appids, $games_array['applist']['apps'][$i]['appid']);
    }
}
*/
//for ($i = 0; $i < count($all_appids); $i++) {
    $steam_url = 'https://store.steampowered.com/api/appdetails?appids=';
    if (strcmp($currency, "EUR") == 0) {
        $steam_url .= $appId . '&l=en&cc=fi';
    } else if (strcmp($currency, "USD") == 0) {
        $steam_url .= $appId . '&l=en&cc=us';
    } else if (strcmp($currency, "GBP") == 0) {
        $steam_url .= $appId . '&l=en&cc=gb';
    } else if (strcmp($currency, "RUB") == 0) {
        $steam_url .= $appId . '&l=en&cc=ru';
    } else if (strcmp($currency, "YEN") == 0) {
        $steam_url .= $appId . '&l=en&cc=jp';
    } else {
        $steam_url .= $appId . '&l=en&cc=au';
    }

    sleep(1);
    $gameDetails_json = file_get_contents($steam_url);
    $gameDetails_array = json_decode($gameDetails_json, true);

    if ($gameDetails_array[$appId]["success"] === true) {
        if ($gameDetails_array[$appId]["data"]["type"] === "dlc" || $gameDetails_array[$appId]["data"]["type"] === "game" || $gameDetails_array[$appId]["data"]["type"] === "demo") {
            if ($gameDetails_array[$appId]["data"]["release_date"]["coming_soon"] === false) {
                if ($gameDetails_array[$appId]["data"]["is_free"] === false) {
                    // Hakee pelin
                    $game_info = array("priced", $gameDetails_array[$appId]["data"]["name"],
                        $gameDetails_array[$appId]["data"]["header_image"],
                        $gameDetails_array[$appId]["data"]["price_overview"],
                        $gameDetails_array[$appId]["data"]["genres"]);
                    echo json_encode($game_info, JSON_UNESCAPED_UNICODE); // Lähettää pelin tiedot json muodossa.
                } else {
                    // Hakee ilmaisen pelin
                    $game_info = array("free", $gameDetails_array[$appId]["data"]["name"],
                        $gameDetails_array[$appId]["data"]["header_image"],
                        $gameDetails_array[$appId]["data"]["genres"]);
                    echo json_encode($game_info, JSON_UNESCAPED_UNICODE);
                }
            } else {
                // Hakee pelin joka on "coming soon"
                $game_info = array($gameDetails_array[$appId]["data"]["name"],
                    $gameDetails_array[$appId]["data"]["header_image"]);
                if (!isset($gameDetails_array[$appId]["data"]["price_overview"])) {
                    array_push($game_info, $gameDetails_array[$appId]["data"]["genres"]);
                    array_unshift($game_info, "coming");
                } else {
                    array_push($game_info, $gameDetails_array[$appId]["data"]["price_overview"], $gameDetails_array[$appId]["data"]["genres"]);
                    array_unshift($game_info, "coming_priced");
                }
                echo json_encode($game_info, JSON_UNESCAPED_UNICODE);
            }
        } else {
            echo '["not a game"]';
        }
    } else {
        echo '["not a game"]';
    }
//}