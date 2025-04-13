import os
import json
import shutil

def create_project_structure():
    # Основная папка проекта
    base_dir = "boat-tickets"
    
    # Если папка существует, удаляем ее
    if os.path.exists(base_dir):
        shutil.rmtree(base_dir)
    
    # Создаем структуру папок
    os.makedirs(os.path.join(base_dir, "frontend", "images"), exist_ok=True)
    os.makedirs(os.path.join(base_dir, "backend"), exist_ok=True)
    
    # Создаем файлы для бэкенда
    with open(os.path.join(base_dir, "backend", "server.js"), "w", encoding="utf-8") as f:
        f.write("""const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Простая модель данных для экскурсий
const tourSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  date: { type: Date, required: true },
  departureTime: { type: String, required: true },
  returnTime: { type: String, required: true },
  availableSeats: { type: Number, required: true, min: 0 },
  imageUrl: { type: String, default: '/images/default-boat.jpg' }
});

const Tour = mongoose.model('Tour', tourSchema);

// API маршруты
app.get('/api/tours', async (req, res) => {
  try {
    const tours = await Tour.find().sort({ date: 1 });
    res.json(tours);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/tours/:id', async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ error: 'Экскурсия не найдена' });
    res.json(tour);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Добавление тестовых данных, если база пуста
const seedDatabase = async () => {
  const count = await Tour.countDocuments();
  if (count === 0) {
    const sampleTours = [
      {
        name: 'Вечерний круиз по реке',
        description: 'Насладитесь прекрасными видами города с воды в вечернее время.',
        price: 1200,
        date: new Date(Date.now() + 86400000), // завтра
        departureTime: '19:00',
        returnTime: '21:00',
        availableSeats: 30,
        imageUrl: '/images/evening-cruise.jpg'
      },
      {
        name: 'Дневная экскурсия с гидом',
        description: 'Познавательная экскурсия по историческим местам с профессиональным гидом.',
        price: 1500,
        date: new Date(Date.now() + 172800000), // послезавтра
        departureTime: '12:00',
        returnTime: '15:00',
        availableSeats: 25,
        imageUrl: '/images/day-tour.jpg'
      }
    ];
    
    await Tour.insertMany(sampleTours);
    console.log('Добавлены тестовые данные');
  }
};

// Подключение к MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/boat-tickets')
  .then(() => {
    console.log('MongoDB подключена');
    seedDatabase();
  })
  .catch(err => console.error('Ошибка подключения к MongoDB:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});""")
    
    with open(os.path.join(base_dir, "backend", ".env"), "w", encoding="utf-8") as f:
        f.write("""MONGODB_URI=mongodb://localhost:27017/boat-tickets
PORT=5000""")
    
    # Создаем package.json
    package_data = {
        "name": "boat-tickets-backend",
        "version": "1.0.0",
        "description": "Бэкенд для сайта бронирования теплоходных экскурсий",
        "main": "server.js",
        "scripts": {
            "start": "node server.js"
        },
        "dependencies": {
            "cors": "^2.8.5",
            "dotenv": "^16.0.3",
            "express": "^4.18.2",
            "mongoose": "^7.0.3"
        }
    }
    
    with open(os.path.join(base_dir, "backend", "package.json"), "w", encoding="utf-8") as f:
        json.dump(package_data, f, indent=2)
    
    # Создаем файлы для фронтенда
    with open(os.path.join(base_dir, "frontend", "index.html"), "w", encoding="utf-8") as f:
        f.write("""<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Теплоходные экскурсии</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <div class="container">
            <h1>Теплоходные экскурсии</h1>
            <p>Незабываемые прогулки по воде</p>
        </div>
    </header>

    <main class="container">
        <section class="intro">
            <h2>Добро пожаловать!</h2>
            <p>Выберите одну из наших уникальных экскурсий и насладитесь прекрасными видами с воды.</p>
        </section>

        <section class="tours">
            <h2>Ближайшие экскурсии</h2>
            <div id="tours-container" class="tours-grid">
                <!-- Сюда будут загружены экскурсии с сервера -->
                <div class="loading">Загрузка экскурсий...</div>
            </div>
        </section>
    </main>

    <footer>
        <div class="container">
            <p>&copy; 2025 Теплоходные экскурсии. Все права защищены.</p>
        </div>
    </footer>

    <!-- Модальное окно для бронирования -->
    <div id="booking-modal" class="modal">
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <h2>Забронировать экскурсию</h2>
            <div id="booking-details"></div>
            <form id="booking-form">
                <input type="hidden" id="tour-id" name="tourId">
                <div class="form-group">
                    <label for="customer-name">Ваше имя:</label>
                    <input type="text" id="customer-name" name="customerName" required>
                </div>
                <div class="form-group">
                    <label for="customer-phone">Телефон:</label>
                    <input type="tel" id="customer-phone" name="customerPhone" required>
                </div>
                <div class="form-group">
                    <label for="tickets-count">Количество билетов:</label>
                    <input type="number" id="tickets-count" name="ticketsCount" min="1" value="1" required>
                </div>
                <button type="submit" class="btn primary-btn">Забронировать</button>
            </form>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>""")
    
    with open(os.path.join(base_dir, "frontend", "styles.css"), "w", encoding="utf-8") as f:
        f.write(""":root {
    --primary-color: #0066cc;
    --secondary-color: #004d99;
    --accent-color: #ff9900;
    --light-color: #f5f7fa;
    --dark-color: #333;
    --gray-color: #f0f0f0;
    --border-radius: 4px;
    --shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: var(--dark-color);
    background-color: var(--light-color);
}

a {
    color: var(--primary-color);
    text-decoration: none;
}

img {
    max-width: 100%;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Header */
header {
    background-color: var(--primary-color);
    color: white;
    padding: 2rem 0;
    text-align: center;
}

header h1 {
    margin-bottom: 0.5rem;
}

/* Main content */
main {
    padding: 2rem 0;
}

.intro {
    text-align: center;
    margin-bottom: 2rem;
}

.tours-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
}

.tour-card {
    background: white;
    border-radius: var(--border-radius);
    overflow: hidden;
    box-shadow: var(--shadow);
    transition: transform 0.3s;
}

.tour-card:hover {
    transform: translateY(-5px);
}

.tour-image {
    height: 200px;
    background-size: cover;
    background-position: center;
}

.tour-content {
    padding: 1.5rem;
}

.tour-card h3 {
    margin-bottom: 0.5rem;
}

.tour-meta {
    color: #666;
    margin-bottom: 1rem;
    font-size: 0.9rem;
}

.price {
    display: block;
    color: var(--secondary-color);
    font-weight: bold;
    font-size: 1.2rem;
    margin: 0.5rem 0;
}

.seats {
    display: block;
    margin-bottom: 1rem;
}

.btn {
    display: inline-block;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: var(--border-radius);
    background: var(--gray-color);
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.3s;
}

.primary-btn {
    background: var(--accent-color);
    color: white;
}

.primary-btn:hover {
    background: #e68a00;
}

/* Footer */
footer {
    background: var(--dark-color);
    color: white;
    padding: 2rem 0;
    text-align: center;
}

/* Modal */
.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    overflow: auto;
}

.modal-content {
    background-color: white;
    margin: 10% auto;
    padding: 2rem;
    width: 80%;
    max-width: 600px;
    border-radius: var(--border-radius);
    position: relative;
}

.close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 1.5rem;
    cursor: pointer;
}

.form-group {
    margin-bottom: 1rem;
}

label {
    display: block;
    margin-bottom: 0.5rem;
}

input[type="text"],
input[type="tel"],
input[type="number"] {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: var(--border-radius);
}

.loading {
    text-align: center;
    padding: 2rem;
}""")
    
    with open(os.path.join(base_dir, "frontend", "script.js"), "w", encoding="utf-8") as f:
        f.write("""// Конфигурация
const API_URL = 'http://localhost:5000/api';

// DOM элементы
const toursContainer = document.getElementById('tours-container');
const bookingModal = document.getElementById('booking-modal');
const closeButton = document.querySelector('.close-button');
const bookingForm = document.getElementById('booking-form');
const bookingDetails = document.getElementById('booking-details');
const tourIdInput = document.getElementById('tour-id');
const ticketsCountInput = document.getElementById('tickets-count');

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
                    <button class="btn primary-btn" onclick="openBooking('${tour._id}')">Забронировать</button>
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
        
        // Установка максимального количества билетов
        ticketsCountInput.max = tour.availableSeats;
        
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
}

// Обработка отправки формы бронирования
bookingForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // В полной версии здесь будет код для отправки данных на сервер
    // и интеграции с платежной системой
    
    alert('Функция бронирования в данный момент не реализована. Это демо-версия.');
    closeModal();
});

// Обработчик закрытия модального окна
closeButton.addEventListener('click', closeModal);
window.addEventListener('click', function(e) {
    if (e.target === bookingModal) {
        closeModal();
    }
});

// Загрузка экскурсий при загрузке страницы
document.addEventListener('DOMContentLoaded', loadTours);""")
    
    # Создаем файл README с инструкциями
    with open(os.path.join(base_dir, "README.md"), "w", encoding="utf-8") as f:
        f.write("""# Проект сайта для теплоходных экскурсий

## Локальный запуск

### Предварительные требования
1. Установите [Node.js](https://nodejs.org/)
2. Установите [MongoDB](https://www.mongodb.com/try/download/community)

### Запуск бэкенда
1. Откройте командную строку в папке `backend`
2. Выполните команду для установки зависимостей:
   ```
   npm install
   ```
3. Запустите сервер:
   ```
   npm start
   ```
   или
   ```
   node server.js
   ```

### Открытие фронтенда
- Просто откройте файл `frontend/index.html` в браузере

## Структура проекта
```
boat-tickets/
├── frontend/       # Фронтенд часть
│   ├── index.html  # Главная страница
│   ├── styles.css  # Стили
│   ├── script.js   # JavaScript код
│   └── images/     # Изображения
└── backend/        # Бэкенд часть
    ├── server.js   # Сервер Node.js
    ├── package.json
    └── .env        # Настройки окружения
```
""")
    
    # Создаем дополнительный скрипт для запуска проекта
    with open(os.path.join(base_dir, "run_server.bat"), "w") as f:
        f.write("""@echo off
cd backend
npm install
npm start
""")
    
    print(f"Структура проекта создана в папке '{base_dir}'")
    print("Для запуска бэкенда перейдите в папку backend и выполните команды:")
    print("  npm install")
    print("  npm start")
    print("Затем откройте frontend/index.html в браузере")

if __name__ == "__main__":
    create_project_structure()