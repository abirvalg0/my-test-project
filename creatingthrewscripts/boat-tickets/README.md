# Проект сайта для теплоходных экскурсий

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
