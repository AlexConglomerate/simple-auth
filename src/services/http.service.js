import axios from "axios";
import {logger} from "./log.servise";
import {toast} from "react-toastify";
import configFile from "../config.json";

const http = axios.create({
    baseURL: configFile.apiEndPoint
})

// http.interceptors.response - это перехватчик ответа с сервера
// http.interceptors.request - это перехватчик запросов\

// Если ошибка, меняем / на .json, и снова делаем запрос
http.interceptors.request.use(
    function (config) {
        if (configFile.isFireBase) {
            const containSlash = /\/$/gi.test(config.url);
            config.url =
                (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

function transformData(data) {
    return data && !data._id
        ? Object.keys(data).map((key) => ({
            ...data[key]
        }))
        : data;
}

// Тут перехватываем ошибки сервера. interceptors - перехватчики. response - ошибки
http.interceptors.response.use(
    (res) => {
        if (configFile.isFireBase) {
            res.data = {content: transformData(res.data)};
        }
        return res;
    },
    e => {
        const isExpectedError = e.response && e.response.status >= 400 && e.response.status < 500;
        if (!isExpectedError) {
            // Тут отлавливаем ошибки сервера через Sentry.
            // Подробнее: https://lk.result.school/pl/teach/control/lesson/view?id=253585341
            // Подробнее: https://lk.result.school/pl/teach/control/lesson/view?id=258593031
            logger.log(e) // Отправляем ошибку на Sentry
            toast.error("ОШИБКА НА СЕРВЕРЕ" + e) // делаем тост
            console.log(`Неожидаемая ошибка. Что-то с сервером. Название ошибки: `, e.response.data)
        }
        return Promise.reject(e)
    })


const httpService = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete,
}

export default httpService