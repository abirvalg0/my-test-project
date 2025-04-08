<p>&copy; 2025 ВодныйТранспорт. Все права защищены.</p>
        </div>
    </footer>

    <script src="js/firebase-config.js"></script>
    <script src="js/confirmation.js"></script>
</body>
</html>
FILE_CONTENTS["responsive.css"] = FILE_CONTENTS["firebase-config.js"] = FILE_CONTENTS["app.js"] = """// Главный JavaScript файл для сайта

document.addEventListener('DOMContentLoaded', () => {
  // Проверка наличия информации о заказе в localStorage
  const clearOldData = () => {
    // Если пользователь вернулся на главную страницу, очищаем данные о предыдущих заказах
    if (window.location.pathname === '/' || window.location.pathname.includes('index.html')) {
      localStorage.removeItem('currentOrder');
    }
  };
  
  // Очищаем старые данные при загрузке главной страницы
  clearOldData();
  
  // Инициализация даты для футера
  const updateFooterYear = () => {
    const footerYear = document.querySelector('footer .container p');
    if (footerYear) {
      const year = new Date().getFullYear();
      footerYear.textContent = `© ${year} ВодныйТранспорт. Все права защищены.`;
    }
  };
  
  // Обновляем год в футере
  updateFooterYear();
  
  // Дополнительные функции для главной страницы
  const initializeMainPage = () => {
    // Проверяем, находимся ли мы на главной странице
    if (window.location.pathname === '/' || window.location.pathname.includes('index.html')) {
      // Добавление обработчиков событий для навигации
      const navLinks = document.querySelectorAll('nav ul li a');
      navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
          // Если это якорная ссылка на текущей странице
          if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
              // Плавный скролл к элементу
              window.scrollTo({
                top: targetElement.offsetTop - 100, // Отступ для учета фиксированной шапки
                behavior: 'smooth'
              });
            }
          }
        });
      });
      
      // Добавление анимации для карточек теплоходов
      const shipCards = document.querySelectorAll('.ship-card');
      shipCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
          this.style.transform = 'translateY(-10px)';
          this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
          this.style.transform = 'translateY(0)';
          this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
      });
    }
  };
  
  // Инициализация главной страницы
  initializeMainPage();
  
  // Функция для инициализации Firebase Auth (если понадобится в будущем)
  const initializeAuth = () => {
    /* 
    // Пример использования Firebase Auth
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // Пользователь авторизован
        console.log('User is signed in', user.email);
        // Обновляем UI для авторизованного пользователя
      } else {
        // Пользователь не авторизован
        console.log('User is not signed in');
        // Обновляем UI для неавторизованного пользователя
      }
    });
    */
  };
  
  // Для будущего использования
  // initializeAuth();
});
"""// Firebase конфигурация
// Замените эти данные на ваши после создания проекта в Firebase
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Инициализация Firebase
firebase.initializeApp(firebaseConfig);

// Референс к Firestore базе данных
const db = firebase.firestore();

// Экспорт для использования в других модулях
window.firebase = firebase;
window.db = db;
"""/* Адаптивные стили */

/* Для экранов до 1200px */
@media screen and (max-width: 1200px) {
    .container {
        max-width: 960px;
    }
}

/* Для экранов до 992px */
@media screen and (max-width: 992px) {
    .container {
        max-width: 720px;
    }
    
    .hero h2 {
        font-size: 36px;
    }
    
    .hero p {
        font-size: 18px;
    }
    
    .checkout-container {
        grid-template-columns: 1fr;
    }
}

/* Для экранов до 768px */
@media screen and (max-width: 768px) {
    .container {
        max-width: 540px;
    }
    
    header .container {
        flex-direction: column;
    }
    
    .logo {
        margin-bottom: 15px;
        text-align: center;
    }
    
    nav ul {
        justify-content: center;
    }
    
    nav ul li {
        margin: 0 10px;
    }
    
    .hero {
        padding: 60px 0;
    }
    
    .ships-grid,
    .routes-grid,
    .contact-info {
        grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
    }
    
    .about p {
        font-size: 16px;
    }
}

/* Для экранов до 576px */
@media screen and (max-width: 576px) {
    .container {
        width: 100%;
        padding: 0 10px;
    }
    
    header {
        padding: 10px 0;
    }
    
    nav ul {
        flex-wrap: wrap;
    }
    
    nav ul li {
        margin: 5px 10px;
    }
    
    .hero h2 {
        font-size: 28px;
    }
    
    .hero p {
        font-size: 16px;
    }
    
    .ticket-selection,
    .checkout,
    .confirmation {
        padding: 30px 0;
    }
    
    .filter-container {
        flex-direction: column;
        gap: 15px;
    }
    
    .filter-group {
        width: 100%;
    }
    
    .tickets-container {
        grid-template-columns: 1fr;
    }
    
    .confirmation-container {
        padding: 20px 15px;
    }
    
    .btn {
        width: 100%;
        margin-bottom: 10px;
    }
}
"""

