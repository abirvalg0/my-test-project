// JavaScript для страницы выбора билетов

document.addEventListener('DOMContentLoaded', () => {
  // Элементы формы фильтрации
  const shipSelect = document.getElementById('ship-select');
  const routeSelect = document.getElementById('route-select');
  const dateSelect = document.getElementById('date-select');
  const ticketsList = document.getElementById('tickets-list');
  
  // Установка минимальной даты на сегодня
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  dateSelect.min = `${yyyy}-${mm}-${dd}`;
  dateSelect.value = `${yyyy}-${mm}-${dd}`;
  
  // Заполнение выпадающего списка с маршрутами
  const routes = getAllRoutes();
  Object.values(routes).forEach(route => {
    const option = document.createElement('option');
    option.value = route.id;
    option.textContent = route.name;
    routeSelect.appendChild(option);
  });
  
  // Получение параметров URL
  const urlParams = new URLSearchParams(window.location.search);
  const shipParam = urlParams.get('ship');
  
  // Установка значения фильтра теплохода, если передан в URL
  if (shipParam && shipsData[shipParam]) {
    shipSelect.value = shipParam;
  }
  
  // Загрузка билетов при загрузке страницы
  loadTickets();
  
  // Обработчики событий для фильтров
  shipSelect.addEventListener('change', loadTickets);
  routeSelect.addEventListener('change', loadTickets);
  dateSelect.addEventListener('change', loadTickets);
  
  // Функция загрузки билетов
  function loadTickets() {
    // Получаем значения фильтров
    const shipId = shipSelect.value !== 'all' ? shipSelect.value : null;
    const routeId = routeSelect.value !== 'all' ? routeSelect.value : null;
    const date = dateSelect.value;
    
    // Очищаем список билетов
    ticketsList.innerHTML = '<div class="loading">Загрузка доступных билетов...</div>';
    
    // Небольшая задержка для имитации загрузки с сервера
    setTimeout(() => {
      // Получаем билеты на выбранную дату
      const tickets = getTicketsForDate(date, shipId, routeId);
      
      // Отображаем билеты
      displayTickets(tickets);
    }, 500);
  }
  
  // Функция отображения билетов
  function displayTickets(tickets) {
    // Очищаем список билетов
    ticketsList.innerHTML = '';
    
    if (tickets.length === 0) {
      ticketsList.innerHTML = '<div class="loading">На выбранную дату билетов не найдено. Пожалуйста, измените параметры поиска.</div>';
      return;
    }
    
    // Добавляем каждый билет в список
    tickets.forEach(ticket => {
      const departureTime = formatTime(ticket.departureDate);
      const arrivalTime = formatTime(new Date(ticket.departureDate.getTime() + ticket.duration * 60000));
      
      const ticketCard = document.createElement('div');
      ticketCard.className = 'ticket-card';
      
      ticketCard.innerHTML = `
        <div class="ticket-info">
          <h3>${ticket.routeName}</h3>
          <div class="ticket-meta">
            <p><strong>Теплоход:</strong> ${ticket.shipName}</p>
            <p class="date-time"><strong>Дата и время:</strong> ${formatDate(ticket.departureDate)}, ${departureTime} - ${arrivalTime}</p>
            <p><strong>Продолжительность:</strong> ${formatDuration(ticket.duration)}</p>
            <p><strong>Свободных мест:</strong> ${ticket.availableSeats}</p>
          </div>
          <div class="ticket-price">
            ${ticket.price} ₽
          </div>
          <div class="ticket-actions">
            <button class="btn btn-primary buy-ticket" data-ticket-id="${ticket.id}">Купить билет</button>
          </div>
        </div>
      `;
      
      ticketsList.appendChild(ticketCard);
      
      // Добавляем обработчик для кнопки покупки
      const buyButton = ticketCard.querySelector('.buy-ticket');
      buyButton.addEventListener('click', () => {
        // Сохраняем ID билета в localStorage для использования на странице оформления
        localStorage.setItem('selectedTicketId', ticket.id);
        // Переходим на страницу оформления
        window.location.href = 'checkout.html';
      });
    });
  }
  
  // Вспомогательная функция для форматирования времени
  function formatTime(date) {
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  }
  
  // Вспомогательная функция для форматирования даты
  function formatDate(date) {
    return date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }
  
  // Вспомогательная функция для форматирования продолжительности
  function formatDuration(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
      return `${hours} ч ${mins > 0 ? mins + ' мин' : ''}`;
    } else {
      return `${mins} мин`;
    }
  }
});