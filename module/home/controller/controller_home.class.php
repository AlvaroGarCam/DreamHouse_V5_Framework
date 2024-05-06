<?php
class controller_home
{

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
}
?>