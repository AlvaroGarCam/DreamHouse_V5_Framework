<?php
class search_dao
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

    function load_types($db)
    {

        $sql = "SELECT * FROM type;";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }



    function search_pet($db, $type_id)
    {

        if (($type_id) == null) {
            $sql = "SELECT DISTINCT pet.*
                FROM pet;";
        } else {
            $sql = "SELECT DISTINCT pet.*
                FROM pet,house,house_type
                WHERE pet.pet_id=house.pet_id
                AND house.house_id=house_type.house_id
                AND house_type.type_id = '$type_id';";
        }
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }



    function autocomplete($db, $sdata)
    {

        $sql = "SELECT DISTINCT city.*
            FROM city
            INNER JOIN house ON city.city_id = house.city_id";

        if (!empty($sdata[0]['city'])) {
            if (isset($sdata[1]['type'])) {
                $sql .= " INNER JOIN house_type 
                ON house.house_id = house_type.house_id
                WHERE house_type.type_id = '{$sdata[1]['type']}'";
                if (isset($sdata[2]['pet'])) {
                    $sql .= " AND house.pet_id = '{$sdata[2]['pet']}'";
                }
                $sql .= " AND city.city_name LIKE '{$sdata[0]['city']}%';";

            } elseif (isset($sdata[1]['pet'])) {
                $sql .= " WHERE house.pet_id = '{$sdata[1]['pet']}'
                AND city.city_name LIKE '{$sdata[0]['city']}%';";

            } else {
                $sql .= " WHERE city.city_name LIKE '{$sdata[0]['city']}%';";
            }

        } else {
            // If the city is empty, set the query to return no results
            $sql .= " WHERE TRUE=FALSE;";

        }
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
}

?>