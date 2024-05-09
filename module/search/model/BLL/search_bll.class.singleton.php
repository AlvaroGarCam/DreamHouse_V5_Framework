<?php
class search_bll
{
	private $dao;
	private $db;
	static $_instance;

	function __construct()
	{
		$this->dao = search_dao::getInstance();
		$this->db = db::getInstance();
	}

	public static function getInstance()
	{
		if (!(self::$_instance instanceof self)) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}
	public function load_types_BLL()
	{
		return $this->dao->load_types($this->db);
	}
	public function search_pet_BLL($type_id)
	{
		return $this->dao->search_pet($this->db, $type_id);
	}



	public function autocomplete_BLL($sdata)
	{
		return $this->dao->autocomplete($this->db, $sdata);
	}

}
?>