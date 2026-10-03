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

//create modal window results
const resultPopup = document.createElement('div');
resultPopup.classList.add('result-popup', 'hidden');
const resultContainer = document.createElement('div');
resultContainer.classList.add('result-container');
const resultHeader = document.createElement('h2');
resultHeader.classList.add('result-header');
resultHeader.textContent = '10 лучших результатов';
const resultInfo = document.createElement('ol');
resultInfo.classList.add('result-info');
const btnCloseResult = document.createElement('button');
btnCloseResult.classList.add('result-close');
btnCloseResult.textContent = 'Закрыть';

for (let i = 0; i < 10; i++) {
    const resultInfoRow = document.createElement('li');
    resultInfoRow.classList.add('result-row');
    resultInfoRow.textContent = '...';
    resultInfo.append(resultInfoRow);
}
//const resultInfoRow = document.createElement('li');

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
container.append(resultPopup);
resultPopup.append(resultContainer);
resultContainer.append(resultHeader, resultInfo, btnCloseResult);


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
    cardsClick(cardsArray, countSteps, countPairs);
    TableResultsWindow();

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

function cardsClick(cardsArray, countSteps, countPairs) {
    const cardsGame = document.querySelectorAll('.game-card');
    //countSteps = document.querySelector('.count-steps--value').textContent;
    let card1 = '';
    let card2 = '';
    let card1Tag;
    let card2Tag;
    console.log(cardsGame);
    console.log(cardsArray);

    for (let i = 0; i < cardsGame.length; i++) {
        cardsGame[i].addEventListener('click', () => {
            cardsGame[i].classList.add('open');
            if (card1 === '') {
                card1 = cardsArray[i];
                card1Tag = cardsGame[i];
                console.log('card1 = ' + card1);
            } else {
                card2 = cardsArray[i];
                card2Tag = cardsGame[i];
                console.log('card2 = ' + card2);
            }
            if (card1 === card2 && card1 !== '' && card2 !== '') {
                console.log('Вы угадали!');
                card1 = '';
                card2 = '';
                countSteps++;
                countPairs++;
                countStepsValue.textContent = `${countSteps}`;
                countFoundPairsValue.textContent = `${countPairs} из 8`;
            } else if (card1 !== '' && card2 !== '') {
                console.log('Вы не угадали!');
                setTimeout(() => {
                    card1Tag.classList.remove('open');
                    }, 1500);
                setTimeout(() => {
                    card2Tag.classList.remove('open');
                    }, 1500);
                card1 = '';
                card2 = '';
                countSteps++;
                countStepsValue.textContent = `${countSteps}`;
            }
        })       
    }
}

function TableResultsWindow() {
    btnTableLeaders.addEventListener('click', () => {
        resultPopup.classList.remove('hidden');
    })

    resultPopup.addEventListener('click', (e) => {
    if (e.target.classList.contains('result-popup')) {
        resultPopup.classList.add('hidden');
        //document.body.classList.toggle('no-scroll');
    }

    btnCloseResult.addEventListener('click', () => {
        resultPopup.classList.add('hidden');
        //document.body.classList.toggle('no-scroll');
    })
})
}

loadCards();

btnNewGame.addEventListener('click', () => {
    gameField.textContent = '';
    cardsArray = [];
    countStepsValue.textContent = 0;
    countFoundPairsValue.textContent = 0;
    loadCards();
})

