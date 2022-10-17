/* - - - getting current year on the footer - - - */
let footerYear = document.querySelector(".current-year") as HTMLSpanElement 
let currentYear: Date = new Date
footerYear.innerHTML = String(currentYear.getFullYear())

/* - - - modal related variables - - - */
let orderModal = document.querySelector("#order-modal") as HTMLDivElement
let orderModalHide = document.querySelector("#close-order-modal") as SVGElement
let orderModalShow = document.querySelector("#order") as HTMLButtonElement
let deliveryChecked = document.querySelector("#delivery-option") as HTMLLabelElement
let locationInput = document.querySelector("#location") as HTMLInputElement
let orderPlacement = document.querySelector("#place-order") as HTMLInputElement
let orderTotalPrompt = document.querySelector("#total") as HTMLDivElement
let orderConfirmation = document.querySelector("#confirm") as HTMLButtonElement
let orderCompletionModal = document.querySelector("#confirmation") as HTMLDivElement
let orderCompletion = document.querySelector("#order-confirm") as HTMLButtonElement
let grandTotalDisplay = document.querySelector("#grand-total") as HTMLSpanElement
let confirmationText = document.querySelector(".confirmation-text") as HTMLParagraphElement

/* - - - the pizza object constructor - - -  */
function Pizza(this: any, type: string, size: string, crust: string, toppings: string[], quantity: number) {
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

/* - - - form variables - - -  */
let form = document.querySelector("#order-form") as HTMLFormElement
let userToppings = document.getElementsByName("toppings") as NodeListOf<HTMLInputElement>
let userName = document.querySelector("#name") as HTMLInputElement
let userEmail = document.querySelector("#email") as HTMLInputElement
let userSize = document.querySelector("#size") as HTMLInputElement
let userType = document.querySelector("#type") as HTMLInputElement
let userCrust = document.querySelector("#crust") as HTMLInputElement
let userQuantity = document.querySelector("#quantity") as HTMLInputElement
let userNameEmail = document.querySelector(".name-email") as HTMLInputElement
let cartSummary = document.querySelector(".new-order") as HTMLDivElement
let summaryList = document.querySelector("#summary-list") as HTMLUListElement
let pizzaToppings: string[] = []
let totalOrders: any[] = []
let totalCharges: number = 0
let deliveryCharges: number = 0
let grandTotal: number = 0
let deliveryName: string = "user"

/* - - - add order to cart - - - */
function addOrderToCart(newOrder: any){
    if(totalOrders.length === 0){
        totalOrders.push(newOrder)
    }else {
        if(totalOrders.find(newOrder)){
            alert("This item already exists in your cart!")
        } else {
            totalOrders.push(newOrder)
        }
    }

    for(let i: number = 0; i<totalOrders.length; i++){
        let pizzaTotal: number = (totalOrders[i].getStandardPrice() + totalOrders[i].getCrust() + totalOrders[i].getToppings())
        let orderTotal: number = Number(pizzaTotal * totalOrders[i].quantity)
        totalCharges += orderTotal
    }
}

/* - - - validation function - - - */
function validation(name: string, email: string, size: string, type: string, crust: string, quantity?: string){
    if(name === "" || email === "" ){
        return [false,"Fill in your details in the all the fields"]
    } else if(size === "size") {
        return [false, "Please choose the size of pizza you want"]
    } else if(crust === "crust"){
        return [false, "Please choose a crust for your pizza"]
    } else if (type === "type"){
        return [false,"Please choose the type of pizza you want"]
    } else {
        return [true,"Please choose the type of pizza you want"]
    }      
}

/* - - - get user toppings - - - */
function getUserToppings(userToppings: any){
    for(let i =0; i<userToppings.length; i++){
        if(userToppings[i].checked === true){
            if(!pizzaToppings.find(userToppings[i].value)){
                pizzaToppings.push(userToppings[i].value)
            }
        }
    }
}

/* - - - get user location - - - */
function getUserLocation(){
    if(locationInput.value !== ""){
        deliveryCharges += 5
        return [true, locationInput.value]
    } else {
        deliveryCharges = 0
        return [false]
    }
}

/* - - - form submission event - - - */
form.addEventListener("submit", (e)=>{
    e.preventDefault()
    if(!validation(userName.value, userEmail.value, userSize.value, userType.value, userCrust.value)[0]){
        alert(validation(userName.value, userEmail.value, userSize.value, userType.value, userCrust.value)[1])
        deliveryName = userName.value
        return
    }

    getUserToppings(userToppings)

    let newOrder = new (Pizza as any)(
        userType.value, 
        userSize.value, 
        userCrust.value, 
        pizzaToppings,
        Number(userQuantity.value)
    )

    let newItem = document.createElement("li")
    if(newOrder.toppings.length === 0){
        newItem.textContent = `${newOrder.quantity} order(s) of ${newOrder.type} pizza(s) with a ${newOrder.crust} crust and no extra toppings.`
    } else {
        newItem.textContent = `${newOrder.quantity} order(s) of ${newOrder.type} pizza(s) with a ${newOrder.crust} crust. This order includes ${newOrder.toppings.join(", ")}, which costs $${newOrder.getToppings()} extra.`
    }
    
    summaryList.appendChild(newItem)

    addOrderToCart(newOrder)
    cartSummary.style.display = "flex"

    grandTotal = totalCharges + deliveryCharges

    /* - - - makes sure that all orders are under one name - - - */
    userNameEmail.style.display = "none"
    deliveryName = userName.value
    totalCharges = 0
})


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
    if(!validation(userName.value, userEmail.value, userSize.value, userType.value, userCrust.value)[0]){
        alert(validation(userName.value, userEmail.value, userSize.value, userType.value, userCrust.value)[1])
        return
    } else {
        if(getUserLocation()[0]){
            grandTotal += deliveryCharges
        } 
        orderTotalPrompt.style.display = "block"
        grandTotalDisplay.textContent = String(grandTotal)
    }
})

orderConfirmation.addEventListener("click", ()=>{
    orderModal.style.display = "none"
    if(getUserLocation()[0]){
        confirmationText.textContent = `Thank you ${deliveryName}. Your order will be ready in 30mins and will be deliverd to ${getUserLocation()[1]}`
    } else {
        confirmationText.textContent =  `Thank you ${deliveryName}. Your order will be ready in 30mins. Feel free to pick it up at your earliest convenience`
    }
    orderCompletionModal.style.display = "flex"
})

orderCompletion.addEventListener("click", ()=>{
    orderCompletionModal.style.display = "none"
    window.location.reload()
})


