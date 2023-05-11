// for PC on index.html :
var resultsDiv = document.querySelector("#resultsDiv");
var searchBtn = document.getElementById("search_icon");
var searchInput = document.getElementById("search_input");

searchInput.addEventListener("input", function () {
  if (searchInput.value === "") {
    resultsDiv.style.display = "none";
  } else {
    resultsDiv.style.display = "";
  }
});

function searchProducts() {
  searchInput_value = searchInput.value;
  fetch("/my_api")
    .then((result) => result.json())
    .then((data) => {
      let foundProducts = [];
      for (let i = 0; i < data.products.length; i++) {
        if (
          data.products[i].name
            .toLowerCase()
            .indexOf(searchInput_value.toLowerCase()) !== -1 ||
          data.products[i].description
            .toLowerCase()
            .indexOf(searchInput_value.toLowerCase()) !== -1
        ) {
          foundProducts.push(data.products[i]);
        }
      }
      resultsDiv.innerHTML = "";
      for (let i = 0; i < foundProducts.length; i++) {
        let div_product = document.createElement("div");
        div_product.className = "div_product";
        if (foundProducts.length === 0) {
          div_product.innerHTML = `
          <div class="div_content">
          <div class="div_content_title">
          there is no product with that name
          </div>
          </div>`;
          resultsDiv.append(div_product);
        } else {
          div_product.innerHTML = `
          <div>
          <img src="${foundProducts[i].image}">
          </div>
          <a href="/product/${foundProducts[i].id}">
          <div class="div_content">
          <div class="div_content_title">
          ${foundProducts[i].name}
          </div>
          <div class="div_content_price">
          ${foundProducts[i].price}
          </div>
          </div>
          </a>`;
          resultsDiv.append(div_product);
        }
      }
    });
}

searchInput.addEventListener("input", function () {
  searchProducts();
});

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  searchProducts(); // Call this function when the user clicks the search button
});
