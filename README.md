# 👟 Shoe Store

Веб-приложение интернет-магазина обуви с клиент-серверной архитектурой.

---

## 📁 Структура проекта

```
project/
├── Client/                # Frontend (React)
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── Server/                # Backend (Spring Boot)
│   ├── src/
│   ├── pom.xml
│   ├── mvnw
│   └── ...
│
├── DB-postgresq.sql      # База данных (PostgreSQL)
└── .gitignore
```

---

## ⚙️ Технологии

### 🎨 Frontend (Client)
- React
- JavaScript (ES6+)
- CSS
- React Components Architecture
- Axios (API requests)

---

### 🧠 Backend (Server)
- Java
- Spring Boot
- Spring Data JPA
- REST API
- Maven

---

### 🗄 Database
- PostgreSQL
- SQL script (`DB-postgresq.sql`)

---

## 🚀 Запуск проекта

### 1️⃣ Запуск Backend (Spring Boot)

```bash
cd Server
./mvnw spring-boot:run
```

или (Windows):
```bash
mvnw.cmd spring-boot:run
```

---

### 2️⃣ Запуск Frontend (React)

```bash
cd Client
npm install
npm start
```

---

### 3️⃣ Подключение базы данных

1. Создать PostgreSQL database
2. Выполнить SQL файл:

```
DB-postgresq.sql
```

---

## 📡 Архитектура системы

```
[ React Client ]
        ↓ HTTP (REST API)
[ Spring Boot Server ]
        ↓
[ PostgreSQL Database ]
```

---

## 🧩 Основной функционал

### 👟 Клиентская часть
- Просмотр товаров
- Фильтрация и поиск
- Корзина
- Регистрация и авторизация
- Оформление заказа
- Рейтинг товаров

---

### 🧠 Серверная часть
- REST API для товаров
- Управление пользователями
- Работа с категориями, брендами, размерами
- Обработка заказов
- Рейтинг система

---

## 📊 Структура Backend

- Controllers — REST endpoints
- Services — бизнес-логика
- Repositories — работа с БД
- Entities — модели данных

---

## 🧪 Особенности проекта

- Полная клиент-серверная архитектура
- Разделение логики frontend/backend
- Работа с реальной БД PostgreSQL
- Модульная структура Spring Boot

---

## 👨‍💻 Автор

Игорь Кухмистров  

---

## 📌 Примечание

Проект разработан как учебный full-stack e-commerce сервис с акцентом на:
- архитектуру
- работу с данными
- REST API
- и масштабируемость
