
<?php
    $CN = mysqli_connect("localhost", "root", "");
    $DB = mysqli_select_db($CN, "expoaccount");

    $EncodedData = file_get_contents('php://input');
    $DecodedData = json_decode($EncodedData, true);

    $username = $DecodedData['username'];
    $password= $DecodedData['password'];

    $insertMemberData = "insert into users(username, password) 
    values ('$username', '$password')";

    $register = mysqli_query($CN, $insertMemberData);

    if ($register) 
        $Message = "Member has been registered successfully";
    else 
        $Message = "Server Error... please try latter";

    $Response[] = array("Message" => $Message);
    echo json_encode($Response);
?>