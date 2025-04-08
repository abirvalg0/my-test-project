// JavaScript для страницы подтверждения заказа

document.addEventListener('DOMContentLoaded', () => {
  // Получаем информацию о заказе из localStorage
  const orderJson = localStorage.getItem('currentOrder');
  
  // Если информация о заказе не найдена, возвращаемся на главную страницу
  if (!orderJson) {
    alert('Информация о заказе не найдена. Возможно, страница была обновлена или вы перешли по прямой ссылке.');
    window.location.href = 'index.html';
    return;
  }
  
  // Парсим заказ из JSON
  const order = JSON.parse(orderJson);
  
  // Преобразуем строки дат обратно в объекты Date
  order.departureDate = new Date(order.departureDate);
  order.orderDate = new Date(order.orderDate);
  
  // Элементы DOM
  const orderDetails = document.getElementById('order-details');
  const downloadTicketBtn = document.getElementById('download-ticket');
  const printTicketBtn = document.getElementById('print-ticket');
  
  // Отображаем детали заказа
  displayOrderDetails(order);
  
  // Обработчики для кнопок
  downloadTicketBtn.addEventListener('click', () => {
    downloadTicket(order);
  });
  
  printTicketBtn.addEventListener('click', () => {
    printTicket(order);
  });
  
  // Функция отображения деталей заказа
  function displayOrderDetails(order) {
    const departureTime = formatTime(order.departureDate);
    const arrivalTime = formatTime(new Date(order.departureDate.getTime() + order.duration * 60000));
    
    orderDetails.innerHTML = `
      <div class="order-header">
        <h3>Заказ #${order.orderId}</h3>
        <p>Дата заказа: ${formatDate(order.orderDate)}, ${formatTime(order.orderDate)}</p>
      </div>
      
      <div class="order-info">
        <h4>Информация о билете</h4>
        <p><strong>Маршрут:</strong> ${order.routeName}</p>
        <p><strong>Теплоход:</strong> ${order.shipName}</p>
        <p><strong>Дата отправления:</strong> ${formatDate(order.departureDate)}</p>
        <p><strong>Время:</strong> ${departureTime} - ${arrivalTime}</p>
        <p><strong>Количество пассажиров:</strong> ${order.passengers}</p>
        <p><strong>Стоимость:</strong> ${order.totalPrice} ₽</p>
      </div>
      
      <div class="customer-info">
        <h4>Информация о покупателе</h4>
        <p><strong>ФИО:</strong> ${order.customerName}</p>
        <p><strong>Email:</strong> ${order.customerEmail}</p>
        <p><strong>Телефон:</strong> ${order.customerPhone}</p>
      </div>
      
      ${order.comment ? `
        <div class="comment">
          <h4>Комментарий к заказу</h4>
          <p>${order.comment}</p>
        </div>
      ` : ''}
    `;
  }
  
  // Функция загрузки билета
  function downloadTicket(order) {
    // Создаем содержимое билета в формате HTML
    const ticketHtml = generateTicketHtml(order);
    
    // Создаем Blob с содержимым билета
    const blob = new Blob([ticketHtml], {type: 'text/html'});
    
    // Создаем ссылку для скачивания
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Билет-${order.orderId}.html`;
    
    // Добавляем ссылку в DOM, кликаем по ней и удаляем
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 0);
  }
  
  // Функция печати билета
  function printTicket(order) {
    // Создаем содержимое билета в формате HTML
    const ticketHtml = generateTicketHtml(order);
    
    // Открываем новое окно для печати
    const printWindow = window.open('', '_blank');
    printWindow.document.write(ticketHtml);
    printWindow.document.close();
    
    // Ждем загрузки страницы перед печатью
    printWindow.onload = function() {
      printWindow.print();
      // printWindow.close(); // Комментируем, чтобы окно не закрывалось автоматически
    };
  }
  
  // Функция генерации HTML для билета
  function generateTicketHtml(order) {
    const departureTime = formatTime(order.departureDate);
    const arrivalTime = formatTime(new Date(order.departureDate.getTime() + order.duration * 60000));
    
    return `
      <!DOCTYPE html>
      <html lang="ru">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Билет №${order.orderId}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          
          .ticket {
            border: 2px solid #1e3a8a;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
            position: relative;
          }
          
          .ticket-header {
            text-align: center;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 1px solid #ddd;
          }
          
          .ticket-logo {
            font-size: 24px;
            font-weight: bold;
            color: #1e3a8a;
            margin-bottom: 5px;
          }
          
          .ticket-title {
            font-size: 20px;
            margin: 10px 0;
          }
          
          .ticket-info {
            margin-bottom: 20px;
          }
          
          .ticket-info h3 {
            margin-bottom: 10px;
            color: #1565c0;
          }
          
          .barcode {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
          }
          
          .barcode-text {
            font-family: monospace;
            font-size: 14px;
            margin-top: 10px;
          }
          
          @media print {
            body {
              padding: 0;
            }
            
            .no-print {
              display: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="ticket">
          <div class="ticket-header">
            <div class="ticket-logo">ВодныйТранспорт</div>
            <p>Билеты на теплоходы в Санкт-Петербурге</p>
            <h1 class="ticket-title">Билет на теплоход</h1>
            <p><strong>Номер заказа:</strong> ${order.orderId}</p>
          </div>
          
          <div class="ticket-info">
            <h3>Информация о билете</h3>
            <p><strong>Маршрут:</strong> ${order.routeName}</p>
            <p><strong>Теплоход:</strong> ${order.shipName}</p>
            <p><strong>Дата отправления:</strong> ${formatDate(order.departureDate)}</p>
            <p><strong>Время:</strong> ${departureTime} - ${arrivalTime}</p>
            <p><strong>Продолжительность:</strong> ${formatDuration(order.duration)}</p>
            <p><strong>Количество пассажиров:</strong> ${order.passengers}</p>
          </div>
          
          <div class="ticket-info">
            <h3>Информация о покупателе</h3>
            <p><strong>ФИО:</strong> ${order.customerName}</p>
            <p><strong>Email:</strong> ${order.customerEmail}</p>
            <p><strong>Телефон:</strong> ${order.customerPhone}</p>
          </div>
          
          <div class="barcode">
            <svg width="200" height="80" viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Простая имитация штрих-кода -->
              <rect x="10" y="10" width="2" height="60" fill="black"/>
              <rect x="15" y="10" width="1" height="60" fill="black"/>
              <rect x="20" y="10" width="3" height="60" fill="black"/>
              <rect x="25" y="10" width="2" height="60" fill="black"/>
              <rect x="30" y="10" width="4" height="60" fill="black"/>
              <rect x="38" y="10" width="1" height="60" fill="black"/>
              <rect x="42" y="10" width="2" height="60" fill="black"/>
              <rect x="47" y="10" width="3" height="60" fill="black"/>
              <rect x="52" y="10" width="1" height="60" fill="black"/>
              <rect x="56" y="10" width="4" height="60" fill="black"/>
              <rect x="63" y="10" width="2" height="60" fill="black"/>
              <rect x="68" y="10" width="1" height="60" fill="black"/>
              <rect x="72" y="10" width="3" height="60" fill="black"/>
              <rect x="78" y="10" width="2" height="60" fill="black"/>
              <rect x="84" y="10" width="1" height="60" fill="black"/>
              <rect x="88" y="10" width="4" height="60" fill="black"/>
              <rect x="96" y="10" width="2" height="60" fill="black"/>
              <rect x="100" y="10" width="3" height="60" fill="black"/>
              <rect x="105" y="10" width="1" height="60" fill="black"/>
              <rect x="110" y="10" width="2" height="60" fill="black"/>
              <rect x="115" y="10" width="4" height="60" fill="black"/>
              <rect x="122" y="10" width="2" height="60" fill="black"/>
              <rect x="127" y="10" width="1" height="60" fill="black"/>
              <rect x="130" y="10" width="3" height="60" fill="black"/>
              <rect x="136" y="10" width="1" height="60" fill="black"/>
              <rect x="140" y="10" width="4" height="60" fill="black"/>
              <rect x="147" y="10" width="2" height="60" fill="black"/>
              <rect x="152" y="10" width="1" height="60" fill="black"/>
              <rect x="155" y="10" width="3" height="60" fill="black"/>
              <rect x="162" y="10" width="2" height="60" fill="black"/>
              <rect x="166" y="10" width="1" height="60" fill="black"/>
              <rect x="170" y="10" width="4" height="60" fill="black"/>
              <rect x="178" y="10" width="2" height="60" fill="black"/>
              <rect x="183" y="10" width="1" height="60" fill="black"/>
              <rect x="188" y="10" width="2" height="60" fill="black"/>
            </svg>
            <div class="barcode-text">${order.orderId}</div>
          </div>
          
          <div class="ticket-info">
            <h3>Важная информация</h3>
            <p>Пожалуйста, прибудьте на причал за 15 минут до отправления теплохода.</p>
            <p>Предъявите этот билет (электронную или печатную версию) при посадке.</p>
            <p>При необходимости иметь с собой документ, удостоверяющий личность.</p>
          </div>
        </div>
        
        <div class="no-print">
          <button onclick="window.print()">Распечатать билет</button>
          <button onclick="window.close()">Закрыть</button>
        </div>
      </body>
      </html>
    `;
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