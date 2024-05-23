<?php

require_once ('vendor/autoload.php');

class ultramsg
{
     public static function send_ultramsg($message)
     {
          $ini_file = UTILS . "resend.ini";

          // Verificar si el archivo ini existe antes de intentar leerlo
          if (!file_exists($ini_file)) {
               exit('Error: Missing resend.ini file');
          }

          $ultramsg_ini = parse_ini_file($ini_file);

          // Verificar si la lectura del archivo ini fue exitosa
          if ($ultramsg_ini === false) {
               exit('Error: Failed to parse ini file');
          }

          // Verificar si las claves necesarias están presentes en el archivo ini
          if (!isset($ultramsg_ini['OTP_API_KEY'], $ultramsg_ini['OTP_TOKEN'], $ultramsg_ini['OTP_PHONE_NUMBER'])) {
               exit('Error: Missing required keys in ini file');
          }

          $otp_api_key = $ultramsg_ini['OTP_API_KEY'];
          $otp_token = $ultramsg_ini['OTP_TOKEN'];
          $otp_phone_number = $ultramsg_ini['OTP_PHONE_NUMBER'];


          $ultramsg_token = $otp_token; // Ultramsg.com token
          $instance_id = $otp_api_key; // Ultramsg.com instance id
          $client = new UltraMsg\WhatsAppApi($ultramsg_token, $instance_id);

          $to = $otp_phone_number;
          $body = $message['body'];
          $api = $client->sendChatMessage($to, $body);

          return json_encode($api);
     }


     public static function send_whatsapp($message_bll)
     {
          switch ($message_bll['type']) {
               case 'login_failed';
                    $message['body'] = "Mensaje desde el login_failed, here is your code: " . $message_bll['token'];
                    break;
               case 'recover_password';
                    $message['body'] = "Mensaje desde el recover_password, here is your code: " . $message_bll['token'];
                    break;
          }
          return self::send_ultramsg($message);
     }
}