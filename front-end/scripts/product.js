let params = new URL(document.location).searchParams;
let id = params.get("id");
const productCardImg = document.querySelector(".img");
const productCardName = document.querySelector(".product-card__infos__title");
const productCardDescription = document.querySelector(
  ".product-card__infos__description"
);
const productCardPrice = document.querySelector(".product-card__infos__price");
const bearNumber = document.querySelector("#bearNum");
const colorSelect = document.querySelector("#color-select");

const addToCartBtn = document.querySelector(".add-to-cart");
const confirmation = document.querySelector(".added-to-cart-confirmation");
const textConfirmation = document.querySelector(".confirmation-text");

main();

function main() {
  getArticles();
  addToCart();
}

function getArticles() {

  // On récupère uniquement le produit dont on a besoin via le paramètre dans la requête
  fetch(`http://localhost:3000/api/teddies/${id}`)
    .then(function (response) {
      return response.json();
    })
    .catch((error) => {
      let container = document.querySelector(".container");
      container.innerHTML =
        "Nous n'avons pas réussi à afficher nos nounours. Avez-vous bien lancé le serveur local (Port 3000) ? <br>Si le problème persiste, contactez-nous.";
      container.style.textAlign = "center";
      container.style.padding = "45vh 0";
    })
    .then(function (resultatAPI) {

      // On place les données reçues via l'API aux bons endroits sur la page
      article = resultatAPI;
      productCardName.innerHTML = article.name;
      productCardImg.src = article.imageUrl;
      productCardDescription.innerText = article.description;

      // Formatage du prix pour l'afficher en euros

      article.price = article.price / 100;
      productCardPrice.innerText = new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
      }).format(article.price);

      let colorSelect = document.getElementById("color-select");
      for (let i = 0; i < article.colors.length; i++) {
        let option = document.createElement("option");
        option.innerText = article.colors[i];
        colorSelect.appendChild(option);
      }
    });
}

function addToCart() {
  addToCartBtn.addEventListener("click", () => {
    
    // ------ Création du produit qui sera ajouté au panier
    let productAdded = {
      name: productCardName.innerHTML,
      price: parseFloat(productCardPrice.innerHTML),
      quantity: parseFloat(document.querySelector("#bearNum").value),
      _id: id,
    };

    // ----------------- Gestion du localStorage
    let arrayProductsInCart = [];
    arrayProductsInCart.push(productAdded);

    // Si le localStorage existe, on récupère son contenu, on l'insère dans le tableau arrayProductsInCart, puis on le renvoit vers le localStorage avec le nouveau produit ajouté.
    if (localStorage.getItem("products") !== null) {
      arrayProductsInCart = JSON.parse(localStorage.getItem("products"));
      arrayProductsInCart.push(productAdded);
      localStorage.setItem("products", JSON.stringify(arrayProductsInCart)); // Si le LS est vide, on le crée avec le produit ajouté
    } else {
      localStorage.setItem("products", JSON.stringify(arrayProductsInCart));
    }

    // Effets visuels lors d'un ajout au panier
    if (bearNumber.value > 0 && bearNumber.value < 100) {
      confirmation.style.visibility = "visible";
      textConfirmation.innerHTML = `Vous avez ajouté ${bearNumber.value} nounours à votre panier !`;
      setTimeout("location.reload(true);", 4000);
    } else if (bearNumber.value <= 0 || bearNumber.value >= 100) {
      confirmation.style.visibility = "visible";
      textConfirmation.style.background = "red";
      textConfirmation.style.border = "red";
      textConfirmation.style.color = "white";
      textConfirmation.innerText = `Il y a eu une erreur. Réessayez en entrant une quantité comprise entre 1 et 99, sinon, contactez le support.`;
    }
  });
}