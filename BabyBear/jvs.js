var listaProduse= [];
var cart = {};


function ajax(method, url, body, callback, rejectCallback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4) {
      if (this.status === 200) {
        if (typeof callback === "function") {
          callback(JSON.parse(this.responseText));
        }
      } else {
        if (typeof rejectCallback === "function") {
          rejectCallback(new Error("Ooops! I did it again :( "));
        }
      }
    }
  };
  xhttp.open(method, url, true);
  xhttp.send(body);
};


function getListaProduse() {
  ajax("GET", "https://proiectfinal-c3768.firebaseio.com/products.json", undefined, function(answer) {
    listaProduse = answer;
    draw();
  })
};

function draw() {
  var str = "";
  for (var i in listaProduse) {
    if (!listaProduse.hasOwnProperty(i)) {
      continue;
    }
    if (listaProduse[i] === null) {
      continue;
    }
    str += `
    <div class="column">
    <div class="card">
    <h3>${listaProduse[i].name}</h3> 
      <h4><i>${listaProduse[i].brand}</i></h4>
      <img src="${listaProduse[i].image}" alt="placeholder"/>
        <div>${listaProduse[i].price} lei</div>
        <a href="detalii/detalii.html?products=${i}"><button class="raise">Detalii</button></a></div>
    </div>

  `;
  }
  addProductsInCart();
  document.querySelector("#productsWrapper").innerHTML = str;
}


function addProductsInCart() {

  ajax("GET", "https://proiectfinal-c3768.firebaseio.com/cart.json", undefined, function(answer) {
    cart = answer;
    var suma = 0;
    for (var i in cart) {
      suma = Number(cart[i].quantity) +suma;
    }
    document.querySelector("#cartNumber").innerHTML = "(" + suma + ")";
  })
}


// LOADING FUNCTION START

var myVar;

function loading() {
  myVar = setTimeout(showPage, 500);
  getListaProduse();
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
// LOADING FUNCTION END 
