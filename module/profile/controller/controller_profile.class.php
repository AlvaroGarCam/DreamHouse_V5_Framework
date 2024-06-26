<?php

// require 'utils/dompdf.inc.php';
// require 'utils/endroid_qr.inc.php';
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


    function upload_avatar()
    {

        if (isset($_FILES['avatar']) && isset($_POST['access_token'])) {

            $file = $_FILES['avatar'];

            $access_token = $_POST['access_token'];
            $username = middleware::decode_username($access_token);

            $file_name = $username . '_' . date('Y-m-d_H-i-s') . '_' . $file['name'];
            $file_path = SITE_ROOT . 'view/img/uploaded_files/avatar/' . $file_name;

            if (move_uploaded_file($file['tmp_name'], $file_path)) {
                echo json_encode(["Avatar subido correctamente", $file_path]);
            } else {
                echo json_encode('Error al subir el archivo');
            }
        } else {
            echo json_encode('No se recibió ningún archivo o token de acceso.');
        }
    }

    function update_avatar()
    {

        $access_token = $_POST['access_token'];
        $avatar = $_POST['relative_path'];
        echo json_encode(common::load_model('profile_model', 'update_avatar', [$access_token, $avatar]));
    }

    function pdf_data()
    {
        $access_token = $_POST['access_token'];
        $purchase_id = $_POST['purchase_id'];
        echo json_encode(common::load_model('profile_model', 'pdf_data', [$access_token, $purchase_id]));
    }

    function generate_pdf()
    {
        $house = $_POST['house'];
        $purchase = $_POST['purchase'];
        $products = $_POST['products'];
        echo json_encode(PDF::createDompdf($purchase, $products, $house));
    }

    function generate_qr()
    {
        $pdf_url = $_POST['pdf_url'];
        echo json_encode(QR::createQr($pdf_url));
    }

    function remove_like_profile()
    {
        $access_token = $_POST['access_token'];
        $house_id = $_POST['house_id'];
        echo json_encode(common::load_model('profile_model', 'remove_like_profile', [$access_token, $house_id]));
    }
}

?>