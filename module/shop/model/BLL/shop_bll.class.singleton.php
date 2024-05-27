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


	public function click_like_BLL($array)
	{
		$username = middleware::decode_username($array[0]);
		$house_id = $array[1];

		try {
			$check_like = $this->dao->check_like($this->db, $username, $house_id);
		} catch (Exception $e) {
			return "error en en check_like";
		}

		if (!empty($check_like)) {
			//restar el like, borrarlo de "likes" y -1 likes en house
			try {
				if ($this->dao->manage_like($this->db, $username, $house_id, 'remove')) {
					return "Se ha quitado el like correctamente";
				} else {
					return "error en manage_like_remove";
				}
			} catch (Exception $e) {
				return "error en manage_like_remove catch";
			}
		} else {
			//sumar el like, insertar en "likes" y +1 likes en house
			try {
				if ($this->dao->manage_like($this->db, $username, $house_id, 'add')) {
					return "Se ha añadido el like correctamente";
				} else {
					return "error en manage_like_add";
				}
			} catch (Exception $e) {
				return "error en manage_like_add catch";
			}
		}
	}

	public function like_reactive_BLL($array)
	{
		$user = middleware::decode_username($array[0]);
		$house_id = $array[1];
		try {
			$check_like = $this->dao->check_like($this->db, $user, $house_id);
			if (!empty($check_like)) {
				return "like";
			} else {
				return "dislike";
			}
		} catch (Exception $e) {
			return "error en check_like_reactive";
		}
	}

}
?>