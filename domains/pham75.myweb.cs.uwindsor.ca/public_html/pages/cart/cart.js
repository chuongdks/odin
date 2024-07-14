window.addEventListener("load", init);

// Global variable
let body = document.querySelector("body");
let openCart = document.querySelector(".icon-cart");
let closeCart = document.querySelector("#close");

let listProduct = document.querySelector(".listProduct");

let listCartHTML = document.querySelector(".listCart");

let iconCartSpan = document.querySelector(".icon-cart span")

let carts = [];

function init()
{
    openCart.addEventListener("click", OpenShoppingCart);
    closeCart.addEventListener("click", CloseShoppingCart);
    listProduct.addEventListener("click", SelectItem);
}

// Opening and cloing the Shopping Cart
function OpenShoppingCart()
{
    body.classList.toggle("showCart");
}

function CloseShoppingCart()
{
    body.classList.toggle("showCart");
}

// Find the data-id of listProduct when clicking the 'addCart' button
function SelectItem(evt)
{
    let positionClick = evt.target;
    if (positionClick.classList.contains("addCart"))
    {
        let product_id = positionClick.parentElement.dataset.id
        // alert(product_id);
        AddToCart(product_id);
    }
}

// Add product to the global 'carts' Object
function AddToCart(product_id)
{
    // Find the first occurance of the product_id
    let indexOfCart = carts.findIndex((item) => item.product_id == product_id);

    // If no product in cart
    if (carts.length <= 0)
    {
        carts = 
        [{
            product_id: product_id,
            quantity: 1
        }]
    }
    // If the product has not been put in the cart yet
    else if (indexOfCart < 0)
    {
        carts.push
        ({
            product_id: product_id,
            quantity: 1
        });
    }
    // If the product is already in the cart 
    else 
    {
        carts[indexOfCart].quantity+=1;
    }

    // Add the product to the HTML shopping cart screen
    AddToCartHTML();

    console.log(carts); // debugging
}

// Add product to the Cart screen in the HTML
function AddToCartHTML()
{
    listCartHTML.textContent = "";
    if (carts.length > 0)
    {
        carts.forEach(AddCarts);
    }
}

function AddCarts(cart)
{
    // Create new item for the 'listCart'
    let newCart = document.createElement("div");
    newCart.classList.add("item");

    // Find the product in listProduct using cart's product_id
    let product = listProduct.querySelector(`.item[data-id="${cart.product_id}"]`);

    // Extract the details from the product element
    let productImage = product.querySelector("img").src;
    let productName = product.querySelector("h2").textContent;
    let productPrice = product.querySelector(".price").textContent;
    let priceNumber = Number(productPrice.slice(1));

    // innerHTML data of the 'listCart'
    newCart.innerHTML = `
    <div class="image">
        <img src="${productImage}" alt="">
    </div>

    <div class="name">
        ${productName}
    </div>

    <div class="totalPrice">
        $${priceNumber * cart.quantity}
    </div>

    <div class="quantity">
        <span class="minus">-</span>
        <span>${cart.quantity}</span>
        <span class="plus">+</span> 
    </div>    
    `;

    // Append all the data to the Shopping cart page
    listCartHTML.appendChild(newCart);
}

