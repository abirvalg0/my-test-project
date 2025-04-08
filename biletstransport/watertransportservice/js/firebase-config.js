// Firebase конфигурация
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