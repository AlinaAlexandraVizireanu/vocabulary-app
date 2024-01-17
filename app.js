const form = document.querySelector("form");
const input = document.querySelector("#text");
const container = document.querySelector(".container");
const containerLogo = document.querySelector(".logo_container-book");
const mainContent = document.querySelector(".main_content");
const line = document.querySelector(".main_content-line");
const meaning = document.querySelector(".main_content-meaning");
const toggleBtn = document.querySelector(".toggleBtn");
const toggleBtnLogo = document.querySelector(".toggle_container-logo");

const displayWord = document.createElement("h1");
const displayMeaning = document.createElement("p");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let textInput = input.value.toLowerCase();
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
          if (word.toLocaleLowerCase().includes(textInput)) {
            line.classList.add("visible");
            meaning.classList.add("visible");
            displayWord.textContent = word;
            mainContent.insertBefore(displayWord, line);
            displayMeaning.textContent = searchedData[word];
            mainContent.insertBefore(displayMeaning, meaning.nextSibling);
            storedWord = word.toLocaleLowerCase();
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

toggleBtn.addEventListener("click", function () {
  if (!document.body.classList.contains("dark-mode")) {
    document.body.classList.add("dark-mode");
    line.classList.add("main_content-line-dark");
    containerLogo.src = "./images/menu_book_white_48dp.svg";
    toggleBtnLogo.src = "./images/light_mode_white_36dp.svg";
  } else {
    document.body.classList.remove("dark-mode");
    line.classList.remove("main_content-line-dark");
    containerLogo.src = "./images/menu_book_black_48dp.svg";
    toggleBtnLogo.src = "./images/dark_mode_black_36dp.svg";
  }
});
