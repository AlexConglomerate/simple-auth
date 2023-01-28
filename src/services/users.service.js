import httpService from "./http.service";
import localStorageService from "./localStorage.service";


const addEndPoint = 'users/'

const usersService = {

    // 1 вариант создания пользователя, через POST. id firebase придумает сам.
    create: async (payload) => {
        const {data} = await httpService.post(addEndPoint, payload)
        console.log(`===create`, data)

        return data
    },

    // 2 вариант создания пользователя, через PUT. Firebase присвоит тот id, который мы указали.
    add: async (payload) => {
        const {data} = await httpService.put(addEndPoint + payload._id, payload)
        console.log(`===add`, data)

        return data
    },
    get: async () => {
        const {data} = await httpService.get(addEndPoint)
        console.log(`===get`, data)

        return data
    },
    update: async (payload) => {
        const {data} = await httpService.put(addEndPoint + payload._id, payload)
        console.log(`===update`, data)
        return data
    },
    delete: async (id) => {
        const {data} = await httpService.delete(addEndPoint + id)
        console.log(`===delete`, data)
        return data
    },
    getCurrentUser: async () => {
        const {data} = await httpService.get(
            addEndPoint + localStorageService.getUserId()
        );
        // console.log(`getCurrentUser`, data)
        return data;
    },
}


export default usersService