FILE_CONTENTS["style.css"] = """/* Сброс стилей */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Roboto', Arial, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f8f9fa;
}

a {
    text-decoration: none;
    color: #1565c0;
}

ul {
    list-style: none;
}

img {
    max-width: 100%;
    height: auto;
}

/* Контейнер */
.container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 15px;
}

/* Заголовки */
h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 15px;
    color: #1e3a8a;
}

/* Кнопки */
.btn {
    display: inline-block;
    padding: 10px 20px;
    background-color: #e0e0e0;
    color: #333;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s ease;
}

.btn:hover {
    background-color: #d0d0d0;
}

.btn-primary {
    background-color: #1565c0;
    color: white;
}

.btn-primary:hover {
    background-color: #0d47a1;
}

/* Шапка сайта */
header {
    background-color: white;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    padding: 15px 0;
    position: sticky;
    top: 0;
    z-index: 100;
}

header .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo h1 {
    font-size: 24px;
    margin-bottom: 0;
}

.logo p {
    font-size: 14px;
    color: #666;
}

nav ul {
    display: flex;
}

nav ul li {
    margin-left: 20px;
}

nav ul li a {
    color: #333;
    font-weight: 500;
    padding: 5px 0;
    position: relative;
}

nav ul li a:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #1565c0;
    transition: width 0.3s ease;
}

nav ul li a:hover:after,
nav ul li a.active:after {
    width: 100%;
}

/* Секция героя */
.hero {
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('../img/hero-bg.jpg');
    background-size: cover;
    background-position: center;
    color: white;
    text-align: center;
    padding: 100px 0;
}

.hero h2 {
    font-size: 48px;
    color: white;
    margin-bottom: 20px;
}

.hero p {
    font-size: 20px;
    margin-bottom: 30px;
}

/* Секция с теплоходами */
.featured-ships {
    padding: 60px 0;
}

.ships-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 30px;
    margin-top: 30px;
}

.ship-card {
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.ship-card:hover {
    transform: translateY(-5px);
}

.ship-card img {
    width: 100%;
    height: 180px;
    object-fit: cover;
}

.ship-card h3 {
    padding: 15px 15px 0;
}

.ship-card p {
    padding: 0 15px 15px;
    color: #666;
}

.ship-card .btn {
    margin: 0 15px 15px;
}

/* Секция с маршрутами */
.routes {
    background-color: #e8f4fd;
    padding: 60px 0;
}

.routes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 30px;
    margin-top: 30px;
}

.route-card {
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.route-card h3 {
    color: #1565c0;
}

/* Секция о нас */
.about {
    padding: 60px 0;
}

.about p {
    font-size: 18px;
    margin-bottom: 20px;
    max-width: 800px;
}

/* Секция контактов */
.contact {
    background-color: #f0f4f8;
    padding: 60px 0;
}

.contact-info {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 30px;
    margin-top: 30px;
}

.contact-info h3 {
    color: #1565c0;
    margin-bottom: 10px;
}

/* Футер */
footer {
    background-color: #1e3a8a;
    color: white;
    padding: 30px 0;
    text-align: center;
}

/* Страница выбора билетов */
.ticket-selection {
    padding: 60px 0;
}

.filter-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 30px;
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.filter-group {
    flex: 1;
    min-width: 200px;
}

.filter-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
}

.filter-group select,
.filter-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
}

.tickets-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.ticket-card {
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.ticket-card:hover {
    transform: translateY(-5px);
}

.ticket-info {
    padding: 20px;
}

.ticket-info h3 {
    margin-bottom: 10px;
    color: #1565c0;
}

.ticket-meta {
    margin-bottom: 15px;
}

.ticket-meta p {
    margin-bottom: 5px;
    font-size: 14px;
}

.ticket-meta .date-time {
    font-weight: 500;
    color: #333;
}

.ticket-price {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 15px;
    color: #1e3a8a;
}

.ticket-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.loading {
    text-align: center;
    padding: 40px;
    font-size: 18px;
    color: #666;
}

/* Страница оформления заказа */
.checkout {
    padding: 60px 0;
}

.checkout-container {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 30px;
}

.order-summary {
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    align-self: start;
}

.order-summary h3 {
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
}

.order-form {
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.order-form h3 {
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
}

.form-group input,
.form-group select,
.form-group textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
}

.total-price {
    margin: 20px 0;
    padding: 15px;
    background-color: #f0f4f8;
    border-radius: 4px;
}

.total-price h4 {
    color: #1e3a8a;
    margin-bottom: 0;
}

.payment-method {
    margin-bottom: 20px;
}

.payment-options {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
}

.payment-options label {
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
}

/* Страница подтверждения */
.confirmation {
    padding: 60px 0;
}

.confirmation-container {
    max-width: 800px;
    margin: 0 auto;
    background-color: white;
    border-radius: 8px;
    padding: 30px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.confirmation-icon {
    margin-bottom: 20px;
}

.order-details {
    margin: 30px 0;
    text-align: left;
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
}

.confirmation-message {
    margin: 30px 0;
}

.confirmation-message p {
    margin-bottom: 15px;
}

.next-steps {
    margin-top: 30px;
    padding-top: 30px;
    border-top: 1px solid #eee;
}
"""import os
import json
import requests
from pathlib import Path
from urllib.request import urlretrieve

