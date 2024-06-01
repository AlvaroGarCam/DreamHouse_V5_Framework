<?php
// include_once ("model\db.class.singleton.php");
class cart_dao
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

    public function create_new_order($db, $username, $house_id)
    {
        $sql = "INSERT INTO orders (username, house_id, is_active) 
        VALUES ('$username', '$house_id', 1)";
        $stmt = $db->ejecutar($sql);
        return $stmt;
    }

    public function get_products($db, $house_id)
    {
        $sql = "SELECT products.* 
        FROM products  
        WHERE pet_id = (SELECT pet_id FROM products WHERE house_id = $house_id)
        AND (house_id is null);";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
    public function get_order($db, $username)
    {
        $sql = "SELECT * FROM orders
        WHERE username = '$username' AND is_active = 1";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }


    public function create_new_order_product($db, $order_id, $product_id, $product_quantity)
    {
        $sql = "INSERT INTO orders_products (order_id, product_id, quantity) 
        VALUES ('$order_id', '$product_id', '$product_quantity')";
        $stmt = $db->ejecutar($sql);
        return $stmt;
    }
    public function check_cart($db, $username)
    {
        $sql = "SELECT * FROM orders WHERE username = '$username' AND is_active = 1";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
    public function get_order_products($db, $house_id, $order_id)
    {
        $sql = "SELECT * FROM products 
        WHERE house_id = $house_id OR product_id IN (SELECT product_id FROM orders_products WHERE order_id = $order_id)";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }



}
?>