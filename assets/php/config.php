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
     `id` int(8) NOT NULL AUTO_INCREMENT,
     `username` varchar(20) NOT NULL DEFAULT 'Unknown',
     `email` varchar(100) NOT NULL,
     `verified` tinyint(1) NOT NULL DEFAULT '0',
     `password` varchar(100) NOT NULL,
      PRIMARY KEY (`id`)
   ) ENGINE=InnoDB";

   if (mysqli_query($server, $table_of_user)) {
     # code...
   } else {
     # code...
   }
   /* */
   $table_of_discuss = "CREATE TABLE `discuss` (
    `username` varchar(100) NOT NULL  DEFAULT 'Unknown',
    `email` varchar(100) NOT NULL,
    `title` varchar(255) NOT NULL,
    `answer` varchar(255) NOT NULL  DEFAULT 'No answer',
    `tag` varchar(20) NOT NULL  DEFAULT 'No tag',
    `date` varchar(20) NOT NULL,
  ) ENGINE=InnoDB";

  if (mysqli_query($server, $table_of_discuss)) {
    # code...
  } else {
    # code...
  }
?>