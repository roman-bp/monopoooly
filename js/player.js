// Ініціалізація гравців
let players = [
  { name: "Гравець 1", position: 0, balance: 1500, tokenId: "player1-token", properties: [] },
  { name: "Гравець 2", position: 0, balance: 1500, tokenId: "player2-token", properties: [] }
];

// Поточний гравець
let currentPlayerIndex = 0;

// Функція для оновлення позиції гравця на екрані
function updatePlayerPosition(player) {
  const positionElement = document.getElementById(`player-position-${player.name}`);
  if (positionElement) {
    positionElement.textContent = `Позиція: ${player.position}`;
  } else {
    console.error(`Елемент для відображення позиції гравця ${player.name} не знайдено.`);
  }
}

// Функція для оновлення балансу гравця на екрані
function updatePlayerBalance(player) {
  const balanceElement = document.getElementById(`player-balance-${player.name}`);
  if (balanceElement) {
    balanceElement.textContent = `Баланс: ${player.balance}`;
  } else {
    console.error(`Елемент для відображення балансу гравця ${player.name} не знайдено.`);
  }
}

// Функція для додавання нерухомості до кабінету гравця
function addPropertyToPlayer(player, propertyName) {
  player.properties.push(propertyName);
  const propertyListElement = document.getElementById(`property-list-${player.name}`);
  if (propertyListElement) {
    const listItem = document.createElement('li');
    listItem.textContent = propertyName;
    propertyListElement.appendChild(listItem);
  } else {
    console.error(`Елемент для списку нерухомості гравця ${player.name} не знайдено.`);
  }
}

// Перемикання між гравцями
function switchPlayer() {
  currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
  document.getElementById("current-player").textContent = `Хід: ${players[currentPlayerIndex].name}`;
}
