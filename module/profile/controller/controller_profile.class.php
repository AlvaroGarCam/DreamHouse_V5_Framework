<?php
class controller_profile
{


    private static $_instance;

    // Constructor privado para prevenir la creación de instancias fuera de la clase
    private function __construct()
    {
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
        common::load_view('top_page_profile.html', VIEW_PATH_PROFILE . 'profile.html');
    }

    function account_details()
    {
        $access_token = $_POST['access_token'];
        echo json_encode(common::load_model('profile_model', 'get_account_details', [$access_token]));
    }

    function purchases_details()
    {
        $access_token = $_POST['access_token'];
        echo json_encode(common::load_model('profile_model', 'get_purchases_details', [$access_token]));
    }

    function likes_details()
    {
        $access_token = $_POST['access_token'];
        echo json_encode(common::load_model('profile_model', 'get_likes_details', [$access_token]));
    }

    function edit_username()
    {
        $access_token = $_POST['access_token'];
        $new_username = $_POST['new_username'];
        $password = $_POST['password'];
        echo json_encode(common::load_model('profile_model', 'edit_username', [$access_token, $new_username, $password]));
    }

    function edit_email()
    {
        $access_token = $_POST['access_token'];
        $new_email = $_POST['new_email'];
        $password = $_POST['password'];
        echo json_encode(common::load_model('profile_model', 'edit_email', [$access_token, $new_email, $password]));
    }

    function edit_phone_number()
    {
        $access_token = $_POST['access_token'];
        $new_phone_number = $_POST['new_phone_number'];
        $password = $_POST['password'];
        echo json_encode(common::load_model('profile_model', 'edit_phone_number', [$access_token, $new_phone_number, $password]));
    }

    function edit_password()
    {
        $access_token = $_POST['access_token'];
        $new_password = $_POST['new_password'];
        $current_password = $_POST['current_password'];
        echo json_encode(common::load_model('profile_model', 'edit_password', [$access_token, $new_password, $current_password]));
    }
}

?>