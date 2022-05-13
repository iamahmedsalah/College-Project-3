
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
