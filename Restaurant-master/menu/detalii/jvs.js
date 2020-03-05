
var id = window.location.search.split(/=/g)[1];
var url = `https://restaurant-80efb.firebaseio.com/dishes/${id}.json`;

fetch(url)
  .then(response => response.json())
  .then(dishes => {
    document.querySelector("#name").innerHTML = dishes.name;
    document.querySelector("#ingredients").innerHTML = dishes.ingredients;
    document.querySelector("#description").innerHTML = dishes.description;
    document.querySelector("#image>img").src = dishes.image;
    document.querySelector("#price").innerHTML =  `${dishes.price} lei` ;
  });



