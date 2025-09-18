import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./Conexion";
import { Alert } from "react-native";
import dayjs from "dayjs";

export const loginPaciente = async (correo, clave) => {
    try {
        const response = await api.post("/loginPaciente", { correo, clave });
        const token = response.data.token; //Token es la palabra que alla puesto como llave en la respuesta del servidor
        console.log("Respuesta del servidor:", response.data);
        console.log("Token recibido:", token);
        if (token) {
            await AsyncStorage.setItem("userToken", token);
        } else {
            console.error("No se recibio el token en la respuesta");
        }
        return { success: true, token };
    } catch (error) {
        console.error(
            "Error al inicar sesion:",
            error.response ? error.response.data : error.message,
        );
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexion",
        };
    }
};

export const logoutPaciente = async () => {
    try {
        const response = await api.post("/logoutPaciente");
        const result = await AsyncStorage.removeItem("userToken");
        if (!response.data.success) {
            console.error("Error del servidor:", response.data.message);
        }
        if (!result) {
            console.error("Error al intentar borrar el token del localStorage");
        }
        return { success: true, message: response.data.message };
    } catch (error) {
        console.error(
            "Error al cerrar sesion:",
            error.response ? error.response.data : error.message,
        );
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexion",
        };
    }
};

export const registrarPaciente = async (
    nombre,
    apellido,
    documento,
    telefonoString,
    fechaString,
    rh,
    sexo,
    nacionalidad,
    correo,
    clave,
) => {
    try {
        if (!dayjs(fechaString).isValid()) {
            console.error("La fecha de nacimiento no es válida", fechaString);
            return;
        }
        const fecha_nacimiento = dayjs(fechaString).format("YYYY-MM-DD");
        const telefono = parseInt(telefonoString);
        const response = await api.post("/crearPaciente", {
            nombre,
            apellido,
            documento,
            telefono,
            fecha_nacimiento,
            rh,
            sexo,
            nacionalidad,
            correo,
            clave,
        });
      
        const token = response.data.token_access; //token_access es la palabra que alla puesto como llave en la respuesta del servidor
        console.log("Respuesta del servidor:", response.data);
        console.log("Token recibido:", token);
        if (token) {
            await AsyncStorage.setItem("userToken", token);
        } else {
            console.error("No se recibio el token en la respuesta");
        }
        return { success: true, message: response.data.message, token };
    } catch (error) {
        console.error(
            "Error al registrar Paciente:",
            error.response ? error.response.data : error.message,
        );
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexion",
        };
    }
};
