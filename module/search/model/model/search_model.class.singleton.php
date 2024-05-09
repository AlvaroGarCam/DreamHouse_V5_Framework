<?php
class search_model
{
    private $bll;
    static $_instance;

    function __construct()
    {
        $this->bll = search_bll::getInstance();
    }

    public static function getInstance()
    {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function load_types()
    {
        return $this->bll->load_types_BLL();
    }

    public function search_pet($type_id)
    {
        return $this->bll->search_pet_BLL($type_id);
    }

    public function autocomplete($sdata)
    {
        return $this->bll->autocomplete_BLL($sdata);
    }
}