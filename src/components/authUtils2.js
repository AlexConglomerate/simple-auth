import axios from "axios";
import {setTokens} from "../services/localStorage.service";


export const httpAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/",
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
});


async function logIn({email, password}) {
    try {
        const {data} = await httpAuth.post(
            `accounts:signInWithPassword`,
            {email, password, returnSecureToken: true}
        );
        setTokens(data);

    } catch (error) {
        errorCatcher(error);
        const {code, message} = error.response.data.error;
        console.log(code, message);
    }
}

function logOut() {
    // localStorageService.removeAuthData();
    // setUser(null);
    // history.push("/");
}


async function signUp({email, password}) {
    try {
        const {data} = await httpAuth.post(`accounts:signUp`, {
            email,
            password,
            returnSecureToken: true
        });
        setTokens(data);

    } catch (error) {
        errorCatcher(error);
        const {code, message} = error.response.data.error;
        console.log(code, message);
    }
}


function errorCatcher(error) {
    const {message} = error.response.data;
    console.log(`errorCatcher`, message)
}

