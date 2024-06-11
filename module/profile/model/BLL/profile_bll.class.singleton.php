<?php


class profile_bll
{
	private $dao;
	private $db;
	static $_instance;

	function __construct()
	{
		$this->dao = profile_dao::getInstance();
		$this->db = db::getInstance();
	}

	public static function getInstance()
	{
		if (!(self::$_instance instanceof self)) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	public function get_account_details_BLL($args)
	{
		$access_token = $args[0];
		$username = middleware::decode_username($access_token);
		if (!empty($user = $this->dao->get_account_details($this->db, $username))) {
			return ['got_account_details_succesfully', $user];
		} else {
			return ['error_getting_account_details'];
		}
	}

	public function get_purchases_details_BLL($args)
	{
		$access_token = $args[0];
		$username = middleware::decode_username($access_token);
		if (!empty($purchases = $this->dao->get_purchases_details($this->db, $username))) {
			return ['got_purchases_details_succesfully', $purchases];
		} else {
			return ['no_purchases_found'];
		}
	}

	public function get_likes_details_BLL($args)
	{
		$access_token = $args[0];
		$username = middleware::decode_username($access_token);
		if (!empty($likes = $this->dao->get_likes_details($this->db, $username))) {
			if (!empty($houses = $this->dao->get_houses_from_likes($this->db, $username))) {
				return ['got_likes_details_succesfully', $houses];
			} else {
				return ['no_houses_found'];
			}
		} else {
			return ['no_likes_found'];
		}
	}

	public function edit_username_BLL($args)
	{
		$access_token = $args[0];
		$username = middleware::decode_username($access_token);
		$new_username = $args[1];
		$password = $args[2];
		if (!empty($user = $this->dao->verify_user($this->db, $username))) {
			if (empty($this->dao->check_new_username($this->db, $new_username))) {
				if (password_verify($password, $user[0]['password'])) {
					try {
						$this->db->ejecutar('START TRANSACTION');
						$this->dao->disable_user($this->db, $username);
						$this->dao->create_new_user($this->db, $user, $new_username);
						$this->dao->register_change($this->db, $username, $new_username);
						$this->dao->update_user_likes($this->db, $username, $new_username);
						$this->dao->update_user_purchases($this->db, $username, $new_username);
						$this->dao->update_user_orders($this->db, $username, $new_username);
						$this->db->ejecutar('COMMIT');
						return ['Username updated successfully'];
					} catch (Exception $e) {
						$this->db->ejecutar('ROLLBACK');
						return ['error_updating_username', $e->getMessage()];
					}
				} else {
					return ['wrong_password'];
				}
			} else {
				return ['username_already_exists'];
			}
		} else {
			return ['error_getting_account_details'];
		}
	}

	public function edit_email_BLL($args)
	{
		$access_token = $args[0];
		$username = middleware::decode_username($access_token);
		$new_email = $args[1];
		$password = $args[2];
		if (!empty($user = $this->dao->verify_user($this->db, $username))) {
			if (empty($this->dao->check_new_email($this->db, $new_email))) {
				if (password_verify($password, $user[0]['password'])) {
					try {
						$this->db->ejecutar('START TRANSACTION');
						$this->dao->edit_email($this->db, $username, $new_email);
						$this->db->ejecutar('COMMIT');
						return ['Email updated successfully'];
					} catch (Exception $e) {
						$this->db->ejecutar('ROLLBACK');
						return ['error_updating_email', $e->getMessage()];
					}
				} else {
					return ['wrong_password'];
				}
			} else {
				return ['email_already_exists'];
			}
		} else {
			return ['error_getting_account_details'];
		}
	}

	public function edit_phone_number_BLL($args)
	{
		$access_token = $args[0];
		$username = middleware::decode_username($access_token);
		$new_phone_number = $args[1];
		$password = $args[2];
		if (!empty($user = $this->dao->get_account_details($this->db, $username))) {
			if (password_verify($password, $user[0]['password'])) {
				try {
					$this->db->ejecutar('START TRANSACTION');
					$this->dao->edit_phone_number($this->db, $username, $new_phone_number);
					$this->db->ejecutar('COMMIT');
					return ['Phone number updated successfully'];
				} catch (Exception $e) {
					$this->db->ejecutar('ROLLBACK');
					return ['error_updating_phone_number', $e->getMessage()];
				}
			} else {
				return ['wrong_password'];
			}
		} else {
			return ['error_getting_account_details'];
		}
	}

	public function edit_password_BLL($args)
	{
		$access_token = $args[0];
		$username = middleware::decode_username($access_token);
		$new_password = $args[1];
		$hashed_pass = password_hash($new_password, PASSWORD_DEFAULT);
		$current_password = $args[2];
		if (!empty($user = $this->dao->get_account_details($this->db, $username))) {
			if (password_verify($current_password, $user[0]['password'])) {
				try {
					$this->db->ejecutar('START TRANSACTION');
					$this->dao->edit_password($this->db, $username, $hashed_pass);
					$this->db->ejecutar('COMMIT');
					return ['Password updated successfully'];
				} catch (Exception $e) {
					$this->db->ejecutar('ROLLBACK');
					return ['error_updating_password', $e->getMessage()];
				}
			} else {
				return ['wrong_password'];
			}
		} else {
			return ['error_getting_account_details'];
		}
	}

	public function pdf_data_BLL($args)
	{
		$access_token = $args[0];
		$username = middleware::decode_username($access_token);
		$purchase_id = $args[1];
		// return $purchase_id;
		if (!empty($purchase = $this->dao->get_purchase($this->db, $username, $purchase_id))) {
			// return $purchase[0]['order_id'];
			if (!empty($products = $this->dao->get_products($this->db, $purchase[0]['order_id']))) {
				if (!empty($house = $this->dao->get_house_purchase($this->db, $purchase[0]['house_id']))) {
					return ['purchase_ok', $house, $purchase, $products];
				} else {
					return ['error_getting_house'];
				}
			} else {
				return ['error_getting_products'];
			}
		} else {
			return ['error_getting_purchase'];
		}
	}

	public function remove_like_profile_BLL($args)
	{
		$access_token = $args[0];
		$username = middleware::decode_username($access_token);
		$house_id = $args[1];
		$result = $this->dao->remove_like_profile($this->db, $username, $house_id);

		if ($result === 'error') {
			return ['error_removing_like'];
		} else {
			return ['like_removed'];
		}
	}

	public function update_avatar_BLL($args)
	{
		$access_token = $args[0];
		$avatar = $args[1];
		$username = middleware::decode_username($access_token);
		if (!empty($this->dao->get_account_details($this->db, $username))) {
			if (!empty($this->dao->update_avatar($this->db, $username, $avatar))) {
				return ['avatar_updated'];
			} else {
				return ['error_updating_avatar'];
			}
		} else {
			return ['error_getting_user'];
		}
	}
}