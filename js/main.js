let productName = document.getElementById('productName'),
    productPrice = document.getElementById('productPrice'),
    productCat = document.getElementById('productCat'),
    productDes = document.getElementById('productDes'),
    btn = document.getElementById("mainupdate"),
    searchProduct = document.getElementById("searchProduct"),
    allproducts = [],
    currentIndex;
//=======================================================================================
/*check data in localStorage  */
if (localStorage.getItem("product") != null) {
    allproducts = JSON.parse(localStorage.getItem("product"));
    displayproduct(allproducts);
} else { allproducts = []; }
//=======================================================================================
/*check btn addproduct or update  */
btn.onclick = function () {
    if (btn.innerHTML == "Add Product"){
        addproduct();
    btn.setAttribute("disabled", "true");}
    else {
        updateProduct(currentIndex)
        displayproduct(allproducts);
        clearForm();
        btn.innerHTML = "Add Product";
    }
}
//=======================================================================================
/*addproduct */
function addproduct() {

    let product = {
        name: productName.value,
        price: productPrice.value,
        category: productCat.value,
        description: productDes.value
    }
    allproducts.push(product);
    localStorage.setItem("product", JSON.stringify(allproducts));
    clearForm();
    displayproduct(allproducts);
}
//=======================================================================================
/* clearForm */
function clearForm() {
    productName.value ="";
    productPrice.value ="";
    productCat.value ="";
    productDes.value ="";
}
//=======================================================================================
/*displayproduct */
function displayproduct(arr) {
    let productInfo = "";
    for (let i = 0; i < arr.length; i++) {
        productInfo += `
        <tr>
                  <td>${arr[i].name}</td>
                  <td>${arr[i].price}</td>
                  <td>${arr[i].category}</td>
                  <td>${arr[i].description}</td>
                  <td><button onclick="setFormForUpdate(${i})" class="btn btn-outline-warning">updata</button></td>
                  <td><button onclick="deleteproduct(${i})" class="btn btn-outline-danger">delete</button></td>
        </tr>         
        `
    }
    document.getElementById("tbody").innerHTML = productInfo;
}
//=======================================================================================
/*deleteproduct */
function deleteproduct(index) {
    allproducts.splice(index, 1)
    localStorage.setItem("product", JSON.stringify(allproducts))
    displayproduct(allproducts);
}
//=======================================================================================
/*updateproduct */
function setFormForUpdate(index) {
    currentIndex = index;
    productName.value = allproducts[index].name;
    productPrice.value = allproducts[index].price;
    productCat.value = allproducts[index].category;
    productDes.value = allproducts[index].description;
    btn.innerHTML = "Update Product";

}
function updateProduct() {
    var newproduct = {
        name: productName.value,
        price: productPrice.value,
        category: productCat.value,
        description: productDes.value
    }
    allproducts[currentIndex] = newproduct;
    localStorage.setItem("product", JSON.stringify(allproducts));
}
//========================================================================================
/*search product */
function searchProducts(term) {
    var matchedProduct = [];
    for (var i = 0; i < allproducts.length; i++) {
        if (allproducts[i].name.toLowerCase().includes(term.toLowerCase())) {
            matchedProduct.push(allproducts[i]);
        }
    }
    displayproduct(matchedProduct);
}



//===================================================================================
/*Validation*/
function checkProductName() {
    let regName = /^[A-Z][a-z]{3,8}$/
    return regName.test(productName.value);
}
function checkProductCategory() {
    let regCategory = /^[A-Z][a-z]{3,8}$/
    return regCategory.test(productCat.value);
}
function checkProductDescraption() {
    let regDescraption = /^[A-Z][a-z]{5,10}$/
    return regDescraption.test(productDes.value);
}
function checkProductPrice() {
    if (productPrice.value >= 1000) return true;
    else return false;
}
//===================================================================================

function productValidation() {
    if (checkProductName() && checkProductPrice() && checkProductCategory() && checkProductDescraption()) {
           btn.removeAttribute("disabled")
    } else btn.setAttribute("disabled", "true")
}
productName.addEventListener("keyup", productValidation);
productPrice.addEventListener("keyup", productValidation);
productCat.addEventListener("keyup", productValidation);
productDes.addEventListener("keyup", productValidation);