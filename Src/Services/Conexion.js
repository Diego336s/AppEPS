import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const URL = "http://192.168.101.135:8000/api";

const api = axios.create({
    baseURL: URL,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
});

const RutasPublicas = [
    "/loginPaciente",
    "/loginRecepcionista",
    "/loginMedico",
    "/loginAdmin",
    "/crearPaciente",
    '/olvide/clave/Recepcionista',
    '/olvide/clave/Paciente',
    '/olvide/clave/Admin',
    '/olvide/clave/Doctor'
    
]; //Rutas de api que no requiren autenticacion

api.interceptors.request.use(
    async (config) => {
        const EsRutaPublica = RutasPublicas.some((ruta) =>
            config.url.includes(ruta)
        );
     
        if (!EsRutaPublica) {
           const userToken = await AsyncStorage.getItem("userToken");
              if (userToken) {
            config.headers.Authorization = `Bearer ${userToken}`;
        }
        }
      
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const isRutaPublica = RutasPublicas.some((ruta) =>
            originalRequest.url.includes(ruta)
        );
        if (
            error.response && error.response.status === 401 &&
            !originalRequest._retry && !isRutaPublica
        ) {
            originalRequest._retry = true;
            await AsyncStorage.removeItem("userToken"); //Elimino el token guardado
            console.log(
                "Token a expirado o no autorizado, Redirigirte al login",
            );
        }

        return Promise.reject(error);
    },
);

export default api;
