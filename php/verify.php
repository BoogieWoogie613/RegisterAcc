<?php
$CN = mysqli_connect("localhost", "root", "");
$DB = mysqli_select_db($CN, "expoaccount");

$EncodedData = file_get_contents('php://input');
$DecodedData = json_decode($EncodedData, true);

if (isset($DecodedData['username']) && isset($DecodedData['password'])) {
    $username = $DecodedData['username'];
    $password = $DecodedData['password'];

    $query = "SELECT * FROM users WHERE username='$username' AND password='$password'";
    $result = mysqli_query($CN, $query);

    if (mysqli_num_rows($result) > 0) {
        $Response[] = array("Message" => "Login successful");
    } else {
        $Response[] = array("Message" => "Invalid username or password");
    }
} else {
    $Response[] = array("Message" => "Invalid input");
}

echo json_encode($Response);
?>