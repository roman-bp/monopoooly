// Функція для кидання кубиків
function rollDice() {
  const dice1 = Math.floor(Math.random() * 6) + 1;
  const dice2 = Math.floor(Math.random() * 6) + 1;
  const total = dice1 + dice2;
  console.log(`Ви кинули кубики: ${dice1} і ${dice2}, загалом: ${total}`);
  return total;
}

// Функція для переміщення гравця по полю
function movePlayer() {
  let currentPlayer = players[currentPlayerIndex];
  let diceRoll = rollDice();
  currentPlayer.position = (currentPlayer.position + diceRoll) % 40; // 40 клітинок на полі

  console.log(`${currentPlayer.name} пересувається на ${diceRoll} клітинок. Нова позиція: ${currentPlayer.position}`);

  movePlayerToken(currentPlayer); // Переміщуємо фішку гравця

  const currentCell = document.querySelector(`.cell:nth-child(${currentPlayer.position + 1})`);
  if (currentCell) {
    handleCellEvent(currentPlayer, currentCell); // Обробляємо подію на клітинці
  } else {
    console.error("Не знайдено клітинку для позиції:", currentPlayer.position);
  }

  updatePlayerPosition(currentPlayer); // Оновлюємо дані в кабінеті
  updatePlayerBalance(currentPlayer); // Оновлюємо баланс
  switchPlayer(); // Передаємо хід іншому гравцю
}

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
      alert(`Ця картка належить ${owner}. Ви повинні заплатити оренду.`);
      player.balance -= 50; // Наприклад, оренда 50
      updatePlayerBalance(player);
    }
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
  }
}

// Логіка для шансу
function handleChance(player) {
  const chanceOutcome = Math.random() > 0.5 ? 'win' : 'lose';
  if (chanceOutcome === 'win') {
    const bonus = 100;
    player.balance += bonus;
    alert(`Шанс! Ви виграли ${bonus}.`);
  } else {
    const penalty = 100;
    player.balance -= penalty;
    alert(`Шанс! Ви втратили ${penalty}.`);
  }
}

// Додаємо обробник кліку на кнопку кидка кубиків
document.getElementById("roll-button").addEventListener("click", movePlayer);
