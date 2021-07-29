const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let flipped = 0;
let attempt = 0;
let stopClicking = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "pink",
  "pink",
  "brown",
  "brown",
  "grey",
  "grey",
  "black",
  "black",
  "yellow",
  "yellow"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
//   console.log("you just clicked", event.target);
    let chosenCard = event.target;
    chosenCard.style.backgroundColor = chosenCard.classList[0];
 // show the Card Color by clciking the Card
    if (!card1 || !card2) {
        chosenCard.classList.add("flipped");
        card1 = card1 || chosenCard;
        card2 = chosenCard === card1 ? null : chosenCard;
        //if card1 not chosen yet, card 1 remain null
    }

    if (card1 && card2) {
        stopClicking = true;
        let cardClass1 = card1.classList[0];
        let cardClass2 = card2.classList[0];

        if (cardClass1 === cardClass2) {
            attempt += 1;
            flipped += 2;
            card1.removeEventListener("click", handleCardClick);
            card2.removeEventListener("click", handleCardClick);
            card1 = null;
            card2 = null;
            stopClicking = false;
            console.log("Matched: " + cardClass1 + " " +cardClass2);
        } else {
            setTimeout(function() {
                card1.style.backgroundColor = "";
                card2.style.backgroundColor = "";
                card1.classList.remove("flipped");
                card2.classList.remove("flipped");
                card1 = null;
                card2 = null;
                stopClicking = false;
                attempt +=1;
                console.log("Not Matched: " + cardClass1 + " " +cardClass2);
            }, 1000);
        }
    }
    if (flipped === COLORS.length) {
        console.log("Attempt:" + attempt);
        console.log("Flipped:" + flipped);
        setTimeout(function() {
            alert("Congrats! You WON with " + attempt + " attempts!" )
        }, 2500);
    }
}

// when the DOM loads
createDivsForColors(shuffledColors);
