main();

function main() {
  displayOrderIdAndPrice();
}

function displayOrderIdAndPrice() {
  const totalConfirmation = document.querySelector(".total span");
  const orderId = document.querySelector(".orderid span");
  const cartIconNumber = document.querySelector(".nav__cart__number p");

  // Panier dans le menu vidé
  cartIconNumber.innerText = 0; 
  
  totalConfirmation.innerText = localStorage.getItem("total");
  orderId.innerText = localStorage.getItem("orderId");

  // On vide le localStorage pour recommencer plus tard le processus d'achat
  localStorage.clear(); 
}
