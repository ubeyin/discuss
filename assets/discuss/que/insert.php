<?php
    include "../config.php";
    
    $que_title = mysqli_real_escape_string($server, htmlspecialchars($_REQUEST['title']));
    $que_tags = mysqli_real_escape_string($server, $_REQUEST['tags']);
    $que_date = mysqli_real_escape_string($server, $_REQUEST['date']);
    $que_username = mysqli_real_escape_string($server, $_REQUEST['username']);
    $que_email = mysqli_real_escape_string($server, $_REQUEST['email']);

    $add_to_discuss = mysqli_query($server, "INSERT INTO discuss ( email, username, title, tag, dates) VALUES ( '".$que_email."','".$que_username."','".$que_title."','".$que_tags."','".$que_date."')"); 
    ini_set('memory_limit', '1G');

    if ($add_to_discuss && mysqli_num_rows($add_to_discuss) > 0) {
      # code...
      echo "SUCCESS";
    } else {
      # code...
      echo "FAILED";
    }
    echo "INSERT INTO discuss ( email, username, title, tag, dates) VALUES ( '".$que_email."','".$que_username."','".$que_title."','".$que_tags."','".$que_date."')";

    mysqli_close($server);
?>