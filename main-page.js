// Gavriel_Matatov_3224040088_Gal_Ternovski_323005512

// Check user inputs before starting the game
function checkInputs(){
    let cardsNumberRequested = parseInt(document.getElementById("cards-number").value);
    let playerName = document.getElementById("player-name").value;
    const errorContainer = document.getElementById('errorContainer');

    errorContainer.innerHTML = '';

    const valid = true;

    if (!playerName){
        const errorMessage = document.createElement('h2');
        errorMessage.textContent = 'Please Insert Player Name'
        errorContainer.appendChild(errorMessage)
        alert('Please Insert Player Name.')
        valid = false;
    }
    if (cardsNumberRequested > 30 || !cardsNumberRequested ){
        const errorMessage = document.createElement('h2');
        errorMessage.textContent = 'Please Select A Number Between 01 - 30';
        errorContainer.appendChild(errorMessage);
        alert('Please select a valid number of pairs.');
        valid = false;
    }
    if (cardsNumberRequested % 2 != 0){
        const errorMessage = document.createElement('h2');
        errorMessage.textContent = 'Please Select An Even Number Between 01 - 30';
        errorContainer.appendChild(errorMessage);
        alert('Please select a valid number of pairs.');
        valid = false;
    }

    // All inputs checks passed.
    if(valid){
        window.location.href = `game-page.html?cardsNumberRequested=${cardsNumberRequested}&playerName=${playerName}`
    }
}