<?php
   $hostname = "localhost";
   $dbname = "id16916863_database1";
   $username = "id16916863_db1";
   $password = "-M*eAn4)N>hvId~g";

   $server = mysqli_connect($hostname, $username, $password, $dbname);

   if (!$server) {
     $error = mysqli_connect_error();
     echo ('ERROR');
   } else {
     
   }

   /* Create table if table does not exist */
   $table_of_user = "CREATE TABLE `user` (
 `username` varchar(100) NOT NULL,
 `email` varchar(100) NOT NULL,
 `title` varchar(255) NOT NULL,
 `answer` varchar(255) NOT NULL,
 `tag` varchar(255) NOT NULL,
 `date` varchar(255) NOT NULL,
) ENGINE=InnoDB";

   if (mysqli_query($server, $table_of_user)) {
     # code...
   } else {
     # code...
   }
?>