<?php
class Conf
{
    private $_userdb;
    private $_passdb;
    private $_hostdb;
    private $_db;

    private $_portdb;
    static $_instance;

    private function __construct()
    {
        $cnfg = parse_ini_file(UTILS . "db.ini");
        $this->_userdb = $cnfg['DB_USERNAME'];
        $this->_passdb = $cnfg['DB_PASS'];
        $this->_hostdb = $cnfg['DB_HOST'];
        $this->_db = $cnfg['DB_NAME'];
        $this->_portdb = $cnfg['DB_PORT'];
    }

    public static function getInstance()
    {
        if (!(self::$_instance instanceof self))
            self::$_instance = new self();
        return self::$_instance;
    }

    public function getUserDB()
    {
        $var = $this->_userdb;
        return $var;
    }

    public function getHostDB()
    {
        $var = $this->_hostdb;
        return $var;
    }

    public function getPassDB()
    {
        $var = $this->_passdb;
        return $var;
    }

    public function getDB()
    {
        $var = $this->_db;
        return $var;
    }

    public function getPortDB()
    {
        $var = $this->_portdb;
        return $var;
    }
}
