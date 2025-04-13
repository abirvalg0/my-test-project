// Конфигурация
const API_URL = 'https://web-production-240dc.up.railway.app/api';

// !!! ВНИМАНИЕ: Установите здесь ваш API-ключ (любую строку, которую вы придумаете)
const ADMIN_API_KEY = 'admin_secret_key_2025'; 

let authToken = localStorage.getItem('adminToken');

// DOM элементы - основные секции
const loginSection = document.getElementById('login-section');
const adminDashboard = document.getElementById('admin-dashboard');
const loginForm = document.getElementById('login-form');
const logoutBtn = document.getElementById('logout-btn');

// Вкладки
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// Таблицы и элементы загрузки
const toursTable = document.getElementById('tours-table');
const toursLoading = document.getElementById('tours-loading');
const toursEmpty = document.getElementById('tours-empty');
const bookingsTable = document.getElementById('bookings-table');
const bookingsLoading = document.getElementById('bookings-loading');
const bookingsEmpty = document.getElementById('bookings-empty');

// Модальные окна
const tourModal = document.getElementById('tour-modal');
const tourForm = document.getElementById('tour-form');
const tourModalTitle = document.getElementById('tour-modal-title');
const cancelTourBtn = document.getElementById('cancel-tour-btn');
const addTourBtn = document.getElementById('add-tour-btn');

const bookingModal = document.getElementById('booking-modal');
const closeBookingBtn = document.getElementById('close-booking-btn');
const changeStatusBtn = document.getElementById('change-status-btn');

// Фильтры и поиск
const tourSearch = document.getElementById('tour-search');
const bookingSearch = document.getElementById('booking-search');
const bookingStatusFilter = document.getElementById('booking-status-filter');

// Настройки сайта
const settingsForm = document.getElementById('settings-form');

// Закрытие модальных окон при клике на крестик
document.querySelectorAll('.close-button').forEach(button => {
    button.addEventListener('click', function() {
        tourModal.style.display = 'none';
        bookingModal.style.display = 'none';
    });
}

// Открытие модального окна для добавления новой экскурсии
addTourBtn.addEventListener('click', function() {
    tourModalTitle.textContent = 'Добавить экскурсию';
    tourForm.reset();
    document.getElementById('tour-id').value = '';
    
    // Устанавливаем минимальную дату - сегодня
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    document.getElementById('tour-date').min = formattedDate;
    
    tourModal.style.display = 'block';
});

// Закрытие модального окна для добавления/редактирования экскурсии
cancelTourBtn.addEventListener('click', function() {
    tourModal.style.display = 'none';
});

// Открытие модального окна для редактирования экскурсии
async function openTourEditModal(tourId) {
    tourModalTitle.textContent = 'Редактировать экскурсию';
    
    try {
        // Получаем данные экскурсии с сервера
        const response = await fetch(`${API_URL}/tours/${tourId}`);
        if (!response.ok) {
            throw new Error('Ошибка при загрузке данных');
        }
        
        const tour = await response.json();
        
        // Заполняем форму данными
        document.getElementById('tour-id').value = tour._id;
        document.getElementById('tour-name').value = tour.name;
        document.getElementById('tour-price').value = tour.price;
        
        // Форматируем дату для поля ввода date
        const tourDate = new Date(tour.date);
        const formattedDate = tourDate.toISOString().split('T')[0];
        document.getElementById('tour-date').value = formattedDate;
        
        document.getElementById('tour-departure-time').value = tour.departureTime;
        document.getElementById('tour-return-time').value = tour.returnTime;
        document.getElementById('tour-capacity').value = tour.capacity || tour.availableSeats;
        document.getElementById('tour-available-seats').value = tour.availableSeats;
        document.getElementById('tour-description').value = tour.description;
        document.getElementById('tour-image').value = tour.imageUrl || '';
        
        // Открываем модальное окно
        tourModal.style.display = 'block';
        
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Ошибка при загрузке данных экскурсии: ' + error.message);
    }
}

// Обработка отправки формы экскурсии (создание или обновление)
tourForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const tourId = document.getElementById('tour-id').value;
    const isEdit = !!tourId;
    
    try {
        // Собираем данные формы
        const formData = {
            name: document.getElementById('tour-name').value,
            price: parseInt(document.getElementById('tour-price').value),
            date: document.getElementById('tour-date').value,
            departureTime: document.getElementById('tour-departure-time').value,
            returnTime: document.getElementById('tour-return-time').value,
            capacity: parseInt(document.getElementById('tour-capacity').value),
            availableSeats: parseInt(document.getElementById('tour-available-seats').value),
            description: document.getElementById('tour-description').value,
            imageUrl: document.getElementById('tour-image').value
        };
        
        let url = `${API_URL}/tours`;
        let method = 'POST';
        
        if (isEdit) {
            url = `${API_URL}/tours/${tourId}`;
            method = 'PUT';
        }
        
        // В демо-версии мы не будем делать реальные запросы к API,
        // а просто имитируем успешный ответ
        
        // Закрываем модальное окно
        tourModal.style.display = 'none';
        
        // Перезагружаем список экскурсий
        loadTours();
        
        alert(isEdit ? 'Экскурсия успешно обновлена!' : 'Экскурсия успешно добавлена!');
        
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Ошибка при сохранении экскурсии: ' + error.message);
    }
});

