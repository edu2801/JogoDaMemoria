const FRONT = "card_front";
const BACK = "card_back";
const CARD = 'card';
const ICON = "icon";


startGame();

function startGame() {
    initializeCards(game.createCardsFormTechs());
};

function initializeCards(cards) {
    let gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = "";
    game.cards.map(card => {
        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;

        createCardContent(card, cardElement);

        cardElement.addEventListener('click', flipCard);
        cardElement.addEventListener('click', counter);
        gameBoard.appendChild(cardElement);
    });
};

function createCardContent(card, cardElement) {
    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);
};

function createCardFace(face, card, element) {
    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);
    if (face === FRONT) {
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = `./assets/${card.icon}.png`;
        cardElementFace.appendChild(iconElement);
    } else {
        cardElementFace.innerHTML = "&lt/&gt";
    };
    element.appendChild(cardElementFace);
};

function flipCard() {

    if (game.setCard(this.id)) {
        this.classList.add('flip');
        if (game.secondCard) {
            if (game.checkMatch()) {
                game.clearCards();
                if (game.checkGameOver()) {
                    setRecord();
                    let gameOverLayer = document.getElementById("gameOver");
                    gameOverLayer.style.display = "flex";
                }
            } else {
                setTimeout(() => {
                    let fistCardView = document.getElementById(game.fistCard.id);
                    let secondCardView = document.getElementById(game.secondCard.id);

                    fistCardView.classList.remove("flip");
                    secondCardView.classList.remove("flip");
                    game.unflipCards();
                }, 1000);
            }
        }
    }

};

function restart() {
    game.clearCards();
    game.counter = 0;
    startGame();
    let gameOverLayer = document.getElementById("gameOver");
    gameOverLayer.style.display = "none";
};

function counter() {
    let counterDisplay = document.getElementById("counter");
    counterDisplay.innerHTML = `Você ganhou o jogo com ${game.counter} clicks.`
    game.counter++;
}

function setRecord() {
    let recordDisplay = document.getElementById("record");

    if (!game.record) {
        game.record = game.counter;
        recordDisplay.innerHTML = `Melhor pontuação: ${game.record} clicks`;
    }
    else if (game.counter < game.record) {
        game.record = game.counter;
        recordDisplay.innerHTML = `Melhor pontuação: ${game.record} clicks`;
    } else {
        recordDisplay.innerHTML = `Melhor pontuação: ${game.record} clicks`;
    }
}