# Путь для создания проекта (по умолчанию - текущая директория)
PROJECT_DIR = "watertransportservice"

# Структура проекта
PROJECT_STRUCTURE = {
    "": [],  # Корневая директория
    "css": ["style.css", "responsive.css"],
    "js": ["app.js", "firebase-config.js", "tickets.js", "checkout.js", "confirmation.js"],
    "data": ["ships.js"],
    "img": [],
    "img/ships": ["aurora.jpg", "neva.jpg", "baltic.jpg", "fontanka.jpg"],
    "img/icons": []
}

# HTML-файлы в корневой директории
HTML_FILES = ["index.html", "tickets.html", "checkout.html", "confirmation.html"]

# Содержимое файлов (полное содержимое будет добавлено позже)
FILE_CONTENTS = {}

def create_directory_structure():
    """Создает структуру директорий проекта"""
    print(f"Создание структуры проекта в директории {PROJECT_DIR}...")
    
    # Создаем корневую директорию проекта
    os.makedirs(PROJECT_DIR, exist_ok=True)
    
    # Создаем поддиректории
    for directory in PROJECT_STRUCTURE:
        if directory:  # Пропускаем пустую строку (корневая директория)
            dir_path = os.path.join(PROJECT_DIR, directory)
            os.makedirs(dir_path, exist_ok=True)
            print(f"Создана директория: {dir_path}")

def download_ship_images():
    """Загружает изображения теплоходов из интернета"""
    print("Загрузка изображений теплоходов...")
    
    # Создаем директорию для изображений теплоходов
    ships_dir = os.path.join(PROJECT_DIR, "img/ships")
    os.makedirs(ships_dir, exist_ok=True)
    
    # Словарь с URL-адресами изображений
    ship_image_urls = {
        "aurora.jpg": "https://images.unsplash.com/photo-1566438480900-0609be27a4be?w=800&q=80",
        "neva.jpg": "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=800&q=80",
        "baltic.jpg": "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800&q=80",
        "fontanka.jpg": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80"
    }
    
    # Скачиваем изображения
    for filename, url in ship_image_urls.items():
        filepath = os.path.join(ships_dir, filename)
        try:
            print(f"Загрузка {filename}...")
            urlretrieve(url, filepath)
            print(f"Изображение сохранено: {filepath}")
        except Exception as e:
            print(f"Ошибка при загрузке {filename}: {e}")

