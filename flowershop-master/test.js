// Write a for loop that will iterate from 0 to 20. For each iteration, it will check if the current number is even or odd, and report that to the screen (e.g. "2 is even").

function q(number) {
    for (var i = 0; i <= number; i++) {
        if (i % 2 == 0) {
            console.log(i + " is even")
        } else {
            console.log(i + " is odd")
        }
    }
}


//Write a for loop that will iterate from 0 to 10. For each iteration of the for loop, it will multiply the number by 9 and log the result (e.g. "2 * 9 = 18").
function w(number) {
    for (var i = 0; i <= number; i++) {
        let inmultire = i * 9
        console.log(i + "* 9 =" + inmultire)
    }
}


//Store the following into variables: number of children, partner's name, geographic location, job title.
function e() {
    var childrenNo = 0;
    var name = "Luci";
    var geographic = "Romanica";
    var job = "med FE dev";
    console.log("In 5 years your bf's name will be " + name + " and you will still be living in " + geographic + " hopefully, you'll have " + childrenNo + " kids and your job will be " + job)
}


//Store your birth year in a variable.
// Store a future year in a variable.
// Calculate your 2 possible ages for that year based on the stored values.
// For example, if you were born in 1988, then in 2026 you'll be either 37 or 38, depending on what month it is in 2026.
// Output them to the screen like so: "I will be either NN or NN in YYYY", substituting the values.

function r() {
    var birthYear = 1984;
    var futureYear = 2020;
    var age = futureYear - birthYear;
    console.log('I will be either ' + age + ' or ' + (age - 1));
}

// Write a function called squareNumber that will take one argument (a number), square that number, and return the result. It should also log a string like "The result of squaring the number 3 is 9."
// Write a function called halfNumber that will take one argument (a number), divide it by 2, and return the result. It should also log a string like "Half of 5 is 2.5.".
// Write a function called percentOf that will take two numbers, figure out what percent the first number represents of the second number, and return the result. It should also log a string like "2 is 50% of 4."
// Write a function called areaOfCircle that will take one argument (the radius), calculate the area based on that, and return the result. It should also log a string like "The area for a circle with radius 2 is 12.566370614359172."


function squareNumber(number) {
    return number * number
}
function halfNumber(number) {
    return number / 2
}

function percentOf(a, b) {
    var calculate = Math.floor(a / b * 100);
    console.log(a + " is " + calculate + "% of " + b)
}
//You divide the number you you want to get the percentage for by the number you're getting the percentage of, then multiply it by 100 and do a Math.floor to remove the decimal.

function areaOfCircle(radius) {
    return Math.PI * (radius * radius)
}


// Verbing
// Create a function called verbing.It should take a single argument, a string.If its length is at least 3, it should add 'ing' to its end, unless it already ends in 'ing', 
// in which case it should add 'ly' instead.If the string length is less than 3, it should leave it unchanged.For example:
function verbing (str) {
for (var i= 0; i<str.length; i++) {
    if(str.length>=3)
}
}

function verbing(word) {
    if (word.length < 3) return word;
    if (word.slice(-3) == 'ing') {
      return word + 'ly';
    } else {
      return word + 'ing';
    }
  }


  function trythis (word) {
      var taie = word.slice(-3); // ultimele 3
      console.log(taie)
  }