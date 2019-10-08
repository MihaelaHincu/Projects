var lista = {};
var idxEdit = null;

  async function ajax(method, url, body) {
    return new Promise(function(resolve, reject) {
      let xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState === 4) {
          if (this.status === 200) {
            resolve(JSON.parse(this.responseText));
          } else {
            reject(new Error("Ooops! I did it again :( "));
          }
        }
      };
      xhttp.open(method, url, true);
      xhttp.send(body);
    });
  };



  async function getListaProduse() {
    await ajax("GET", "https://proiectfinal-c3768.firebaseio.com/products.json")
      .then(function(answer) {
        lista = answer;
        draw();
      })
  };


function draw() {
    var str = "";
    for (var i in lista) {
        if (!lista.hasOwnProperty(i)) {
            continue;
        }
        if (lista[i] === null) {
            continue;
        }
        str += `
				<tr>
					<td class="name" style="text-align: center"><span>${lista[i].name}</span> </td>
					<td class="brand" style="text-align: center"><span>${lista[i].brand}</span></td>
                    <td class="image" style="text-align: center"><img id="altimg" src="${lista[i].image}" alt="No Image"></td>
                    <td class="stock" style="text-align: center"><span>${lista[i].stock}</span></td>
                    <td class="description" style="text-align: center"><span>${lista[i].description}</span></td>
                    <td class="price" style="text-align: center" ><span>${lista[i].price}</span></td>
					<td style="white-space:nowrap;">
						<div style="text-align: center" class="editBtn" onclick="edit('${i}');"></div>
						<div style="text-align: center" class="deleteBtn" onclick="del('${i}');"></div>
					</td>
				</tr>
			`;
    }

    document.querySelector("table tbody").innerHTML = str;
    showTable();
}

function showTable() {
    idxEdit = null;
    
    document.querySelector("#edit").style.display = "none";
    document.querySelector("form").style.display = "none";
    document.querySelector("table").style.display = "";

}


async function del(idx) {
  if(confirm(`Are you sure you want to delete ${lista[idx].name}?`) == true) {
    await ajax("DELETE", `https://proiectfinal-c3768.firebaseio.com/products/${idx}.json`)
    await getListaProduse();
  }
}
function showAddForm() {
    document.querySelector("form").reset();
    document.querySelector("form").style.display = "";
    document.querySelector("table").style.display = "none";
}

function showEditForm() {
  document.querySelector("#edit").style.display = "block";
  document.querySelector("table").style.display = "none";
}
async function add() {
  event.preventDefault();
    var newProd = {};
    newProd.name = document.querySelector('[name="name"]').value;
    newProd.brand = document.querySelector('[name="brand"]').value;
    newProd.image = document.querySelector('[name="image"]').value;
    newProd.stock = document.querySelector('[name="stock"]').value;
    newProd.description = document.querySelector('[name="description"]').value;
    newProd.price = document.querySelector('[name="price"]').value;
    if (idxEdit === null) {
        await fetch(`https://proiectfinal-c3768.firebaseio.com/products.json`,{
            method: "POST",
            body: JSON.stringify(newProd)
        });
        await getListaProduse();
    } else {
        await fetch(`https://proiectfinal-c3768.firebaseio.com/products/${idxEdit}.json`,{
            method: "PUT",
            body: JSON.stringify(newProd)
        });
        await getListaProduse();
        idxEdit = null;
        document.querySelector('[type="submit"]').value = "Add";
    }
}

function edit(idx) {
  showEditForm();
    idxEdit = idx;
    var editProd = lista[idx];

    document.querySelector('[name="nameEdit"]').value = editProd.name;
    document.querySelector('[name="brandEdit"]').value = editProd.brand;
    document.querySelector('[name="imageEdit"]').value =  editProd.image;
    document.querySelector('[name="stockEdit"]').value = editProd.stock;
    document.querySelector('[name="descriptionEdit"]').value = editProd.description;
    document.querySelector('[name="priceEdit"]').value = editProd.price;

}

// Stock changed

async function getCart(i, modifyProd) {
  await ajax("GET", `https://proiectfinal-c3768.firebaseio.com/cart/${i}.json`)
    .then(function(answer) {
      prod = answer;
    })
    .then(async function() {
      if (prod !== null) {
        await ajax("PUT", `https://proiectfinal-c3768.firebaseio.com/cart/${idxEdit}/price.json`, JSON.stringify(modifyProd.price))
        await ajax("PUT", `https://proiectfinal-c3768.firebaseio.com/cart/${idxEdit}/stock.json`, JSON.stringify(modifyProd.stock))
      }
    })
}

async function saveChanges() {
  var modifyProd = {};
  modifyProd.name = document.querySelector('[name="nameEdit"]').value;
  modifyProd.brand = document.querySelector('[name="brandEdit"]').value;
  modifyProd.image = document.querySelector('[ name="imageEdit"]').value;
  modifyProd.description = document.querySelector('[ name="descriptionEdit"]').value;
  modifyProd.price = document.querySelector('[ name="priceEdit"]').value;
  modifyProd.stock = document.querySelector('[ name="stockEdit"]').value;
  await getCart(idxEdit, modifyProd); 
  await ajax("PUT", `https://proiectfinal-c3768.firebaseio.com/products/${idxEdit}.json`, JSON.stringify(modifyProd))
  await getListaProduse();
  showTable();
  editIdx = null;
}
