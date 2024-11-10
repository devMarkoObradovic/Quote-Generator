const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twiter');
const newQuoteBtn = document.getElementById('new-quote');

let apiQuotes = [];

// Show new quote
function newQuote() {
    // Pick random quote from apiQuotes
    let quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if author field is blank
    if (!quote.author) {
        authorText.textContent = "- Anonymous -";
    } else {
        authorText.textContent = `- ${quote.author} -`;
    }
    //Check quote lenght to change style of text  
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
}

// Get Quotes from API
async function getQuotes() {
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // Catch error here
        console.log(error);
    }
}

// Tweet quote
function tweetQuote() {
    const twiterUrl = `https://twiter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twiterUrl, '_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On load
getQuotes();
