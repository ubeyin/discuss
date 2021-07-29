<?php
include "../config.php";

$data_email = mysqli_real_escape_string($server, $_REQUEST['email']);
$data_pass = mysqli_real_escape_string($server, $_REQUEST['type']);

$data_of_user = mysqli_query($server, "SELECT * FROM users
    WHERE email = '$data_email' AND password = '$data_pass'");
$data_of_my = mysqli_query($server, "SELECT * FROM discuss
     WHERE email = '$data_email'");

if (false === $data_of_user)
{
    echo "AUTH_ERROR";
}
else
{
    if (false === $data_of_user)
    {
        echo "FAILED";
    }
    else
    {
       
        while ($results = mysqli_fetch_assoc($data_of_my))
        {
            echo '<article class="col-5">
              <p class="delete" onclick="delQuestion('.$results['id'].')"><i data-slize="trash-2">Delete</i></p>
              <b>' . $results["username"] . '</b>
              <h3>' . $results["title"] . '</h3>
              <div class="tag">
              ' . $results['tag'] . '
              </div>
              
          </article>';
        }
    }
}

mysqli_close($server);
?>
