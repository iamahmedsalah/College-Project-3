
// Nav Scrolling
const links = document.querySelectorAll("nav-link");
links.forEach((item) => {
    item.addEventListener("click", ()=> {
        const el = document.getElementById(item.getAttribute("herf"));
        el.scrollIntoView({ behavior:"smooth", block:"end"})
    })
})
//  End

// Menu Scrolling
function menuScoll()  { const section4 = document.getElementById('section4');
    section4.scrollIntoView();
}
// End
function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
    } else {
    mybutton.style.display = "none";
    }
}

  // When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

//----------------------- Contact Us -------------------
const contactForm = document.querySelector('.contact-form');
let UserName = document.getElementById('UserName');
let Email = document.getElementById('email');
let Message =document.getElementById('message');
let Subject = document.getElementById('subject')

contactForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    let formData = {
        UserName: UserName.value,
        Email: Email.value,     
        Message: Message.value,
        Subject: Subject.value
    }
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/' );
    xhr.setRequestHeader('content-type' , 'application/json')
    xhr.onload = function(){
        console.log(xhr.responseText);
        if (xhr.responseText == 'success') {
            alert(' Email Sent');
            UserName.value = '';
            Email.value = '';
            Message.value = '';
            Subject.value = '';
        }else{
            alert(' Something went wrong !!');
        }
    }
    xhr.send(JSON.stringify(formData));

})

//--------------------- Shopping Cart ----------------

let carts = document.querySelectorAll('.add-carts');
let products = [{ name:'Legumes',tag:'Legumes',price: 49,inCart:0},
{ name:'Calcium fortifie',tag:'Calcium fortifie',price:49,inCart:0},
{ name:'Seaweed Roulade',tag:'Seaweed Roulade',price:49,inCart:0},
{ name:'Vegan Molasses',tag:'Vegan Molasses',price:49,inCart:0},
{ name:'Potato Stem',tag:'Potato Stem',price:49,inCart:0},
{ name:'Nutritional yeast',tag:'Nutritional yeast',price:49,inCart:0},
{ name:'Choline rich',tag:'Choline rich',price:49,inCart:0},
{ name:'Tofu Steak',tag:'Tofu Steak',price:49,nCart:0}]

for ( let i=0; i < carts.length; i++) {
    carts[i].addEventListener ('click' , ()=> { 
        cartsNumbers (products[i]);
        totalCost (products[i]);
    })
}
// on load and have to callback also cause carts never lose the num of item inside
function onLoadCartsNumbers (){
    let productNummbers = localStorage.getItem('cartsNumbers');
    if ( productNummbers ) {
        document.querySelector('.nm').textContent = productNummbers;
    }

}
// cart vale and update in web site 
function cartsNumbers (product) {
    let productNummbers = localStorage.getItem('cartsNumbers');
    productNummbers = parseInt(productNummbers);
    if (productNummbers) {
        localStorage.setItem('cartsNumbers' , productNummbers + 1);
        document.querySelector('.nm').textContent = productNummbers + 1;
    } else {
        localStorage.setItem('cartsNumbers' , 1);
        document.querySelector('.nm').textContent = 1;
    }
    setItems(product);
}
function setItems (product) {
    let cartsItems = localStorage.getItem('ProductsInCart') ;
    cartsItems = JSON.parse(cartsItems);
    if (cartsItems != null ) {
        if(cartsItems[product.tag] == undefined ) {
            cartsItems = { 
                ...cartsItems,
                [product.tag] : product
            }
        }
        cartsItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartsItems = { 
        [product.tag]: product 
    }
}
    localStorage.setItem('ProductsInCart' , JSON.stringify(cartsItems));
}

function totalCost (priceProduct) {
    let cartCost = localStorage.getItem('totalCost');
    localStorage.setItem('totalCost', priceProduct.price );
    if(cartCost != null ){
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + priceProduct.price );
    } else {
        localStorage.setItem('totalCost' , priceProduct.price);
    }
}

// Chech Out page

function displayCart () {
    let cartsItems = localStorage.getItem('ProductsInCart');
    let productContainer = document.querySelector('.products-container');
    let cartCost = localStorage.getItem('totalCost');
    cartsItems = JSON.parse(cartsItems);
    if( cartsItems && productContainer  ) {
        productContainer.innerHTML = ' ';
        Object.values(cartsItems).map( item => {
            productContainer.innerHTML +=  ` 
            <div class="products"> 
            <span> ${item.name}</span>
            <button onclick="clearCart()" class="btn"><i class="fa-solid fa-trash"></i></button>
            </div>
            <div class=" Price"> Price : ${item.price} $</div>
            <div class="Count">
            <span> Quantity: ${item.inCart}</span>
            <button class="btn"><i class="fa-solid fa-plus"></i></button>
            <button class="btn"><i class="fa-solid fa-minus"></i></button>
            </div>
        `
        });
        productContainer.innerHTML += `
        <div class ="total">
        <span> Total Price </span>
        <span  >${cartCost} $ </span>
        </div>
        `

    }
}




let clearCart= () => {
    localStorage.removeItem('ProductsInCart')
    localStorage.removeItem('totalCost')
    localStorage.removeItem('cartsNumbers')
    let productContainer = document.querySelector('.products-container');
    productContainer.textContent = ' ';
    let productNummbers = localStorage.getItem('cartsNumbers');
    productNummbers = parseInt(productNummbers);
    if (productNummbers) {
        localStorage.setItem('cartsNumbers' , productNummbers - 1);
        document.querySelector('.nm').textContent = productNummbers - 1;
    }
    else {
        localStorage.setItem('cartsNumbers' , 0);
        document.querySelector('.nm').textContent = 0;
    }
}


// Callbacks
onLoadCartsNumbers();
displayCart ()
