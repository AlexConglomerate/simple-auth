import React, {useEffect, useState} from 'react';
import axios from "axios";
import config from "../../config.json";

function Request() {
    const [state, setState] = useState();

    // useEffect(() => {
    //     const promise = axios
    //         // .post(config.apiEndPointName, {data}) // пример post запроса
    //         .get(config.apiEndPointName) // делаем get запрос к полю name
    //         .then(res => {
    //             // выводим значение в консоль лог
    //             console.log(res.data)
    //             setState(res.data)
    //         })
    //     console.log(promise)
    // }, []);


    // // 2 вариант
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const {data} = await axios.get(config.apiEndPointName)
    //         setState(data)
    //     }
    //     fetchData();
    // }, []);

    // 3 вариант. С обработкой ошибки
    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data} = await axios.get(config.apiEndPointName + 1)
                setState(data)
            } catch (e) {
                const isExpectedError = e.response && e.response.status >= 400 && e.response.status < 500;
                // обрабатываем ошибку
                // Ожидаемые ошибки - это ошибки клиента (№ ошибок от 400 до 499). Возникают, если до бекенда, до сервера не достучались
                // Неожидаемые ошибки - ошибка сервера (все, кроме диапазона от 400 до 499). То, что бэкенд отправляет вручную
                if (isExpectedError) console.log(`Ожидаемая ошибка. Её нужно показать клиенту (приложению). Название ошибки: `, e.response.data)
                if (!isExpectedError) console.log(`Неожидаемая ошибка. Название ошибки: `, e.response.data)
            }
        }
        fetchData()
    })


    return (
        <div>
            {state && (<h1>{state}</h1>)}
        </div>
    );
}

export default Request;