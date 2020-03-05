var listaDishes = {};
var listaWines = {};
var listaReservation = {};
var idxEdit = null;

async function ajax(method, url, body) {
  return new Promise(function (resolve, reject) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
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
  getListaDishes();
  getListaWines();
  getListaReservation();
};

// GET JSON 
async function getListaDishes() {
  await ajax("GET", "https://restaurant-80efb.firebaseio.com/dishes.json")
    .then(function (answer) {
      listaDishes = answer;
      drawDishes();
    })
};

async function getListaWines() {
  await ajax("GET", "https://restaurant-80efb.firebaseio.com/wines.json")
    .then(function (answer) {
      listaWines = answer;
      drawWine();
    })
};



async function getListaReservation() {
  await ajax("GET", "https://restaurant-80efb.firebaseio.com/reservation.json")
    .then(function (answer) {
      listaReservation = answer;
      drawReservation();
    })
};



// DRAW JSON
function drawDishes() {
  var str = "";
  for (var i in listaDishes) {
    if (!listaDishes.hasOwnProperty(i)) {
      continue;
    }
    if (listaDishes[i] === null) {
      continue;
    }
    str += `
        <tr>
        <td class="image" ><img src="${listaDishes[i].image}" alt="Food"></td>
					<td class="category" ><span> ${listaDishes[i].category} </span></td>
					<td class="name"><span>${listaDishes[i].name}</span></td>
                    <td class="ingredients"><span>${listaDishes[i].ingredients}</span></td>
                    <td class="description"><span>${listaDishes[i].description}</span></td>
                    <td class="price" ><span>${listaDishes[i].price} lei</span></td>
					<td style="white-space:nowrap;">
            <div style="text-align: center" class="editBtn" onclick="editDish('${i}');"> <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            width="60" height="60"
            viewBox="0 0 172 172"
            style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#3498db"><path d="M130.88125,17.2c-2.93403,0 -5.86843,1.12051 -8.10729,3.35938l-13.84062,13.84063l28.66667,28.66667l13.84062,-13.84063c4.47773,-4.47773 4.47773,-11.73685 0,-16.21458l-12.45208,-12.45208c-2.23887,-2.23887 -5.17326,-3.35937 -8.10729,-3.35937zM97.46667,45.86667l-67.31068,67.31067c0,0 5.26186,-0.47147 7.22266,1.48933c1.9608,1.9608 0.34669,14.792 2.75469,17.2c2.408,2.408 15.15831,0.71299 16.98724,2.54192c1.82894,1.82893 1.70209,7.43542 1.70209,7.43542l67.31067,-67.31067zM22.93333,131.86667l-5.40859,15.31875c-0.21262,0.60453 -0.32239,1.24042 -0.32474,1.88125c0,3.16643 2.5669,5.73333 5.73333,5.73333c0.64083,-0.00235 1.27672,-0.11212 1.88125,-0.32474c0.0187,-0.00737 0.03737,-0.01483 0.05599,-0.02239l0.14557,-0.04479c0.01122,-0.00743 0.02242,-0.01489 0.03359,-0.0224l15.08359,-5.31901l-8.6,-8.6z"></path></g></g></svg></div>
            <div class="deleteBtn" onclick="delDish('${i}');"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            width="60" height="60"
            viewBox="0 0 172 172"
            style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#e74c3c"><path d="M40.13333,22.93333c-1.46702,0 -2.93565,0.55882 -4.05365,1.67969l-11.46667,11.46667c-2.24173,2.24173 -2.24173,5.87129 0,8.10729l41.81302,41.81302l-41.81302,41.81302c-2.24173,2.24173 -2.24173,5.87129 0,8.10729l11.46667,11.46667c2.24173,2.24173 5.87129,2.24173 8.10729,0l41.81302,-41.81302l41.81302,41.81302c2.236,2.24173 5.87129,2.24173 8.10729,0l11.46667,-11.46667c2.24173,-2.24173 2.24173,-5.87129 0,-8.10729l-41.81302,-41.81302l41.81302,-41.81302c2.24173,-2.236 2.24173,-5.87129 0,-8.10729l-11.46667,-11.46667c-2.24173,-2.24173 -5.87129,-2.24173 -8.10729,0l-41.81302,41.81302l-41.81302,-41.81302c-1.12087,-1.12087 -2.58663,-1.67969 -4.05365,-1.67969z"></path></g></g></svg> </div>
					</td>
				</tr>
			`;
  }

  document.querySelector("table tbody").innerHTML = str;

}

function drawWine() {
  var str = "";
  for (var i in listaWines) {
    if (!listaWines.hasOwnProperty(i)) {
      continue;
    }
    if (listaWines[i] === null) {
      continue;
    }
    str += `
      <tr>
      <td class="category"> <span>${listaWines[i].category}</span> </td>
        <td class="name" ><span>${listaWines[i].name}</span> </td>
        <td class="price"><span>${listaWines[i].ingredients}</span></td>
        <td class="ingredients" ><span>${listaWines[i].description}</span></td>
                  <td class="description" ><span>${listaWines[i].price} lei</span></td>
        <td style="white-space:nowrap;">
        <div  class="deleteBtn" onclick="delWine('${i}');"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
        width="60" height="60"
        viewBox="0 0 172 172"
        style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#e74c3c"><path d="M40.13333,22.93333c-1.46702,0 -2.93565,0.55882 -4.05365,1.67969l-11.46667,11.46667c-2.24173,2.24173 -2.24173,5.87129 0,8.10729l41.81302,41.81302l-41.81302,41.81302c-2.24173,2.24173 -2.24173,5.87129 0,8.10729l11.46667,11.46667c2.24173,2.24173 5.87129,2.24173 8.10729,0l41.81302,-41.81302l41.81302,41.81302c2.236,2.24173 5.87129,2.24173 8.10729,0l11.46667,-11.46667c2.24173,-2.24173 2.24173,-5.87129 0,-8.10729l-41.81302,-41.81302l41.81302,-41.81302c2.24173,-2.236 2.24173,-5.87129 0,-8.10729l-11.46667,-11.46667c-2.24173,-2.24173 -5.87129,-2.24173 -8.10729,0l-41.81302,41.81302l-41.81302,-41.81302c-1.12087,-1.12087 -2.58663,-1.67969 -4.05365,-1.67969z"></path></g></g></svg> </div>
    
        </td>
      </tr>
    `;
  }

  document.querySelector("table tbody.wine").innerHTML = str;

}

function drawReservation() {
  var str = "";
  for (var i in listaReservation) {
    if (!listaReservation.hasOwnProperty(i)) {
      continue;
    }
    if (listaReservation[i] === null) {
      continue;
    }
    str += `
      <tr>
        <td class="date" ><span>${listaReservation[i].date}</span><br> <span>${listaReservation[i].hour}</span> </td>
        <td class="name" ><span>${listaReservation[i].name}</span></td>
        <td class="contact"><span>${listaReservation[i].phone}</span></td>
                  <td class="guests"><span>${listaReservation[i].guests}</span></td>
                  <td class="details" ><span>${listaReservation[i].details}</span></td>
        <td style="white-space:nowrap;">
      <div class="deleteBtn" onclick=" delReservation('${i}');"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
        width="60" height="60"
        viewBox="0 0 172 172"
        style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#e74c3c"><path d="M40.13333,22.93333c-1.46702,0 -2.93565,0.55882 -4.05365,1.67969l-11.46667,11.46667c-2.24173,2.24173 -2.24173,5.87129 0,8.10729l41.81302,41.81302l-41.81302,41.81302c-2.24173,2.24173 -2.24173,5.87129 0,8.10729l11.46667,11.46667c2.24173,2.24173 5.87129,2.24173 8.10729,0l41.81302,-41.81302l41.81302,41.81302c2.236,2.24173 5.87129,2.24173 8.10729,0l11.46667,-11.46667c2.24173,-2.24173 2.24173,-5.87129 0,-8.10729l-41.81302,-41.81302l41.81302,-41.81302c2.24173,-2.236 2.24173,-5.87129 0,-8.10729l-11.46667,-11.46667c-2.24173,-2.24173 -5.87129,-2.24173 -8.10729,0l-41.81302,41.81302l-41.81302,-41.81302c-1.12087,-1.12087 -2.58663,-1.67969 -4.05365,-1.67969z"></path></g></g></svg> </div>
    
        </td>
      </tr>
    `;
  }

  document.querySelector("table tbody.reservation").innerHTML = str;
 
}


// HIDE/SHOW TABLE
function hidden() {
  document.querySelector("#menuContainer").style.display = "none";
  document.querySelector("#reservationContainer").style.display = "none";
  document.querySelector("#winesContainer").style.display = "none";
  document.querySelector("#wineform").style.display = "none";
  document.querySelector("#menuform").style.display = "none";
}

function showMenu() {
  document.querySelector("#menuContainer").style.display = "";
  document.querySelector("#reservationContainer").style.display = "none";
  document.querySelector("#winesContainer").style.display = "none";
  document.querySelector("#wineform").style.display = "none";
  document.querySelector("#menuform").style.display = "none";
  document.querySelector("#editDish").style.display = "none";
}

function showWineForm() {
  document.querySelector("#wineform").style.display = "";
  document.querySelector("#reservationContainer").style.display = "none";
  document.querySelector("#winesContainer").style.display = "none";
  document.querySelector("#menuContainer").style.display = "none";
  document.querySelector("#menuform").style.display = "none";
}

function showMenuForm() {
  document.querySelector("#menuform").style.display = "";
  document.querySelector("#reservationContainer").style.display = "none";
  document.querySelector("#winesContainer").style.display = "none";
  document.querySelector("#wineform").style.display = "none";
  document.querySelector("#menuContainer").style.display = "none";
}

function showReservation() {
  document.querySelector("#menuContainer").style.display = "none";
  document.querySelector("#reservationContainer").style.display = "";
  document.querySelector("#winesContainer").style.display = "none";
  document.querySelector("#wineform").style.display = "none";
  document.querySelector("#menuform").style.display = "none";
}

function showWines() {
  document.querySelector("#menuContainer").style.display = "none";
  document.querySelector("#reservationContainer").style.display = "none";
  document.querySelector("#winesContainer").style.display = "";
  document.querySelector("#wineform").style.display = "none";
  document.querySelector("#menuform").style.display = "none";
}

function showEditForm() {
  document.querySelector("#editDish").style.display = "block";
  document.querySelector("#menuContainer").style.display = "none";
  document.querySelector("#reservationContainer").style.display = "none";
  document.querySelector("#winesContainer").style.display = "none";
  document.querySelector("#wineform").style.display = "none";
  document.querySelector("#menuform").style.display = "none";
}
// filter



// ADD



async function addDish() {
  event.preventDefault();
  var newDish = {};
  newDish.name = document.querySelector('[name="Menu-name"]').value;
  newDish.category = document.querySelector('[name="Menu-category"]').value;
  newDish.image = document.querySelector('[name="Menu-image"]').value;
  newDish.ingredients = document.querySelector('[name="Menu-ingredients"]').value;
  newDish.description = document.querySelector('[name="Menu-description"]').value;
  newDish.price = document.querySelector('[name="Menu-price"]').value;
  if (idxEdit === null) {
    await fetch(`https://restaurant-80efb.firebaseio.com/dishes.json`, {
      method: "POST",
      body: JSON.stringify(newDish)
    });
    await getListaDishes();
  } else {
    await fetch(`https://restaurant-80efb.firebaseio.com/${idxEdit}.json`, {
      method: "PUT",
      body: JSON.stringify(newDish)
    });
    await getListaDishes();
    idxEdit = null;
  } alert("done")
}


async function addWine() {
  event.preventDefault();
  var newWine = {};
  newWine.name = document.querySelector('[name="Wine-name"]').value;
  newWine.category = document.querySelector('[name="Wine-category"]').value;
  newWine.ingredients = document.querySelector('[name="Wine-ingredients"]').value;
  newWine.description = document.querySelector('[name="Wine-description"]').value;
  newWine.price = document.querySelector('[name="Wine-price"]').value;
  if (idxEdit === null) {
    await fetch(`https://restaurant-80efb.firebaseio.com/wines.json`, {
      method: "POST",
      body: JSON.stringify(newWine)
    });
    await getListaWines();
  } else {
    await fetch(`https://restaurant-80efb.firebaseio.com/${idxEdit}.json`, {
      method: "PUT",
      body: JSON.stringify(newWine)
    });
    await getListaWines();
    idxEdit = null;
  } alert("done")
}
// EDIT & DELETE

async function delWine(idx) {
  if (confirm(`Are you sure you want to delete "${listaWines[idx].name}"?`) == true) {
    await ajax("DELETE", `https://restaurant-80efb.firebaseio.com/wines/${idx}.json`)
    await getListaWines();
  }
}

async function delDish(idx) {
  if (confirm(`Are you sure you want to delete "${listaDishes[idx].name}"?`) == true) {
    await ajax("DELETE", `https://restaurant-80efb.firebaseio.com/dishes/${idx}.json`)
    await getListaDishes();
  }
}

async function delReservation(idx) {
  if (confirm(`Are you sure you want to delete this reservation?`) == true) {
    await ajax("DELETE", `https://restaurant-80efb.firebaseio.com/reservation/${idx}.json`)
    await getListaReservation();
  }
}





async function editDish(idx) {
  showEditForm();
  idxEdit = idx;
  var editDish = listaDishes[idx];
  document.querySelector('[name="EditMenu-name"]').value = editDish.name;
  document.querySelector('[name="EditMenu-category"]').value = editDish.category;
  document.querySelector('[name="EditMenu-image"]').value = editDish.image;
  document.querySelector('[name="EditMenu-ingredients"]').value = editDish.ingredients;
  document.querySelector('[name="EditMenu-description"]').value = editDish.description;
  document.querySelector('[name="EditMenu-price"]').value = editDish.price;
}


async function saveMenuChanges(idx, modifyDish) {
  await getListaDishes();

  var modifyDish = {};
  modifyDish.name = document.querySelector('[name="EditMenu-name"]').value;
  modifyDish.category = document.querySelector('[name="EditMenu-category"]').value;
  modifyDish.image = document.querySelector('[name="EditMenu-image"]').value;
  modifyDish.ingredients = document.querySelector('[name="EditMenu-ingredients"]').value;
  modifyDish.description = document.querySelector('[name="EditMenu-description"]').value;
  modifyDish.price = document.querySelector('[name="EditMenu-price"]').value;
  await ajax("PUT", `https://restaurant-80efb.firebaseio.com/dishes/${idxEdit}.json`, JSON.stringify(modifyDish))
  await getListaDishes();
  showMenu();
  editIdx = null;
}



