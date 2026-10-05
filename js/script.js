//window.localStorage.clear();

// create container
const container = document.createElement('div');
container.classList.add('container');

//create header section
const headerSection = document.createElement('header');
const header = document.createElement('div');
header.classList.add('header-title');
const titleH1 = document.createElement('h1');
titleH1.textContent = 'Memory game';
const headerButtons = document.createElement('div');
headerButtons.classList.add('header-buttons');
const btnNewGame = document.createElement('button');
btnNewGame.classList.add('newgame-btn');
btnNewGame.textContent = 'Новая игра';
const btnTableLeaders = document.createElement('button');
btnTableLeaders.textContent = 'Таблица лидеров';

//create main section
const mainSection = document.createElement('main');
const section1 = document.createElement('section');
const section2 = document.createElement('section');
const gameInfo = document.createElement('div');
gameInfo.classList.add('game-info');
const countTakeSteps = document.createElement('p');
countTakeSteps.textContent = 'Число ходов: ';
const countStepsValue = document.createElement('span');
//countStepsValue.classList.add('count-steps--value');
countStepsValue.textContent = '0';
const countFoundPairs = document.createElement('p');
countFoundPairs.textContent = 'Число найденных пар: ';
const countFoundPairsValue = document.createElement('span');
countFoundPairsValue.textContent = '0 из 8';
const gameField = document.createElement('div');
gameField.classList.add('game-field');

//create modal window
const popup = document.createElement('div');
popup.classList.add('popup', 'hidden');
const popupContainer = document.createElement('div');
popupContainer.classList.add('popup-container');
//result window
const resultContainer = document.createElement('div');
resultContainer.classList.add('result-container', 'hidden');
const resultHeader = document.createElement('h2');
resultHeader.classList.add('result-header');
resultHeader.textContent = '10 лучших результатов';
const resultInfo = document.createElement('ol');
resultInfo.classList.add('result-info');
for (let i = 0; i < 10; i++) {
    const resultInfoRow = document.createElement('li');
    resultInfoRow.classList.add('result-row');
    resultInfoRow.textContent = '...';
    resultInfo.append(resultInfoRow);
}
const resultBtnClose = document.createElement('button');
resultBtnClose.classList.add('result-close');
resultBtnClose.textContent = 'Закрыть';

//load document
document.body.append(container);
container.append(headerSection, mainSection);
headerSection.append(header, headerButtons);
header.append(titleH1);
headerButtons.append(btnNewGame, btnTableLeaders);
mainSection.append(section1, section2);
section1.append(gameInfo);
gameInfo.append(countTakeSteps, countFoundPairs);
countTakeSteps.append(countStepsValue);
countFoundPairs.append(countFoundPairsValue);
section2.append(gameField);
container.append(popup);
popup.append(popupContainer);
popupContainer.append(resultContainer);
resultContainer.append(resultHeader, resultInfo, resultBtnClose);


let cardsArray = [];
let countSteps = 0;
let countPairs = 0;

//create game cards
async function loadCards() {
    try {
        const response = await fetch('./cards.json');
        const cards = await response.json();
        console.log('cards from async = '+ cards);
        
        createCard(cards);
        cardsPlay(cardsArray, countSteps, countPairs);
        tableResultsWindow();

    } catch (error) {
        console.error(error);
    }
}

function shuffle(array) {
    var m = array.length, t, i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
}

function createCard(cards) {

    shuffle(cards);

    if (cardsArray) {
        cardsArray = [];
    }

    cards.forEach(card => {
        const cardItem = document.createElement('button');
        cardItem.classList.add('game-card');
        const cardImgFront = document.createElement('img');
        cardImgFront.src = `${card.image}`;
        cardImgFront.classList.add('game-card--img', 'front');
        const cardImgBack = document.createElement('img');
        cardImgBack.src = './images/nhl.jpg';
        cardImgBack.classList.add('game-card--img', 'back');
        
        cardItem.append(cardImgFront, cardImgBack);
        gameField.append(cardItem);
        cardsArray.push(`${card.name}`);      

    });
   
}

// play game card
let resultArray = [];
let playDate;

if (window.localStorage.length > 0) {
    for (let i = 0; i < window.localStorage.length - 1; i++) {
        resultArray.push(window.localStorage.getItem(`place${i + 1}`));
        if (resultArray[i] === null) {
            resultArray.splice(i, 1);
        }
    };
}
console.log('resultArray begin =', resultArray);


