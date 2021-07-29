<?php
include "../config.php";

$del_id = "";

if (empty($_REQUEST["id"]))
{
    echo "FAILED";
}
else
{
        $del_id = mysqli_real_escape_string($server, $_REQUEST['id']);
        $del_email = mysqli_real_escape_string($server, $_REQUEST['email']);
        $del_pass = mysqli_real_escape_string($server, $_REQUEST['type']);

        if (false === mysqli_query($server, "SELECT * FROM users WHERE email = '$del_email' AND password = '$del_pass'"))
        {
            echo "AUTH_ERROR";
        }
        else
        {
            if (false === mysqli_query($server, "DELETE FROM discuss
            WHERE id = $del_id"))
            {
                echo "FAILED";
            }
            else
            {
                echo "SUCCESS";
            }
    }
}
mysqli_close($server);
?>
