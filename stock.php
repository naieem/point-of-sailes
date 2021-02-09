<?php
include_once("init.php");
$q = strtolower($_GET["q"]);
if (!$q) return;
// $db->query("SELECT * FROM stock_avail where quantity >0 ");
$db->where ('quantity', 0,">");
$results = $db->ObjectBuilder()->get ('stock_avail');
if ($db->count > 0){
    foreach ($results as $line) { 
        if (strpos(strtolower($line->name), $q) !== false) {
            echo "$line->name\n";
        }
    }
}
    

?>