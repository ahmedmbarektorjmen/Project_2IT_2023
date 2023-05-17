var resultsDiv = document.querySelector("#resultsDiv");
var resetIcon = document.getElementById("searchdelete_icon");
var searchBtn = document.getElementById("search_icon");
var searchInput = document.getElementById("search_input");
// for mobile :
if (window.innerWidth < 800) {
    window.onload = function () {
        searchInput.setAttribute("data-animate", "true");
    };
    function displayAllProducts() {
        fetch("/my_api")
            .then((result) => result.json())
            .then((data) => {
            let foundProducts = data.products;
            resultsDiv.innerHTML = "";
            for (let i = 0; i < foundProducts.length; i++) {
                let div_product = document.createElement("div");
                div_product.className = "div_product";
                // append all elements as a child of the div_product element
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
        });
    }
    function searchProducts() {
        searchInput_value = searchInput.value;
        fetch("/my_api")
            .then((result) => result.json())
            .then((data) => {
            let foundProducts = [];
            for (let i = 0; i < data.products.length; i++) {
                if (data.products[i].name
                    .toLowerCase()
                    .indexOf(searchInput_value.toLowerCase()) !== -1 ||
                    data.products[i].description
                        .toLowerCase()
                        .indexOf(searchInput_value.toLowerCase()) !== -1) {
                    foundProducts.push(data.products[i]);
                }
            }
            resultsDiv.innerHTML = "";
            for (let i = 0; i < foundProducts.length; i++) {
                let div_product = document.createElement("div");
                div_product.className = "div_product";
                // append all elements as a child of the div_product element
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
        });
    }
    displayAllProducts(); // Call this function when the page is loaded
    searchInput.addEventListener("input", function () {
        searchProducts();
        if (this.value == "") {
            resetIcon.className =
                "searchdelete_icon fa-sharp fa-solid fa-circle-xmark hide";
            // hide the reset icon
        }
        else {
            resetIcon.className =
                "searchdelete_icon fa-sharp fa-solid fa-circle-xmark show";
            // show the reset icon
        }
    });
    resetIcon.addEventListener("click", function () {
        searchInput.value = ""; // Reset the value of searchInput
        resetIcon.className =
            "searchdelete_icon fa-sharp fa-solid fa-circle-xmark hide"; // Hide the reset icon";
        displayAllProducts(); // Call this function when the user clicks the search button
    });
    searchBtn.addEventListener("click", function (e) {
        e.preventDefault();
        searchProducts(); // Call this function when the user clicks the search button
    });
}
