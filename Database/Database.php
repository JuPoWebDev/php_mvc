<?php

namespace Database;



use PDO;
use PDOException;

class Database
{
    private $pdo = null;

    public function getConnexion() {
        if ($this->pdo) {
            return $this->pdo;
        }
        else {
            try {
                $this->pdo = new PDO("mysql:host=". Config::DB_HOST .";dbname=".Config::DB_NAME.";chartset=utf8",Config::DB_USER, Config::DB_PASSWORD);
                $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $this->pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
                return $this->pdo;
            }
            catch (PDOException $e) {
                return "Erreur de connexion : " . $e->getMessage();
            }
        }
    }

    public function is_user($pseudo): bool
    {
        try {
            $request = $this->getConnexion()->prepare("SELECT * FROM user WHERE pseudo = ?");
            $request->execute([$pseudo]);
            $result = $request->fetch();

            if($result === null) {
                return false;
            } else {
                return true;
            }
        } catch (PDOException $e) {
            return "Erreur de connexion : " . $e->getMessage();
        }
    }

    public function get_user($pseudo) {
        try {

            $request = $this->getConnexion()->prepare("SELECT * FROM user WHERE pseudo = ?");
            $request->execute([$pseudo]);
            $result = $request->fetch();

            if($result == null) {
                return false;
            } else {
                return $result;
            }
        } catch (PDOException $e) {
            return "Erreur de connexion : " . $e->getMessage();
        }
    }

    public function insert($set_arr, $values_arr, $table_str) {
        try {
            $set_string = "";

            foreach ($set_arr as $value) {
                $new_element = "$value = ?";
                $set_string .= $new_element;
            }

            $request = $this->getConnexion()->prepare("INSERT INTO $table_str SET $set_string");
            $request->execute($values_arr);
            return true;
        }
        catch (PDOException $e) {
            return "Erreur de connexion : " . $e->getMessage();
        }
    }

    public function update($set_arr, $values_arr, $table_str, $request_element, $request_value) {

        try {
            $values_arr[] = $request_value;

            $set_string = "";

            foreach ($set_arr as $value) {
                $new_element = "$value = ?";
                $set_string .= $new_element;
            }

            $request = $this->getConnexion()->prepare("UPDATE $table_str SET $set_string WHERE $request_element = ?");
            $request->execute($values_arr);
        }
        catch (PDOException $e) {
            return "Erreur de connexion : " . $e->getMessage();
        }
    }

    public function delete($table_str, $request_element, $request_value, $image_slug = null, $image_field = null) {
        //Gestion des erreurs par try and catch
        try {


            // Si il y a une image, unlink de l'image
            if($image_slug && $image_field) {
                $request = $this->getConnexion()->prepare("SELECT * FROM $table_str WHERE $request_element = ?");
                $request->execute([$request_value]);
                $result = $request->fetch();
                unlink(($image_slug . $result[$image_field]) );
            }

            //Supression de l'élement
            $request = $this->getConnexion()->prepare("DELETE FROM $table_str WHERE $request_element = ?");
            $request->execute([$request_value]);

        } catch (PDOException $error) {
            echo "Erreur : " . $error;
        }
    }



}