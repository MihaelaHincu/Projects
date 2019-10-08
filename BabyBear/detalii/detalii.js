var id = window.location.search.split(/=/g)[1];
var url = `https://proiectfinal-c3768.firebaseio.com/products/${id}.json`;
var cart = {};
var stock;

fetch(url)
  .then(response => response.json())
  .then(products => {
    document.querySelector("#name").innerHTML = products.name;
    document.querySelector("#brand").innerHTML = products.brand;
    document.querySelector("#description").innerHTML = products.description;
    document.querySelector("#image>img").src = products.image;
    document.querySelector("#price").innerHTML =  products.price;
    document.querySelector("#buybtn").innerHTML = `  <button class="raise" onclick="addToCart('${id}')">Buy</button>`
    document.querySelector("#stock").innerHTML = `Stoc: ${products.stock}`;
    document.querySelector("[name='quantity']").max = `${products.stock}`;
    stock = products.stock;
  });
  function getCart() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        cart = JSON.parse(this.responseText);
      }
    };
    xhttp.open("GET", `https://proiectfinal-c3768.firebaseio.com/cart.json`, true);
    xhttp.send();
  }
  
  function addToCart(i) {

    product = {};
    product.price = document.querySelector('#price').innerHTML;
    product.image = document.querySelector("#image > img").src;
    product.name = document.querySelector('#name').innerHTML;
    product.quantity = document.querySelector('[name="quantity"]').value;
    product.stock = stock;
    if (Number(product.quantity) <= Number(product.stock)) {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          showAdded();
          getListaProduse();
        }
      };
      xhttp.open("PUT", `https://proiectfinal-c3768.firebaseio.com/cart/${i}.json`, true);
      xhttp.send(JSON.stringify(product));
 
    }}


  function getListaProduse() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        cart = JSON.parse(this.responseText);
        var suma = 0;
        for (var i in cart) {
          if (cart[i] === null) {
            continue
          };
          suma += Number(cart[i].quantity);
        }
        document.querySelector("#cartNumber").innerHTML = "(" + suma + ")";
      }
    };
    xhttp.open("GET", "https://proiectfinal-c3768.firebaseio.com/cart.json", true);
    xhttp.send();
  };
  




function showAdded() {
  document.querySelector("#showAdded").classList.remove("hidden")
  setTimeout(function() {
    document.querySelector("#showAdded").classList.add("hidden")
  }, 1000);
}



var myVar;

function loading() {
  myVar = setTimeout(showPage, 500);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("myDiv").style.display = "block";
}

$(document).ready(function () {

  var showHeaderAt = 40;

  var win = $(window),
    body = $('body');


  if (win.width() > 600) {


    win.on('scroll', function (e) {

      if (win.scrollTop() > showHeaderAt) {
        body.addClass('fixed');
      }
      else {
        body.removeClass('fixed');
      }
    });

  }

});
