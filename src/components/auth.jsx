import React from 'react';
import axios from "axios";

function Auth(props) {

// Отправка запроса на сервер
    async function signUp({email, password}) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${KEY}`;
        const httpAuth = axios.create();
        try {
            const {data} = await httpAuth.post(url, {
                email,
                password,
                returnSecureToken: true
            })
            console.log(data)
            // { email, expiresIn, idToken, kind, localId, refreshToken }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div></div>
    );
}

export default Auth;