<?php
function conectaDb()
{
	try{
		$db = new PDO("mysql:host=localhost;dbname=SabioGC", "usuarios", "us_161213");
		$db->setAttribute(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, true);
		return($db);
	}catch(PDOException $e){
		echo "No se ha podido conectar a la BD";
	}
}
?>
