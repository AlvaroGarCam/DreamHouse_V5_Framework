<?php
class controller_home
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
		// echo '</br><h1 align="center">Hola view, DreamHouse_V5_Framework</h1>';
		common::load_view('top_page_home.html', VIEW_PATH_HOME . 'home.html');
	}
	function pets()
	{
		// echo json_encode("hola pets controller home");
		echo json_encode(common::load_model('home_model', 'get_pets', null));
	}

	function types()
	{
		// echo json_encode("hola types controller home");
		echo json_encode(common::load_model('home_model', 'get_types', null));
	}

	function operations()
	{
		// echo json_encode("hola operations controller home");
		echo json_encode(common::load_model('home_model', 'get_operations', null));
	}

	function categories()
	{
		// echo json_encode("hola categories controller home");
		echo json_encode(common::load_model('home_model', 'get_categories', null));
	}

	function cities()
	{
		// echo json_encode("hola categories controller home");
		echo json_encode(common::load_model('home_model', 'get_cities', null));
	}

	function services()
	{
		// echo json_encode("hola services controller home");
		echo json_encode(common::load_model('home_model', 'get_services', null));
	}
	function visited_houses()
	{
		$visited_houses = $_POST['visited_houses'];
		echo json_encode(common::load_model('home_model', 'visited_houses', $visited_houses));
	}

}
?>