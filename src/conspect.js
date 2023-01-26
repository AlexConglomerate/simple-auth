// https://lk.result.school/pl/teach/control/lesson/view?id=258593050
// Итоговый проект по получению данных с пагинацией:  https://codesandbox.io/s/react-konspekty-14-axios-get-paginaciya-k1ixrb?file=/src/App.js

// Создаём экземпляр axios и пишем в нём путь до api
const request = axios.create({
    baseURL: "https://rickandmortyapi.com/api"
});

// Функция для получения всех эпизодов
export const getEpisodes = async () =>
    request.get("/episode").then(({data}) => data);


const isExpectedError = e.response && e.response.status >= 400 && e.response.status < 500;
// обрабатываем ошибку
// Ожидаемые ошибки - это ошибки клиента (№ ошибок от 400 до 499). Возникают, если до бекенда, до сервера не достучались
// Неожидаемые ошибки - ошибка сервера (все, кроме диапазона от 400 до 499). То, что бэкенд отправляет вручную


/*


* */