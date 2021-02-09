<?php
session_start();
require_once('lib/MysqliDB.class.php');
include_once "config.php";
$db = new MysqliDb ( $config['host'], $config['username'], $config['password'],$config['database']);

$tbl_name = "stock_user"; // Table name

// username and password sent from form 
$myusername = $_REQUEST['username'];
$mypassword = $_REQUEST['password'];

// To protect MySQL injection (more detail about MySQL injection)
$myusername = stripslashes($myusername);
$mypassword = stripslashes($mypassword);

$myusername = $db->escape ($myusername);
$mypassword = $db->escape ($mypassword);

// $sql = "SELECT * FROM $tbl_name WHERE username='$myusername' and password='$mypassword'";
$db->where ('username', $myusername);
$db->where ('password', $mypassword);
$results = $db->ObjectBuilder()->get($tbl_name);
// var_dump($results);
if ($db->count > 0 && $db->count < 2){
    echo $results[0]->username;
    $_SESSION['id'] = $results[0]->id;
    $_SESSION['username'] =$results[0]->username;
    $_SESSION['usertype'] = $results[0]->user_type;
    if ($results[0]->user_type == "admin")
        header("location: dashboard.php");
    else
        die("Not Valid User Type. Check with your application administartor");
}else {
        header("location: index.php?msg=Wrong%20Username%20or%20Password&type=error");
}
?>