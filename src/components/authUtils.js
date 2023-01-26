import axios from "axios";
import {toast} from "react-toastify";

export const signUp = async ({email, password}) => {
    console.log(`email, password`, email, password)
    const KEY = 'AIzaSyASQbVny6OlTuqD0q0tmUKiVkeo2bFflqg'
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${KEY}`;
    console.log(`url`, url)
    const httpAuth = axios.create();
    try {
        const {data} = await httpAuth.post(url, {
            email,
            password,
            returnSecureToken: true
        })
        console.log('data', data)
        // { email, expiresIn, idToken, kind, localId, refreshToken }
    } catch (error) {
        const {message} = error.response.data.error
        console.log('error', error);
        console.log('message', message);
        toast.error(message)
    }
}