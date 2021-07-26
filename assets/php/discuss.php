<?php
    include "config.php";
    
    $data_email = mysqli_real_escape_string($server, htmlspecialchars($_REQUEST['email']));
    $data_username = mysqli_real_escape_string($server, htmlspecialchars($_REQUEST['username']));
    $data_title = mysqli_real_escape_string($server, htmlspecialchars($_REQUEST['title']));
    $data_tag = mysqli_real_escape_string($server, $_REQUEST['tag']);
    $data_date = mysqli_real_escape_string($server, $_REQUEST['date']);

    $add_to_discuss = mysqli_query($server, "INSERT INTO discuss ( email, username, title, tag, date) VALUES ( '".$data_email."','".$data_username."','".$data_title."','".$data_tag."','".$data_date."')"); 
    ini_set('memory_limit', '1G');

    if ($add_to_discuss && mysqli_num_rows($add_to_discuss) > 0) {
      # code...
      echo "SUCCESS";
    } else {
      # code...
      echo "FAILED";
    }

    mysqli_close($server);
?>