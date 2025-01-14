let bagIcon = document.querySelector("#bag-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");

bagIcon.onclick = () => {
    cart.classList.add("active");
}

closeCart.onclick = () => {
    cart.classList.remove("active");
}

if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded',ready);
}else{
    ready();
}


function ready(){
    var removeCartProducts = document.getElementsByClassName('cart-remove');
    console.log(removeCartProducts);
    for(var i=0; i<removeCartProducts.length; i++){
        var product = removeCartProducts[i];
        product.addEventListener('click',removeCartItem);
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for(var i=0; i<quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener('change',quantityChange);
    }
    // add to cart
    var cartAdd = document.getElementsByClassName('cart-add');
    for(var i=0; i<cartAdd.length; i++){
        var button = cartAdd[i];
        button.addEventListener('click', addCartClicked);
    }
    document.getElementsByClassName('btn-buy')[0].addEventListener('click',buyClicked);
}

function buyClicked(event){


}

function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

function quantityChange(event){
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updateTotal();
}

function addCartClicked(event){
    var button = event.target;
    var shopProducts = button.parentElement.parentElement;
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price = shopProducts.getElementsByClassName('product-price-text')[0].innerText;
    var productImg = shopProducts.getElementsByClassName('product-item')[0].src;
    addProductToCart(shopProducts,title,price,productImg);
    updateTotal();
}

function addProductToCart(productItem,title, price, productImg){
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box')
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for(var i = 0; i < cartItemsNames.lengt; i++){
        if(cartItemsNames[i].innerText == title){
            productItem.getElementsByClassName('cart-quantity')[0].value = 1;
            alert("you have already add this item to cart");
            return;
        }
    }


    var cartBoxContent = `
                    <img src="${productImg}" alt="" class="cart-item">
                    <div class="detail-box">
                        <div class="cart-product-title"> ${title} </div>
                        <div class="cart-price">${price}</div>
                        <input type="number" value="1" class="cart-quantity">
                        </div>       
                  <i class='bx bxs-trash cart-remove'></i> 
                  </div>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);

    cartShopBox.getElementsByClassName('cart-remove')[0]
    .addEventListener('click',removeCartItem);

    cartShopBox.getElementsByClassName('cart-quantity')[0]
    .addEventListener('change',quantityChange);
}



function updateTotal(){
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;
    for(var i=0; i<cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace('₪', ''));
        var quantity = quantityElement.value;
        total = total + (price*quantity);
    }
    document.getElementsByClassName('total-price')[0].innerText = "₪" + total;
}
