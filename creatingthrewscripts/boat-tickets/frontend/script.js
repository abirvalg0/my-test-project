// Конфигурация
const API_URL = 'http://localhost:5000/api';

// DOM элементы
const toursContainer = document.getElementById('tours-container');
const bookingModal = document.getElementById('booking-modal');
const closeButton = document.querySelector('.close-button');
const bookingForm = document.getElementById('booking-form');
const bookingDetails = document.getElementById('booking-details');
const tourIdInput = document.getElementById('tour-id');
const ticketsCountInput = document.getElementById('tickets-count');
const customerNameInput = document.getElementById('customer-name');
const customerPhoneInput = document.getElementById('customer-phone');

// Текущая выбранная экскурсия
let currentTour = null;

// Загрузка экскурсий с сервера
async function loadTours() {
    try {
        const response = await fetch(`${API_URL}/tours`);
        if (!response.ok) {
            throw new Error('Ошибка при загрузке данных');
        }
        
        const tours = await response.json();
        displayTours(tours);
    } catch (error) {
        console.error('Ошибка:', error);
        toursContainer.innerHTML = `<div class="error">Произошла ошибка при загрузке экскурсий. Пожалуйста, попробуйте позже.</div>`;
    }
}

// Отображение экскурсий на странице
function displayTours(tours) {
    if (tours.length === 0) {
        toursContainer.innerHTML = '<div class="no-tours">Нет доступных экскурсий</div>';
        return;
    }
    
    toursContainer.innerHTML = tours.map(tour => {
        // Форматирование даты
        const date = new Date(tour.date);
        const formattedDate = date.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        
        // Проверка доступности мест
        const soldOut = tour.availableSeats <= 0;
        const buttonHTML = soldOut 
            ? `<button class="btn disabled-btn" disabled>Нет мест</button>`
            : `<button class="btn primary-btn" onclick="openBooking('${tour._id}')">Забронировать</button>`;
        
        return `
            <div class="tour-card">
                <div class="tour-image" style="background-image: url('${tour.imageUrl || 'images/default-boat.jpg'}')"></div>
                <div class="tour-content">
                    <h3>${tour.name}</h3>
                    <div class="tour-meta">
                        <span>Дата: ${formattedDate}</span><br>
                        <span>Отправление: ${tour.departureTime}</span><br>
                        <span>Возвращение: ${tour.returnTime}</span>
                    </div>
                    <p>${tour.description}</p>
                    <span class="price">${tour.price} ₽ / человек</span>
                    <span class="seats">Свободных мест: ${tour.availableSeats}</span>
                    ${buttonHTML}
                </div>
            </div>
        `;
    }).join('');
}

// Открытие модального окна для бронирования
async function openBooking(tourId) {
    try {
        const response = await fetch(`${API_URL}/tours/${tourId}`);
        if (!response.ok) {
            throw new Error('Ошибка при загрузке данных о экскурсии');
        }
        
        const tour = await response.json();
        currentTour = tour;
        
        // Заполнение деталей бронирования
        const date = new Date(tour.date);
        const formattedDate = date.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        
        bookingDetails.innerHTML = `
            <div class="booking-tour-info">
                <h3>${tour.name}</h3>
                <p>Дата: ${formattedDate}</p>
                <p>Время: ${tour.departureTime} - ${tour.returnTime}</p>
                <p>Цена: ${tour.price} ₽ / человек</p>
                <p>Доступно мест: ${tour.availableSeats}</p>
            </div>
        `;
        
        // Обновление данных формы
        ticketsCountInput.max = tour.availableSeats;
        ticketsCountInput.value = 1;
        updateTotalPrice();
        
        // Установка ID экскурсии в скрытое поле формы
        tourIdInput.value = tourId;
        
        // Открытие модального окна
        bookingModal.style.display = 'block';
        
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при загрузке данных о экскурсии');
    }
}

