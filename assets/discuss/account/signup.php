<?php
    include "../config.php";

    if (empty($_REQUEST["name"])) {
      echo "Username is required.";
    } else {
      if (!preg_match("/^[a-zA-Z-' ]*$/",$_REQUEST["name"])) {
        echo "Only letters and white space allowed in username field.";
      } else {
        $signup_name = mysqli_real_escape_string($server, $_REQUEST['name']); 
      }
    }
  
    if (empty($_REQUEST["email"])) {
      echo "Email is required";
    } else {
      if (!filter_var($_REQUEST["email"], FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format.";
      } else {
        $signup_email = mysqli_real_escape_string($server, $_REQUEST['email']); 
      }
    }
  
    if (empty($_REQUEST["password"])) {
      echo "Password is required";
    } else {
      $signup_password = mysqli_real_escape_string($server, $_REQUEST['password']); 
    }
  
    $signup_in_user = "INSERT INTO users ( username, email, password ) VALUES( '" . $signup_name;
    $signup_in_user .= "', '" . $signup_email;
    $signup_in_user .= "', '" . $signup_password . "')";

    if(mysqli_num_rows(mysqli_query($server, "SELECT * FROM users WHERE email = '" . $signup_email . "'")) > 0){
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