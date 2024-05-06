<?php
class controller_home
{

	function view()
	{
		// echo '</br><h1 align="center">Hola view, DreamHouse_V5_Framework</h1>';
		common::load_view('top_page_home.html', VIEW_PATH_HOME . 'home.html');

	}
}
?>