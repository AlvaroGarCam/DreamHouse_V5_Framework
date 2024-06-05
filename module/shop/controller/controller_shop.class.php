<?php
class controller_shop
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
        // return ("Hola controller_shop.class");
        common::load_view('top_page_shop.html', VIEW_PATH_SHOP . 'shop.html');
    }

    function get_filters()
    {
        // echo json_encode("Hola get_filters_controller");
        echo json_encode(common::load_model('shop_model', 'get_filters', null));
    }

    function details()
    {
        $house_id = $_POST['house_id'];
        echo json_encode(common::load_model('shop_model', 'details', $house_id));
    }

    function list()
    {
        $pagina = $_POST['pagina'];
        echo json_encode(common::load_model('shop_model', 'list', $pagina));
    }

    function filters_shop()
    {
        $pagina = $_POST['pagina'];
        $filters_shop = $_POST['filters_shop'];
        echo json_encode(common::load_model('shop_model', 'filters_shop', [$filters_shop, $pagina]));
    }
    function pagination()
    {
        $filters_shop = isset($_POST['filters_shop']) ? $_POST['filters_shop'] : null;

        echo json_encode(common::load_model('shop_model', 'pagination', $filters_shop));
    }
    function count_related_houses()
    {
        $house_id = $_POST['house_id'];
        $pet_id = $_POST['pet_id'];

        echo json_encode(common::load_model('shop_model', 'count_related_houses', [$house_id, $pet_id]));
    }

    function related_houses()
    {
        $house_id = $_POST['house_id'];
        $pet_id = $_POST['pet_id'];
        $offset = $_POST['offset'];

        echo json_encode(common::load_model('shop_model', 'related_houses', [$house_id, $pet_id, $offset]));
    }

    function like_reactive()
    {
        $access_token = $_POST['access_token'];
        $house_id = $_POST['house_id'];
        echo json_encode(common::load_model('shop_model', 'like_reactive', [$access_token, $house_id]));
    }

    function click_like()
    {
        $access_token = $_POST['access_token'];
        $house_id = $_POST['house_id'];
        echo json_encode(common::load_model('shop_model', 'click_like', [$access_token, $house_id]));
    }

    function get_like_count()
    {
        $house_id = $_POST['house_id'];
        echo json_encode(common::load_model('shop_model', 'get_like_count', [$house_id]));
    }
}
?>