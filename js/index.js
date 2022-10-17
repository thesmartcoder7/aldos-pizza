/* - - - getting current year on the footer - - - */
let footerYear = document.querySelector(".current-year");
let currentYear = new Date;
footerYear.innerHTML = String(currentYear.getFullYear());
/* - - - modal related variables - - - */
let orderModal = document.querySelector("#order-modal");
let orderModalHide = document.querySelector("#close-order-modal");
let orderModalShow = document.querySelector("#order");
let deliveryChecked = document.querySelector("#delivery-option");
let locationInput = document.querySelector("#location");
let orderPlacement = document.querySelector("#place-order");
let orderTotalPrompt = document.querySelector("#total");
let orderConfirmation = document.querySelector("#confirm");
let orderCompletionModal = document.querySelector("#confirmation");
let orderCompletion = document.querySelector("#order-confirm");
let grandTotalDisplay = document.querySelector("#grand-total");
let confirmationText = document.querySelector(".confirmation-text");
/* - - - the pizza object constructor - - -  */
function Pizza(type, size, crust, toppings, quantity) {
    this.type = type;
    this.size = size;
    this.crust = crust;
    this.toppings = toppings;
    this.quantity = quantity;
}
Pizza.prototype.getStandardPrice = function () {
    if (this.size === "large") {
        return 10;
    }
    else if (this.size === "medium") {
        return 9;
    }
    else {
        return 8;
    }
};
Pizza.prototype.getCrust = function () {
    if (this.crust === "glutten-free") {
        return 3;
    }
    else if (this.crust === "stuffed") {
        return 2;
    }
    else {
        return 1;
    }
};
Pizza.prototype.getToppings = function () {
    if (this.size === "large") {
        return 6 * this.toppings.length;
    }
    else if (this.size === "medium") {
        return 3 * this.toppings.length;
    }
    else {
        return 2 * this.toppings.length;
    }
};
/* - - - form variables - - -  */
let form = document.querySelector("#order-form");
let userToppings = document.getElementsByName("toppings");
let userName = document.querySelector("#name");
let userEmail = document.querySelector("#email");
let userSize = document.querySelector("#size");
let userType = document.querySelector("#type");
let userCrust = document.querySelector("#crust");
let userQuantity = document.querySelector("#quantity");
let userNameEmail = document.querySelector(".name-email");
let cartSummary = document.querySelector(".new-order");
let summaryList = document.querySelector("#summary-list");
let pizzaToppings = [];
let totalOrders = [];
let totalCharges = 0;
let deliveryCharges = 0;
let grandTotal = 0;
let deliveryName = "user";
/* - - - add order to cart - - - */
function addOrderToCart(newOrder) {
    if (totalOrders.length === 0) {
        totalOrders.push(newOrder);
    }
    else {
        if (totalOrders.find(newOrder)) {
            alert("This item already exists in your cart!");
        }
        else {
            totalOrders.push(newOrder);
        }
    }
    for (let i = 0; i < totalOrders.length; i++) {
        let pizzaTotal = (totalOrders[i].getStandardPrice() + totalOrders[i].getCrust() + totalOrders[i].getToppings());
        let orderTotal = Number(pizzaTotal * totalOrders[i].quantity);
        totalCharges += orderTotal;
    }
}
/* - - - validation function - - - */
function validation(name, email, size, type, crust, quantity) {
    if (name === "" || email === "") {
        return [false, "Fill in your details in the all the fields"];
    }
    else if (size === "size") {
        return [false, "Please choose the size of pizza you want"];
    }
    else if (crust === "crust") {
        return [false, "Please choose a crust for your pizza"];
    }
    else if (type === "type") {
        return [false, "Please choose the type of pizza you want"];
    }
    else {
        return [true, "Please choose the type of pizza you want"];
    }
}
/* - - - get user toppings - - - */
function getUserToppings(userToppings) {
    for (let i = 0; i < userToppings.length; i++) {
        if (userToppings[i].checked === true) {
            if (!pizzaToppings.find(userToppings[i].value)) {
                pizzaToppings.push(userToppings[i].value);
            }
        }
    }
}
/* - - - get user location - - - */
function getUserLocation() {
    if (locationInput.value !== "") {
        deliveryCharges += 5;
        return [true, locationInput.value];
    }
    else {
        deliveryCharges = 0;
        return [false];
    }
}
/* - - - form submission event - - - */
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validation(userName.value, userEmail.value, userSize.value, userType.value, userCrust.value)[0]) {
        alert(validation(userName.value, userEmail.value, userSize.value, userType.value, userCrust.value)[1]);
        deliveryName = userName.value;
        return;
    }
    getUserToppings(userToppings);
    let newOrder = new Pizza(userType.value, userSize.value, userCrust.value, pizzaToppings, Number(userQuantity.value));
    let newItem = document.createElement("li");
    if (newOrder.toppings.length === 0) {
        newItem.textContent = `${newOrder.quantity} order(s) of ${newOrder.type} pizza(s) with a ${newOrder.crust} crust and no extra toppings.`;
    }
    else {
        newItem.textContent = `${newOrder.quantity} order(s) of ${newOrder.type} pizza(s) with a ${newOrder.crust} crust. This order includes ${newOrder.toppings.join(", ")}, which costs $${newOrder.getToppings()} extra.`;
    }
    summaryList.appendChild(newItem);
    addOrderToCart(newOrder);
    cartSummary.style.display = "flex";
    grandTotal = totalCharges + deliveryCharges;
    /* - - - makes sure that all orders are under one name - - - */
    userNameEmail.style.display = "none";
    deliveryName = userName.value;
    totalCharges = 0;
});
/* - - - modal related DOM event listeners - - - */
orderModalHide.addEventListener("click", () => {
    orderModal.style.display = "none";
});
orderModalShow.addEventListener("click", () => {
    orderModal.style.display = "flex";
});
deliveryChecked.addEventListener("click", () => {
    locationInput.value = '';
    locationInput.classList.toggle("hide");
});
orderPlacement.addEventListener("click", () => {
    if (!validation(userName.value, userEmail.value, userSize.value, userType.value, userCrust.value)[0]) {
        alert(validation(userName.value, userEmail.value, userSize.value, userType.value, userCrust.value)[1]);
        return;
    }
    else {
        if (getUserLocation()[0]) {
            grandTotal += deliveryCharges;
        }
        orderTotalPrompt.style.display = "block";
        grandTotalDisplay.textContent = String(grandTotal);
    }
});
orderConfirmation.addEventListener("click", () => {
    orderModal.style.display = "none";
    if (getUserLocation()[0]) {
        confirmationText.textContent = `Thank you ${deliveryName}. Your order will be ready in 30mins and will be deliverd to ${getUserLocation()[1]}`;
    }
    else {
        confirmationText.textContent = `Thank you ${deliveryName}. Your order will be ready in 30mins. Feel free to pick it up at your earliest convenience`;
    }
    orderCompletionModal.style.display = "flex";
});
orderCompletion.addEventListener("click", () => {
    orderCompletionModal.style.display = "none";
    window.location.reload();
});
