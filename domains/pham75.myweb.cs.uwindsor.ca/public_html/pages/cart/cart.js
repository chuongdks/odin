window.addEventListener("load", init);

// Global variable
let body            = document.querySelector("body");
let openCart        = document.querySelector(".icon-cart");
let closeCart       = document.querySelector("#close");
let listProduct     = document.querySelector(".listProduct");
let listCartHTML    = document.querySelector(".listCart");
let iconCartSpan    = document.querySelector(".icon-cart span")
let checkOut        = document.querySelector("#checkOut")
let totalAmount     = document.querySelector("#totalAmount");

let carts = [];

function init() {
    openCart.addEventListener("click", OpenShoppingCart);
    closeCart.addEventListener("click", CloseShoppingCart);

    listProduct.addEventListener("click", SelectItem);

    listCartHTML.addEventListener("click", SelectVolume);
    listCartHTML.addEventListener("click", SelectCancel);

    checkOut.addEventListener("click", CheckOut);

    // When the site is loaded, check if item in 'carts' is available
    if (localStorage.getItem('cart')) {
        carts = JSON.parse(localStorage.getItem('cart')); // convert back from JSON String to Array of Object
        AddToCartHTML();
    }
}

// Opening and closing the Shopping Cart
function OpenShoppingCart() {
    body.classList.toggle("showCart");
}

function CloseShoppingCart() {
    body.classList.toggle("showCart");
}

// Find the data-id of listProduct when clicking the 'addCart' button
function SelectItem(evt) {
    let positionClick = evt.target;
    if (positionClick.classList.contains("addCart")) {
        let product_id = positionClick.parentElement.dataset.id;
        AddToCart(product_id);
    }
}

// Add product to the global 'carts' Object
function AddToCart(product_id) {
    // Find the first occurrence of the product_id
    let indexOfCart = carts.findIndex((cart) => cart.product_id == product_id);

    // If no product in cart
    if (carts.length <= 0) {
        carts = [
            {
                product_id: product_id,
                quantity: 1
            }
        ]
    }
    // If the product has not been put in the cart yet (findIndex() method returns -1 if no match is found)
    else if (indexOfCart < 0) {
        carts.push({
            product_id: product_id,
            quantity: 1
        });
    }
    // If the product is already in the cart 
    else {
        carts[indexOfCart].quantity++;
    }

    // Add the product to the HTML shopping cart screen
    AddToCartHTML();

    // Store the data of cart to a local storage so if page refresh, the data won't be lost 
    AddCartToMemory();
}

// Add product to the Cart screen in the HTML
function AddToCartHTML() {
    let totalQuantity = 0;
    let totalPrice = 0;
    listCartHTML.textContent = "";
    if (carts.length > 0) {
        carts.forEach(cart => {
            totalQuantity = AddCarts(cart, totalQuantity);
            totalPrice += UpdateTotalAmount(cart);
        });
    }

    iconCartSpan.textContent = totalQuantity;
    totalAmount.textContent = totalPrice.toFixed(2);
}

// for each item of the Object 'carts', add the 'total Quantity' and add the item from 'listProduct' onto the screen
function AddCarts(cart, totalQuantity) {
    // Add the total Quantity of the shopping cart
    totalQuantity += cart.quantity;
    
    // Create new item for the 'listCart'
    let newCart = document.createElement("div");
    newCart.classList.add("item");
    newCart.dataset.id = cart.product_id; // create a data-id based on the cart product-id

    // Find the product in listProduct using cart's product_id
    let product = listProduct.querySelector(`.item[data-id="${cart.product_id}"]`);

    // Extract the details from the product element
    let productImage = product.querySelector("img").src;
    let productName = product.querySelector("h2").textContent;
    let productPrice = product.querySelector(".price").textContent;
    let priceNumber = Number(productPrice.slice(1));

    // innerHTML data of the 'listCart'
    newCart.innerHTML = `
    <button class="cancel">X</button>

    <div class="image">
        <img src="${productImage}" alt="">
    </div>

    <div class="name">
        ${productName}
    </div>

    <div class="totalPrice">
        $${(priceNumber * cart.quantity).toFixed(2)}
    </div>

    <div class="quantity">
        <span class="minus">-</span>
        <span>${cart.quantity}</span>
        <span class="plus">+</span> 
    </div>    
    `;

    // Append all the data to the Shopping cart page
    listCartHTML.appendChild(newCart);

    return totalQuantity;
}

// Calculate and update the total amount
function UpdateTotalAmount(cart) {
    let product = listProduct.querySelector(`.item[data-id="${cart.product_id}"]`);
    let productPrice = product.querySelector(".price").textContent;
    let priceNumber = Number(productPrice.slice(1));
    return priceNumber * cart.quantity;
}

// Change the 'carts' quantity when clicking plus or minus button 
function SelectVolume(evt) {
    let positionClick = evt.target;

    if (positionClick.classList.contains("minus") || positionClick.classList.contains("plus")) {
        let product_id = positionClick.parentElement.parentElement.dataset.id; // CALL parent Element TWICE!
        let type = "minus";
        
        if (positionClick.classList.contains("plus")) {
            type = "plus";
        }

        ChangeQuantity(product_id, type);
    }
}

// ChangeQuantity function
function ChangeQuantity(product_id, type) {
    // Find the first occurrence of the product_id
    let indexOfCart = carts.findIndex((cart) => cart.product_id == product_id);
    if (indexOfCart >= 0) {
        switch (type) {
            case "plus":
                carts[indexOfCart].quantity++;
                break;

            case "minus":
                let valueChangeAfterSubtract = carts[indexOfCart].quantity - 1;
                if (valueChangeAfterSubtract > 0) {
                    carts[indexOfCart].quantity--;
                } else {
                    carts[indexOfCart].quantity = 1;
                }
                break;
        }
    }

    // Add the product to the HTML shopping cart screen
    AddToCartHTML();

    // Store the data of cart to a local storage so if page refresh, the data won't be lost 
    AddCartToMemory();
}

// Cancel the order when pressing 'X' by splicing the carts array 
function SelectCancel(evt) {
    let positionClick = evt.target;
    
    if (positionClick.classList.contains("cancel")) {
        let product_id = positionClick.parentElement.dataset.id; // CALL parent Element TWICE!
        let indexOfCart = carts.findIndex((cart) => cart.product_id == product_id);
        carts.splice(indexOfCart, 1);
    }

    // Add the product to the HTML shopping cart screen
    AddToCartHTML();

    // Store the data of cart to a local storage so if page refresh, the data won't be lost 
    AddCartToMemory();
}

// Store cart data in local storage
function AddCartToMemory() {
    localStorage.setItem('cart', JSON.stringify(carts)); // convert from a JavaScript array to JSON string
}

// Handle checkout process
function CheckOut() {
    let cartsJSON = JSON.stringify(carts); // convert from a JavaScript array to JSON string

    console.log(cartsJSON);

    let xhr = new XMLHttpRequest();

    xhr.open("POST", "cart.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("data=" + cartsJSON); // Send data to PHP

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log("Response from server:", xhr.responseText); // Log the response from PHP
            carts.splice(0);
            
            // Add the product to the HTML shopping cart screen
            AddToCartHTML();
            
            // Store the data of cart to a local storage so if page refresh, the data won't be lost 
            AddCartToMemory();
        }
    }
}
