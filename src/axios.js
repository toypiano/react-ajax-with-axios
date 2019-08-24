import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});

instance.defaults.headers.common['Authorizarion'] = 'AUTH TOKEN FROM INSTANCE';

instance.interceptors.request.use((config) => {
    console.log("req from custom instance: ", config);
    return config;
})

instance.interceptors.response.use((res) => {
    console.log("response to req from custom instance: ", res);
    return res;
})
export default instance;