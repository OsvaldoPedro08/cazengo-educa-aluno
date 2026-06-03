import axios from "axios";

const api = axios.create({
    baseURL:'https://cazengo-educa-api.onrender.com',
    withCredentials: true
});

//==========================
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

//intercepta as respostas da API
api.interceptors.response.use(
    (response) => response, //Se correr bem, nao faz nada
    (error) => {
        //se o backend rejeitar por falta de autenticação (401)
        if(error.response && error.response.status === 401) {
            localStorage.removeItem('@CazengoEduca:user'); //limpa os dados do usuario
            localStorage.removeItem('token')
            window.location.href='/login'; //envia o usuario para a rota de login
        }

        return Promise.reject(error);
    });

export default api;