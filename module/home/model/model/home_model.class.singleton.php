<?php
// include_once ("module\home\model\BLL\home_bll.class.singleton.php");
class home_model
{

    private $bll;
    static $_instance;

    function __construct()
    {
        $this->bll = home_bll::getInstance();
    }

    public static function getInstance()
    {
        //return "hola getInstance home_model";
        if (!(self::$_instance instanceof self)) {
            //return "hola getInstance home_model, dentro del instanceof";
            self::$_instance = new self();
        }
        //return "hola getInstance home_model, después el instanceOf";
        return self::$_instance;
    }



    public function get_pets()
    {
        // return "Home model get pets";
        return $this->bll->get_pets_BLL();
    }

    public function get_types()
    {
        // return "Home model get types";
        return $this->bll->get_types_BLL();
    }

    public function get_operations()
    {
        // return "Home model get operations";
        return $this->bll->get_operations_BLL();
    }

    public function get_categories()
    {
        // return "Home model get operations";
        return $this->bll->get_categories_BLL();
    }

    public function get_cities()
    {
        // return "Home model get cities";
        return $this->bll->get_cities_BLL();
    }

    public function get_services()
    {
        // return "Home model get cities";
        return $this->bll->get_services_BLL();
    }
    // public function get_carrusel($array)
    // {
    //     return $this->bll->get_carrusel_BLL($array);
    // }

    // public function get_category()
    // {
    //     return $this->bll->get_category_BLL();
    // }

    // public function get_type()
    // {
    //     // return 'hola car type';
    //     return $this->bll->get_type_BLL();
    // }

}
?>