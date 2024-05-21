<?php
class login_dao
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
    public function select_user($db, $username, $email)
    {
        $sql = "SELECT * 
        FROM user
        WHERE username = '$username' 
        OR email = '$email'";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
    public function insert_user($db, $username_reg, $hashed_pass, $email_reg, $avatar)
    {

        $sql = "INSERT INTO user(`username`, `password`, `email`, `type_user`, `avatar`, `is_active`) 
            VALUES ( '$username_reg', '$hashed_pass', '$email_reg', 'client', '$avatar', 0);";

        $db->ejecutar($sql);
        return;
        // $stmt = $db->ejecutar($sql);
        // return $db->listar($stmt);
    }
    public function select_social_login($db, $id)
    {

        $sql = "SELECT * FROM users WHERE id='$id'";
        $stmt = $db->ejecutar($sql);

        return $db->listar($stmt);
    }

    public function insert_social_login($db, $id, $username, $email, $avatar)
    {

        $sql = "INSERT INTO users (id, username, password, email, user_type, avatar, token_email, activate)     
                VALUES ('$id', '$username', '', '$email', 'client', '$avatar', '', 1)";

        return $stmt = $db->ejecutar($sql);
    }

    public function select_verify_email($db, $username)
    {

        $sql = "SELECT * FROM user WHERE  username = '$username'";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function update_verify_email($db, $username)
    {
        $sql = "UPDATE user SET is_active = 1 WHERE username = '$username'";
        $stmt = $db->ejecutar($sql);
        return;
    }

    public function select_recover_password($db, $email)
    {
        $sql = "SELECT username FROM `user` WHERE email = '$email' AND password NOT LIKE ('') AND is_active = 1";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
    public function update_recover_password($db, $email, $token)
    {
        // Primer update
        $sql1 = "UPDATE `user` SET `token_email` = '$token' WHERE `email` = '$email'";
        $stmt1 = $db->ejecutar($sql1);

        if ($stmt1) {
            // Segundo update
            $sql2 = "UPDATE `user` SET `is_active` = 0 WHERE `email` = '$email'";
            $stmt2 = $db->ejecutar($sql2);

            // Verifica si el segundo update fue exitoso
            if ($stmt2) {
                return "ok";
            } else {
                return "The second update failed.";
            }
        } else {
            return "The first update failed.";
        }
    }




    public function update_new_passwoord($db, $username, $password)
    {
        $sql = "UPDATE `user` SET `password`= '$password', `token_email`= '', is_active = 1 WHERE `username` = '$username'";
        $stmt = $db->ejecutar($sql);
        return "ok";
    }
    public function select_data_user($db, $username)
    {

        $sql = "SELECT * FROM user WHERE username = '$username'";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

}

?>