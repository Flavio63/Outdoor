<?php

require 'Slim/Slim.php';

$app = new Slim();

$app->get('/regioni', 'getRegioni');
$app->get('/regioni/:id', 'getRegione');
$app->get('/province', 'getProvince');
$app->get('/province/:id', 'getProvincia');
$app->get('/wines/search/:query', 'findByName');
$app->post('/wines', 'addWine');
$app->put('/wines/:id', 'updateWine');
$app->delete('/wines/:id',	'deleteWine');

$app->run();

function getRegioni() {
	$sql = "SELECT idArea, idRegione, DescRegione FROM aff_aree_regioni_province GROUP BY idArea, idRegione, DescRegione ORDER BY idRegione";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$regioni = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($regioni);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getRegione($id) {
	$sql = "SELECT * FROM aff_aree_regioni_province WHERE idRegione=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("idRegione", $id);
		$stmt->execute();
		$regione = $stmt->fetchObject();  
		$db = null;
		echo json_encode($regione); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getProvince(){
	$sql = "SELECT idArea, idRegione, idProvincia, DescProvincia, Sigla FROM aff_aree_regioni_province GROUP BY idArea, idRegione, idProvincia, DescProvincia, Sigla ORDER BY idRegione, idProvincia";
	try {
		$db = getConnection();
                echo 'sono in getProvince()';
		$stmt = $db->query($sql);
		$province = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($province);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getProvincia($id){
	$sql = "SELECT * FROM aff_aree_regioni_province WHERE idProvincia=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("idProvincia", $id);
		$stmt->execute();
		$provincia = $stmt->fetchObject();  
		$db = null;
		echo json_encode($provincia); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getConnection() {
	$dbhost="localhost"; // "127.0.0.1";
	$dbuser="root";
	$dbpass="fla63auda";
	$dbname="my_flavilla";
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}

?>