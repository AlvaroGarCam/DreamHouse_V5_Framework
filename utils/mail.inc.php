<?php

require __DIR__ . '/vendor/autoload.php';
class mail
{


    public static function send_resend($data)
    {

        $resend = Resend::client('re_4PeeKQHG_EaS8zcysgnDmteNAz66ifgqD');
        try {
            $result = $resend->emails->send([
                'from' => 'Acme <onboarding@resend.dev>',
                'to' => $data['to'],
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
                $message['to'] = $message['toEmail'];
                $message['inputMatter'] = 'Email verification';
                $message['inputMessage'] = "<h2>Email verification.</h2><a href='http://localhost/DreamHouse_V5_Framework/login/verify/$message[token]'>Click here for verify your email.</a>";
                break;
            case 'recover';
                $message['to'] = $message['toEmail'];
                $message['inputMatter'] = 'Recover password';
                $message['inputMessage'] = "<a href='http://localhost/DreamHouse_V5_Framework/login/recover/$message[token]'>Click here for recover your password.</a>";
                break;
        }
        return self::send_resend($message);
    }

}