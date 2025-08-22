const cardBox = document.getElementById('card-text');
cardBox.addEventListener('keypress', (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    parseCard(cardBox.value);
    cardBox.value = "";
  }
});

function parseCard(str) {
   console.log("click" + str)
}