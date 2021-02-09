<?php
ob_start();
session_start();
if (isset($_POST['host']) and isset($_POST['username']) and $_POST['host'] != "" and $_POST['username'] != "") {
    $host = trim($_POST['host']);
    $user = trim($_POST['username']);
    $pass = trim($_POST['password']);
    $name = '';
    $_SESSION['host'] = $host;
    $_SESSION['user'] = $user;
    $_SESSION['pass'] = $pass;
    $con = mysqli_connect("$host", "$user", "$pass");
    if (!$con) {
        $data = "Database Configration is Not vaild";
        header("location: install_step1.php?msg=$data");
        exit;
    }
    if (isset($_POST['name'])) {
        $name = $_POST['name'];
        $sql = "CREATE DATABASE $name";
        if (!mysqli_query($con, $sql)) {
            $data = "This Database Name Is Already In the DataBase";
            header("location: install_step2.php?msg=$data");
            exit;
        }
    }
    if (isset($_POST['select_box'])) {
        $name = $_POST['select_box'];
    }   
    $_SESSION['db_name'] = $name;
    // mysqli_close($con);
    $con = mysqli_connect("$host", "$user", "$pass", "$name");
    if (mysqli_connect_errno()) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }
    if (isset($_POST['dummy'])) {
        $sql = file_get_contents('install_db/structure_with_demo.sql');
    } else {
        $sql = file_get_contents('install_db/structure_only.sql');
    }

    // /* execute multi query */
    if (mysqli_multi_query($con, $sql)) {
        do {
            try {
                if ($result = mysqli_store_result($con)) {
                    while ($row = mysqli_fetch_row($result)) {
                        printf("%s\n", $row[0]);
                    }
                    mysqli_free_result($result);
                } else {
                    die("issue with query")
                //    echo "issue with query";
                }
                /* print divider */
                if (mysqli_more_results($con)) {
                    printf("-----------------\n");
                }
            } catch (Exception $e) {
                echo 'Caught exception: ', $e->getMessage(), "\n";
            }
        } while (mysqli_next_result($con));
    } else {
        die('Problem in query execution.');
    }
    /*$ourFileName = "config.php";
    $ourFileHandle = fopen($ourFileName, 'w') or die("Not able to write config file (check directory permissions). You can directly Create config.php file as like config.php.sample file. ");
    $data = '<?php $config["database"] = "' . $name . '"; $config["host"]= "' . $host . '";$config["username"]= "' . $user . '"; $config["password"]= "' . $pass . '";?>';
    fwrite($ourFileHandle, $data);
    fclose($ourFileHandle);
    // mysqli_close($con);
    header("location: install_step3.php");*/

} else {
    header("location: install_step1.php");
}
//

?> 