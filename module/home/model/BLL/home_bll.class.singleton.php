<?php
// include_once ("module\home\model\DAO\home_dao.class.singleton.php");
class home_bll
{
	private $dao;
	private $db;
	static $_instance;

	function __construct()
	{
		$this->dao = home_dao::getInstance();
		$this->db = db::getInstance();
	}

	public static function getInstance()
	{
		//return "hola getInstance home_bll";
		if (!(self::$_instance instanceof self)) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	public function get_pets_BLL()
	{
		// return "holaaaa BLL pets";
		return $this->dao->select_data_pets($this->db);
	}


	public function get_types_BLL()
	{
		// return "holaaaa BLL types";
		return $this->dao->select_data_types($this->db);
	}

	public function get_operations_BLL()
	{
		// return "holaaaa BLL operations";
		return $this->dao->select_data_operations($this->db);
	}

	public function get_categories_BLL()
	{
		// return "holaaaa BLL categories";
		return $this->dao->select_data_categories($this->db);
	}

	public function get_cities_BLL()
	{
		// return "holaaaa BLL cities";
		return $this->dao->select_data_cities($this->db);
	}

	public function get_services_BLL()
	{
		// return "holaaaa BLL cities";
		return $this->dao->select_data_services($this->db);
	}



	public function visited_houses_BLL($array)
	{
		// return "holaaaa BLL cities";
		return $this->dao->visited_houses($this->db, $array);
	}
}
?>