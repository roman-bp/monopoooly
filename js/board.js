function movePlayerToken(player) {
  const cells = document.querySelectorAll('.cell'); // Отримуємо всі клітинки
  const token = document.getElementById(player.tokenId); // Отримуємо фішку гравця

  // Спочатку видаляємо фішку з поточної клітинки
  cells.forEach(cell => {
    if (cell.contains(token)) {
      cell.removeChild(token); // Видаляємо фішку з клітинки
    }
  });

  // Визначаємо нову позицію фішки гравця
  const newPosition = player.position % 40; // Щоб залишатись в межах поля
  const targetCell = cells[newPosition]; // Отримуємо клітинку за новою позицією

  // Перевіряємо чи існує цільова клітинка
  if (targetCell) {
    targetCell.appendChild(token); // Додаємо фішку до нової клітинки
  } else {
    console.error("Цільова клітинка не знайдена для позиції: ", newPosition);
  }
}
