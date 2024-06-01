<?php
class controller_cart
{

	private static $_instance;

	// Constructor privado para prevenir la creación de instancias fuera de la clase
	private function __construct()
	{
		// Aquí puedes realizar cualquier inicialización necesaria
	}

	// Método para obtener la instancia única de la clase
	public static function getInstance()
	{
		if (!(self::$_instance instanceof self)) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	function view()
	{
		common::load_view('top_page_cart.html', VIEW_PATH_CART . 'cart.html');
	}


	function check_cart()
	{
		$access_token = $_POST['access_token'];
		echo json_encode(common::load_model('cart_model', 'get_check_cart', [$access_token]));
	}

	function create_order()
	{
		$access_token = $_POST['access_token'];
		$house_id = $_POST['house_id'];
		echo json_encode(common::load_model('cart_model', 'get_create_order', [$access_token, $house_id]));
	}
	function load_cart()
	{
		$access_token = $_POST['access_token'];
		echo json_encode(common::load_model('cart_model', 'get_load_cart', [$access_token]));
	}

}
?>