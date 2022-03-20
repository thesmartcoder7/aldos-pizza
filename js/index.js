let footerYear = document.querySelector(".current-year")
let currentYear = new Date
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
function Pizza(size, crust, toppings) {
    this.size = size
    this.crust = crust
    this.toppings = toppings
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


/* - - - DOM event listeners - - - */
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

footerYear.innerHTML = currentYear.getFullYear()