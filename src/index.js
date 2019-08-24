import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(function (config) {
    console.log("axios request config: ", config);
    return config;
}, function (err) {
    console.log(err); // easier to see the stack trace
    return Promise.reject(err);
});

axios.interceptors.response.use(function (response) {
    console.log("axios reveiced response from the server: ", response);
    return response;
}, function (err) {
    console.log(err)
    return Promise.reject(err);
});



ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
 