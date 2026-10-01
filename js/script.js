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
countSteps.textContent = 'Число ходов:';
const countStepsValue = document.createElement('span').textContent = '0';
const countFoundPairs = document.createElement('p');
countFoundPairs.textContent = 'Число найденных пар:';
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
section2.append(gameField);