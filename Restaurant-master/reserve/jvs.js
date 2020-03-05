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

  async function requestReservation() {
    event.preventDefault();
   var reservation = {};
    reservation.name = document.querySelector('#inputName').value;
    reservation.phone = document.querySelector("#inputPhone").value;
    reservation.guests = document.querySelector('#inputGuests').value;
    reservation.date = document.querySelector('#inputDate').value;
    reservation.hour = document.querySelector('#inputHour').value;
    reservation.details = document.querySelector('#inputDetails').value;
      if (idxEdit === null) {
          await fetch(`https://restaurant-80efb.firebaseio.com/reservation.json`,{
              method: "POST",
              body: JSON.stringify(reservation)
          });
          await get();
      } else {
          await fetch(`https://restaurant-80efb.firebaseio.com/reservation/${idxEdit}.json`,{
              method: "PUT",
              body: JSON.stringify(reservation)
          });
          await get();
          idxEdit = null;
         
      }alert("Thank-you for your reservation. You will recieve a confirmation sms shortly.")
  }

  async function get() {
    await ajax("GET", "https://restaurant-80efb.firebaseio.com/reservation.json")
      .then(function(answer) {
        lista = answer;
      })
  };



  