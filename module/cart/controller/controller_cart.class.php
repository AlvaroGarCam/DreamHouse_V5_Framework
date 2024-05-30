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

}
?>