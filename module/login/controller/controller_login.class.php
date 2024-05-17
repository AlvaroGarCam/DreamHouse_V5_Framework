<?php
class controller_login
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
        common::load_view('top_page_login.html', VIEW_PATH_LOGIN . 'login.html');
    }

    function register()
    {
        $username = $_POST['username_reg'] ?? '';
        $password = $_POST['passwd1_reg'] ?? '';
        $email = $_POST['email_reg'] ?? '';

        if (empty($username) || empty($password) || empty($email)) {
            echo json_encode(['error' => 'Missing required fields']);
            exit;
        }
        $result = common::load_model('login_model', 'get_register', [$username, $password, $email]);
        echo json_encode($result);
        exit;
    }

    function verify_email()
    {
        // echo json_encode('Hola verify');
        $verify = json_encode(common::load_model('login_model', 'get_verify_email', $_POST['token_email']));
        echo json_encode($verify);
    }


    // function recover_view()
    // {
    //     common::load_view('top_page_login.html', VIEW_PATH_LOGIN . 'recover_pass.html');
    // }

    // function login()
    // {
    //     echo json_encode(common::load_model('login_model', 'get_login', [$_POST['username'], $_POST['password']]));
    // }



    // function social_login()
    // {
    //     echo json_encode(common::load_model('login_model', 'get_social_login', [$_POST['id'], $_POST['username'], $_POST['email'], $_POST['avatar']]));
    // }


    // function send_recover_email()
    // {
    //     echo json_encode(common::load_model('login_model', 'get_recover_email', $_POST['email_forg']));
    // }

    // function verify_token()
    // {
    //     echo json_encode(common::load_model('login_model', 'get_verify_token', $_POST['token_email']));
    // }

    // function new_password()
    // {
    //     echo json_encode(common::load_model('login_model', 'get_new_password', [$_POST['token_email'], $_POST['password']]));
    // }

    // function logout()
    // {
    //     echo json_encode('Done');
    // }

    // function data_user()
    // {
    //     echo json_encode(common::load_model('login_model', 'get_data_user', $_POST['token']));
    // }

    // function activity()
    // {
    //     echo json_encode(common::load_model('login_model', 'get_activity'));
    // }

    // function controluser()
    // {
    //     echo json_encode(common::load_model('login_model', 'get_controluser', $_POST['token']));
    // }

    // function refresh_token()
    // {
    //     echo json_encode(common::load_model('login_model', 'get_refresh_token', $_POST['token']));
    // }

    // function token_expires()
    // {
    //     echo json_encode(common::load_model('login_model', 'get_token_expires', $_POST['token']));
    // }

    // function refresh_cookie()
    // {
    //     session_regenerate_id();
    // }

}

?>