<?php
// include_once ("model\db.class.singleton.php");
class home_dao
{
    static $_instance;

    private function __construct()
    {
    }

    public static function getInstance()
    {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function select_data_pets($db)
    {
        $sql = "SELECT * FROM pet";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);

    }

    public function select_data_types($db)
    {
        $sql = "SELECT * FROM type";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);

    }


    public function select_data_operations($db)
    {
        $sql = "SELECT * FROM operation";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);

    }

    public function select_data_categories($db)
    {
        $sql = "SELECT * FROM category";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);

    }

    public function select_data_cities($db)
    {
        $sql = "SELECT * FROM city";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);

    }

    public function select_data_services($db)
    {
        $sql = "SELECT * FROM service";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);

    }


    public function visited_houses($db, $array)
    {
        $array = json_decode($array);

        $sql = "SELECT house.house_id, images.image_path 
        FROM house
        INNER JOIN images ON house.house_id = images.house_id
        WHERE house.house_id IN (";

        for ($i = 0; $i < count($array); $i++) {
            $sql .= "'" . $array[$i] . "'";

            if ($i < count($array) - 1) {
                $sql .= ",";
            }
        }

        $sql .= ") GROUP BY house.house_id;";



        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }



}
?>