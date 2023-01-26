import React, {useEffect, useState} from 'react';
import {toast} from "react-toastify";
import usersService from "../services/users.service";
import {nanoid} from "nanoid";

function Request() {
    const [users, setUsers] = useState()
    const [error, setError] = useState()

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
    // ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
    const handleGetUsers = async () => {
        try {
            const {content} = await usersService.get()
            setUsers(content)
            toast('Все пользователи получены')

        } catch (e) {
            errorCatcher(e)
        }
    }

    const handleAddUsers = async () => {
        const name = prompt('Как его зовут?')
        const email = prompt('Его почта: ')
        const profession = prompt('Кем он работает?')
        const _id = nanoid()
        const userObj = {_id, name, email, profession}

        try {
            await usersService.add(userObj)
            let newUsers = [...users, userObj]
            setUsers(newUsers)
            toast('Пользователь добавлен!')
        } catch (e) {
            errorCatcher(e)
        }
    }

    const handleEdit = async (user) => {
        try {
            const newProfession = prompt('Введите новую профессию')
            await usersService.update({...user, profession: newProfession})

            const newUsers = [...users]
            const index = newUsers.findIndex(item => item._id === user._id)
            newUsers[index].profession = newProfession
            setUsers(newUsers)
            toast('Задана новая профессия!')
        } catch (e) {
            errorCatcher(e)
        }
    }

    const handleDelete = async (id) => {
        try {
            const {content} = await usersService.delete(id)
            if (content.length === 0) {
                const newUsers = [...users]
                const index = newUsers.findIndex(item => item._id === id)
                newUsers.splice(index, 1)
                setUsers(newUsers)
                toast('Пользователь удалён!')

            }
        } catch (e) {
            errorCatcher(e)
        }
    }

    const btn = ' bg-yellow-300 p-2 m-2 rounded-lg hover:bg-yellow-400 '
    const cell = ' p-1 border-[0.5px] border-cyan-800 w-56 '

    return (
        <div className={'flex flex-row '}>
            <div className={"border-0 m-4 "}>
                <button className={btn} onClick={handleGetUsers}>
                    Загрузить пользователей
                </button>
                {users && <button className={btn} onClick={handleAddUsers}>
                    Добавить нового пользователя
                </button>}
                {users &&
                    users.map(item => (
                        <div className={'flex flex-row'}>
                            <div className={cell}>{item.name}</div>
                            <div className={cell}>{item.email}</div>
                            <div className={cell}>{item.profession}</div>
                            <div className={cell + ' bg-pink-400 cursor-pointer w-16 '}
                                 onClick={() => handleDelete(item._id)}>delete
                            </div>
                            <div className={cell + ' bg-green-400 cursor-pointer w-16 '}
                                 onClick={() => handleEdit(item)}>edit
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Request;