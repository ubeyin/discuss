<?php
    include "../config.php";
    
    $data_string = mysqli_real_escape_string($server, htmlspecialchars($_REQUEST['q']));
  
    $search_from_discuss = mysqli_query($server, "SELECT * FROM discuss
    WHERE `verified` = '1' AND (`title` LIKE '%".$data_string."%') OR (`tag` LIKE '%".$data_string."%')"); 
    ini_set('memory_limit', '1G');

    if (false === $search_from_discuss) {
      echo "FAILED";
    } else {
      while($results = mysqli_fetch_assoc($search_from_discuss)){
        echo '<article class="col-5">
            <b>'.$results["username"].'</b>
            <h3>'.$results["title"].'</h3>
            <div class="tag">
            '.$results['tag'].'
            </div>
        </article>';
        }
    }

    mysqli_close($server);
?>