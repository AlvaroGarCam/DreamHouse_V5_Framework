<?php
class db
{
    private $server;
    private $user;
    private $password;
    private $database;

    private $port;

    private $link;
    private $stmt;
    private $array;
    static $_instance;

    private function __construct()
    {
        $this->setConexion();
        $this->conectar();
    }

    private function setConexion()
    {
        require_once 'Conf.class.singleton.php';
        $conf = Conf::getInstance();

        $this->server = $conf->getHostDB();
        $this->database = $conf->getDB();
        $this->user = $conf->getUserDB();
        $this->password = $conf->getPassDB();
        $this->port = $conf->getPortDB();
    }

    private function __clone()
    {

    }

    public static function getInstance()
    {
        if (!(self::$_instance instanceof self))
            self::$_instance = new self();
        return self::$_instance;
    }

    private function conectar()
    {
        $this->link = new mysqli($this->server, $this->user, $this->password, $this->port);
        $this->link->select_db($this->database);
    }

    public function ejecutar($sql)
    {
        $this->stmt = $this->link->query($sql);
        return $this->stmt;
    }

    public function listar($stmt)
    {
        $this->array = array();
        while ($row = $stmt->fetch_array(MYSQLI_ASSOC)) {
            array_push($this->array, $row);
        }
        return $this->array;
    }

}
