<?php
include "../config.php";

$que_title = $que_tags = $que_username = $que_email = $que_pass = "";

if (empty($_REQUEST["title"]))
{
    echo "Question title is required.";
}
else
{
    if (empty($_REQUEST["tags"]))
    {
        echo "Question tags is required.";
    }
    else
    {
        $que_title = mysqli_real_escape_string($server, $_REQUEST['title']);
        $que_tags = mysqli_real_escape_string($server, $_REQUEST['tags']);
        $que_username = mysqli_real_escape_string($server, $_REQUEST['username']);
        $que_email = mysqli_real_escape_string($server, $_REQUEST['email']);
        $que_pass = mysqli_real_escape_string($server, $_REQUEST['_type']);

        if (false === mysqli_query($server, "SELECT * FROM users WHERE email = '$que_email' AND password = '$que_pass'"))
        {
            echo "AUTH_ERROR";
        }
        else
        {
            if (false === mysqli_query($server, "INSERT INTO discuss ( email, username, title, tag, answer) VALUES ( '$que_email','$que_username','$que_title','$que_tags','NO_ANSWER')"))
            {
                echo "FAILED";
            }
            else
            {
                echo "SUCCESS";
            }
        }
    }
}
mysqli_close($server);
?>
