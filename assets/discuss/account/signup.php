<?php
    include "../config.php";
    
    $signup_name = mysqli_real_escape_string($server, $_REQUEST['name']); 
    $signup_email = mysqli_real_escape_string($server, $_REQUEST['email']); 
    $signup_password = mysqli_real_escape_string($server, $_REQUEST['password']); 
  
    $signup_in_user = "insert into users ( username, email, password ) values( '" . $signup_name;
    $signup_in_user .= "', '" . $signup_email;
    $signup_in_user .= "', '" . $signup_password . "')";

    $check_for_signup = "select * from users where email = '" . $signup_email . "'";

    if(mysqli_num_rows(mysqli_query($server, $check_for_signup))){
        echo "AVAILABLE";
    } else {
      if (mysqli_query($server, $signup_in_user)) {
        # code...
        echo "SUCCESS";
      } else {
        # code...
        echo "FAILED";
      }
    }

    mysqli_close($server);
?>