def download_hero_image():
    """Загружает фоновое изображение для главной страницы"""
    print("Загрузка фонового изображения...")
    
    img_dir = os.path.join(PROJECT_DIR, "img")
    os.makedirs(img_dir, exist_ok=True)
    
    hero_image_url = "https://images.unsplash.com/photo-1545726435-2264def54e76?w=1500&q=80"
    filepath = os.path.join(img_dir, "hero-bg.jpg")
    
    try:
        print("Загрузка hero-bg.jpg...")
        urlretrieve(hero_image_url, filepath)
        print(f"Изображение сохранено: {filepath}")
    except Exception as e:
        print(f"Ошибка при загрузке hero-bg.jpg: {e}")

def create_files():
    """Создает все файлы проекта с содержимым"""
    print("Создание файлов проекта...")
    
    # Добавляем HTML-файлы в корневую директорию
    PROJECT_STRUCTURE[""].extend(HTML_FILES)
    
    # Создаем файлы в каждой директории
    for directory, files in PROJECT_STRUCTURE.items():
        dir_path = os.path.join(PROJECT_DIR, directory)
        
        for filename in files:
            file_path = os.path.join(dir_path, filename)
            content = FILE_CONTENTS.get(filename, "")
            
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(content)
            
            print(f"Создан файл: {file_path}")

def create_readme():
    """Создает файл README.md с инструкциями"""
    readme_content = """# ВодныйТранспорт - Прототип сайта по продаже билетов на теплоходы

## Обзор проекта
"ВодныйТранспорт" — это прототип веб-сайта для продажи билетов на теплоходы в Санкт-Петербурге. Сайт предоставляет возможность выбора теплохода, маршрута, даты и времени поездки, а также оформления и оплаты заказа.

## Структура проекта

```
watertransportservice/
├── index.html              # Главная страница
├── tickets.html            # Страница выбора билетов
├── checkout.html           # Страница оформления заказа
├── confirmation.html       # Страница подтверждения покупки
├── css/
│   ├── style.css           # Основные стили
│   └── responsive.css      # Адаптивные стили
├── js/
│   ├── app.js              # Основная логика приложения
│   ├── firebase-config.js  # Конфигурация Firebase
│   ├── tickets.js          # Логика выбора билетов
│   ├── checkout.js         # Логика оформления заказа
│   └── confirmation.js     # Логика страницы подтверждения
├── img/
│   ├── ships/              # Фотографии теплоходов
│   └── icons/              # Иконки
└── data/
    └── ships.js            # Данные о теплоходах
```

## Основные функции сайта

1. **Просмотр доступных теплоходов и маршрутов**
   - На главной странице отображаются четыре теплохода
   - Представлены популярные маршруты

2. **Выбор и фильтрация билетов**
   - Фильтрация по теплоходу, маршруту и дате
   - Отображение расписания и свободных мест

3. **Оформление заказа**
   - Форма для ввода контактных данных
   - Выбор количества пассажиров и метода оплаты
   - Расчет общей стоимости

4. **Подтверждение заказа**
   - Отображение деталей заказа
   - Возможность скачать и распечатать билет

## Технические особенности

- **Front-end**: HTML, CSS, JavaScript (без фреймворков)
- **База данных**: Firebase Firestore (в прототипе эмулируется с помощью localStorage)
- **Хостинг**: GitHub Pages
- **Авторизация**: Опционально, подготовлена для Firebase Auth
- **Оплата**: Заглушка для интеграции с платежными системами

## Инструкция по настройке Firebase

1. Создайте проект в [Firebase Console](https://console.firebase.google.com/)
2. Получите данные для конфигурации (apiKey, authDomain, и т.д.)
3. Замените данные в файле `js/firebase-config.js`
4. Включите Firestore Database в проекте Firebase
5. Настройте правила доступа к базе данных

## Размещение на GitHub Pages

1. Создайте репозиторий на GitHub
2. Загрузите файлы проекта в репозиторий
3. Включите GitHub Pages в настройках репозитория
4. Настройте домен, если необходимо

## Интеграция с платежными системами

Для интеграции с платежными системами (например, ЮKassa) необходимо:

1. Зарегистрироваться в платежной системе и получить ключи доступа
2. Добавить скрипт платежной системы в проект
3. Реализовать серверный код для обработки платежей (например, с помощью Firebase Functions)
4. Настроить обработку колбэков от платежной системы

## Что нужно доработать для полноценного сайта

1. Интеграция с платежной системой
2. Отправка билетов на email
3. Система учета доступных мест
4. Админ-панель для управления теплоходами и билетами
5. Расширенная система поиска и фильтрации
6. Личный кабинет пользователя
7. Кэширование и оптимизация производительности

## Автор

Создано с помощью Claude (Anthropic)
"""
    
    with open(os.path.join(PROJECT_DIR, "README.md"), "w", encoding="utf-8") as f:
        f.write(readme_content)
    
    print(f"Создан файл: {os.path.join(PROJECT_DIR, 'README.md')}")

