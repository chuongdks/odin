<?php
session_start();
// Global Session to count order number
if (!isset($_SESSION['order'])) 
{
    $_SESSION['order'] = 0;
}

// Check if the data parameter is set
if(isset($_POST['data'])) 
{
    // Increment the order number
    $_SESSION['order']++;

    // Get the JSON data
    $jsonData = $_POST['data'];
    
    // Decode the JSON data to a PHP array using "json_decode"
    $carts = json_decode($jsonData, true);
    
    // Check if the JSON decoding was successful
    if($carts !== null) 
    {
        // Process each cart item
        echo "\nOrder Number: " . $_SESSION['order'];
        foreach($carts as $cart) 
        {
            $product_id = $cart['product_id'];
            $quantity = $cart['quantity'];
            
            echo "\nProduct ID: " . $product_id . " Quantity: " . $quantity;
        }
    } 
    else 
    {
        echo "Failed to decode JSON";
    }
} 
else 
{
    echo "No data received";
}
?>
