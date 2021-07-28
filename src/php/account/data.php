<?php
include "../config.php";

$data_email = mysqli_real_escape_string($server, $_REQUEST['email']);
$data_password = mysqli_real_escape_string($server, $_REQUEST['password']);

$data_in_user = "SELECT * FROM users WHERE email = '" . $data_email;
$data_in_user .= "' AND password = '" . $data_password . "'";

if (mysqli_query($server, $data_in_user) && mysqli_num_rows(mysqli_query($server, $data_in_user)) > 0)
{
    # code...
    echo json_encode(mysqli_fetch_assoc(mysqli_query($server, $data_in_user)));
}
else
{
    # code...
    echo "FAILED";
}

mysqli_close($server);

?>