def main():
    """Основная функция для создания проекта"""
    # Создаем структуру директорий
    create_directory_structure()
    
    # Загружаем изображения
    download_ship_images()
    download_hero_image()
    
    # Создаем файлы
    create_files()
    
    # Создаем README.md
    create_readme()
    
    print("\nПроект успешно создан!")
    print(f"Путь к проекту: {os.path.abspath(PROJECT_DIR)}")
    print("\nЧто делать дальше:")
    print("1. Откройте index.html в браузере для просмотра прототипа")
    print("2. Для настройки Firebase следуйте инструкции в README.md")
    print("3. Для размещения на GitHub Pages загрузите файлы в репозиторий")

# Заполняем содержимое файлов
FILE_CONTENTS["index.html"] = """<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ВодныйТранспорт - Билеты на теплоходы в Санкт-Петербурге</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/responsive.css">
    <!-- Подключение Firebase -->
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-auth-compat.js"></script>
</head>
<body>
    <header>
        <div class="container">
            <div class="logo">
                <h1>ВодныйТранспорт</h1>
                <p>Билеты на теплоходы в Санкт-Петербурге</p>
            </div>
            <nav>
                <ul>
                    <li><a href="index.html" class="active">Главная</a></li>
                    <li><a href="tickets.html">Билеты</a></li>
                    <li><a href="#about">О нас</a></li>
                    <li><a href="#contact">Контакты</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <section class="hero">
        <div class="container">
            <h2>Увидеть Санкт-Петербург с воды</h2>
            <p>Незабываемые прогулки по рекам и каналам Северной столицы</p>
            <a href="tickets.html" class="btn btn-primary">Купить билеты</a>
        </div>
    </section>

    <section class="featured-ships">
        <div class="container">
            <h2>Наши теплоходы</h2>
            <div class="ships-grid">
                <div class="ship-card">
                    <img src="img/ships/aurora.jpg" alt="Теплоход Аврора">
                    <h3>Аврора</h3>
                    <p>Классический теплоход для экскурсий по Неве</p>
                    <a href="tickets.html?ship=aurora" class="btn">Выбрать рейс</a>
                </div>
                <div class="ship-card">
                    <img src="img/ships/neva.jpg" alt="Теплоход Нева">
                    <h3>Нева</h3>
                    <p>Комфортабельный теплоход с панорамными окнами</p>
                    <a href="tickets.html?ship=neva" class="btn">Выбрать рейс</a>
                </div>
                <div class="ship-card">
                    <img src="img/ships/baltic.jpg" alt="Теплоход Балтика">
                    <h3>Балтика</h3>
                    <p>Просторный теплоход для больших групп</p>
                    <a href="tickets.html?ship=baltic" class="btn">Выбрать рейс</a>
                </div>
                <div class="ship-card">
                    <img src="img/ships/fontanka.jpg" alt="Теплоход Фонтанка">
                    <h3>Фонтанка</h3>
                    <p>Уютный теплоход для прогулок по каналам</p>
                    <a href="tickets.html?ship=fontanka" class="btn">Выбрать рейс</a>
                </div>
            </div>
        </div>
    </section>

    <section class="routes" id="routes">
        <div class="container">
            <h2>Популярные маршруты</h2>
            <div class="routes-grid">
                <div class="route-card">
                    <h3>Обзорная экскурсия по Неве</h3>
                    <p>Продолжительность: 1 час</p>
                    <p>Стоимость: от 800 руб.</p>
                </div>
                <div class="route-card">
                    <h3>Поездка под разводными мостами</h3>
                    <p>Продолжительность: 2 часа</p>
                    <p>Стоимость: от 1200 руб.</p>
                </div>
                <div class="route-card">
                    <h3>Каналы Петербурга</h3>
                    <p>Продолжительность: 1.5 часа</p>
                    <p>Стоимость: от 1000 руб.</p>
                </div>
            </div>
        </div>
    </section>

    <section class="about" id="about">
        <div class="container">
            <h2>О нас</h2>
            <p>Компания "ВодныйТранспорт" предлагает уникальную возможность увидеть Санкт-Петербург с воды. Наши комфортабельные теплоходы курсируют по Неве и каналам города, предоставляя гостям незабываемые впечатления.</p>
            <p>Мы работаем с 2010 года и за это время обслужили более 500,000 довольных клиентов.</p>
        </div>
    </section>

    <section class="contact" id="contact">
        <div class="container">
            <h2>Контакты</h2>
            <div class="contact-info">
                <div>
                    <h3>Адрес</h3>
                    <p>г. Санкт-Петербург, Набережная Мойки, 10</p>
                </div>
                <div>
                    <h3>Телефон</h3>
                    <p>+7 (812) 123-45-67</p>
                </div>
                <div>
                    <h3>Email</h3>
                    <p>info@watertransportservice.ru</p>
                </div>
            </div>
        </div>
    </section>

    <footer>
        <div class="container">
            <p>&copy; 2025 ВодныйТранспорт. Все права защищены.</p>
        </div>
    </footer>

    <script src="js/firebase-config.js"></script>
    <script src="js/app.js"></script>
</body>
</html>
"""