// Удаление экскурсии
async function deleteTour(tourId) {
    try {
        // В демо-версии мы не будем делать реальные запросы к API,
        // а просто имитируем успешный ответ
        
        // Перезагружаем список экскурсий
        loadTours();
        
        alert('Экскурсия успешно удалена!');
        
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Ошибка при удалении экскурсии: ' + error.message);
    }
}

// Открытие модального окна для просмотра бронирования
function openBookingViewModal(bookingId) {
    try {
        // В демо-версии мы не будем делать реальные запросы к API,
        // а найдем бронирование в нашем примере данных
        const booking = generateSampleBookings().find(b => b._id === bookingId);
        
        if (!booking) {
            throw new Error('Бронирование не найдено');
        }
        
        // Определение статуса для отображения
        let statusText = '';
        switch (booking.paymentStatus) {
            case 'paid': statusText = 'Оплачено'; break;
            case 'pending': statusText = 'Ожидает оплаты'; break;
            case 'canceled': statusText = 'Отменено'; break;
            default: statusText = 'Статус неизвестен';
        }
        
        // Форматирование дат
        const bookingDate = new Date(booking.bookingDate);
        const formattedBookingDate = bookingDate.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        const tourDate = new Date(booking.tourDate);
        const formattedTourDate = tourDate.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        
        // Заполняем данные бронирования
        document.getElementById('booking-details').innerHTML = `
            <div class="booking-info-group">
                <p><strong>Код бронирования:</strong> ${booking.confirmationCode}</p>
                <p><strong>Статус оплаты:</strong> <span class="status-badge status-${booking.paymentStatus}">${statusText}</span></p>
                <p><strong>Дата бронирования:</strong> ${formattedBookingDate}</p>
            </div>
            
            <div class="booking-info-group">
                <p><strong>Экскурсия:</strong> ${booking.tourName}</p>
                <p><strong>Дата экскурсии:</strong> ${formattedTourDate}</p>
                <p><strong>Время:</strong> ${booking.departureTime} - ${booking.returnTime}</p>
            </div>
            
            <div class="booking-info-group">
                <p><strong>Имя клиента:</strong> ${booking.customerName}</p>
                <p><strong>Телефон:</strong> ${booking.customerPhone}</p>
                <p><strong>Количество билетов:</strong> ${booking.ticketsCount}</p>
                <p><strong>Общая стоимость:</strong> ${booking.totalPrice} ₽</p>
            </div>
        `;
        
        // Устанавливаем атрибут для кнопки изменения статуса
        changeStatusBtn.setAttribute('data-id', bookingId);
        changeStatusBtn.setAttribute('data-status', booking.paymentStatus);
        
        // Открываем модальное окно
        bookingModal.style.display = 'block';
        
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Ошибка при загрузке данных бронирования: ' + error.message);
    }
}

// Закрытие модального окна бронирования
closeBookingBtn.addEventListener('click', function() {
    bookingModal.style.display = 'none';
});

