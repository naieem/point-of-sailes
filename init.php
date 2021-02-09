<?php
ob_start();
session_start(); // Use session variable on this page. This function must put on the top of page.
if (!isset($_SESSION['username']) || $_SESSION['usertype'] != 'admin') { // if session variable "username" does not exist.
    header("location: index.php?msg=Please%20login%20to%20access%20admin%20area%20!&type=error"); // Re-direct to index.php
}

// include("lib/db.class.php");
require_once('lib/MysqliDB.class.php');
if (!include_once "config.php") {
    header("location: install_step1.php");
}

// Open the base (construct the object):
$db = new MysqliDb ( $config['host'], $config['username'], $config['password'],$config['database']);

# Note that filters and validators are separate rule sets and method calls. There is a good reason for this.

require "lib/gump.class.php";

$gump = new GUMP();


// Messages Settings
$POS = array();
$POS['username'] = $_SESSION['username'];
$POS['usertype'] = $_SESSION['usertype'];
$POS['msg'] = '';
if (isset($_REQUEST['msg']) && isset($_REQUEST['type'])) {

    if ($_REQUEST['type'] == "error")
        $POS['msg'] = "<div class='error-box round'>" . $_REQUEST['msg'] . "</div>";
    else if ($_REQUEST['type'] == "warning")
        $POS['msg'] = "<div class='warning-box round'>" . $_REQUEST['msg'] . "</div>";
    else if ($_REQUEST['type'] == "confirmation")
        $POS['msg'] = "<div class='confirmation-box round'>" . $_REQUEST['msg'] . "</div>";
    else if ($_REQUEST['type'] == "infomation")
        $POS['msg'] = "<div class='information-box round'>" . $_REQUEST['msg'] . "</div>";
}

// function getCountOfTables($tablename){
//     $count = $db->getValue ("users", "count(*)");
// }
?>