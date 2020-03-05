
  let list = {};
  let cart = {};
  let idx;
  



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
          rejectCallback(new Error("serverul a dat eroare"));
        }
      }
    }
  };
  xhttp.open(method, url, true);
  xhttp.send(body);
};



function getList() {
  ajax("GET", "https://restaurant-80efb.firebaseio.com/wines.json", undefined, function(answer) {
    list = answer;
    draw();
  })
};

function draw() {
  var str = "";
  for (var i in list) {
    if (!list.hasOwnProperty(i)) {
      continue;
    }
    if (list[i] === null) {
      continue;
    }

    str += `
    <div class="alignbox-big filterDiv  ${list[i].category}">

    <div class="information">
    <small class="category"> - ${list[i].category} - </small> <br>
    <h5> ${list[i].name}  </h5></div>
    <div><p>${list[i].description}</p></div>
    <div class="details">
      <div><strong> Price: ${list[i].price} lei</strong></div>
     
    </div>
  </div>
  `;
  }

  document.querySelector("#dishesContainer").innerHTML = str;
  filterSelection("all")
}




// filter

function filterSelection(c) {
  
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    event.preventDefault()
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}


function w3AddClass(element, name) {
  
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    event.preventDefault()
    if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
  }
}

function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    event.preventDefault()
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);     
    }
  }
  element.className = arr1.join(" ");
}

// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("sortingBtns");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}