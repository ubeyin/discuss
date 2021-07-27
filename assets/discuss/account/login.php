<?php
    include "../config.php";
    
    $login_email = mysqli_real_escape_string($server, $_REQUEST['email']); 
    $login_password = mysqli_real_escape_string($server, $_REQUEST['password']); 
  
    $login_in_user = "SELECT * FROM users WHERE email = '" . $login_email; 
    $login_in_user .= "' AND password = '" . $login_password . "'"; 
    if (mysqli_num_rows(mysqli_query($server, "SELECT * FROM users WHERE email = '".$login_email)) > 0) {
      if (mysqli_query($server, $login_in_user) && mysqli_num_rows(mysqli_query($server, $login_in_user)) > 0) {
      echo "SUCCESS";
    } else {
      echo "FAILED";
    }
    } else {
    echo "UNAVAILABLE";
    }

    mysqli_close($server);

    /*
    $sql_add = mysqli_query($connect, "CREATE TABLE users ( username varchar(30) , email varchar(100) , password varchar(50) ) ENGINE=InnoDB");

    if ($sql_add) {
      echo "<div class='alert success center'><p>Table created!</p></div>";
    } else {
      echo "<div class='alert warning center'><p>Failed to create a table!</p></div>";
    }

    if ($username && $email && $password) {
    $sql_set = mysqli_query($connect, "INSERT INTO users ( username, email, password ) VALUES( '" . $username . "','" . $email . "','" . $password . "' )");
    if ($sql_set) {
      echo "<div class='alert success center'><p>Data inserted!</p></div>";
    } else {
      echo "<div class='alert warning center'><p>Failed to insert data!</p></div>";
    }

    $sql_gets = mysqli_query($connect, "SELECT * FROM users");
    if (mysqli_num_rows($sql_gets) > 0) {
      if ($sql_gets) {
        $sql_get = mysqli_fetch_assoc($sql_gets);
        echo "<div class='alert success center'>Username: <p>" . $sql_get['username'] . "</p><br>Email: <p>" . $sql_get['email'] . "</p></div>";
      } else {
        echo "<div class='alert warning center'><p>Failed to fetch data from table!</p></div>";
      }
    }
}
    */
?>