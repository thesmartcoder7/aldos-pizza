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

orderModalHide.addEventListener("click", ()=>{
    orderModal.style.display = "none"
})

orderModalShow.addEventListener("click", ()=>{
    orderModal.style.display = "flex"
})

deliveryChecked.addEventListener("click", ()=>{
    locationInput.classList.toggle("hide")
})

orderPlacement.addEventListener("click", ()=>{
    orderTotalPrompt.style.display = "block"
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