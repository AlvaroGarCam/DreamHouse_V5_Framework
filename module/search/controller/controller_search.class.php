<?php
class controller_search
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

    function load_types()
    {
        echo json_encode(common::load_model('search_model', 'load_types', null));
    }
    function search_pet()
    {
        $type_id = $_POST['type_id'] ?? null;
        echo json_encode(common::load_model('search_model', 'search_pet', $type_id));
    }


    function autocomplete()
    {
        $sdata = $_POST['sdata'] ?? null;
        echo json_encode(common::load_model('search_model', 'autocomplete', $sdata));
    }
}
?>