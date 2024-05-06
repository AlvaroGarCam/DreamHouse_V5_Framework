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