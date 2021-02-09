<?php
include_once("init.php");

$db->where ('stock_name', $_POST['stock_name1']);
$line  = $db->ObjectBuilder()->get ('stock_details');

$cost = $line[0]->company_price;
$sell = $line[0]->selling_price;
$stock_id = $line[0]->stock_id;

$db->where ('name', $_POST['stock_name1']);
$results = $db->ObjectBuilder()->get ('stock_avail');
$stock = $results[0]->quantity;

if ($line != NULL) {

    $arr = array("cost" => "$cost", "sell" => "$sell", "stock" => "$stock", "guid" => $stock_id);
    echo json_encode($arr);

} else {
    $arr1 = array("no" => "no");
    echo json_encode($arr1);

}
?>