FILE_CONTENTS["tickets.html"] = """<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Выбор билетов - ВодныйТранспорт</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/responsive.css">
    <!-- Подключение Firebase -->
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>
</head>
<body>
    <header>
        <div class="container">
            <div class="logo">
                <h1>ВодныйТранспорт</h1>
                <p>Билеты на теплоходы в Санкт-Петербурге</p>
            </div>
            <nav>
                <ul>
                    <li><a href="index.html">Главная</a></li>
                    <li><a href="tickets.html" class="active">Билеты</a></li>
                    <li><a href="index.html#about">О нас</a></li>
                    <li><a href="index.html#contact">Контакты</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <section class="ticket-selection">
        <div class="container">
            <h2>Выбор билетов</h2>
            
            <div class="filter-container">
                <div class="filter-group">
                    <label for="ship-select">Теплоход:</label>
                    <select id="ship-select">
                        <option value="all">Все теплоходы</option>
                        <option value="aurora">Аврора</option>
                        <option value="neva">Нева</option>
                        <option value="baltic">Балтика</option>
                        <option value="fontanka">Фонтанка</option>
                    </select>
                </div>
                
                <div class="filter-group">
                    <label for="route-select">Маршрут:</label>
                    <select id="route-select">
                        <option value="all">Все маршруты</option>
                        <option value="neva-overview">Обзорная по Неве</option>
                        <option value="bridges">Разводные мосты</option>
                        <option value="canals">Каналы Петербурга</option>
                    </select>
                </div>
                
                <div class="filter-group">
                    <label for="date-select">Дата:</label>
                    <input type="date" id="date-select" min="">
                </div>
            </div>
            
            <div class="tickets-container" id="tickets-list">
                <!-- Билеты будут загружены из JS -->
                <div class="loading">Загрузка доступных билетов...</div>
            </div>
        </div>
    </section>

    <footer>
        <div class="container">
            <p>&copy; 2025 ВодныйТранспорт. Все права защищены.</p>
        </div>
    </footer>

    <script src="js/firebase-config.js"></script>
    <script src="data/ships.js"></script>
    <script src="js/tickets.js"></script>
</body>
</html>
"""

