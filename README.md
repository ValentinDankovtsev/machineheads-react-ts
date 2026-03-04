# Admin Panel

Панель администратора для управления контентом (Посты, Теги, Авторы), разработанная на стеке React + TypeScript + Vite.

## 🚀 Особенности

- **Аутентификация**: JWT (Access + Refresh token) с автоматическим обновлением токена через Axios interceptors.
- **Управление состоянием**: Redux + Redux Saga. Используется `redux-dynamic-modules` для ленивой загрузки редьюсеров и саг (Code Splitting).
- **Роутинг**: React Router DOM v5 с поддержкой `React.lazy` и `Suspense` для разделения кода по страницам.
- **UI Библиотека**: Ant Design v4 (Таблицы, Формы, Модальные окна, Нотификации).
- **Редактор контента**: WYSIWYG редактор `react-quill` для написания постов.
- **Валидация форм**: Встроенная валидация Ant Design + обработка ошибок с сервера.
- **Пагинация**: Синхронизация состояния пагинации с URL (custom hook `usePaginationSync`).

## 🛠 Технологический стек

- **Core**: React 17, TypeScript, Vite
- **State Management**: Redux, Redux Saga, Redux Dynamic Modules, Connected React Router
- **Network**: Axios
- **UI**: Ant Design, Sass
- **Utils**: JS-Cookie, React-Quill, React-Markdown (ранее)

## 📦 Установка и запуск

1. **Клонировать репозиторий**
   ```bash
   git clone https://github.com/ValentinDankovtsev/machineheads-react-ts.git
   cd admin-panel
   ```

2. **Установить зависимости**
   ```bash
   npm install
   # или
   yarn install
   ```

3. **Запустить режим разработки**
   ```bash
   npm run dev
   ```
   Приложение будет доступно по адресу `http://localhost:3000` (или другой порт, указанный Vite).

4. **Сборка для продакшена**
   ```bash
   npm run build
   ```

5. **Превью сборки**
   ```bash
   npm run preview
   ```

## 📂 Структура проекта

```
src/
├── api/              # Конфигурация Axios клиента
├── components/       # Общие компоненты (Layout, Modal и др.)
├── hooks/            # Кастомные хуки (usePaginationSync)
├── pages/            # Страницы приложения (Login, Posts, Tags, Authors)
├── store/            # Redux store (actions, reducers, sagas, types)
│   ├── auth/         # Модуль авторизации (глобальный)
│   ├── posts/        # Модуль постов (динамический)
│   ├── tags/         # Модуль тегов (динамический)
│   └── authors/      # Модуль авторов (динамический)
├── utils/            # Утилиты (history, error handlers)
├── App.tsx           # Корневой компонент с роутингом
└── main.tsx          # Точка входа
```

## 🔑 Авторизация

Для входа используются тестовые данные. Токены сохраняются в Cookies (`token`, `refresh_token`). При истечении `access_token` происходит автоматический запрос на обновление через `/auth/token-refresh`.

## 🧩 Динамические модули

Для оптимизации производительности, редьюсеры и саги для разделов "Посты", "Теги" и "Авторы" загружаются только при посещении соответствующих страниц с помощью `redux-dynamic-modules`.

Пример использования в компоненте:
```tsx
<DynamicModuleLoader modules={[getPostsModule()]}>
  <Posts />
</DynamicModuleLoader>
```
