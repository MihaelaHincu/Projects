$('.carousel-fade').carousel({
  interval: 2500
})


function removeHidden() {
 
  var x = document.getElementById("hidden");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}
