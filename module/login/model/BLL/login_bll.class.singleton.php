<?php

class login_bll
{
	private $dao;
	private $db;
	static $_instance;

	function __construct()
	{
		$this->dao = login_dao::getInstance();
		$this->db = db::getInstance();
	}

	public static function getInstance()
	{
		if (!(self::$_instance instanceof self)) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	public function get_register_BLL($args)
	{
		$hashed_pass = password_hash($args[1], PASSWORD_DEFAULT);
		$hashavatar = md5(strtolower(trim($args[2])));
		$avatar = "https://i.pravatar.cc/500?u=$hashavatar";
		// $token_email = common::generate_Token_secure(20);
		$token_verify = middleware::create_token($args[0]);
		// return $token_verify;

		if (!empty($this->dao->select_user($this->db, $args[0], $args[2]))) {
			return 'error';
		} else {
			$this->dao->insert_user($this->db, $args[0], $hashed_pass, $args[2], $avatar);
			// return 'usuario insertado en la base de datos';
			$message = [
				'type' => 'validate',
				'token' => $token_verify,
				'toEmail' => $args[2]
			];
			$email = json_decode(mail::send_email($message), true);
			if (!empty($email)) {
				return;
			}
		}
	}


	public function get_login_BLL($args)
	{
		if (!empty($this->dao->select_user_login($this->db, $args[0]))) {
			$attempts = $this->dao->check_login_attempts($this->db, $args[0]);
			$login_attempts = $attempts[0]['login_attempts'];
			$phone_number = $attempts[0]['phone_number'] || null;
			if ($login_attempts >= 3) {
				$token = common::generate_token_secure(4);
				if ($this->dao->insert_otp_token($this->db, $args[0], $token)) {
					$message = [
						'type' => 'login_failed',
						'token' => $token,
						'phone_number' => $phone_number
					];
					$ultramsgResponse = json_decode(ultramsg::send_whatsapp($message));
					if (empty($ultramsgResponse)) {
						return ['ultramsg error'];
					} else {
						return ['error_attempts'];
					}
				} else {
					return ['error_insert_otp_token'];
				}
			} else {
				if (!empty($this->dao->select_user_login($this->db, $args[0]))) {
					$user = $this->dao->select_user_login($this->db, $args[0]);
					if (password_verify($args[1], $user[0]['password']) && $user[0]['is_active'] == 1) {
						$access_token = middleware::create_token($user[0]['username']);
						$refresh_token = middleware::create_refresh_token($user[0]['username']);
						$_SESSION['username'] = $user[0]['username'];
						$_SESSION['tiempo'] = time();

						return ['okkey_login', $access_token, $refresh_token];
					} else if (password_verify($args[1], $user[0]['password']) && $user[0]['is_active'] == 0) {
						return ['activate error'];
					} else {
						$this->dao->increase_login_attempts($this->db, $args[0]);
						return ['error_passwd'];
					}
				} else {
					return ['error_user'];
				}
			}
		} else {
			return ['error_user'];
		}
	}

	public function get_send_otp_BLL($args)
	{
		$username = $args[0];
		$otp_code = $args[1];
		// return $username;
		if ($this->dao->select_user($this->db, $username, null)) {
			if ($this->dao->check_otp_token($this->db, $username, $otp_code)) {
				$this->dao->reset_login_attempts($this->db, $username);
				return 'okkey';
			} else {
				return 'error_otp';
			}
		} else {
			return 'error_username';
		}
	}

	public function get_social_login_BLL($args)
	{
		if (!empty($this->dao->select_user($this->db, $args[1], $args[2]))) {
			$user = $this->dao->select_user($this->db, $args[1], $args[2]);
			$jwt = jwt_process::encode($user[0]['username']);
			return json_encode($jwt);
		} else {
			$this->dao->insert_social_login($this->db, $args[0], $args[1], $args[2], $args[3]);
			$user = $this->dao->select_user($this->db, $args[1], $args[2]);
			$jwt = jwt_process::encode($user[0]['username']);
			return json_encode($jwt);
		}
	}

	public function get_verify_email_BLL($args)
	{
		$token = middleware::decode_token($args);
		// return $token['user'];
		// return ($this->dao->select_verify_email($this->db, $token['user']));
		if ($token['exp'] < time()) {
			return ("Expired_session");
		} else {
			// return 'else token';
			if ($this->dao->select_verify_email($this->db, $token['user'])) {
				$this->dao->update_verify_email($this->db, $token['user']);
				return 'verify';
			} else {
				return 'fail';
			}
		}
	}

	public function get_recover_email_BBL($email)
	{
		try {
			$user = $this->dao->select_recover_password($this->db, $email);
			if (empty($user)) {
				return 'user not found';
			}
			$token = middleware::create_token($user);
			$updateResult = $this->dao->update_recover_password($this->db, $email, $token);
			if ($updateResult !== "ok") {
				return 'update error';
			}
			$message = [
				'type' => 'recover',
				'token' => $token,
				'toEmail' => $email
			];
			$emailResponse = json_decode(mail::send_email($message), true);
			if (empty($emailResponse)) {
				return 'email error';
			}
			return 'okkey';
		} catch (Exception $e) {
			return 'error: ' . $e->getMessage();
		}
	}


	public function get_verify_token_BLL($args)
	{
		$token = middleware::decode_token($args);
		$userArray = $token['user'];
		$userObject = $userArray[0];
		$username = $userObject['username'];

		// return $username; // Devuelve el nombre de usuario

		if ($token['exp'] < time()) {
			return "Expired_session";
		} else {
			if ($this->dao->select_verify_email($this->db, $username)) {
				return 'verify';
			} else {
				return 'fail';
			}
		}
	}


	public function get_new_password_BLL($args)
	{

		$hashed_pass = password_hash($args[1], PASSWORD_DEFAULT, ['cost' => 12]);
		$token = middleware::decode_token($args[0]);
		$userArray = $token['user'];
		$userObject = $userArray[0];
		$username = $userObject['username'];

		if ($this->dao->update_new_passwoord($this->db, $username, $hashed_pass)) {
			return 'done';
		}
		return 'fail';
	}

	public function get_data_user_BLL($args)
	{

		// return $args;
		$decoded_token = middleware::decode_token($args);
		// return $decoded_token['user'];
		return $this->dao->select_data_user($this->db, $decoded_token['user']);
	}

	public function get_control_activity_BLL()
	{
		// return 'Hola control_activity_BLL';
		if (!isset($_SESSION["tiempo"])) {
			return "inactivo";
		} else {
			if ((time() - $_SESSION["tiempo"]) >= 600) { //10min
				return "inactivo";
			} else {
				return (time() - $_SESSION["tiempo"]);
			}
		}
	}

	public function get_control_user_BLL($args)
	{
		$token_dec = middleware::decode_username($args);
		// return $token_dec;

		if (isset($_SESSION['username']) && ($_SESSION['username']) == $token_dec) {
			return "Correct_User";
		} else {
			return "Wrong_user";
		}
	}

	public function get_refresh_token_BLL($args)
	{
		$token = explode('"', $args);
		$void_email = "";
		$decode = middleware::decode_username($token[1]);
		$user = $this->dao->select_user($this->db, $decode, $void_email);

		$new_token = jwt_process::encode($user[0]['username']);

		return $new_token;
	}

	public function get_token_expires_BLL($args)
	{
		$token = explode('"', $args);
		$decode = middleware::decode_exp($token[1]);

		if (time() >= $decode) {
			return "inactivo";
		} else {
			return "activo";
		}
	}

	public function get_control_expires_token_BLL($args)
	{
		$access_token = middleware::decode_token($args[0]);
		$refresh_token = middleware::decode_token($args[1]);
		// return [$access_token['exp'], $refresh_token['exp']];
		if ($refresh_token['exp'] < time()) {
			return 'Expired session';
		} else {
			if ($access_token['exp'] < time()) {
				$new_access_token = middleware::create_token($refresh_token['username']);
				return $new_access_token;
			} else {
				return 'okkey';
			}
		}
	}
}