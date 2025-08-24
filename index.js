const suits = ["C", "D", "H", "S"]
const faces = ["A", "K", "Q", "10", "9", "8", "7", "6", "5", "4", "3", "2"]

let count = 0;


const cardBox = document.getElementById('card-text');
cardBox.addEventListener('keypress', (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    parseCard(cardBox.value);
    cardBox.value = "";
  }
});

function parseCard(str) {
  const errorMessage = document.getElementById('error');
  errorMessage.innerHTML = "&nbsp;";

  if (count > 6) {
    errorMessage.innerHTML = "Error: Cannot have more than 7 cards!";
    return;
  }

  const card = str.replaceAll(" ", "").toUpperCase();
  let face = "";
  let suit = "";

  if (card.length < 2) {
    errorMessage.innerHTML = "Error: Input is too small!";
    return;
  } else if (card.length > 3 || (card.length > 2 && !card.includes("10"))) {
    errorMessage.innerHTML = "Error: Input is too big!";
    return;
  }

  for (const i in faces){
    if (card.includes(faces[i])) {
      face = faces[i];
      break;
    }
  }
  for (const i in suits) 
    if (card.includes(suits[i])) {
      suit = suits[i];
      break;
    }
  if (!face) {
    errorMessage.innerHTML = "Error: The card's face/value is invalid!";
    return;
  } else if (!suit) {
    errorMessage.innerHTML = "Error: The card's suit is invalid!";
    return;
  }

  console.log(face + " : " + suit);  
}