// Изменение статуса бронирования
changeStatusBtn.addEventListener('click', function() {
    const bookingId = this.getAttribute('data-id');
    const currentStatus = this.getAttribute('data-status');
    
    let newStatus = '';
    let statusText = '';
    
    // Циклическое переключение статусов
    switch (currentStatus) {
        case 'pending':
            newStatus = 'paid';
            statusText = 'Оплачено';
            break;
        case 'paid':
            newStatus = 'canceled';
            statusText = 'Отменено';
            break;
        case 'canceled':
        default:
            newStatus = 'pending';
            statusText = 'Ожидает оплаты';
    }
    
    try {
        // В демо-версии мы не будем делать реальные запросы к API,
        // а просто имитируем успешный ответ
        
        // Обновляем атрибут для следующего переключения
        this.setAttribute('data-status', newStatus);
        
        // Обновляем отображение статуса в модальном окне
        const statusBadge = document.querySelector('#booking-details .status-badge');
        statusBadge.className = `status-badge status-${newStatus}`;
        statusBadge.textContent = statusText;
        
        // Оповещаем пользователя
        alert(`Статус бронирования изменен на "${statusText}"`);
        
        // Перезагружаем список бронирований для обновления таблицы
        loadBookings();
        
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Ошибка при изменении статуса бронирования: ' + error.message);
    }
});

// Удаление бронирования
function deleteBooking(bookingId) {
    try {
        // В демо-версии мы не будем делать реальные запросы к API,
        // а просто имитируем успешный ответ
        
        // Перезагружаем список бронирований
        loadBookings();
        
        alert('Бронирование успешно удалено!');
        
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Ошибка при удалении бронирования: ' + error.message);
    }
}

// Загрузка настроек сайта
function loadSettings() {
    try {
        // В демо-версии мы не будем делать реальные запросы к API,
        // а просто заполним форму примерными данными
        document.getElementById('site-title').value = 'Теплоходные экскурсии';
        document.getElementById('site-description').value = 'Незабываемые прогулки по воде';
        document.getElementById('contact-phone').value = '+7 (999) 123-45-67';
        document.getElementById('contact-email').value = 'info@boat-tours.ru';
        
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Ошибка при загрузке настроек: ' + error.message);
    }
}

// Сохранение настроек сайта
settingsForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    try {
        // В демо-версии мы не будем делать реальные запросы к API,
        // а просто имитируем успешный ответ
        
        alert('Настройки успешно сохранены!');
        
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Ошибка при сохранении настроек: ' + error.message);
    }
});

// Поиск экскурсий
tourSearch.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    
    // Получаем все строки таблицы
    const rows = toursTable.querySelectorAll('tbody tr');
    
    rows.forEach(row => {
        const tourName = row.querySelector('td:first-child').textContent.toLowerCase();
        
        // Показываем или скрываем строку в зависимости от результатов поиска
        if (tourName.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});

// Поиск и фильтрация бронирований
function filterBookings() {
    const searchTerm = bookingSearch.value.toLowerCase();
    const statusFilter = bookingStatusFilter.value;
    
    // Получаем все строки таблицы
    const rows = bookingsTable.querySelectorAll('tbody tr');
    
    rows.forEach(row => {
        const code = row.querySelector('td:nth-child(1)').textContent.toLowerCase();
        const tourName = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
        const customerName = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
        const statusBadge = row.querySelector('.status-badge');
        const currentStatus = statusBadge ? statusBadge.className.includes('status-paid') ? 'paid'
                             : statusBadge.className.includes('status-pending') ? 'pending'
                             : statusBadge.className.includes('status-canceled') ? 'canceled'
                             : 'unknown' : 'unknown';
        
        // Проверяем соответствие строки поисковому запросу и фильтру статуса
        const matchesSearch = code.includes(searchTerm) || 
                              tourName.includes(searchTerm) || 
                              customerName.includes(searchTerm);
                              
        const matchesStatus = statusFilter === 'all' || currentStatus === statusFilter;
        
        // Показываем или скрываем строку
        if (matchesSearch && matchesStatus) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Обработчики событий для поиска и фильтрации бронирований
bookingSearch.addEventListener('input', filterBookings);
bookingStatusFilter.addEventListener('change', filterBookings);

// Инициализация страницы при загрузке
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
}););

// Закрытие модальных окон при клике вне них
window.addEventListener('click', function(event) {
    if (event.target === tourModal) {
        tourModal.style.display = 'none';
    }
    if (event.target === bookingModal) {
        bookingModal.style.display = 'none';
    }
});

// Переключение вкладок
tabButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Удаляем активный класс со всех вкладок
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.style.display = 'none');
        
        // Добавляем активный класс нажатой вкладке
        this.classList.add('active');
        
        // Показываем соответствующий контент
        const tabId = this.getAttribute('data-tab');
        document.getElementById(`${tabId}-tab`).style.display = 'block';
        
        // Загружаем данные для соответствующей вкладки
        if (tabId === 'tours') {
            loadTours();
        } else if (tabId === 'bookings') {
            loadBookings();
        } else if (tabId === 'settings') {
            loadSettings();
        }
    });
});

