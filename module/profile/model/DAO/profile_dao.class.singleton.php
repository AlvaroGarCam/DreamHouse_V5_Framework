<?php
class profile_dao
{
    static $_instance;

    private function __construct()
    {
    }

    public static function getInstance()
    {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function get_account_details($db, $username)
    {
        $sql = "SELECT * FROM user WHERE username = '$username'";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function get_purchases_details($db, $username)
    {
        $sql = "SELECT * FROM purchases WHERE username = '$username'";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function get_likes_details($db, $username)
    {
        $sql = "SELECT house_id FROM likes WHERE username = '$username'";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function get_houses_from_likes($db, $username)
    {
        $sql = "SELECT * FROM products WHERE house_id IN (SELECT house_id FROM likes WHERE username = '$username')";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function verify_user($db, $username)
    {
        $sql = "SELECT * FROM user WHERE username = '$username' AND is_active= 1";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function check_new_username($db, $new_username)
    {
        $sql = "SELECT * FROM user WHERE username = '$new_username'";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function edit_username($db, $username, $new_username)
    {
        $sql = "UPDATE likes SET username = '$new_username' WHERE username = '$username'";
        $db->ejecutar($sql);
        $sql = "UPDATE purchases SET username = '$new_username' WHERE username = '$username'";
        $db->ejecutar($sql);
        $sql = "UPDATE orders SET username = '$new_username' WHERE username = '$username'";
        $db->ejecutar($sql);
        $sql = "UPDATE user SET username = '$new_username' WHERE username = '$username'";
        $db->ejecutar($sql);
        return;
    }

    public function check_new_email($db, $new_email)
    {
        $sql = "SELECT * FROM user WHERE email = '$new_email'";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function edit_email($db, $username, $new_email)
    {
        $sql = "UPDATE user SET email = '$new_email' WHERE username = '$username'";
        $db->ejecutar($sql);
        return;
    }

    public function edit_phone_number($db, $username, $new_phone_number)
    {
        $sql = "UPDATE user SET phone_number = '$new_phone_number' WHERE username = '$username'";
        $db->ejecutar($sql);
        return;
    }

    public function edit_password($db, $username, $new_password)
    {
        $sql = "UPDATE user SET password = '$new_password' WHERE username = '$username'";
        $db->ejecutar($sql);
        return;
    }
}


?>