import * as Sentry from "@sentry/react";
import {BrowserTracing} from "@sentry/tracing";
import {toast} from "react-toastify";

// Здесь подключаем обработчик событий Sentry
// Как всё это работает. Если мы выявляем ошибку сервера, то отправляем её на другой сервер, а конкретно на сервер Sentry, где можем спокойно просмотреть список ошибок сервера
// Наши ошибки хранятся здесь: https://5fdda19b90c0.sentry.io/issues/?project=4504564136935424&query=is%3Aunresolved&referrer=issue-stream
// Для создания первой ошибки можно в index.js поместить это и нажать на кнопку <button onClick={() => methodDoesNotExist()}>Break the world</button>

// Инициализация логгера
function init() {
    Sentry.init({
        dsn: "https://2a32338da7f6494a8cd1b3e74861d014@o4504320023199744.ingest.sentry.io/4504564136935424",
        integrations: [new BrowserTracing()],
        tracesSampleRate: 1.0,
    });
}

// Функция для логирования
const log = error => {
    Sentry.captureException(error)
    toast.error("ОШИБКА НА СЕРВЕРЕ \n" + JSON.stringify(error.message))
}
export const logger = {init, log}

