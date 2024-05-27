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

    function recover_view()
    {
        common::load_view('top_page_login.html', VIEW_PATH_LOGIN . 'recover_pass.html');
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
    function send_recover_email()
    {
        $email_recover = $_POST['email_recover'] ?? '';
        if (empty($email_recover)) {
            echo json_encode('Email has not been correctly sent');
            exit;
        } else {
            echo json_encode(common::load_model('login_model', 'get_recover_email', $email_recover));
        }
    }
    function verify_token()
    {
        // echo json_encode($_POST['token_email']);
        echo json_encode(common::load_model('login_model', 'get_verify_token', $_POST['token_email']));
    }

    function new_password()
    {
        // echo json_encode('Hola new password');
        echo json_encode(common::load_model('login_model', 'get_new_password', [$_POST['token_email'], $_POST['password']]));
    }

    function login()
    {
        // echo json_encode('Hola login php');

        $username = $_POST['username_log'];
        $password = $_POST['passwd_log'];
        // echo json_encode($otp_token);
        echo json_encode(common::load_model('login_model', 'get_login', [$username, $password]));
    }


    function data_user()
    {
        // echo json_encode('Hola data_user php');
        // echo json_encode($_POST['access_token']);
        echo json_encode(common::load_model('login_model', 'get_data_user', $_POST['access_token']));
    }

    function logout()
    {
        unset($_SESSION['username']);
        unset($_SESSION['tiempo']);
        session_destroy();
        echo json_encode('Done');
    }


    function send_otp()
    {
        $username = $_POST['username'];
        $otp = $_POST['otp'];
        // echo json_encode($otp);
        // echo json_encode($username);
        echo json_encode(common::load_model('login_model', 'get_send_otp', [$username, $otp]));
    }

    function control_user()
    {
        $access_token = $_POST['access_token'];
        // echo json_encode('Hola control_user php');
        echo json_encode(common::load_model('login_model', 'get_control_user', $access_token));
    }

    function control_expires_token()
    {
        $access_token = $_POST['access_token'];
        $refresh_token = $_POST['refresh_token'];
        // echo json_encode('Hola control_expires_token php');
        echo json_encode(common::load_model('login_model', 'get_control_expires_token', [$access_token, $refresh_token]));
    }


    function control_activity()
    {
        // echo json_encode('Hola control_activity php');
        echo json_encode(common::load_model('login_model', 'get_control_activity', null));
    }
    function refresh_cookie()
    {
        session_regenerate_id();
        return 'Done';
    }
    function social_login()
    {
        // echo json_encode("Hola social login");
        echo json_encode(common::load_model('login_model', 'get_social_login', $_POST['social_user']));
    }


}

?>