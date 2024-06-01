<?php
// include_once ("module\home\model\DAO\home_dao.class.singleton.php");
class cart_bll
{
	private $dao;
	private $db;
	static $_instance;

	function __construct()
	{
		$this->dao = cart_dao::getInstance();
		$this->db = db::getInstance();
	}

	public static function getInstance()
	{
		if (!(self::$_instance instanceof self)) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}


	public function get_check_cart_BLL($args)
	{
		$access_token = $args[0];
		$username = middleware::decode_username($access_token);

		if (!empty($this->dao->check_cart($this->db, $username))) {
			return 'User has an active cart';
		} else {
			return 'User has no active cart';
		}
	}

	public function get_create_order_BLL($args)
	{
		$access_token = $args[0];
		$username = middleware::decode_username($access_token);
		$house_id = $args[1];
		$products = $this->dao->get_products($this->db, $house_id);
		$order = $this->dao->create_new_order($this->db, $username, $house_id);
		$order_id = $this->dao->get_order($this->db, $username, $house_id);
		$order_id = $order_id[0]['order_id'];
		if ($products && $order) {
			foreach ($products as $product) {
				$product_id = $product['product_id'];
				$product_quantity = 0;
				$okkey = $this->dao->create_new_order_product($this->db, $order_id, $product_id, $product_quantity);
			}
			if ($okkey) {
				return ['Order created successfully'];
			} else {
				return ['Error creating new order product'];
			}
		} else {
			return ['Error creating new order'];
		}
	}

	public function get_load_cart_BLL($args)
	{
		$access_token = $args[0];
		$username = middleware::decode_username($access_token);
		$order = $this->dao->get_order($this->db, $username);
		$order_id = $order[0]['order_id'];
		$house_id = $order[0]['house_id'];
		$products = $this->dao->get_order_products($this->db, $house_id, $order_id);
		if ($products) {
			return ['Cart loaded successfully', $products];
		} else {
			return ['Error loading cart', null];
		}
	}
}
?>