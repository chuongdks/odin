<?php

$fullname = $_POST['fullname'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$message = $_POST['message'];


$servername = "localhost";
$username = "pham75_group-project-shopping-carts";
$password = "kJ84nt8MrgJNhbHWgbXs";
$dbname = "pham75_group-project-shopping-carts";

try {
   
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

   
    $stmt = $conn->prepare("INSERT INTO messages (fullname, email, phone, message) VALUES (:fullname, :email, :phone, :message)");

   
    $stmt->bindParam(':fullname', $fullname);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':phone', $phone);
    $stmt->bindParam(':message', $message);
    $stmt->execute();

    echo "Message sent successfully...";

} catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}


$conn = null;

?>
