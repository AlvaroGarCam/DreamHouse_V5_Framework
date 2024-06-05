<?php
class profile_model
{
    private $bll;
    static $_instance;

    function __construct()
    {
        $this->bll = profile_bll::getInstance();
    }

    public static function getInstance()
    {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function get_account_details($args)
    {
        return $this->bll->get_account_details_BLL($args);
    }

    public function get_purchases_details($args)
    {
        return $this->bll->get_purchases_details_BLL($args);
    }

    public function get_likes_details($args)
    {
        return $this->bll->get_likes_details_BLL($args);
    }

    public function edit_username($args)
    {
        return $this->bll->edit_username_BLL($args);
    }

    public function edit_email($args)
    {
        return $this->bll->edit_email_BLL($args);
    }

    public function edit_phone_number($args)
    {
        return $this->bll->edit_phone_number_BLL($args);
    }

    public function edit_password($args)
    {
        return $this->bll->edit_password_BLL($args);
    }
}