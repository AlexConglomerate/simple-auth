import React, {useEffect, useState} from 'react';
import {logIn, logOut, signUp} from "./authUtils";
import TextField from "./textField";
import usersService from "../services/users.service";
import localStorageService from "../services/localStorage.service";
import authService from "../services/auth.service";

function AuthForm() {
    const [user, setUser] = useState(); // Данные о юзере. Подтягиваем с сервера.

    const [values, setValues] = useState({
        email: "hello@ggmail.com", password: "123123", name: "Alex", profession: "player"
    });

    const handleChange = e => {
        const {value, name} = e.target;
        setValues(prev => ({...prev, [name]: value}));
    }

    const handleSignUp = async () => {
        await signUp(values)
        getUserData()
    }
    const handleLogIn = async () => {
        // await authService.register(values)
        await logIn(values)
        getUserData()
    }
    const handleLogOut = async () => {
        await logOut()
        setUser(null)
    }


    async function getUserData() {
        try {
            const {content} = await usersService.getCurrentUser();
            setUser(content);
        } catch (error) {
            console.log(`error`, error)
            // errorCatcher(error);
        } finally {
            // setLoading(false);
        }
    }

    useEffect(() => {
        if (localStorageService.getAccessToken()) {
            getUserData();
        } else {
            console.log(`Вы не в системе`)
            // setLoading(false);
        }
    }, []);

    const btn = ' bg-yellow-300 p-2 m-2 rounded-lg hover:bg-yellow-400  mt-2  '
    const cell = ' p-1 border-[0.5px] border-cyan-800 w-28 pl-2 '

    return (
        <>
            <div className={'border-2 border-cyan-800 mr-7 p-5 w-min'}>
                <div className={` rounded-xl text-center p-1 mb-3  ${user ? 'bg-green-100' : 'bg-pink-100'} `}>
                    {user
                        ? (<>
                            <div>Ты в системе 🥳</div>
                            <div>{`Ты ${user.name}, ${user.profession}`}</div>
                        </>)
                        : 'Войдите в систему'
                    }

                </div>

                <TextField name="name" label="First Name" value={values.name} onChange={handleChange}/>
                <TextField name="profession" label="Profession" value={values.profession} onChange={handleChange}/>
                <div className={'m-4'}/>
                <TextField name="email" label="Email" value={values.email} onChange={handleChange}/>
                <TextField name="password" label="Password" value={values.password} onChange={handleChange}/>

                <div className={'flex flex-col mt-2'}>
                    <button className={btn} onClick={handleSignUp}>Регистрация</button>
                    <button className={btn} onClick={handleLogIn}>Войти</button>
                    <button className={btn} onClick={handleLogOut}>Выйти</button>
                </div>
            </div>

            <div className={'border-2 border-cyan-800 p-5 w-min'}>
                <div className={'text-3xl text-amber-800 mb-3'}>Users list</div>
                <div className={' flex flex-row '}>
                    <div className={cell}>First Name</div>
                    <div className={cell}>Profession</div>
                    <div className={cell}>Email</div>
                    <div className={cell}>Password</div>
                    <div className={cell}>Can edit</div>
                </div>
            </div>
        </>
    );
}

export default AuthForm;