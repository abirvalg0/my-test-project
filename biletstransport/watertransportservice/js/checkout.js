// JavaScript для страницы оформления заказа

document.addEventListener('DOMContentLoaded', () => {
  // Получаем ID выбранного билета из localStorage
  const ticketId = localStorage.getItem('selectedTicketId');
  
  // Если ID билета не найден, возвращаемся на страницу выбора билетов
  if (!ticketId) {
    alert('Билет не выбран. Пожалуйста, выберите билет на странице билетов.');
    window.location.href = 'tickets.html';
    return;
  }
  
  // Элементы DOM
  const ticketDetails = document.getElementById('ticket-details');
  const checkoutForm = document.getElementById('checkout-form');
  const passengersInput = document.getElementById('passengers');
  const totalPriceSpan = document.getElementById('total-price');
  
  // Получаем информацию о билете
  const ticket = getTicketById(ticketId);
  
  // Отображаем детали билета
  displayTicketDetails(ticket);
  
  // Обновляем общую стоимость при изменении количества пассажиров
  passengersInput.addEventListener('change', () => {
    updateTotalPrice(ticket);
  });
  
  // Обработчик отправки формы
  checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    processOrder(ticket);
  });
  
  // Функция отображения деталей билета
  function displayTicketDetails(ticket) {
    const departureTime = formatTime(ticket.departureDate);
    const arrivalTime = formatTime(new Date(ticket.departureDate.getTime() + ticket.duration * 60000));
    
    ticketDetails.innerHTML = `
      <div class="ticket-info">
        <h4>${ticket.routeName}</h4>
        <p><strong>Теплоход:</strong> ${ticket.shipName}</p>
        <p><strong>Дата отправления:</strong> ${formatDate(ticket.departureDate)}</p>
        <p><strong>Время:</strong> ${departureTime} - ${arrivalTime}</p>
        <p><strong>Продолжительность:</strong> ${formatDuration(ticket.duration)}</p>
        <p><strong>Стоимость билета:</strong> ${ticket.price} ₽ за человека</p>
      </div>
    `;
    
    // Устанавливаем начальную общую стоимость
    updateTotalPrice(ticket);
  }
  
  // Функция обновления общей стоимости
  function updateTotalPrice(ticket) {
    const passengers = parseInt(passengersInput.value) || 1;
    const totalPrice = ticket.price * passengers;
    totalPriceSpan.textContent = totalPrice;
  }
  
  // Функция обработки заказа
  function processOrder(ticket) {
    // Получаем данные формы
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const passengers = parseInt(passengersInput.value) || 1;
    const comment = document.getElementById('comment').value;
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    
    // Создаем объект заказа
    const order = {
      ticketId: ticket.id,
      shipId: ticket.shipId,
      shipName: ticket.shipName,
      routeId: ticket.routeId,
      routeName: ticket.routeName,
      departureDate: ticket.departureDate,
      duration: ticket.duration,
      price: ticket.price,
      totalPrice: ticket.price * passengers,
      passengers: passengers,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      comment: comment,
      paymentMethod: paymentMethod,
      orderDate: new Date(),
      status: 'pending', // pending, paid, canceled
      orderId: generateOrderId()
    };
    
    // В реальном приложении здесь должна быть интеграция с платежной системой
    // Для прототипа просто сохраняем заказ в localStorage и переходим на страницу подтверждения
    
    // Сохраняем заказ в localStorage
    localStorage.setItem('currentOrder', JSON.stringify(order));
    
    // Имитация запроса к платежной системе
    showPaymentProcessing();
    
    // В рабочем приложении перенаправление должно произойти после успешной оплаты
    setTimeout(() => {
      // Если бы мы использовали Firebase, код был бы примерно такой:
      /*
      db.collection('orders').add(order)
        .then((docRef) => {
          console.log('Order saved with ID: ', docRef.id);
          
          // Отправляем email c билетом (через Cloud Functions)
          // sendTicketEmail(order, docRef.id);
          
          // Переходим на страницу подтверждения
          window.location.href = 'confirmation.html';
        })
        .catch((error) => {
          console.error('Error adding order: ', error);
          alert('Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте еще раз.');
        });
      */
      
      // Для прототипа сразу переходим на страницу подтверждения
      window.location.href = 'confirmation.html';
    }, 2000);
  }
  
  // Функция отображения процесса оплаты
  function showPaymentProcessing() {
    // Создаем оверлей для отображения процесса оплаты
    const overlay = document.createElement('div');
    overlay.className = 'payment-overlay';
    overlay.innerHTML = `
      <div class="payment-processing">
        <div class="spinner"></div>
        <h3>Обработка платежа...</h3>
        <p>Пожалуйста, не закрывайте страницу.</p>
      </div>
    `;
    
    // Добавляем стили для оверлея
    const style = document.createElement('style');
    style.textContent = `
      .payment-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
      }
      
      .payment-processing {
        background-color: white;
        padding: 30px;
        border-radius: 8px;
        text-align: center;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }
      
      .spinner {
        border: 4px solid #f3f3f3;
        border-top: 4px solid #1565c0;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: spin 1s linear infinite;
        margin: 0 auto 20px;
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(overlay);
  }
  
  // Генерация ID заказа
  function generateOrderId() {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 10000);
    return `ORD-${timestamp}-${random}`;
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