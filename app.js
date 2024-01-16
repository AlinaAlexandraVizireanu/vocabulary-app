const form = document.querySelector("form");
const input = document.querySelector("#text");
const container = document.querySelector(".container");
const mainContent = document.querySelector(".main_content");
const line = document.querySelector(".main_content-line");
const meaning = document.querySelector(".main_content-meaning");
const displayWord = document.createElement("h1");
const displayMeaning = document.createElement("p");

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
        let storedWord = "";
        for (let word in searchedData) {
          if (word.includes(textInput)) {
            line.classList.add("visible");
            meaning.classList.add("visible");
            displayWord.textContent = word;
            mainContent.insertBefore(displayWord, line);
            displayMeaning.textContent = searchedData[word];
            mainContent.insertBefore(displayMeaning, meaning.nextSibling);
            storedWord = word;
            break;
          }
        }
        if (textInput != storedWord) {
          alert("The searched word does not exist");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
