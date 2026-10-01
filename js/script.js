// container
const container = document.createElement('div');
container.classList.add('container');

//header
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

//main




document.body.append(container);
container.append(headerSection);
headerSection.append(header, headerButtons);
header.append(titleH1);
headerButtons.append(btnNewGame, btnTableLeaders);