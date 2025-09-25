import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./Conexion";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Alert } from "react-native";

dayjs.extend(customParseFormat);


export const loginPaciente = async (correo, clave) => {

    try {
        const response = await api.post("/loginPaciente", { correo, clave });
        const token = response.data.token; //Token es la palabra que alla puesto como llave en la respuesta del servidor
        console.log("Respuesta del servidor:", response.data);
        console.log("Token recibido:", token);
        const rol = "Paciente";
        if (token) {
            await AsyncStorage.setItem("userToken", token);
            await AsyncStorage.setItem("rolUser", rol);
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
        await AsyncStorage.multiRemove(["userToken", "rolUser"]);
        if (!response.data.success) {
            console.error("Error del servidor:", response.data.message);
        }
        return { success: true, message: response.data.message };
    } catch (error) {

        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexion",
        };
    }
};

export const cambiarClave = async (clave, id) => {
    try {
        const response = await api.post("/cambiarClave/" + id, { clave });
        if (!response.data.success) {
            return { success: false, message: "No se pudo cambiar la clave, reintentar nuevamente" }
        }

        await AsyncStorage.multiRemove(["userToken", "rolUser"]);
        return { success: true, message: "Cambio de clave exitoso, inicia sesion nuevamente" }


    } catch (error) {
        console.error("Error", error.message)
        return {
            success: false,
            message: error.message
        }
    }
}

export const cambiarCorreo = async (correo, id) => {
    try {
        const response = await api.post("/cambiarCorreo/" + id, { correo });
        if (!response.data.success) {
            return { success: false, message: "No se pudo cambiar el correo, reintentar nuevamente" }
        }

        await AsyncStorage.multiRemove(["userToken", "rolUser"]);
        return { success: true, message: "Cambio de correo exitoso, inicia sesion nuevamente" }


    } catch (error) {
        console.error("Error", error.message)
        return {
            success: false,
            message: error.message
        }
    }
}

export const registrarPaciente = async (
    nombre,
    apellido,
    documento,
    telefonoString,
    fecha_nacimiento,
    rh,
    sexo,
    nacionalidad,
    correo,
    clave,
) => {
    try {
        if (!dayjs(fecha_nacimiento.trim(), "YYYY-MM-DD", true).isValid()) {
            console.error("La fecha de nacimiento no es válida", fecha_nacimiento);
            return;
        }
        console.log("Fecha de nacimiento", fecha_nacimiento);

        console.log("Fecha ya con formato", fecha_nacimiento);
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
