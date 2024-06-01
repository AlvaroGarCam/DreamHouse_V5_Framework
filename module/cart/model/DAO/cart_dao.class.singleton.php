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
        $sql = "SELECT products.*, orders_products.quantity 
        FROM products
        JOIN orders_products ON products.product_id = orders_products.product_id
        WHERE orders_products.order_id = $order_id
        UNION
        select PRODUCTS.*,1 
        FROM PRODUCTS
        WHERE HOUSE_ID = $house_id;";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function check_stock($db, $product_id)
    {
        $sql = "SELECT stock FROM products WHERE product_id = $product_id";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function delete_orders_products($db, $order_id)
    {
        $sql = "DELETE FROM orders_products WHERE order_id = $order_id";
        $stmt = $db->ejecutar($sql);
        return $stmt;
    }
    public function delete_order($db, $order_id)
    {
        $sql = "DELETE FROM orders WHERE order_id = $order_id";
        $stmt = $db->ejecutar($sql);
        return $stmt;
    }

    public function update_product_quantity($db, $order_id, $product_id, $quantity)
    {
        $sql = "UPDATE orders_products 
                SET quantity = $quantity 
                WHERE order_id = $order_id 
                AND product_id = $product_id";
        $stmt = $db->ejecutar($sql);
        return $stmt;
    }

    public function update_order($db, $order_id, $username)
    {
        $sql = "UPDATE orders 
                SET is_active = 0 
                WHERE order_id = $order_id 
                AND username = '$username'
                AND is_active = 1";
        $stmt = $db->ejecutar($sql);
        return $stmt;
    }

    public function update_products_stock($db, $order_id)
    {
        $sql = "UPDATE products p
            JOIN orders_products op ON p.product_id = op.product_id
            SET p.stock = p.stock - op.quantity
            WHERE op.order_id = $order_id";
        $stmt = $db->ejecutar($sql);
        return $stmt;
    }

    public function create_pruchase($db, $username, $house_id, $total_price, $order_id)
    {
        $sql = "INSERT INTO purchases (username, house_id, total_price, order_id,date) 
                VALUES ('$username', $house_id, $total_price, $order_id, NOW())";
        $stmt = $db->ejecutar($sql);
        return $stmt;
    }
}
?>