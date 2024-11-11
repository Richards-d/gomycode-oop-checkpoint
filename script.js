// Classe Produit
class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

// Classe Élément de Panier
class ShoppingCartItem {
  constructor(product, quantity) {
    this.product = product;
    this.quantity = quantity;
  }

  // Calculer le prix total de l'article
  getTotalPrice() {
    return this.product.price * this.quantity;
  }
}

// Classe Panier d'Achat
class ShoppingCart {
  constructor() {
    this.items = []; // Tableau d'éléments de panier
  }

  // Obtenir le total des articles dans le panier
  getTotalItems() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  // Ajouter un élément au panier
  addItem(product, quantity = 1) {
    const existingItem = this.items.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push(new ShoppingCartItem(product, quantity));
    }
    this.updateDisplay();
  }

  // Supprimer un élément du panier
  removeItem(productId) {
    const index = this.items.findIndex(item => item.product.id === productId);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
    this.updateDisplay();
  }

  // Afficher les articles du panier
  displayItems() {
    const elements = document.getElementById('cart-elements');
    elements.innerHTML = this.items
      .map(item => `<li><strong>Name:</strong> ${item.product.name} <strong>Price:</strong> ${item.product.price} <strong>Quantity:</strong> ${item.quantity}</li>`)
      .join('');
  }

  // Mettre à jour l'affichage de la quantité et du total
  updateDisplay() {
    const quantityDisplay = document.getElementById('quantityDisplay');
    const sum = document.getElementById('total');

    quantityDisplay.textContent = this.getTotalItems();
    sum.textContent = `TOTAL: ${this.getTotalPrice()}`;
    this.displayItems();
  }

  // Calculer le prix total de tous les articles du panier
  getTotalPrice() {
    return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
  }
}

// Exemple d'utilisation
const cart = new ShoppingCart();
const product1 = new Product(1, "Caprese Salad", 2500);
const product2 = new Product(2, "Grilled Salmon", 5000);
const product3 = new Product(3, "Chocolat Fondue", 2500);
const product4 = new Product(4, "Homenade Ice Cream", 2500);

// Initialiser les événements pour chaque bouton d'incrémentation
const incrementBtns = [
  document.getElementById('incrementBtn-1'),
  document.getElementById('incrementBtn-2'),
  document.getElementById('incrementBtn-3'),
  document.getElementById('incrementBtn-4')
];
incrementBtns.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    const products = [product1, product2, product3, product4];
    cart.addItem(products[index]);
  });
});

// Initialiser les événements pour chaque bouton de décrémentation
const decrementBtns = [
  document.getElementById('decrementBtn-1'),
  document.getElementById('decrementBtn-2'),
  document.getElementById('decrementBtn-3'),
  document.getElementById('decrementBtn-4')
];
decrementBtns.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    const products = [product1, product2, product3, product4];
    cart.removeItem(products[index].id);
  });
});
