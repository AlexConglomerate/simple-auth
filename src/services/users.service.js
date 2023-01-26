import httpService from "./http.service";

const addEndPoint = 'users/'

const usersService = {

    // 1 вариант создания пользователя, через POST. id firebase придумает сам.
    create: async (payload) => {
        const {data} = await httpService.post(addEndPoint, payload)
        return data
    },

    // 2 вариант создания пользователя, через PUT. Firebase присвоит тот id, который мы указали.
    add: async (payload) => {
        const {data} = await httpService.put(addEndPoint + payload._id, payload)
        return data
    },
    get: async () => {
        const {data} = await httpService.get(addEndPoint)
        return data
    },
    update: async (payload) => {
        const {data} = await httpService.put(addEndPoint + payload._id, payload)
        return data
    },
    delete: async (id) => {
        const {data} = await httpService.delete(addEndPoint + id)
        return data
    },
}


export default usersService