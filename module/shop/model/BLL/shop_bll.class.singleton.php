<?php
class shop_bll
{
	private $dao;
	private $db;
	static $_instance;

	function __construct()
	{
		$this->dao = shop_dao::getInstance();
		$this->db = db::getInstance();
	}

	public static function getInstance()
	{
		if (!(self::$_instance instanceof self)) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}


	public function get_filters_BLL()
	{
		return $this->dao->select_all_filters($this->db);
	}

	public function details_BLL($house_id)
	{
		$house_data = $this->dao->house_data_details($this->db, $house_id);

		return $house_data;
	}
	public function list_BLL($pagina)
	{
		return $this->dao->select_all_houses($this->db, $pagina);
	}

	public function pagination_BLL($filters_shop)
	{
		if (is_array($filters_shop)) {
			return $this->dao->pagination($this->db, $filters_shop);
		} else {
			return $this->dao->pagination($this->db, null);
		}
	}
	public function filters_shop_BLL($array)
	{
		return $this->dao->filters_shop($this->db, $array);
	}


	public function count_related_houses_BLL($array)
	{
		return $this->dao->count_related_houses($this->db, $array);
	}

	public function related_houses_BLL($array)
	{
		return $this->dao->related_houses($this->db, $array);
	}

}
?>