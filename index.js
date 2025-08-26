const suits = ["C", "D", "H", "S"]
const faces = ["A", "K", "Q", "10", "9", "8", "7", "6", "5", "4", "3", "2"]

let newId = 0;
let count = 0;
let selectedCard = null;
const highlighted = [] // [[card.id, location1{}, location2{}], ...]


const cardBox = document.getElementById('card-text');
cardBox.addEventListener('keypress', (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    parseCard(cardBox.value);
    cardBox.value = "";
  }
});

const remove = () => {
  if (selectedCard) {
    for (const elt of highlighted) {
      if (elt[0] == selectedCard.id) {
        elt[1].remove();
        elt[2].remove();
        break;
      }
    }
    selectedCard.className="deleteCard card"
    setTimeout(() => {
      selectedCard.remove();
      selectedCard = null;
      document.getElementById('removeThisCard').innerHTML = ":";
      count--;
    }, 150);
  }
} 


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

  addCard(face, suit);  
}

function addCard(face, suit) {
  count++; 
  newId++;
  let fileName = "";
  if (face == 'A') fileName += "ace";
  else if (face == 'K') fileName += "king";
  else if (face == 'Q') fileName += "queen";
  else fileName += face;
  fileName += "_of_";
  if (suit == 'C') fileName += "clubs";
  else if (suit == 'D') fileName += "diamonds";
  else if (suit == 'H') fileName += "hearts";
  else fileName += "spades";
  if (face == 'K' || face == 'Q') fileName += "2";

  const newCard = document.createElement('img');
  newCard.className = "notSelected card";
  newCard.id = newId;
  newCard.src = `images/cards/${fileName}.svg`;

  newCard.addEventListener("click", (e) => {
    cardClicked(newCard, face, suit);
  });

  document.getElementById('hand').append(newCard);

  updateBoard(newCard, face, suit);
}

function cardClicked(newCard, face, suit) {
  if (selectedCard) {
    selectedCard.className = "notSelected card";
    for (const elt of highlighted) {
      if (elt[0] == selectedCard.id) {
        elt[1].className = "highlighter black";
        elt[2].className = "highlighter black";;
        break;
      }
    }
  }
  selectedCard = newCard;
  changeCard(face, suit);
}

function changeCard(face, suit) {
  selectedCard.className = "selected card";
  const removeCard = document.getElementById('removeThisCard');
  removeCard.innerHTML = ": " + face;
  removeCard.innerHTML += suit == 'C' ? '♣' :
  suit == 'D' ? '♦' :
  suit == 'H' ? '♥' : '♠';
  removeCard.className = (suit == 'D' || suit == 'H') ? "red" : "";

  for (const elt of highlighted) {
    if (elt[0] == selectedCard.id) {
      elt[1].className = "highlighter green";
      elt[2].className = "highlighter green";;
      break;
    }
  }
}

const x = ["4.6", "13.61", "22.75", "31.88", "41.01", "50.13", "59.3", "68.43", "77.57", "86.7"];
const y = ["1", "10.85", "20.74", "30.52", "40.25", "50", "59.8", "69.95", "79.9", "89.65"];
function updateBoard(newCard, face, suit) {
  const board = document.getElementById('board-container');
  const loc1 = document.createElement('div');
  const loc2 = document.createElement('div');
  loc1.className = "highlighter black";
  loc2.className = "highlighter black";
  loc1.addEventListener("click", (e) => {
    cardClicked(newCard, face, suit);
  });
  loc2.addEventListener("click", (e) => {
    cardClicked(newCard, face, suit);
  });
  
  highlighted.push([newId, loc1, loc2]);
  board.append(loc1);
  board.append(loc2);
}