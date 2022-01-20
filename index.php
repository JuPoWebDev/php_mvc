<?php
namespace App;


use AccueilController\AccueilController;
use AltoRouter;

require __DIR__ . "/Controllers/AccueilController.php";

require 'vendor/autoload.php';

$router = new AltoRouter();

$router->setBasePath('');

$router->map(
    'GET',
    "/",
    function() {
        $controller = new AccueilController();
        $controller->render();},
    "accueil");

$router->map(
    'GET',
    "/cv",
    function() {
    echo "Voici mon CV";},
    "cv");

$router->map(
    'GET',
    "/portfolio/[*:slug]",
    function($slug) {
        echo "Voici mon élement $slug de mon Portfolio";},
    "portfolio_element");


$match = $router->match();

// call closure or throw 404 status
if( is_array($match) && is_callable( $match['target'] ) ) {
    call_user_func_array( $match['target'], $match['params'] );
} else {
    // no route was matched
    echo "404";
}