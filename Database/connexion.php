<?php

function connexion_bdd(){

    $dbName = "#";
          $port = "#";
          $host = "#";
          $login ="#";
          $password = "#";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbName;chartset=utf8","$login", "$password");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    return $pdo;
    }
catch (PDOException $e) {
    echo "Erreur de connexion : " . $e->getMessage();
}
}

function is_user($pseudo_post): bool
{
    $pdo = connexion_bdd();
    $request = $pdo->prepare("SELECT * FROM user WHERE pseudo = ?");
    $request->execute([$pseudo_post]);
    $result = $request->fetch();

    if($result == null) {
        return false;
    } else {
        return true;
    }

}

function get_user($pseudo_post) {
    $pdo = connexion_bdd();
    $request = $pdo->prepare("SELECT * FROM user WHERE pseudo = ?");
    $request->execute([$pseudo_post]);
    $result = $request->fetch();

    if($result == null) {
        return false;
    } else {
        return $result;
    }

}

function insert($set_arr, $values_arr, $table_str) {

    if(!isset($pdo)){
        $pdo = connexion_bdd();
    }

    $set_string = "";

    foreach ($set_arr as $value) {
        $new_element = "$value = ?";
        $set_string .= $new_element;
    }

    $request = $pdo->prepare("INSERT INTO $table_str SET $set_string");
    $request->execute($values_arr);

}

function update($set_arr, $values_arr, $table_str, $request_element, $request_value) {

    if(!isset($pdo)){
        $pdo = connexion_bdd();
    }

    $values_arr[] = $request_value;

    $set_string = "";

    foreach ($set_arr as $value) {
        $new_element = "$value = ?";
        $set_string .= $new_element;
    }

    $request = $pdo->prepare("UPDATE $table_str SET $set_string WHERE $request_element = ?");
    $request->execute($values_arr);
}

function delete($table_str, $request_element, $request_value, $image_slug = null, $image_field = null) {
    //Gestion des erreurs par try and catch
    try {
        // Design pattern : singleton
        if(!isset($pdo)){
            $pdo = connexion_bdd();
        }

        // Si il y a une image, unlink de l'image
        if($image_slug && $image_field) {
            $request = $pdo->prepare("SELECT * FROM $table_str WHERE $request_element = ?");
            $request->execute([$request_value]);
            $result = $request->fetch();
            unlink(($image_slug . $result[$image_field]) );
        }

        //Supression de l'??lement
        $request = $pdo->prepare("DELETE FROM $table_str WHERE $request_element = ?");
        $request->execute([$request_value]);

    } catch (PDOException $error) {
        echo "Erreur : " . $error;
    }
}

function create_table($table_name, $column_arr, $foreign_key_arr) {

    // column_arr est un tableau de tableaux, chaque tableau enfant renvoyant ?? un champ sous la forme
    // [nomDuChamp, typeDeDonn??esDuChamp, NePeutPasEtreNull]

    try {
        // Design pattern : singleton
        if(!isset($pdo)){
            $pdo = connexion_bdd();
        }

        $table_id = $table_name . "ID";

        // Premier champ avec id
        $table_fields = "$table_id int NOT NULL,";

        // Preparation des champs et des types de donn??es
        foreach ($column_arr as $key => $value) {
            $table_fields .= $value[0] . " " . $value[1];
            if($value[2]) {
                $table_fields .= "NOT NULL";
            }
            if(count($column_arr) !== ($key+1) ) {
                $table_fields .= ",";
            }
        }

        $table_foreign_key = "";

        // Pr??paration des cl??s ??trang??res
        foreach ($foreign_key_arr as $key => $value) {
            if($key === 0) {
                $table_foreign_key .= ",";
            }

            $table_foreign_key .= "FOREIGN KEY ($value[0]) REFERENCES ($value[1])";


            if(count($foreign_key_arr) !== ($key+1) ) {
                $table_foreign_key .= ",";
            }
        }


        //Cr??ation du tableau
        $request = $pdo->execute("CREATE TABLE $table_name
            (
                $table_fields
            )
            ");

    } catch (PDOException $error) {
        echo "Erreur : " . $error;
    }

}

function delete_table($table_name) {

    try {
        // Design pattern : singleton
        if(!isset($pdo)){
            $pdo = connexion_bdd();
        }

        //Suppression du tableau
        $request = $pdo->execute("DROP TABLE $table_name");

    } catch (PDOException $error) {
        echo "Erreur : " . $error;
    }

}
