<?php

if(isset($_POST) && isset($_POST["pseudo"]) && isset($_POST["password"])){


    if(is_user($_POST["pseudo"])){

        $user = get_user($_POST["pseudo"]);

        if(password_verify($_POST["password"],$user['password'])) {
            try {
                $_SESSION['auth'] = $user;
                $_SESSION['connexion'] = "Connexion réussie";
                header('Location: /php/actionplaceforpp.php');
                exit();
            } catch (Exception $error) {
                echo $error;
            }

        } else {
            $_SESSION['connexion'] = "password is invalid";
        }

    }
}