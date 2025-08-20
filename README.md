# Stellar Burgers

**Stellar Burgers** — учебный проект, реализующий интерфейс заказа космических бургеров с использованием React, Redux Toolkit и TypeScript.

## Оглавление

- [Описание](#описание)
- [Технологии](#технологии)
- [Структура проекта](#структура-проекта)
- [Запуск проекта](#запуск-проекта)
- [Скрипты](#скрипты)
- [Переменные окружения](#переменные-окружения)
- [Особенности](#особенности)
- [Ссылки](#ссылки)

## Описание

Проект демонстрирует работу с современным стеком фронтенда: роутинг, асинхронные запросы, глобальное состояние, защищённые маршруты, drag-and-drop, модальные окна и Storybook для UI-компонентов.

## Технологии

- React 18+ ( ͡° ͜ʖ ͡°)
- TypeScript
- Redux Toolkit
- React Router
- Storybook
- CSS Modules

## Структура проекта

- `/src/components` — UI и контейнерные компоненты
- `/src/pages` — страницы приложения
- `/src/services` — Redux store, слайсы и асинхронные экшены
- `/src/utils` — утилиты, типы, API
- `/src/stories` — сторибуки для компонентов

## Запуск проекта

1. Клонируйте репозиторий:
   ```sh
   git clone <repo-url>
   cd stellar-burgers
   ```

2. Установите зависимости:
   ```sh
   npm install
   ```

3. Создайте файл `.env` на основе `.env.example` и укажите переменную `BURGER_API_URL`:
   ```
   BURGER_API_URL=https://norma.nomoreparties.space/api
   ```

4. Запустите проект:
   ```sh
   npm start
   ```

5. Для запуска Storybook:
   ```sh
   npm run storybook
   ```

## Скрипты

- `npm start` — запуск приложения в режиме разработки
- `npm run build` — сборка production-версии
- `npm run storybook` — запуск Storybook для компонентов
- `npm test` — запуск тестов (если реализованы)

## Переменные окружения

- `BURGER_API_URL` — базовый URL для API бургеров

## Особенности

- Защищённые маршруты для профиля и истории заказов
- Drag-and-drop для конструктора бургеров
- Модальные окна для деталей ингредиентов и заказов
- Storybook для изолированной разработки компонентов

## Ссылки

- [Макет Figma](https://www.figma.com/file/vIywAvqfkOIRWGOkfOnReY/React-Fullstack_-Проектные-задачи-(3-месяца)_external_link?type=design&node-id=0-1&mode=design)
- [Чеклист](https://www.notion.so/praktikum/0527c10b723d4873aa75686bad54b32e?pvs=4)
