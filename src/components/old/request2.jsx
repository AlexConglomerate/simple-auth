import React, {useEffect, useState} from 'react';
import config from "../../config.json";
import httpService from "../../services/http.service";
import {toast} from "react-toastify";

function Request2() {
    const [state, setState] = useState();

    // 3 вариант. С обработкой ошибки
    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data} = await httpService.get('name.json')
                setState(data)
            } catch (e) {
                const isExpectedError = e.response && e.response.status >= 400 && e.response.status < 500;
                if (isExpectedError) console.log(`Ожидаемая ошибка. Что-то с приложением. Название ошибки: `, e.response.data)
                toast('Сударь, ошибочка вышла') // выводим ошибку
                toast.info('info: ' + e) // выводим ошибку
                toast.error('error: ' + e) // выводим ошибку
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

export default Request2;