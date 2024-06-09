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

    public function disable_user($db, $username)
    {
        $sql = "UPDATE user SET is_active = 0, email='' WHERE username = '$username'";
        $db->ejecutar($sql);
        return;
    }

    public function create_new_user($db, $user, $new_username)
    {
        $email = $user[0]['email'];
        $phone_number = $user[0]['phone_number'];
        $password = $user[0]['password'];
        $avatar = $user[0]['avatar'];

        $sql = "INSERT INTO user (username, email, phone_number, password, is_active,avatar,type_user) 
        VALUES ('$new_username','$email', '$phone_number', '$password', 1,'$avatar','client')";
        $db->ejecutar($sql);
        return;
    }

    public function register_change($db, $username, $new_username)
    {
        $sql = "INSERT INTO username_changes (old_username, new_username, data) VALUES ('$username', '$new_username', NOW())";
        $db->ejecutar($sql);
        return;
    }

    public function update_user_likes($db, $username, $new_username)
    {
        $sql = "UPDATE likes SET username = '$new_username' WHERE username = '$username'";
        $db->ejecutar($sql);
        return;
    }

    public function update_user_orders($db, $username, $new_username)
    {
        $sql = "UPDATE orders SET username = '$new_username' WHERE username = '$username'";
        $db->ejecutar($sql);
        return;
    }

    public function update_user_purchases($db, $username, $new_username)
    {
        $sql = "UPDATE purchases SET username = '$new_username' WHERE username = '$username'";
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

    public function get_purchase($db, $username, $purchase_id)
    {
        $sql = "SELECT * FROM purchases WHERE purchase_id = '$purchase_id' AND username = '$username'";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function get_products($db, $order_id)
    {
        $sql = "SELECT products.*, orders_products.quantity 
        FROM orders_products 
        INNER JOIN products
        WHERE order_id = '$order_id'
        AND products.product_id = orders_products.product_id;";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function get_house_purchase($db, $house_id)
    {
        $sql = "SELECT * FROM products WHERE house_id = '$house_id'";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function remove_like_profile($db, $username, $house_id)
    {
        $sql = "DELETE FROM likes WHERE username = '$username' AND house_id = '$house_id'";
        $result = $db->ejecutar($sql);
        if ($result) {
            return $result;
        } else {
            return 'error';
        }
    }
}


?>