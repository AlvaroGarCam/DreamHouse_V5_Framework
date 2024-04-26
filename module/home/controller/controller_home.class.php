<?php
class controller_home
{

	function view()
	{
		echo '</br><h1 align="center">Hola view, DreamHouse_V5_Framework</h1>';
		//common::load_view('top_page_home.html', VIEW_PATH_HOME . 'home_list.html');
	}

	// function send_contact_us(){
	// 	$message = ['type' => 'contact',
	// 				'inputName' => $_POST['name'], 
	// 				'fromEmail' => $_POST['email'], 
	// 				'inputMatter' => $_POST['matter'], 
	// 				'inputMessage' => $_POST['message']];
	// 	$email = json_decode(mail::send_email($message), true);

	// 	if (!empty($email)) {
	// 		echo json_encode('Done!');
	// 		return;  
	// 	} else {
	// 		echo json_encode('Error!');
	// 	}
	// }
}
?>