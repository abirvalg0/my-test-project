// Данные о теплоходах и маршрутах
const shipsData = {
  // Теплоход "Аврора"
  aurora: {
    id: "aurora",
    name: "Аврора",
    description: "Классический теплоход для экскурсий по Неве",
    capacity: 50,
    image: "img/ships/aurora.jpg",
    routes: {
      "neva-overview": {
        id: "neva-overview",
        name: "Обзорная экскурсия по Неве",
        description: "Увлекательная прогулка по главной водной артерии Санкт-Петербурга",
        duration: 60, // минуты
        price: 800,
        departures: [
          // Время отправления (час, минуты)
          { hour: 10, minute: 0 },
          { hour: 12, minute: 0 },
          { hour: 14, minute: 0 },
          { hour: 16, minute: 0 },
          { hour: 18, minute: 0 }
        ]
      },
      "bridges": {
        id: "bridges",
        name: "Поездка под разводными мостами",
        description: "Ночная экскурсия для просмотра развода мостов",
        duration: 120, // минуты
        price: 1200,
        departures: [
          { hour: 0, minute: 30 },
          { hour: 1, minute: 0 }
        ]
      }
    }
  },
  
  // Теплоход "Нева"
  neva: {
    id: "neva",
    name: "Нева",
    description: "Комфортабельный теплоход с панорамными окнами",
    capacity: 80,
    image: "img/ships/neva.jpg",
    routes: {
      "neva-overview": {
        id: "neva-overview",
        name: "Обзорная экскурсия по Неве",
        description: "Увлекательная прогулка по главной водной артерии Санкт-Петербурга",
        duration: 60, // минуты
        price: 850,
        departures: [
          { hour: 11, minute: 0 },
          { hour: 13, minute: 0 },
          { hour: 15, minute: 0 },
          { hour: 17, minute: 0 },
          { hour: 19, minute: 0 }
        ]
      },
      "bridges": {
        id: "bridges",
        name: "Поездка под разводными мостами",
        description: "Ночная экскурсия для просмотра развода мостов",
        duration: 120, // минуты
        price: 1300,
        departures: [
          { hour: 0, minute: 15 },
          { hour: 0, minute: 45 }
        ]
      }
    }
  },
  
  // Теплоход "Балтика"
  baltic: {
    id: "baltic",
    name: "Балтика",
    description: "Просторный теплоход для больших групп",
    capacity: 120,
    image: "img/ships/baltic.jpg",
    routes: {
      "neva-overview": {
        id: "neva-overview",
        name: "Обзорная экскурсия по Неве",
        description: "Увлекательная прогулка по главной водной артерии Санкт-Петербурга",
        duration: 60, // минуты
        price: 750,
        departures: [
          { hour: 10, minute: 30 },
          { hour: 12, minute: 30 },
          { hour: 14, minute: 30 },
          { hour: 16, minute: 30 },
          { hour: 18, minute: 30 }
        ]
      },
      "canals": {
        id: "canals",
        name: "Каналы Петербурга",
        description: "Экскурсия по живописным каналам города",
        duration: 90, // минуты
        price: 1000,
        departures: [
          { hour: 11, minute: 30 },
          { hour: 13, minute: 30 },
          { hour: 15, minute: 30 },
          { hour: 17, minute: 30 }
        ]
      }
    }
  },
  
  // Теплоход "Фонтанка"
  fontanka: {
    id: "fontanka",
    name: "Фонтанка",
    description: "Уютный теплоход для прогулок по каналам",
    capacity: 40,
    image: "img/ships/fontanka.jpg",
    routes: {
      "canals": {
        id: "canals",
        name: "Каналы Петербурга",
        description: "Экскурсия по живописным каналам города",
        duration: 90, // минуты
        price: 950,
        departures: [
          { hour: 10, minute: 0 },
          { hour: 12, minute: 0 },
          { hour: 14, minute: 0 },
          { hour: 16, minute: 0 },
          { hour: 18, minute: 0 }
        ]
      }
    }
  }
};

// Получить все доступные маршруты
function getAllRoutes() {
  const routes = {};
  
  Object.values(shipsData).forEach(ship => {
    Object.values(ship.routes).forEach(route => {
      if (!routes[route.id]) {
        routes[route.id] = {
          id: route.id,
          name: route.name,
          description: route.description
        };
      }
    });
  });
  
  return routes;
}

// Получить теплоходы по маршруту
function getShipsByRoute(routeId) {
  return Object.values(shipsData).filter(ship => 
    Object.keys(ship.routes).includes(routeId)
  );
}

// Получить все доступные билеты на определенную дату
function getTicketsForDate(date, shipId = null, routeId = null) {
  const tickets = [];
  const dateObj = new Date(date);
  
  Object.values(shipsData).forEach(ship => {
    // Пропускаем, если указан shipId и он не соответствует
    if (shipId && ship.id !== shipId) return;
    
    Object.values(ship.routes).forEach(route => {
      // Пропускаем, если указан routeId и он не соответствует
      if (routeId && route.id !== routeId) return;
      
      route.departures.forEach(departure => {
        // Создаем новую дату с указанным временем отправления
        const departureDate = new Date(dateObj);
        departureDate.setHours(departure.hour, departure.minute, 0, 0);
        
        // Пропускаем прошедшие билеты в текущий день
        const now = new Date();
        if (dateObj.toDateString() === now.toDateString() && departureDate < now) {
          return;
        }
        
        tickets.push({
          id: `${ship.id}-${route.id}-${departureDate.getTime()}`,
          shipId: ship.id,
          shipName: ship.name,
          routeId: route.id,
          routeName: route.name,
          routeDescription: route.description,
          departureDate: departureDate,
          duration: route.duration,
          price: route.price,
          availableSeats: ship.capacity // В прототипе считаем, что все места всегда доступны
        });
      });
    });
  });
  
  // Сортировка билетов по времени отправления
  return tickets.sort((a, b) => a.departureDate - b.departureDate);
}

// Получить билет по ID
function getTicketById(ticketId) {
  const [shipId, routeId, timestamp] = ticketId.split('-');
  const ship = shipsData[shipId];
  const route = ship.routes[routeId];
  const departureDate = new Date(parseInt(timestamp));
  
  return {
    id: ticketId,
    shipId: ship.id,
    shipName: ship.name,
    routeId: route.id,
    routeName: route.name,
    routeDescription: route.description,
    departureDate: departureDate,
    duration: route.duration,
    price: route.price,
    availableSeats: ship.capacity
  };
}

// Экспорт методов и данных
window.shipsData = shipsData;
window.getAllRoutes = getAllRoutes;
window.getShipsByRoute = getShipsByRoute;
window.getTicketsForDate = getTicketsForDate;
window.getTicketById = getTicketById;