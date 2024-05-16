<?php

require __DIR__ . '/vendor/autoload.php';
class mail
{


    public static function send_resend($data)
    {
        $resend = parse_ini_file(UTILS . "resend.ini");
        $API_KEY = $resend['MAIL_API_KEY'];
        $resend = Resend::client($API_KEY);
        try {
            $result = $resend->emails->send([
                'from' => 'Acme <onboarding@resend.dev>',
                'to' => $data['toEmail'],
                'subject' => $data['inputMatter'],
                'html' => $data['inputMessage'],
            ]);
        } catch (\Exception $e) {
            exit('Error: ' . $e->getMessage());
        }

        // Show the response of the sent email to be saved in a log...
        return $result->toJson();
        // return $result();
    }

    public static function send_email($message)
    {
        switch ($message['type']) {
            case 'validate';
                $message['inputMatter'] = 'Email verification';
                $message['inputMessage'] = "<h2>Email verification.</h2><a href='http://localhost/DreamHouse_V5_Framework/login/verify/$message[token]'>Click here for verify your email.</a>";
                break;
            case 'recover';
                $message['inputMatter'] = 'Recover password';
                $message['inputMessage'] = "<a href='http://localhost/DreamHouse_V5_Framework/login/recover/$message[token]'>Click here for recover your password.</a>";
                break;
        }
        return self::send_resend($message);
    }

}