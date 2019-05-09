<?php

$currency = $_REQUEST["option"];
$all_appids = $_REQUEST["appId"];

$steam_url = 'https://store.steampowered.com/api/appdetails?appids=';
if (strcmp($currency, "EUR") == 0) {
    $steam_url .= $all_appids . '&l=en&cc=fi';
} else if (strcmp($currency, "USD") == 0) {
    $steam_url .= $all_appids . '&l=en&cc=us';
} else if (strcmp($currency, "GBP") == 0) {
    $steam_url .= $all_appids . '&l=en&cc=gb';
} else if (strcmp($currency, "RUB") == 0) {
    $steam_url .= $all_appids . '&l=en&cc=ru';
} else if (strcmp($currency, "YEN") == 0) {
    $steam_url .= $all_appids . '&l=en&cc=jp';
} else {
    $steam_url .= $all_appids . '&l=en&cc=au';
}

$gameDetails_json = file_get_contents($steam_url);
$gameDetails_array = json_decode($gameDetails_json, true);

if ($gameDetails_array[$all_appids]["success"] === true) {
    if ($gameDetails_array[$all_appids]["data"]["type"] === "dlc" || $gameDetails_array[$all_appids]["data"]["type"] === "game" || $gameDetails_array[$all_appids]["data"]["type"] === "demo") {
        if ($gameDetails_array[$all_appids]["data"]["release_date"]["coming_soon"] === false) {
            if ($gameDetails_array[$all_appids]["data"]["is_free"] === false) {
                // Hakee pelin
                $game_info = array("priced", $gameDetails_array[$all_appids]["data"]["name"],
                    $gameDetails_array[$all_appids]["data"]["header_image"],
                    $gameDetails_array[$all_appids]["data"]["price_overview"],
                    $gameDetails_array[$all_appids]["data"]["genres"]);
                echo json_encode($game_info, JSON_UNESCAPED_UNICODE); // Lähettää pelin tiedot json muodossa.
            } else {
                // Hakee ilmaisen pelin
                $game_info = array("free", $gameDetails_array[$all_appids]["data"]["name"],
                    $gameDetails_array[$all_appids]["data"]["header_image"],
                    $gameDetails_array[$all_appids]["data"]["genres"]);
                echo json_encode($game_info, JSON_UNESCAPED_UNICODE);
            }
        } else {
            // Hakee pelin joka on "coming soon"
            $game_info = array($gameDetails_array[$all_appids]["data"]["name"],
                $gameDetails_array[$all_appids]["data"]["header_image"]);
            if (!isset($gameDetails_array[$all_appids]["data"]["price_overview"])) {
                array_push($game_info, $gameDetails_array[$all_appids]["data"]["genres"]);
                array_unshift($game_info, "coming");
            } else {
                array_push($game_info, $gameDetails_array[$all_appids]["data"]["price_overview"], $gameDetails_array[$all_appids]["data"]["genres"]);
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