/* - - - getting current year on the footer - - - */
let footerYear = document.querySelector(".current-year")
let currentYear = new Date
footerYear.innerHTML = currentYear.getFullYear()

/* - - - modal related variables - - - */
let orderModal = document.querySelector("#order-modal")
let orderModalHide = document.querySelector("#close-order-modal")
let orderModalShow = document.querySelector("#order")
let deliveryChecked = document.querySelector("#delivery-option")
let locationInput = document.querySelector("#location")
let orderPlacement = document.querySelector("#place-order")
let orderTotalPrompt = document.querySelector("#total")
let orderConfirmation = document.querySelector("#confirm")
let orderCompletionModal = document.querySelector("#confirmation")
let orderCompletion = document.querySelector("#order-confirm")

/* - - - the pizza object constructor - - -  */
function Pizza(type, size, crust, toppings, quantity) {
    this.type = type
    this.size = size
    this.crust = crust
    this.toppings = toppings
    this.quantity = quantity
}

Pizza.prototype.getStandardPrice = function(){
    if(this.size === "large"){
        return 10    
    } else if(this.size === "medium"){
        return 9
    } else {
        return 8
    }
}

Pizza.prototype.getCrust = function(){
    if(this.crust === "glutten-free"){
        return 3
    } else if(this.crust === "stuffed"){
        return 2
    } else {
        return 1
    }
}

Pizza.prototype.getToppings = function(){
    if(this.size === "large"){
        return 6 * this.toppings.length
    } else if(this.size === "medium"){
        return 3 * this.toppings.length
    } else {
        return 2 * this.toppings.length
    }
}

/* - - - modal related DOM event listeners - - - */
orderModalHide.addEventListener("click", ()=>{
    orderModal.style.display = "none"
})

orderModalShow.addEventListener("click", ()=>{
    orderModal.style.display = "flex"
})

deliveryChecked.addEventListener("click", ()=>{
    locationInput.value = ''
    locationInput.classList.toggle("hide")
})

orderPlacement.addEventListener("click", ()=>{
    orderTotalPrompt.style.display = "block"
    console.log(locationInput.value)
})

orderConfirmation.addEventListener("click", ()=>{
    orderModal.style.display = "none"
    orderCompletionModal.style.display = "flex"
})

orderCompletion.addEventListener("click", ()=>{
    orderCompletionModal.style.display = "none"
    window.location.reload()
})

/* - - - form variables - - -  */
let form = document.querySelector("#order-form")
let userToppings = document.getElementsByName("toppings")
let userName = document.querySelector("#name")
let userEmail = document.querySelector("#email")
let userSize = document.querySelector("#size")
let userType = document.querySelector("#type")
let userCrust = document.querySelector("#crust")
let userQuantity = document.querySelector("#quantity")
let userNameEmail = document.querySelector(".name-email")
let pizzaToppings = []
let totalOrders = []

/* - - - add order to cart - - - */
function addOrderToCart(newOrder){
    if(totalOrders.length === 0){
        totalOrders.push(newOrder)
    }else {
        if(totalOrders.includes(newOrder)){
            alert("This item already exists in your cart!")
        } else {
            totalOrders.push(newOrder)
        }
    }
}

/* - - - validation function - - - */
function validation(name, email, size, type, crust, quantity){
    if(name.value === "" || email.value === "" ){
        return [false,"Fill in your details in the all the fields"]
    } else if(size.value === "size") {
        return [false, "Please choose the size of pizza you want"]
    } else if(crust.value === "crust"){
        return [false, "Please choose a crust for your pizza"]
    } else if (type.value === "type"){
        return [false,"Please choose the type of pizza you want"]
    } else {
        return [true,"Please choose the type of pizza you want"]
    }
        
         
}

/* - - - form submission event - - - */
form.addEventListener("submit", (e)=>{
    e.preventDefault()
    if(!validation(userName, userEmail, userSize, userType, userCrust)[0]){
        alert(validation(userName, userEmail, userSize, userType, userCrust)[1])
        console.log()
        return
    }
    

    for(i=0; i<userToppings.length; i++){
        if(userToppings[i].checked === true){
            if(!pizzaToppings.includes(userToppings[i].value)){
                pizzaToppings.push(userToppings[i].value)
            }
        }
    }

    let newOrder = new Pizza(
        userType.value, 
        userSize.value, 
        userCrust.value, 
        pizzaToppings,
        userQuantity
    )
    
    addOrderToCart(newOrder)
    
    console.log(totalOrders)

    /* - - - - makes sure that all orders are under one name - - - */
    userNameEmail.style.display = "none"
    
})


