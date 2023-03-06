
var productName = document.getElementById("productNameInp")
var productPrice = document.getElementById("productPriceInp")
var productCategory = document.getElementById("productCategoryInp")
var productDesc = document.getElementById("productDescInp")



var productContainer = [];

var start = `create`;
var tmp;

if (localStorage.getItem(`productsData`) != null) {
    productContainer = JSON.parse(localStorage.getItem(`productsData`));
    displayProducts(productContainer);
}

function addProduct() {
    if (validationProductName() == true) {
        if (validationProductPrice() == true) {
            if (validationProductCategory() == true) {
                if (validationProductDesc() == true) {
                    var product = {
                        name: productName.value,
                        price: productPrice.value,
                        category: productCategory.value,
                        desc: productDesc.value,
                    }
                    productContainer.push(product)
                    console.log(productContainer)
                    localStorage.setItem(`productsData`, JSON.stringify(productContainer))
                    displayProducts(productContainer)
                    clearForm()

                }
                else {
                    alert("Plz enter valid product Description")
                }
            }
            else {
                alert("Plz enter valid product Category")
            }
        }
        else {
            alert("Plz enter valid product price")
        }
    }
    else {
        alert("Plz enter valid product name")
    }

}

function clearForm() {
    productName.value = "";
    productPrice.value = "";
    productCategory.value = "";
    productDesc.value = "";
}

function displayProducts(x) {
    var cartona = ``;
    for (var i = 0; i < x.length; i++) {
        cartona += `
        <tr>
        <td>${i + 1}</td>
        <td>${x[i].name}</td>
        <td>${x[i].price}</td>
        <td>${x[i].category}</td>
        <td>${x[i].desc}</td>
        <td><button class="btn btn-sm btn-outline-warning " onclick="updateProduct(${i})">Update</button></td>
        <td><button class="btn btn-sm btn-outline-danger" onclick="deleteProduct(${i})">Delete</button></td>
    </tr>
        `
    }
    document.getElementById(`tableBody`).innerHTML = cartona;
}
/* Responsible for getting items into the inputs */

function updateProduct(index) {
    productName.value = productContainer[index].name;
    productPrice.value = productContainer[index].price;
    productCategory.value = productContainer[index].category;
    productDesc.value = productContainer[index].desc;
    document.getElementById(`update`).innerHTML = `Update`;
    start = `update`;
    tmp = index;
}

function deleteProduct(i) {
    productContainer.splice(i, 1);
    localStorage.setItem(`productsData`, JSON.stringify(productContainer))
    displayProducts(productContainer)
}

function search(x) {
    var searchedElements = [];
    for (var i = 0; i < productContainer.length; i++) {
        if (productContainer[i].name.toLowerCase().includes(x.toLowerCase())) {
            searchedElements.push(productContainer[i])
        }
        displayProducts(searchedElements)
    }
}


function validationProductName() {
    var regx = /^[A-Z][a-zA-Z0-9]{2,7}$/;
    if (regx.test(productName.value) == true) {
        return true
    }
    else {
        return false
    }
}

function validationProductPrice() {
    var regx = /^[1-9][0-9][0-9]|1000$/;
    if (regx.test(productPrice.value) == true) {
        return true
    }
    else {
        return false
    }
}
function validationProductCategory() {
    var regx = /^(mobile|tv|device)$/;
    if (regx.test(productCategory.value) == true) {
        return true
    }
    else {
        return false
    }
}
function validationProductDesc() {
    var regx = /^[a-zA-Z0-9|!$*&@#] {0,500}$/;
    if (regx.test(productDesc.value) == true) {
        return true
    }
    else {
        return false
    }
}

// function validationProductName() {
//     var regx = /^[A-Z][a-zA-Z0-9]{2,7}$/;
//     return regx.test(productName.value);

// }
