// Логіка взаємодії гравців з полем і картками Шанс
import chanceCards from './chance_cards_extended.js';

// Обробка подій на клітинці
function handleCellEvent(player, cell) {
  if (cell.classList.contains('street')) {
    const owner = cell.dataset.owner;
    const price = parseInt(cell.dataset.price);

    if (!owner) {
      // Якщо картка не куплена
      const buy = confirm(`Хочете купити нерухомість ${cell.textContent} за ${price}?`);
      if (buy && player.balance >= price) {
        player.balance -= price;
        cell.dataset.owner = player.name; // Присвоюємо картку гравцю
        addPropertyToPlayer(player, cell.textContent); // Додаємо картку до власності гравця
        alert(`${player.name} купив(ла) нерухомість ${cell.textContent}!`);
        updatePlayerBalance(player); // Оновлюємо баланс після покупки
      } else if (player.balance < price) {
        alert("Недостатньо грошей для покупки!");
      }
    } else if (owner !== player.name) {
      // Якщо картка належить іншому гравцю
      const rent = Math.floor(price * 0.1); // Оренда становить 10% від вартості картки
      alert(`Ця картка належить ${owner}. Ви повинні заплатити оренду ${rent}.`);
      player.balance -= rent;

      // Знаходимо власника та збільшуємо його баланс
      const ownerPlayer = players.find(p => p.name === owner);
      if (ownerPlayer) {
        ownerPlayer.balance += rent;
        updatePlayerBalance(ownerPlayer);
      }

      updatePlayerBalance(player);
    }
  }

  // Казна
  if (cell.classList.contains('event')) {
    alert("Ви потрапили на Казну! Отримуєте 500.");
    player.balance += 500;
    updatePlayerBalance(player);
  }

  // Шанс
  if (cell.classList.contains('chance')) {
    handleChance(player); // Викликаємо функцію обробки шансу
  }

  // Податки
  if (cell.classList.contains('tax')) {
    alert("Ви потрапили на податки! Сплачуєте 100.");
    player.balance -= 100;
    updatePlayerBalance(player);
  }

  // В'язниця
  if (cell.classList.contains('jail')) {
    alert("Ви потрапили у в'язницю. Пропустіть хід.");
    player.skipTurn = true;
  }
}

// Логіка для шансу
function handleChance(player) {
  const randomCard = chanceCards[Math.floor(Math.random() * chanceCards.length)];
  alert(randomCard.message);
  randomCard.effect(player);
  updatePlayerBalance(player);
}

// Оновлення балансу гравця на екрані
function updatePlayerBalance(player) {
  const balanceElement = document.getElementById(`player-balance-${player.name}`);
  if (balanceElement) {
    balanceElement.textContent = `Баланс: ${player.balance}`;
  }
}

// Додавання нерухомості до гравця
function addPropertyToPlayer(player, propertyName) {
  const propertyListElement = document.getElementById(`player-properties-${player.name}`);
  if (propertyListElement) {
    const listItem = document.createElement('li');
    listItem.textContent = propertyName;
    propertyListElement.appendChild(listItem);
  }
}

// Експорт функцій для використання в інших файлах
export { handleCellEvent, handleChance, updatePlayerBalance, addPropertyToPlayer };
