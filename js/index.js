let footerYear = document.querySelector(".current-year")
let currentYear = new Date
let orderModal = document.querySelector("#order-modal")
let orderModalHide = document.querySelector("#close-order-modal")
let orderModalShow = document.querySelector("#order")
let deliveryChecked = document.querySelector("#delivery-option")
let locationInput = document.querySelector("#location")

orderModalHide.addEventListener("click", ()=>{
    orderModal.style.display = "none"
})

orderModalShow.addEventListener("click", ()=>{
    orderModal.style.display = "flex"
})

deliveryChecked.addEventListener("click", ()=>{
    locationInput.classList.toggle("hide")
})

footerYear.innerHTML = currentYear.getFullYear()