const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const allButtons = document.querySelectorAll("button");
const wholeQuote = document.getElementById("quote-text");
const loader = document.getElementById("loader");

const colors = ["#173f5f", "#20639b", "#3caea3", "#ab63dd", "#ed553b"];

function setRandomColor() {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  wholeQuote.style.color = randomColor;
  authorText.style.color = randomColor;
  loader.style.borderTop = `16px solid ${randomColor}`;
  Array.from(allButtons).forEach(button => {
    button.style.backgroundColor = randomColor;
  });
}

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

//Get Quote From API
async function getQuote() {
  showLoadingSpinner();
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    //If Author is blank, add 'Unknown'
    if (data.quoteAuthor === "") {
      authorText.innerText = "Unknown";
    } else {
      const text = ` - ${data.quoteAuthor}`;
      authorText.innerText = text;
    }
    //Reduce font size for long quotes
    if (data.quoteText.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = data.quoteText;
    removeLoadingSpinner();
  } catch (error) {
    getQuote();
  }
}

//Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

//Event Listeners
newQuoteBtn.addEventListener("click", getQuote);
newQuoteBtn.addEventListener("click", setRandomColor);
twitterBtn.addEventListener("click", tweetQuote);

//On Load
getQuote();
