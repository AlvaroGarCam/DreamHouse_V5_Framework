<?php
class login_model
{
    private $bll;
    static $_instance;

    function __construct()
    {
        $this->bll = login_bll::getInstance();
    }

    public static function getInstance()
    {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function get_register($args)
    {
        return $this->bll->get_register_BLL($args);
    }

    public function get_login($args)
    {
        return $this->bll->get_login_BLL($args);
    }

    public function get_social_login($args)
    {
        return $this->bll->get_social_login_BLL($args);
    }

    public function get_verify_email($args)
    {
        return $this->bll->get_verify_email_BLL($args);
    }

    public function get_send_otp($args)
    {
        return $this->bll->get_send_otp_BLL($args);
    }

    public function get_recover_email($args)
    {
        return $this->bll->get_recover_email_BBL($args);
    }

    public function get_verify_token($args)
    {
        return $this->bll->get_verify_token_BLL($args);
    }

    public function get_new_password($args)
    {
        return $this->bll->get_new_password_BLL($args);
    }

    public function get_data_user($args)
    {
        return $this->bll->get_data_user_BLL($args);
    }

    public function get_control_activity()
    {
        return $this->bll->get_control_activity_BLL();
    }

    public function get_control_user($args)
    {
        return $this->bll->get_control_user_BLL($args);
    }

    public function get_refresh_token($args)
    {
        return $this->bll->get_refresh_token_BLL($args);
    }

    public function get_token_expires($args)
    {
        return $this->bll->get_token_expires_BLL($args);
    }

    public function get_control_expires_token($args)
    {
        return $this->bll->get_control_expires_token_BLL($args);
    }

}