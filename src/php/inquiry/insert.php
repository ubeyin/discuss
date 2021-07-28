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
        $que_pass = mysqli_real_escape_string($server, $_REQUEST['password']);

        $add_to_discuss = mysqli_query($server, "INSERT INTO discuss ( email, username, title, tag, answer) VALUES ( '" . $que_email . "','" . $que_username . "','" . $que_title . "','" . $que_tags . "','NO_ANSWER')");
        ini_set('memory_limit', '1G');

        if ($add_to_discuss)
        {
            # code...
            echo "SUCCESS";
        }
        else
        {
            # code...
            echo "FAILED";
            echo mysqli_error($server);
        }

    }
}
mysqli_close($server);
?>