// Закрытие модального окна
function closeModal() {
    bookingModal.style.display = 'none';
    bookingForm.reset();
    currentTour = null;
}

// Обновление общей стоимости при изменении количества билетов
function updateTotalPrice() {
    if (!currentTour) return;
    
    const ticketsCount = parseInt(ticketsCountInput.value) || 1;
    const totalPrice = currentTour.price * ticketsCount;
    
    const totalPriceElement = document.getElementById('total-price');
    if (totalPriceElement) {
        totalPriceElement.textContent = `${totalPrice} ₽`;
    } else {
        const priceInfoDiv = document.createElement('div');
        priceInfoDiv.classList.add('price-info');
        priceInfoDiv.innerHTML = `
            <p>Количество билетов: <span id="tickets-summary">${ticketsCount}</span></p>
            <p>Общая стоимость: <span id="total-price">${totalPrice} ₽</span></p>
        `;
        bookingDetails.appendChild(priceInfoDiv);
    }
}

// Обработка изменения количества билетов
ticketsCountInput.addEventListener('change', function() {
    const ticketsCount = parseInt(this.value) || 1;
    document.getElementById('tickets-summary').textContent = ticketsCount;
    updateTotalPrice();
});

// Обработка отправки формы бронирования
bookingForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    try {
        const formData = {
            tourId: tourIdInput.value,
            customerName: customerNameInput.value,
            customerPhone: customerPhoneInput.value,
            ticketsCount: parseInt(ticketsCountInput.value)
        };
        
        // Отправка данных на сервер для создания бронирования
        const bookingResponse = await fetch(`${API_URL}/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const bookingData = await bookingResponse.json();
        
        if (!bookingResponse.ok) {
            throw new Error(bookingData.error || 'Ошибка при создании бронирования');
        }
        
        // Имитация обработки платежа
        const paymentResponse = await fetch(`${API_URL}/payments/process`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ bookingId: bookingData.bookingId })
        });
        
        const paymentData = await paymentResponse.json();
        
        if (!paymentResponse.ok) {
            throw new Error(paymentData.error || 'Ошибка при обработке платежа');
        }
        
        // Показ информации об успешном бронировании
        showBookingConfirmation(bookingData);
        
    } catch (error) {
        console.error('Ошибка:', error);
        alert(`Ошибка: ${error.message}`);
    }
});

// Отображение подтверждения бронирования
function showBookingConfirmation(bookingData) {
    // Заменяем содержимое модального окна на подтверждение
    const modalContent = document.querySelector('.modal-content');
    modalContent.innerHTML = `
        <span class="close-button">&times;</span>
        <div class="booking-confirmation">
            <h2>Бронирование успешно!</h2>
            <p>Спасибо за ваш заказ. Ваше бронирование подтверждено.</p>
            <div class="confirmation-details">
                <p><strong>Код подтверждения:</strong> ${bookingData.confirmationCode}</p>
                <p><strong>Сумма:</strong> ${bookingData.totalPrice} ₽</p>
            </div>
            <p class="confirmation-note">Пожалуйста, сохраните код подтверждения. Он потребуется при посадке на теплоход.</p>
            <button class="btn primary-btn" onclick="closeAndRefresh()">Закрыть</button>
        </div>
    `;
    
    // Обновляем обработчик кнопки закрытия
    document.querySelector('.close-button').addEventListener('click', closeAndRefresh);
}

// Закрытие модального окна и обновление списка экскурсий
function closeAndRefresh() {
    closeModal();
    loadTours(); // Обновляем список экскурсий, чтобы отразить изменения в доступных местах
}

// Обработчик закрытия модального окна
closeButton.addEventListener('click', closeModal);
window.addEventListener('click', function(e) {
    if (e.target === bookingModal) {
        closeModal();
    }
});

// Загрузка экскурсий при загрузке страницы
document.addEventListener('DOMContentLoaded', loadTours);