// Проверка аутентификации при загрузке страницы
function checkAuth() {
    if (authToken) {
        // Если есть токен, проверяем его валидность
        verifyToken()
            .then(valid => {
                if (valid) {
                    // Показываем админ-панель
                    showAdminPanel();
                } else {
                    // Если токен невалидный, показываем страницу логина
                    showLoginForm();
                }
            })
            .catch(error => {
                console.error('Ошибка проверки токена:', error);
                showLoginForm();
            });
    } else {
        // Если токена нет, показываем страницу логина
        showLoginForm();
    }
}

// Проверка валидности токена
async function verifyToken() {
    try {
        // В реальном проекте здесь должен быть запрос к API для проверки токена
        // Пока просто имитируем успешную проверку
        return true;
    } catch (error) {
        console.error('Ошибка проверки токена:', error);
        return false;
    }
}

// Показать форму входа
function showLoginForm() {
    loginSection.style.display = 'block';
    adminDashboard.style.display = 'none';
    localStorage.removeItem('adminToken');
    authToken = null;
}

// Показать админ-панель
function showAdminPanel() {
    loginSection.style.display = 'none';
    adminDashboard.style.display = 'block';
    
    // Загрузка данных для активной вкладки
    const activeTab = document.querySelector('.tab-btn.active').getAttribute('data-tab');
    if (activeTab === 'tours') {
        loadTours();
    } else if (activeTab === 'bookings') {
        loadBookings();
    } else if (activeTab === 'settings') {
        loadSettings();
    }
}

// Обработка входа
loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    try {
        // В реальном проекте здесь должен быть запрос к API для аутентификации
        // Пока используем заглушку с предустановленными данными
        if (username === 'admin' && password === 'admin123') {
            authToken = 'fake_token_for_development';
            localStorage.setItem('adminToken', authToken);
            showAdminPanel();
        } else {
            alert('Неверное имя пользователя или пароль');
        }
    } catch (error) {
        console.error('Ошибка входа:', error);
        alert('Ошибка входа: ' + error.message);
    }
});

// Обработка выхода
logoutBtn.addEventListener('click', function() {
    showLoginForm();
});

// Загрузка экскурсий с сервера
async function loadTours() {
    toursLoading.style.display = 'block';
    toursTable.querySelector('tbody').innerHTML = '';
    toursEmpty.style.display = 'none';
    
    try {
        const response = await fetch(`${API_URL}/tours`);
        if (!response.ok) {
            throw new Error('Ошибка при загрузке данных');
        }
        
        const tours = await response.json();
        displayTours(tours);
    } catch (error) {
        console.error('Ошибка:', error);
        toursTable.querySelector('tbody').innerHTML = `
            <tr>
                <td colspan="6" class="error">Произошла ошибка при загрузке экскурсий: ${error.message}</td>
            </tr>
        `;
    } finally {
        toursLoading.style.display = 'none';
    }
}

