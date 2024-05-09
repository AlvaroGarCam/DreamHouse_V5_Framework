<?php
class shop_model
{
    private $bll;
    static $_instance;

    function __construct()
    {
        $this->bll = shop_bll::getInstance();
    }

    public static function getInstance()
    {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function get_filters()
    {
        return $this->bll->get_filters_BLL();
    }

    public function details($house_id)
    {
        return $this->bll->details_BLL($house_id);
    }

    public function list($pagina)
    {
        return $this->bll->list_BLL($pagina);
    }

    public function pagination($filters_shop)
    {
        return $this->bll->pagination_BLL($filters_shop);
    }
    public function filters_shop($array)
    {
        return $this->bll->filters_shop_BLL($array);
    }
    public function count_related_houses($array)
    {
        return $this->bll->count_related_houses_BLL($array);
    }
    public function related_houses($array)
    {
        return $this->bll->related_houses_BLL($array);
    }

}
?>