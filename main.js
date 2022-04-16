let carts = document.querySelectorAll('.add-cart');
let btn = document.querySelector('button');


let products = [
    {
        name:"Red Tie" ,
        tag:"clothe-1" ,
        price:20 ,
        inCart: 0
    },
    {
        name: "Beige Coat",
        tag: "clothe-2",
        price: 60,
        inCart: 0
    },
    {
        name: "Light Brown Coat",
        tag: "clothe-3",
        price: 70,
        inCart: 0
    },
    {
        name: "Brown Shoes",
        tag: "clothe-4",
        price: 50,
        inCart: 0
    },
    {
        name: "Blue Shirt",
        tag: "clothe-5",
        price: 30,
        inCart: 0
    },
    {
        name: "White Shirt",
        tag: "clothe-6",
        price: 25,
        inCart: 0
    }
]

for(let i=0 ; i < carts.length; i++){
    carts[i].addEventListener('click',() =>{
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers){

        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(products){
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    }else{
        localStorage.setItem('cartNumbers',1);
        document.querySelector('.cart span').textContent = 1;
    } 

    setItems(products);
}

function setItems(products){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null){

        if(cartItems[products.tag] == undefined){
            cartItems = {
                ...cartItems,
                [products.tag]: products
            }
        }
        cartItems[products.tag].inCart += 1;
    }else{
        products.inCart = 1;
        cartItems = {
            [products.tag]: products
        }
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(products){
    let cartCoast = localStorage.getItem('totalCost');

    if(cartCoast != null){
        cartCoast = parseInt(cartCoast);
        localStorage.setItem("totalCost" , cartCoast + products.price);
    }else{
        localStorage.setItem("totalCost", products.price)
    }
}

function displayCart(){
    let cartCoast = localStorage.getItem('totalCost');
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");

    console.log(cartItems);
    if(cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
                
                <img src="images/${item.tag}.jpeg">
                <span>${item.name}</span>
            </div>
            <div class="price">$${item.price},00</div>
            <div class="quantity style="padding-top: 10px;">
                
                <span>${item.inCart}</span>
                
            </div>
            <div class="total">
                $${item.inCart * item.price},00
            </div>
            `;
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Basket Total
                </h4>
                <h4 class="basketTotal">
                    $${cartCoast},00
                </h4>


        `;

    }
}

onLoadCartNumbers();
displayCart();

btn.addEventListener('click',()=>{
    localStorage.clear();
    window.location.reload();
});