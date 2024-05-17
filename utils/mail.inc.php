<?php

require __DIR__ . '/vendor/autoload.php';
class mail
{


    public static function send_resend($data)
    {
        // Ruta completa a la ubicación del archivo ini
        $ini_file = UTILS . "resend.ini";

        // Verificar si el archivo ini existe antes de intentar leerlo
        if (!file_exists($ini_file)) {
            exit('Error: Missing resend.ini file');
        }

        $resend_ini = parse_ini_file($ini_file);

        // Verificar si la lectura del archivo ini fue exitosa
        if ($resend_ini === false) {
            exit('Error: Failed to parse ini file');
        }

        // Verificar si las claves necesarias están presentes en el archivo ini
        if (!isset($resend_ini['API_KEY'], $resend_ini['FROM'])) {
            exit('Error: Missing required keys in ini file');
        }

        $API_KEY = $resend_ini['API_KEY'];
        $FROM = $resend_ini['FROM'];

        // Inicializar el cliente de Resend con la API key
        $resend = Resend::client($API_KEY);
        try {
            $result = $resend->emails->send([
                'from' => $FROM,
                'to' => $data['to'],
                'subject' => $data['inputMatter'],
                'html' => $data['inputMessage'],
            ]);
        } catch (\Exception $e) {
            exit('Error: ' . $e->getMessage());
        }

        // Devolver la respuesta del envío del email como JSON
        return $result->toJson();
    }


    public static function send_email($message)
    {
        switch ($message['type']) {
            case 'validate';
                $message['to'] = $message['toEmail'];
                $message['inputMatter'] = 'DREAMHOUSE - Email verification';
                $message['inputMessage'] = "<h2>Email verification.</h2><a href='http://localhost/DreamHouse_V5_Framework/login/verify/$message[token]'>Click here for verify your email.</a>";
                break;
            case 'recover';
                $message['to'] = $message['toEmail'];
                $message['inputMatter'] = 'DREAMHOUSE - Recover password';
                $message['inputMessage'] = "<h2>Password recovery.</h2><a href='http://localhost/DreamHouse_V5_Framework/login/recover/$message[token]'>Click here for recover your password.</a>";
                break;
        }
        return self::send_resend($message);
    }

}