function cardsPlay(cardsArray, countSteps, countPairs) {
    const cardsGame = document.querySelectorAll('.game-card');
    let card1 = '';
    let card2 = '';
    let card1Tag;
    let card2Tag;
    let clickDisabled = false;
    
    console.log(cardsGame);
    console.log(cardsArray);

    for (let i = 0; i < cardsGame.length; i++) {
        //let timeout;
        cardsGame[i].addEventListener('click', () => {
            if (clickDisabled) return;
            
            if (card1 === '' && !cardsGame[i].classList.contains('matched')) {
                card1 = cardsArray[i];
                card1Tag = cardsGame[i];
                cardsGame[i].classList.add('open');
                if (cardsGame[i].classList.contains('open')) {
                clickDisabled = true;
                setTimeout(() => {
                    clickDisabled = false;
                    }, 100);
                }
                console.log('card1 = ' + card1);
            } else if (!cardsGame[i].classList.contains('matched') && !cardsGame[i].classList.contains('open')) {
                card2 = cardsArray[i];
                card2Tag = cardsGame[i];
                cardsGame[i].classList.add('open');
                console.log('card2 = ' + card2);
                clickDisabled = true;
                setTimeout(() => {
                    clickDisabled = false;
                }, 1000);
            }
            if (card1 === card2 && card1 !== '' && card2 !== '' && (!card1Tag.classList.contains('matched') || !card2Tag.classList.contains('matched'))) {
                console.log('Вы угадали!');
                clickDisabled = false;
                card1 = '';
                card2 = '';
                countSteps++;
                countPairs++;
                card1Tag.classList.add('matched');
                card2Tag.classList.add('matched');
                countStepsValue.textContent = `${countSteps}`;
                countFoundPairsValue.textContent = `${countPairs} из 8`;
            } else if (card1Tag.classList.contains('matched') && card1Tag.classList.contains('open') && card2Tag.classList.contains('matched') && card2Tag.classList.contains('open')) {
                clickDisabled = true;
                card1 = '';
                card2 = '';
                    setTimeout(() => {
                        clickDisabled = false;
                    }, 100);
            } else if (card1 !== '' && card2 !== '') {
                console.log('Вы не угадали!');
                setTimeout(() => {
                    card1Tag.classList.remove('open');
                    }, 1000);
                setTimeout(() => {
                    card2Tag.classList.remove('open');
                    }, 1000);
                card1 = '';
                card2 = '';
                countSteps++;
                countStepsValue.textContent = `${countSteps}`;
            }         

            console.log('Число пар' + countPairs);
            if (countPairs === 8) {
                //victory window
                popup.classList.remove('hidden');
                resultContainer.classList.add('hidden');
                const victoryContainer = document.createElement('div');
                victoryContainer.classList.add('victory-container');
                const victoryHeader = document.createElement('h2');
                victoryHeader.classList.add('victory-header');
                victoryHeader.textContent = 'Вы выиграли!';
                const victorySteps = document.createElement('p');
                victorySteps.classList.add('victory-steps');
                victorySteps.textContent = `Число ходов: ${countSteps}`;
                const victoryButtons = document.createElement('button');
                victoryButtons.classList.add('victory-buttons');
                const victoryBtnNewGame = document.createElement('button');
                victoryBtnNewGame.classList.add('newgame-btn');
                victoryBtnNewGame.textContent = 'Новая игра';
                const victoryBtnClose = document.createElement('button');
                victoryBtnClose.classList.add('victory-close');
                victoryBtnClose.textContent = 'Закрыть';
                popupContainer.append(victoryContainer);
                victoryButtons.append(victoryBtnNewGame, victoryBtnClose);
                victoryContainer.append(victoryHeader, victorySteps, victoryButtons);

                let playDate = new Date().toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });

                resultArray.push(`Число ходов: ${countSteps},   Дата: ${playDate}`);

                resultArray.sort((a, b) => a.localeCompare(b));

                console.log('countSteps = ', countSteps);
                console.log('playDate = ', playDate);
                console.log('resultArray = ', resultArray);
                
                for (let i = 0; i < resultArray.length; i++) {
                    window.localStorage.setItem(`place${i + 1}`, `${resultArray[i]}`);
                }

                victoryBtnClose.addEventListener('click', () => {
                    popup.classList.add('hidden');
                    victoryContainer.classList.add('hidden');
                })
                popup.addEventListener('click', (e) => {
                    if (e.target.classList.contains('popup')) {
                        popup.classList.add('hidden');
                        victoryContainer.classList.add('hidden');
                        }
                })
                victoryBtnNewGame.addEventListener('click', () => {
                    popup.classList.add('hidden');
                    victoryContainer.classList.add('hidden');
                    gameField.textContent = '';
                    countStepsValue.textContent = 0;
                    countFoundPairsValue.textContent = 0;
                    loadCards();
                })
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') {
                        popup.classList.add('hidden');
                        //document.body.classList.toggle('no-scroll');
                    }
                })
                tableResultsWindow(resultArray);
            } 
        })  
    }
}

function tableResultsWindow(resultArray) {
    const resultInfoRow = document.querySelectorAll('.result-row');
    btnTableLeaders.addEventListener('click', () => {

        resultContainer.classList.remove('hidden');
        popup.classList.remove('hidden');

        if (window.localStorage.length > 0) {
            for (let i = 0; i < window.localStorage.length; i++) {
                if (i === 10) break;
                resultInfoRow[i].textContent = window.localStorage.getItem(`place${i + 1}`);
            };
        }
    })

    popup.addEventListener('click', (e) => {
    if (e.target.classList.contains('popup')) {
        popup.classList.add('hidden');
        //document.body.classList.toggle('no-scroll');
        }
    })

    resultBtnClose.addEventListener('click', () => {
        popup.classList.add('hidden');
        //document.body.classList.toggle('no-scroll');
    })

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            popup.classList.add('hidden');
            //document.body.classList.toggle('no-scroll');
        }
    })
}

loadCards();

const btnsNewGame = document.querySelectorAll('.newgame-btn');
btnsNewGame.forEach(btn => {
    btn.addEventListener('click', () => {
        gameField.textContent = '';
        cardsArray = [];
        countStepsValue.textContent = 0;
        countFoundPairsValue.textContent = 0;
        loadCards();
    })
});


