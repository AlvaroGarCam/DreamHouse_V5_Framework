<?php
// include_once ("module\home\model\BLL\home_bll.class.singleton.php");
class cart_model
{

    private $bll;
    static $_instance;

    function __construct()
    {
        $this->bll = cart_bll::getInstance();
    }

    public static function getInstance()
    {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }



    public function get_check_cart($args)
    {
        return $this->bll->get_check_cart_BLL($args);
    }

    public function get_create_order($args)
    {
        return $this->bll->get_create_order_BLL($args);
    }

    public function get_load_cart($args)
    {
        return $this->bll->get_load_cart_BLL($args);
    }

    public function get_check_stock($args)
    {
        return $this->bll->get_check_stock_BLL($args);
    }

    public function get_delete_order($args)
    {
        return $this->bll->get_delete_order_BLL($args);
    }

    public function get_update_product_quantity($args)
    {
        return $this->bll->get_update_product_quantity_BLL($args);
    }

    public function get_details_order($args)
    {
        return $this->bll->get_details_order_BLL($args);
    }

    public function get_purchase($args)
    {
        return $this->bll->get_purchase_BLL($args);
    }
}
?>