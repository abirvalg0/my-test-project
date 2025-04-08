// Главный JavaScript файл для сайта

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