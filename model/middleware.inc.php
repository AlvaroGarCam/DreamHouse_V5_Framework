<?php
class middleware
{
    public static function decode_username($get_token)
    {
        $jwt = parse_ini_file(UTILS . "jwt.ini");
        $secret = $jwt['secret'];
        $token = $get_token;

        $JWT = new JWT;
        $json = $JWT->decode($token, $secret);
        $json = json_decode($json, TRUE);

        $decode_user = $json['name'];
        return $decode_user;
    }

    public static function decode_exp($get_token)
    {
        $jwt = parse_ini_file(UTILS . "jwt.ini");
        $secret = $jwt['secret'];
        $token = $get_token;

        $JWT = new JWT;
        $json = $JWT->decode($token, $secret);
        $json = json_decode($json, TRUE);

        $decode_exp = $json['exp'];
        return $decode_exp;
    }


    public static function decode_token($token)
    {
        $jwt = parse_ini_file(UTILS . "jwt.ini");
        $secret = $jwt['secret'];
        $JWT = new JWT;
        $token_dec = $JWT->decode($token, $secret);
        $rt_token = json_decode($token_dec, TRUE);
        return $rt_token;
    }
    public static function create_token($user)
    {

        $jwt_file = UTILS . "jwt.ini";
        $jwt = parse_ini_file($jwt_file);

        if ($jwt === false) {
            exit('Error: Failed to parse ini file');
        }

        $header = $jwt['header'];
        $secret = $jwt['secret'];
        $payload = json_encode(['iat' => time(), 'exp' => time() + (360), 'user' => $user]);

        $JWT = new jwt();
        return $JWT->encode($header, $payload, $secret);
    }
}