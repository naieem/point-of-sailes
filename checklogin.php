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

// $myusername = mysqli_real_escape_string($db->connection, $myusername);
// $mypassword = mysqli_real_escape_string($db->connection, $mypassword);

// $sql = "SELECT * FROM $tbl_name WHERE username='$myusername' and password='$mypassword'";
$db->where ('username', $myusername);
$db->where ('password', $mypassword);
$results = $db->get($tbl_name);
var_dump($results);
// $result = mysqli_query($db->connection, $sql);
// // mysqli_num_row is counting table row
// $count = mysqli_num_rows($result);
// If result matched $myusername and $mypassword, table row must be 1 row

// if ($count == 1) {
// // Register $myusername, $mypassword and redirect to file "dashboard.php"
//     $row = mysqli_fetch_row($result);

//     $_SESSION['id'] = $row[0];
//     $_SESSION['username'] = $row[1];
//     $_SESSION['usertype'] = $row[3];

//     if ($row[3] == "admin")
//         header("location: dashboard.php");
//     else
//         die("Not Valid User Type. Check with your application administartor");

// } else {
//     header("location: index.php?msg=Wrong%20Username%20or%20Password&type=error");
// }
?>