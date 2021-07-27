<?php
    include "../config.php";
    
    $data_string = mysqli_real_escape_string($server, htmlspecialchars($_REQUEST['q']));
  
    $search_from_discuss = mysqli_query($server, "SELECT * FROM discuss
    WHERE (`title` LIKE '%".$data_string."%') OR (`tag` LIKE '%".$data_string."%')"); 
    ini_set('memory_limit', '1G');

    if ($search_from_discuss && mysqli_num_rows($search_from_discuss) > 0) {
      # code...
      while($results = mysqli_fetch_assoc($search_from_discuss)){
        echo '<article class="col-5">
            <b>'.$results["username"].'</b>
            <h3>'.$results["title"].'</h3>
            <div class="tag">
            '.$results['tag'].'
            </div>
        </article>';
        }
    } else {
      # code...
      echo "FAILED";
    }

    mysqli_close($server);
    /* INSERT INTO `discuss`(
    `username`,
    `email`,
    `title`,
    `answer`,
    `tag`,
    `date`
)
VALUES(
    "mohammadsefatullah",
    "mohammadsefatullah0@gmail.com",
    "How to pray for allah?",
    "Rise up your hands and say him your problem or your request.",
    "<span>pray</span><span>islam</span>",
    "7/26/2021"
) */
?>