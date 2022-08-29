const bookWrapper = document.querySelector("#books-wrapper");
const shoppingCart = document.querySelector("#shopping-cart");

window.onload = () => {
  loadbooks();
};

let books = [];
let shoppingCartList = [];
let filteredBooks = [];

function loadbooks() {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((response) => response.json())
    .then((testBooks) => {
      books = testBooks;
      console.log(books);
      displayBooks();
    })
    .ctach((err) => console.error(err.message));
}

function displayBooks(testBooks = books) {
  bookWrapper.innerHTML = "";
  testBooks.forEach((book) => {
    bookWrapper.innerHTML += `
    <div class = "col-12 col-sm-6 col-md-4 col-lg-3">
    <div class="card">
  <img src="${book.img}" class="card-img-top" alt="${book.title}">
  <div class="card-body">
    <h5 class="card-title">${book.title}</h5>
    <p class="card-text"${book.category}</p>
    <a href="#" class="btn btn-primary">${book.price}</a>
    <a href="#" class="btn btn-secondary" onclick="addToCart('${String(
      book.asin
    )}', this)">ADD</a>
    <a href="#" class="btn btn-warning" onclick="this.closest ('.col-12').remove()">Skip</a>

  </div>
</div>
    `;
  });
}

function addToCart(asin, elem) {
  console.log(asin);
  const book = books.find((book) => book.asin == asin);
  shoppingCartList.push(book);
  console.log(shoppingCartList);

  refreshShoppingCart();

  elem.closest(".card").classList.add("selected");
}

function refreshShoppingCart() {
  shoppingCart.innerHTML = "";

  shoppingCartList.forEach(
    (book) =>
      (shoppingCart.innerHTML += `
  <div class="shopping-item">
  <div>${book.title}</div>
  <div>${book.price}</div>
  <div><a href="#" class="btn btn-danger" onclick="deleteItem('${String(
    book.asin
  )}')">Delete</a></div>
  </div>
  `)
  );
}

function search(query) {
  if (query.length < 3) {
    filteredBooks = books;
    displayBooks();
    return;
  }

  filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(query.toLowerCase())
  );
  console.log(filteredBooks);
  displayBooks(filteredBooks);
}

function deleteItem(asin) {
  const index = shoppingCartList.findIndex((book) => book.asin === asin);
  if (index !== -1) {
    shoppingCartList.splice(index, 1);
  }
  refreshShoppingCart();
}
