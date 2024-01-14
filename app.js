const form = document.querySelector("form");
const input = document.querySelector("#text");

const displayWord = document.createElement("h1");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let textInput = input.value;
  if (textInput === "") {
    alert("Please search for a word");
  } else {
    axios
      .get("data.json")
      .then((response) => {
        let data = response.data;
        let firstLetter = textInput[0].toUpperCase();
        let searchedData = data[firstLetter];

        for (let word in searchedData) {
          if (word.includes(textInput)) {
            document.body.appendChild(displayWord);
            displayWord.textContent = searchedData[word];
            break;
          }
        }
        if (textInput != "") {
          alert("The searched word does not exist");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