FILE_CONTENTS["checkout.html"] = """<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Оформление заказа - ВодныйТранспорт</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/responsive.css">
    <!-- Подключение Firebase -->
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>
</head>
<body>
    <header>
        <div class="container">
            <div class="logo">
                <h1>ВодныйТранспорт</h1>
                <p>Билеты на теплоходы в Санкт-Петербурге</p>
            </div>
            <nav>
                <ul>
                    <li><a href="index.html">Главная</a></li>
                    <li><a href="tickets.html">Билеты</a></li>
                    <li><a href="index.html#about">О нас</a></li>
                    <li><a href="index.html#contact">Контакты</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <section class="checkout">
        <div class="container">
            <h2>Оформление заказа</h2>
            
            <div class="checkout-container">
                <div class="order-summary">
                    <h3>Ваш заказ</h3>
                    <div id="ticket-details">
                        <!-- Детали билета будут загружены из JS -->
                        <div class="loading">Загрузка информации о билете...</div>
                    </div>
                </div>
                
                <div class="order-form">
                    <h3>Информация для заказа</h3>
                    <form id="checkout-form">
                        <div class="form-group">
                            <label for="name">ФИО:</label>
                            <input type="text" id="name" name="name" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="email">Email:</label>
                            <input type="email" id="email" name="email" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="phone">Телефон:</label>
                            <input type="tel" id="phone" name="phone" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="passengers">Количество пассажиров:</label>
                            <input type="number" id="passengers" name="passengers" min="1" max="10" value="1">
                        </div>
                        
                        <div class="form-group">
                            <label for="comment">Комментарий к заказу:</label>
                            <textarea id="comment" name="comment" rows="3"></textarea>
                        </div>
                        
                        <div class="total-price">
                            <h4>Итого к оплате: <span id="total-price">0</span> руб.</h4>
                        </div>
                        
                        <div class="payment-method">
                            <h4>Способ оплаты:</h4>
                            <div class="payment-options">
                                <label>
                                    <input type="radio" name="payment" value="card" checked>
                                    Банковская карта
                                </label>
                                <label>
                                    <input type="radio" name="payment" value="yoomoney">
                                    ЮMoney
                                </label>
                                <label>
                                    <input type="radio" name="payment" value="sbp">
                                    СБП
                                </label>
                            </div>
                        </div>
                        
                        <button type="submit" class="btn btn-primary">Перейти к оплате</button>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <footer>
        <div class="container">
            <p>&copy; 2025 ВодныйТранспорт. Все права защищены.</p>
        </div>
    </footer>

    <script src="js/firebase-config.js"></script>
    <script src="data/ships.js"></script>
    <script src="js/checkout.js"></script>
</body>
</html>
"""

FILE_CONTENTS["confirmation.html"] = """<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Подтверждение заказа - ВодныйТранспорт</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/responsive.css">
    <!-- Подключение Firebase -->
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>
</head>
<body>
    <header>
        <div class="container">
            <div class="logo">
                <h1>ВодныйТранспорт</h1>
                <p>Билеты на теплоходы в Санкт-Петербурге</p>
            </div>
            <nav>
                <ul>
                    <li><a href="index.html">Главная</a></li>
                    <li><a href="tickets.html">Билеты</a></li>
                    <li><a href="index.html#about">О нас</a></li>
                    <li><a href="index.html#contact">Контакты</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <section class="confirmation">
        <div class="container">
            <div class="confirmation-container">
                <div class="confirmation-icon">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#4CAF50" stroke-width="2"/>
                        <path d="M8 12L10.5 14.5L16 9" stroke="#4CAF50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                
                <h2>Заказ успешно оформлен!</h2>
                
                <div class="order-details" id="order-details">
                    <!-- Детали заказа будут загружены из JS -->
                    <div class="loading">Загрузка информации о заказе...</div>
                </div>
                
                <div class="confirmation-message">
                    <p>Билет отправлен на указанный вами email. Пожалуйста, проверьте вашу почту (включая папку "Спам").</p>
                    <p>Вы также можете сохранить или распечатать электронный билет прямо сейчас:</p>
                    <button id="download-ticket" class="btn">Скачать билет</button>
                    <button id="print-ticket" class="btn">Распечатать билет</button>
                </div>
                
                <div class="next-steps">
                    <h3>Что дальше?</h3>
                    <p>Просто приходите на причал за 15 минут до отправления теплохода. Предъявите электронный или распечатанный билет нашему сотруднику.</p>
                    <a href="index.html" class="btn btn-primary">Вернуться на главную</a>
                </div>
            </div>
        </div>
    </section>

    <footer>
        <div class="container">
            <p