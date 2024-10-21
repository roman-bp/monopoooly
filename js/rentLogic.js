// Логіка орендної плати для Монополії

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
  