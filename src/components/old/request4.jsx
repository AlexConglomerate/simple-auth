import React, {useEffect, useState} from 'react';
import nameService from "../../services/name.service";
import {toast} from "react-toastify";
import usersService from "../../services/users.service";

function Request() {
    const [content, setContent] = useState()
    const [users, setUsers] = useState()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUser()
    })

    // Глобальная обработка ошибок
    useEffect(() => {
        if (error != null) {
            toast(error)
            setError(null)
        }
    }, [error])


    const errorCatcher = (e) => {
        const {message} = e
        setError(message)
        toast.error(message)
    }

    // Делаем кучу таких функций, которые обращаются к серверу
    const getUser = async () => {
        try {
            const users = await usersService.get()
            setUsers(users)
            setLoading(false)
        } catch (e) {
            errorCatcher(e)
        }
    }


    return (
        <div>
            {users && (<h1>{users}</h1>)}
        </div>
    );
}

export default Request;