// Gavriel_Matatov_3224040088_Gal_Ternovski_323005512

let firstCard, secondCard;
let lockCards = false;

// Restart game function
function restartGame() {
    window.location.href = 'index.html';
}

// Get URL parameters by name function
function getGameParameters(paramToGet) {
    const params = new URLSearchParams(window.location.search);
    return params.get(paramToGet);
}

// Extract player name from url parameters
function displayPlayerName() {
    document.getElementById("player-name-header").innerHTML += getGameParameters('playerName');
}

// Main Game Function
function initializeGame() {
    displayPlayerName();
    initializeTimer();
    displayCards();
}

// Initialize Timer Score
let seconds = -1;
function initializeTimer() {
    seconds++;
    document.getElementById('timer').textContent = seconds;
}

// Update the timer every second
const timerInterval = setInterval(initializeTimer, 1000);

// Card Game
function displayCards() {
    const numOfCards = parseInt(getGameParameters('cardsNumberRequested'));
    const cardsContainer = document.getElementById('cards-container');

    // Initialize cards array and Shuffle the array.
    let shuffledCardsArray = ((numOfCards) => {
        let cardArray = [];
        for (let i = 1; i <= numOfCards; i++) {
            cardArray.push(Math.ceil((i) / 2));
        }
        return cardArray.sort(() => Math.random() - 0.5);
    })(numOfCards);

    // Clear any existing cards
    cardsContainer.innerHTML = '';

    for (let cardId of shuffledCardsArray) {
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute("data-name", cardId);
        card.setAttribute("data-resolved", "no");
        card.innerHTML = `
            <div class="front-card">
                <img class="front-image" src=images/${cardId}.png />
            </div>
            <div class="back-card">
            </div>`;
        cardsContainer.appendChild(card);
        card.addEventListener("click", flipCard);
    }

    setGameBoard(numOfCards);
    window.addEventListener('resize', () => setGameBoard(numOfCards));
}

// Place cards on the board game function
function setGameBoard(numOfCards) {
    const cardsContainer = document.getElementById('cards-container');

    // Calculate the number of rows and columns
    const containerWidth = cardsContainer.clientWidth;
    const containerHeight = cardsContainer.clientHeight;
    const cardSize = Math.min(containerWidth, containerHeight) / Math.ceil(Math.sqrt(numOfCards));

    const aspectRatio = window.innerWidth / window.innerHeight;

    let columns = Math.ceil(Math.sqrt((numOfCards) * aspectRatio));
    let rows = Math.ceil((numOfCards) / columns);
    cardsContainer.style.gridTemplateColumns = `repeat(${columns}, minmax(${cardSize}px, 1fr))`;
    cardsContainer.style.gridTemplateRows = `repeat(${rows}, minmax(${cardSize}px, 1fr))`;
}

// Flip the cards when the user pressed it 
function flipCard() {
    if (lockCards || this === firstCard) 
        return;

    this.classList.add("flipped");

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockCards = true;
    checkCardsMatch();
}

// Check if the two cards that was selected are matching
function checkCardsMatch() {
    let isCardMatch = firstCard.dataset.name === secondCard.dataset.name;

    if (isCardMatch) {
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);

        firstCard.dataset.resolved = 'yes';
        secondCard.dataset.resolved = 'yes';
        resetBoard();
        
    } else {
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            resetBoard();
        }, 500);
    }

}

// Reset the cards selected after a match Of two cards 
function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockCards = false;
}

// Check if all the cards are resolved to end the game
function checkEndGame() {
    // Get the ammount resolved of result cards
    let resolvedCards = document.querySelectorAll('[data-resolved="yes"]').length;
    if (resolvedCards == parseInt(getGameParameters('cardsNumberRequested'))) {
        clearInterval(timerInterval);
        const playerScore = document.getElementById('timer').textContent;
        setTimeout(() => {
            endGame(playerScore);
        }, 1000);
    }
}

const checkEndGameInterval = setInterval(checkEndGame, 500);

// End the game function 
function endGame(playerScore){

    clearInterval(checkEndGameInterval);
    const cardsContainer = document.getElementById('cards-container');
    if (cardsContainer){
        cardsContainer.remove();
    }
    const pTimer = document.getElementById("timer-holder");
    if(pTimer){
        pTimer.remove();
    }
    const congratulationsHeader = document.getElementById('player-name-header');
    congratulationsHeader.textContent = `Congratulations ${getGameParameters('playerName')}, you finished the game in ${playerScore} seconds!`;
    congratulationsHeader.style.padding = '20px';

    const playAgainButton = document.getElementById('restart-game');
    playAgainButton.textContent = 'Play Again';
}