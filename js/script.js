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
const countSteps = document.createElement('p');
countSteps.textContent = 'Число ходов: ';
const countStepsValue = document.createElement('span').textContent = '0';
const countFoundPairs = document.createElement('p');
countFoundPairs.textContent = 'Число найденных пар: ';
const countFoundPairsValue = document.createElement('span').textContent = '0';
const gameField = document.createElement('div');
gameField.classList.add('game-field');

//load document
document.body.append(container);
container.append(headerSection, mainSection);
headerSection.append(header, headerButtons);
header.append(titleH1);
headerButtons.append(btnNewGame, btnTableLeaders);
mainSection.append(section1, section2);
section1.append(gameInfo);
gameInfo.append(countSteps, countFoundPairs);
countSteps.append(countStepsValue);
countFoundPairs.append(countFoundPairsValue);
section2.append(gameField);


let cardsArray = [];
//create game cards
async function loadCards() {
  try {
    const response = await fetch('./cards.json');
    const cards = await response.json();
    console.log('cards from async = '+ cards);
    
    createCard(cards);
    cardsClick(cardsArray);

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

function cardsClick(cardsArray) {
    const cardsGame = document.querySelectorAll('.game-card');
    let card1 = '';
    let card2 = '';
    let card1Tag;
    let card2Tag;
    console.log(cardsGame);
    console.log(cardsArray);

    for (let i = 0; i < cardsGame.length; i++) {
        cardsGame[i].addEventListener('click', () => {
            cardsGame[i].classList.add('open');
            console.log(cardsGame[i]);
            console.log(cardsArray[i]);
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
            } else if (card1 !== '' && card2 !== '') {
                console.log('Вы не угадали!');
                setTimeout(() => {
                    card1Tag.classList.remove('open');
                    }, 3000);
                setTimeout(() => {
                    card2Tag.classList.remove('open');
                    }, 3000);
                card1 = '';
                card2 = '';
            }
        })       
    }
}

loadCards();

btnNewGame.addEventListener('click', () => {
    loadCards();
})

