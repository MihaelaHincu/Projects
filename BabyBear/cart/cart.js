var list = {};
var insufficientStock = [];
var products = {};
var err = "S-a produs o eroare."


async function ajax(method, url, body) {
  return new Promise(function (resolve, reject) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          resolve(JSON.parse(this.responseText));
        } else {
          reject(new Error("Ooops! I did it again :("));
        }
      }
    };
    xhttp.open(method, url, true);
    xhttp.send(body);
  });
};

async function getCart() {
  await ajax("GET", "https://proiectfinal-c3768.firebaseio.com/cart.json")
    .then(async function (answer) {
      window.list = answer;
      if (list == undefined) {
        drawEmptyCart();
        await NRProductsInCart();
      } else {
        await draw();
        subtotal();
        calculatePrice();

        document.querySelector("#orderCosts").classList.remove("hidden");
        document.querySelector("#content").classList.remove("hidden");
        document.querySelector("#products").classList.remove("hidden");
      }
    })
};

async function draw() {

  var str = "";
  for (var i in list) {
    if (!list.hasOwnProperty(i)) {
      continue;
    }
    if (list[i] === null) {
      continue;
    }

    str += `
    <tr>
    <td class="name" style="text-align: center">
    <a  id="${i}" href="../detalii/detalii.html?products=${i}" > <p>
    ${list[i].name} </p>
    </td>

    <td class="price" style="text-align: center" >
    <p>${list[i].price}</p>
    </td>
    <td>
   
   <div class="quantity " >
 
     <p id="${list[i].name}"> 
     <span style=" cursor:pointer; margin-right:10%;"  onclick="decrease('${i}')">
    <b> < </b>
    </span>
     
     ${list[i].quantity}
     
          
   <span style=" cursor:pointer;  margin-left:10%;" onclick="increase('${i}')">
   <b> > </b>
  </span>
  </p>

   </div>

   </td>

   <td>
   <p class="subtotal ${i}" > lei</p>
   </td>

   <td>
   <button onclick="del('${i}')" style="cursor:pointer;" class="removeBtn"><img src="https://img.icons8.com/offices/16/000000/delete-sign.png"></button>
  </tr>
    `;

  }
  await NRProductsInCart()
  document.querySelector("table tbody").innerHTML = str;

};

function drawEmptyCart() {
  document.querySelector("#content").innerHTML = "Momentan nu exista produse in cos.";
  document.querySelector("#content").classList.add("emptyCart");
};

function drawOrderMade() {
  document.querySelector("#content").innerHTML = "Comanda a fost efectuata cu succes. Multumim!";
  document.querySelector("#content").classList.add("orderMade");
};



async function increase(i) {
  if (list[i].stock > list[i].quantity) {
    var el = Number(list[i].quantity);
    el += 1;
    await ajax("PUT", `https://proiectfinal-c3768.firebaseio.com/cart/${i}/quantity.json`, JSON.stringify(el))
    await getCart();
    await NRProductsInCart();
  } else {
    event.preventDefault();
  }
};

async function decrease(i) {
  if (Number(list[i].quantity) === 1) {
    del(i);
  } else {
    var el = Number(list[i].quantity);
    el -= 1;
    await ajax("PUT", `https://proiectfinal-c3768.firebaseio.com/cart/${i}/quantity.json`, JSON.stringify(el))
    await getCart();
  }
  await NRProductsInCart()
};

function subtotal() {
  var quantity;
  var price;
  for (var i in list) {
    if (list[i] === null) {
      continue
    };
    quantity = Number(list[i].quantity);
    price = list[i].price;
    document.getElementsByClassName(i)[0].innerHTML = quantity * price
  }
};

function calculatePrice() {
  var productsCosts = document.querySelectorAll(".subtotal");
  var totalProductsCost = 0;
  for (var j = 0; j < productsCosts.length; j++) {
    totalProductsCost += Number(productsCosts[j].innerHTML);
    document.querySelector("#totalProductsCost").innerHTML = totalProductsCost;
  }
};

async function del(i) {
  if (confirm(`Are you sure you no longer want to purchase ${list[i].name}?`) == true) {

    await ajax("DELETE", `https://proiectfinal-c3768.firebaseio.com/cart/${i}.json`)
      .then(async function (answer) {
        list = answer;
      })

    await getCart();
    await NRProductsInCart();
  }
};


async function NRProductsInCart() {

  await ajax("GET", "https://proiectfinal-c3768.firebaseio.com/cart.json")

    .then(function (answer) {
      cart = answer;
      var sum = 0;
      for (var i in cart) {
        if (cart[i] === null) {
          continue;
        };
        sum += Number(cart[i].quantity);
      }
      document.querySelector("#cartNumber").innerHTML = "(" + sum + ")";
    })

};


async function changeStock() {
  await ajax("GET", "https://proiectfinal-c3768.firebaseio.com/products.json")
    .then(function (answer) {
      window.products = answer;
    })

  for (var i in products) {
    if (list[i] === null || list[i] === undefined) {
      continue;
    }
    let stock = list[i].stock;
    let nrOfProd = list[i].quantity;
    if (products[i].name == list[i].name) {
      stock -= nrOfProd;
      await ajax("PUT", `https://proiectfinal-c3768.firebaseio.com/products/${i}/stock.json`, JSON.stringify(stock), undefined)


    }


  }
}

async function order() {
  for (var i in list) {
    if (list[i] == null) {
      continue;
    };
    if (Number(list[i].quantity) > Number(list[i].stock)) {
      if (insufficientStock.indexOf(i) == -1) {
        insufficientStock.push(i);
        document.getElementById(i).style.color = "red";
      } else {
        document.getElementById(i).style.color = "red";
      }
    } else if (Number(list[i].quantity) == Number(list[i].stock)) {
      var index = insufficientStock.indexOf(i);
      if (index !== -1) {
        insufficientStock.splice(index, 1);
      };
    } else {
      var index = insufficientStock.indexOf(i);
      if (index !== -1) {
        insufficientStock.splice(index, 1);
      };

    }
  }
  if (insufficientStock.length == 0) {
    await changeStock();
    await ajax("DELETE", `https://proiectfinal-c3768.firebaseio.com/cart.json`)
    await drawOrderMade();
    await NRProductsInCart();
    document.querySelector("#unavailable").classList.add("hidden");
  } else {
    document.querySelector("#unavailable").classList.remove("hidden");
  }
}
// loader
var myVar;

function loading() {
  myVar = setTimeout(showPage, 500);
}

async function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("myDiv").style.display = "block";
  await getCart();
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