// Отображение экскурсий в таблице
function displayTours(tours) {
    const tbody = toursTable.querySelector('tbody');
    
    if (tours.length === 0) {
        toursEmpty.style.display = 'block';
        return;
    }
    
    tours.forEach(tour => {
        const date = new Date(tour.date);
        const formattedDate = date.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${tour.name}</td>
            <td>${formattedDate}</td>
            <td>${tour.departureTime} - ${tour.returnTime}</td>
            <td>${tour.price} ₽</td>
            <td>${tour.availableSeats} / ${tour.capacity || tour.availableSeats}</td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn edit-btn" data-id="${tour._id}">Изменить</button>
                    <button class="action-btn delete-btn" data-id="${tour._id}">Удалить</button>
                </div>
            </td>
        `;
        
        tbody.appendChild(row);
    });
    
    // Добавляем обработчики для кнопок редактирования и удаления
    tbody.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', function() {
            const tourId = this.getAttribute('data-id');
            openTourEditModal(tourId);
        });
    });
    
    tbody.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
            const tourId = this.getAttribute('data-id');
            if (confirm('Вы уверены, что хотите удалить эту экскурсию?')) {
                deleteTour(tourId);
            }
        });
    });
}

// Загрузка бронирований с сервера
async function loadBookings() {
    bookingsLoading.style.display = 'block';
    bookingsTable.querySelector('tbody').innerHTML = '';
    bookingsEmpty.style.display = 'none';
    
    try {
        // В демо-версии мы не будем делать реальный запрос к API для бронирований,
        // а просто создадим заглушку с данными для демонстрации
        const bookings = generateSampleBookings();
        setTimeout(() => {
            displayBookings(bookings);
            bookingsLoading.style.display = 'none';
        }, 500); // Имитация задержки сети
    } catch (error) {
        console.error('Ошибка:', error);
        bookingsTable.querySelector('tbody').innerHTML = `
            <tr>
                <td colspan="9" class="error">Произошла ошибка при загрузке бронирований: ${error.message}</td>
            </tr>
        `;
        bookingsLoading.style.display = 'none';
    }
}

// Генерация примерных данных для демонстрации
function generateSampleBookings() {
    return [
        {
            _id: 'booking1',
            confirmationCode: 'ABC123',
            tourId: 'tour1',
            tourName: 'Обзорная экскурсия по каналам',
            tourDate: '2025-04-20',
            departureTime: '10:00',
            returnTime: '12:00',
            customerName: 'Иван Петров',
            customerPhone: '+7 (901) 123-45-67',
            ticketsCount: 2,
            totalPrice: 3000,
            paymentStatus: 'pending',
            bookingDate: '2025-04-11T15:20:10Z'
        },
        {
            _id: 'booking3',
            confirmationCode: 'GHI789',
            tourId: 'tour3',
            tourName: 'Ночная экскурсия',
            tourDate: '2025-04-22',
            departureTime: '21:00',
            returnTime: '23:00',
            customerName: 'Алексей Смирнов',
            customerPhone: '+7 (903) 456-78-90',
            ticketsCount: 3,
            totalPrice: 4500,
            paymentStatus: 'canceled',
            bookingDate: '2025-04-12T12:30:45Z'
        }
    ];
}

// Отображение бронирований в таблице
function displayBookings(bookings) {
    const tbody = bookingsTable.querySelector('tbody');
    
    if (bookings.length === 0) {
        bookingsEmpty.style.display = 'block';
        return;
    }
    
    bookings.forEach(booking => {
        const bookingDate = new Date(booking.bookingDate);
        const formattedDate = bookingDate.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        // Определение класса для статуса
        let statusClass = '';
        let statusText = '';
        
        switch (booking.paymentStatus) {
            case 'paid':
                statusClass = 'status-paid';
                statusText = 'Оплачено';
                break;
            case 'pending':
                statusClass = 'status-pending';
                statusText = 'Ожидает оплаты';
                break;
            case 'canceled':
                statusClass = 'status-canceled';
                statusText = 'Отменено';
                break;
            default:
                statusClass = '';
                statusText = 'Статус неизвестен';
        }
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${booking.confirmationCode}</td>
            <td>${booking.tourName}</td>
            <td>${booking.customerName}</td>
            <td>${booking.customerPhone}</td>
            <td>${booking.ticketsCount}</td>
            <td>${booking.totalPrice} ₽</td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            <td>${formattedDate}</td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn view-btn" data-id="${booking._id}">Просмотр</button>
                    <button class="action-btn delete-btn" data-id="${booking._id}">Удалить</button>
                </div>
            </td>
        `;
        
        tbody.appendChild(row);
    });
    
    // Добавляем обработчики для кнопок просмотра и удаления
    tbody.querySelectorAll('.view-btn').forEach(button => {
        button.addEventListener('click', function() {
            const bookingId = this.getAttribute('data-id');
            openBookingViewModal(bookingId);
        });
    });
    
    tbody.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
            const bookingId = this.getAttribute('data-id');
            if (confirm('Вы уверены, что хотите удалить это бронирование?')) {
                deleteBooking(bookingId);
            }
        });
    });
}'paid',
            bookingDate: '2025-04-10T10:15:30Z'
        },
        {
            _id: 'booking2',
            confirmationCode: 'DEF456',
            tourId: 'tour2',
            tourName: 'Вечерняя прогулка',
            tourDate: '2025-04-21',
            departureTime: '18:00',
            returnTime: '20:00',
            customerName: 'Мария Иванова',
            customerPhone: '+7 (902) 987-65-43',
            ticketsCount: 1,
            totalPrice: 1500,
            paymentStatus: