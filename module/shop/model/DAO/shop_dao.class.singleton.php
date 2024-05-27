<?php
class shop_dao
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


    public function select_all_filters($db)
    {

        $sql = 'SELECT "type" as tag, type_name as name, type_id as id FROM type
          UNION
          SELECT "operation" as tag,operation_name as name, operation_id as id FROM operation
          UNION
          SELECT "category" as tag, category_name as name,category_id as id FROM category
          UNION
          SELECT "city" as tag,city_name as name,city_id as id FROM city
          UNION
          SELECT "service" as tag,service_name as name,service_id as id FROM service;';

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }



    public function house_data_details($db, $house_id)
    {

        $sql = "SELECT
    h.*,
    c.city_name,
    p.pet_name,
    p.pet_image,
    (
        SELECT GROUP_CONCAT(image_id) FROM images WHERE house_id = h.house_id
    ) AS image_ids,
    (
        SELECT GROUP_CONCAT(image_path) FROM images WHERE house_id = h.house_id
    ) AS image_paths,
    GROUP_CONCAT(DISTINCT cat.category_name) AS category_names,
    GROUP_CONCAT(DISTINCT t.type_name) AS type_names,
    GROUP_CONCAT(DISTINCT s.service_name) AS service_names,
    GROUP_CONCAT(DISTINCT o.operation_name) AS operation_names
FROM
    house h
    JOIN city c ON h.city_id = c.city_id
    JOIN pet p ON h.pet_id = p.pet_id
    LEFT JOIN house_category hc ON h.house_id = hc.house_id
    LEFT JOIN category cat ON hc.category_id = cat.category_id
    LEFT JOIN house_type ht ON h.house_id = ht.house_id
    LEFT JOIN type t ON ht.type_id = t.type_id
    LEFT JOIN house_service hs ON h.house_id = hs.house_id
    LEFT JOIN service s ON hs.service_id = s.service_id
    LEFT JOIN house_operation ho ON h.house_id = ho.house_id
    LEFT JOIN operation o ON ho.operation_id = o.operation_id
WHERE
    h.house_id = '$house_id';";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }



    public function select_all_houses($db, $pagina)
    {

        $offset = ($pagina - 1) * 3; // Si $pagina es 1, el offset será 0; si es 2, el offset será 3, etc.

        $sql = "SELECT
            h.*,
            c.city_name,
            p.pet_name,
            p.pet_image,
            i.image_path,
            GROUP_CONCAT(DISTINCT cat.category_name) AS category_names,
            GROUP_CONCAT(DISTINCT t.type_name) AS type_names,
            GROUP_CONCAT(DISTINCT s.service_name) AS service_names,
            GROUP_CONCAT(DISTINCT o.operation_name) AS operation_names
            FROM
            house h
            JOIN city c ON h.city_id = c.city_id
            JOIN pet p ON h.pet_id = p.pet_id
            LEFT JOIN images i ON h.house_id = i.house_id
            LEFT JOIN house_category hc ON h.house_id = hc.house_id
            LEFT JOIN category cat ON hc.category_id = cat.category_id
            LEFT JOIN house_type ht ON h.house_id = ht.house_id
            LEFT JOIN type t ON ht.type_id = t.type_id
            LEFT JOIN house_service hs ON h.house_id = hs.house_id
            LEFT JOIN service s ON hs.service_id = s.service_id
            LEFT JOIN house_operation ho ON h.house_id = ho.house_id
            LEFT JOIN operation o ON ho.operation_id = o.operation_id
            GROUP BY h.house_id
            LIMIT 3
            OFFSET $offset;"; // Concatenar $offset a la consulta SQL

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }


    public function pagination($db, $filters_shop)
    {
        if (isset($filters_shop) && !empty($filters_shop)) {
            $subquery = "(SELECT
                            h.*,
                            c.city_name,
                            p.pet_name,
                            p.pet_image,
                            i.image_path,
                            GROUP_CONCAT(DISTINCT cat.category_name) AS category_names,
                            GROUP_CONCAT(DISTINCT t.type_name) AS type_names,
                            GROUP_CONCAT(DISTINCT s.service_name) AS service_names,
                            GROUP_CONCAT(DISTINCT o.operation_name) AS operation_names
                        FROM
                            house h
                        JOIN city c ON h.city_id = c.city_id
                        JOIN pet p ON h.pet_id = p.pet_id
                        LEFT JOIN images i ON h.house_id = i.house_id
                        LEFT JOIN house_category hc ON h.house_id = hc.house_id
                        LEFT JOIN category cat ON hc.category_id = cat.category_id
                        LEFT JOIN house_type ht ON h.house_id = ht.house_id
                        LEFT JOIN type t ON ht.type_id = t.type_id
                        LEFT JOIN house_service hs ON h.house_id = hs.house_id
                        LEFT JOIN service s ON hs.service_id = s.service_id
                        LEFT JOIN house_operation ho ON h.house_id = ho.house_id
                        LEFT JOIN operation o ON ho.operation_id = o.operation_id";

            $conditions = array();
            foreach ($filters_shop as $filter) {
                $prefijo = "";
                switch ($filter[0]) {
                    case "category":
                        $prefijo = "cat";
                        break;
                    case "type":
                        $prefijo = "t";
                        break;
                    case "operation":
                        $prefijo = "o";
                        break;
                    case "city":
                        $prefijo = "c";
                        break;
                    case "service":
                        $prefijo = "s";
                        break;
                    case "pet":
                        $prefijo = "p";
                        break;
                }
                $conditions[] = "$prefijo." . $filter[0] . "_id=" . $filter[1];
            }

            $where_clause = implode(" AND ", $conditions);
            $subquery .= " WHERE " . $where_clause;
            $subquery .= " GROUP BY h.house_id) AS subquery";
            $sql = "SELECT COUNT(*) AS contador FROM $subquery;";
        } else {
            $sql = "SELECT COUNT(*) as contador FROM house;";
        }

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }


    public function filters_shop($db, $array)
    {
        $filters_shop = $array[0];
        $pagina = $array[1];

        $offset = ($pagina - 1) * 3;

        // Verificar si filter_order está presente y extraerlo si es necesario
        $filter_order = null;
        if (!empty($filters_shop) && $filters_shop[count($filters_shop) - 1][0] === "filter_order") {
            $filter_order = array_pop($filters_shop);
        }

        $sql = "SELECT
                h.*,
                c.city_name,
                p.pet_name,
                p.pet_image,
                i.image_path,
                GROUP_CONCAT(DISTINCT cat.category_name) AS category_names,
                GROUP_CONCAT(DISTINCT t.type_name) AS type_names,
                GROUP_CONCAT(DISTINCT s.service_name) AS service_names,
                GROUP_CONCAT(DISTINCT o.operation_name) AS operation_names
                FROM
                house h
                JOIN city c ON h.city_id = c.city_id
                JOIN pet p ON h.pet_id = p.pet_id
                LEFT JOIN images i ON h.house_id = i.house_id
                LEFT JOIN house_category hc ON h.house_id = hc.house_id
                LEFT JOIN category cat ON hc.category_id = cat.category_id
                LEFT JOIN house_type ht ON h.house_id = ht.house_id
                LEFT JOIN type t ON ht.type_id = t.type_id
                LEFT JOIN house_service hs ON h.house_id = hs.house_id
                LEFT JOIN service s ON hs.service_id = s.service_id
                LEFT JOIN house_operation ho ON h.house_id = ho.house_id
                LEFT JOIN operation o ON ho.operation_id = o.operation_id";

        // Añadir condiciones según los filtros
        for ($i = 0; $i < count($filters_shop); $i++) {
            if ($filters_shop[$i][0] === "category") {
                $prefijo = "cat";
            }
            if ($filters_shop[$i][0] === "type") {
                $prefijo = "t";
            }
            if ($filters_shop[$i][0] === "operation") {
                $prefijo = "o";
            }
            if ($filters_shop[$i][0] === "city") {
                $prefijo = "c";
            }
            if ($filters_shop[$i][0] === "service") {
                $prefijo = "s";
            }
            if ($filters_shop[$i][0] === "pet") {
                $prefijo = "p";
            }
            if ($i == 0) {
                $sql .= " WHERE " . $prefijo . "." . $filters_shop[$i][0] . "_id=" . $filters_shop[$i][1];
            } else {
                $sql .= " AND " . $prefijo . "." . $filters_shop[$i][0] . "_id=" . $filters_shop[$i][1];
            }
        }
        $sql .= " GROUP BY h.house_id";
        // Añadir la cláusula ORDER BY según filter_order
        if ($filter_order !== null) {
            $order_field = null;
            switch ($filter_order[0]) {
                case "1":
                    $order_field = "h.price ASC";
                    break;
                case "2":
                    $order_field = "h.price DESC";
                    break;
                case "3":
                    $order_field = "h.num_rooms ASC";
                    break;
                case "4":
                    $order_field = "h.num_rooms DESC";
                    break;
                default:
                    $order_field = "h.house_id";
                    break;
            }
            $sql .= " ORDER BY $order_field";
        } else {
            $sql .= " ORDER BY h.house_id";
        }

        $sql .= " LIMIT 3
                OFFSET $offset;";


        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }


    public function count_related_houses($db, $array)
    {
        $house_id = $array[0];
        $pet_id = $array[1];
        $sql = "SELECT COUNT(*) AS contador
                    FROM house h
				WHERE h.house_id != '$house_id' 
                    AND h.pet_id = '$pet_id'
                    ORDER BY h.house_id";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function related_houses($db, $array)
    {
        $house_id = $array[0];
        $pet_id = $array[1];
        $offset = $array[2];

        $sql = "SELECT
                    h.*,
                    c.city_name,
                    p.pet_name,
                    p.pet_image,
                    i.image_path,
                    GROUP_CONCAT(DISTINCT cat.category_name) AS category_names,
                    GROUP_CONCAT(DISTINCT t.type_name) AS type_names,
                    GROUP_CONCAT(DISTINCT s.service_name) AS service_names,
                    GROUP_CONCAT(DISTINCT o.operation_name) AS operation_names
                    FROM
                    house h
                    JOIN city c ON h.city_id = c.city_id
                    JOIN pet p ON h.pet_id = p.pet_id
                    LEFT JOIN images i ON h.house_id = i.house_id
                    LEFT JOIN house_category hc ON h.house_id = hc.house_id
                    LEFT JOIN category cat ON hc.category_id = cat.category_id
                    LEFT JOIN house_type ht ON h.house_id = ht.house_id
                    LEFT JOIN type t ON ht.type_id = t.type_id
                    LEFT JOIN house_service hs ON h.house_id = hs.house_id
                    LEFT JOIN service s ON hs.service_id = s.service_id
                    LEFT JOIN house_operation ho ON h.house_id = ho.house_id
                    LEFT JOIN operation o ON ho.operation_id = o.operation_id
                    WHERE h.house_id != '$house_id' 
                    AND h.pet_id = '$pet_id'
                    GROUP BY h.house_id
                    LIMIT 2
                    OFFSET $offset;";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function check_like($db, $username, $house_id)
    {
        $sql = "SELECT *
            FROM likes
            WHERE house_id='$house_id' 
            AND username='$username';";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function manage_like($db, $username, $house_id, $op)
    {
        // //procedure usado en base de datos

        // // DELIMITER //
        // // CREATE PROCEDURE manage_like(
        // // IN username_p VARCHAR(25), 
        // // IN house_id_p INT(11), 
        // // IN operation VARCHAR(20)
        // // )
        // // BEGIN
        // // IF operation = 'add' THEN
        // //      INSERT INTO likes(house_id, username) 
        // //      VALUES(house_id_p, username_p);
        // //      UPDATE house
        // //      SET likes = likes + 1
        // //      WHERE house_id = house_id_p;
        // // ELSEIF operation = 'remove' THEN
        // //      DELETE FROM likes
        // //      WHERE username = username_p AND house_id = house_id_p;
        // //      UPDATE house
        // //      SET likes = likes - 1
        // //      WHERE house_id = house_id_p;
        // // END IF;
        // // END;
        // // //
        // // DELIMITER ;

        $sql = "CALL manage_like('$username', '$house_id', '$op');";
        return $db->ejecutar($sql);

    }
}



?>