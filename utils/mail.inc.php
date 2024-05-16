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
                'to' => ['alvgarcam@alu.edu.gva.es'],
                'subject' => 'Hello world',
                'html' => '<strong>It works!</strong>',
            ]);
        } catch (\Exception $e) {
            exit('Error: ' . $e->getMessage());
        }

        // Show the response of the sent email to be saved in a log...
        return $result->toJson();
        // return $result();
    }

    public static function send_email($email)
    {
        switch ($email['type']) {
            case 'validate';
                $email['inputMatter'] = 'Email verification';
                $email['inputMessage'] = "<h2>Email verification.</h2><a href='http://localhost/DreamHouse_V5_Framework/login/verify/$email[token]'>Click here for verify your email.</a>";
                break;
            case 'recover';
                $email['inputMatter'] = 'Recover password';
                $email['inputMessage'] = "<a href='http://localhost/DreamHouse_V5_Framework/login/recover/$email[token]'>Click here for recover your password.</a>";
                break;
        }
        return self::send_resend($email);
    }

}