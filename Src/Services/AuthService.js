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

        if (!response.data.success) {
            return {
                success: false,
                message: response.data.message
            }
        }
        return { success: true, token };
    } catch (error) {
        if (error.response) {
            console.log("Error al iniciar sesión:", error.response.data);
            return {
                success: false,
                message: error.response.data.message || "Error en las credenciales",
            };
        } else {
            console.log("Error al iniciar sesión:", error.message);
            return {
                success: false,
                message: "Error de conexión con el servidor",
            };
        }
    }
};

export const loginRecepcionista = async (correo, clave) => {

    try {
        const response = await api.post("/loginRecepcionista", { correo, clave });
        const token = response.data.token; //Token es la palabra que alla puesto como llave en la respuesta del servidor
        console.log("Respuesta del servidor:", response.data);
        console.log("Token recibido:", token);
        const rol = "Recepcionista";
        if (token) {
            await AsyncStorage.setItem("userToken", token);
            await AsyncStorage.setItem("rolUser", rol);
        } else {
            console.error("No se recibio el token en la respuesta");
        }

        if (!response.data.success) {
            return {
                success: false,
                message: response.data.message
            }
        }
        return { success: true, token };
    } catch (error) {
        if (error.response) {
            console.log("Error al iniciar sesión:", error.response.data);
            return {
                success: false,
                message: error.response.data.message || "Error en las credenciales",
            };
        } else {
            console.log("Error al iniciar sesión:", error.message);
            return {
                success: false,
                message: "Error de conexión con el servidor",
            };
        }
    }
};



export const loginAdmin = async (correo, clave) => {

    try {
        const response = await api.post("/loginAdmin", { correo, clave });
        const token = response.data.token; //Token es la palabra que alla puesto como llave en la respuesta del servidor
        console.log("Respuesta del servidor:", response.data);
        console.log("Token recibido:", token);
        const rol = "Admin";
        if (token) {
            await AsyncStorage.setItem("userToken", token);
            await AsyncStorage.setItem("rolUser", rol);
        } else {
            console.error("No se recibio el token en la respuesta");
        }

        if (!response.data.success) {
            return {
                success: false,
                message: response.data.message
            }
        }
        return { success: true, token };
    } catch (error) {
        if (error.response) {
            console.log("Error al iniciar sesión:", error.response.data);
            return {
                success: false,
                message: error.response.data.message || "Error en las credenciales",
            };
        } else {
            console.log("Error al iniciar sesión:", error.message);
            return {
                success: false,
                message: "Error de conexión con el servidor",
            };
        }
    }
};

export const loginDoctor = async (correo, clave) => {

    try {
        const response = await api.post("/loginMedico", { correo, clave });
        const token = response.data.token; //Token es la palabra que alla puesto como llave en la respuesta del servidor
        console.log("Respuesta del servidor:", response.data);
        console.log("Token recibido:", token);
        const rol = "Doctor";
        if (token) {
            await AsyncStorage.setItem("userToken", token);
            await AsyncStorage.setItem("rolUser", rol);
        } else {
            console.error("No se recibio el token en la respuesta");
        }

        if (!response.data.success) {
            return {
                success: false,
                message: response.data.message
            }
        }
        return { success: true, token };
    } catch (error) {
        if (error.response) {
            console.log("Error al iniciar sesión:", error.response.data);
            return {
                success: false,
                message: error.response.data.message || "Error en las credenciales",
            };
        } else {
            console.log("Error al iniciar sesión:", error.message);
            return {
                success: false,
                message: "Error de conexión con el servidor",
            };
        }
    }
};

export const logoutAdmin = async () => {
    try {
        const response = await api.post("/logoutAdmin");
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

export const logoutRecepcion = async () => {
    try {
        const response = await api.post("/logoutRecepcionista");
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

export const logoutDoctor = async () => {
    try {
        const response = await api.post("/logoutMedico");
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

export const cambiarClave = async (clave, id, rol) => {
    try {
        let response;
        switch (rol) {
            case "Paciente":
                response = await api.post("cambiar/clave/paciente/" + id, { clave });
                break;
            case "Doctor":
                response = await api.post("cambiar/clave/medico/" + id, { clave });
                break;
            case "Admin":
                response = await api.post("cambiar/clave/Admin/" + id, { clave });
                break;
            case "Recepcionista":
                response = await api.post("cambiar/clave/recepcionista/" + id, { clave });
                break;
            default:
                Alert.alert("Error rol", "No pudimos validar tu rol, Inicia Sesion otra vez");
                await AsyncStorage.multiRemove(["userToken", "rolUser"]);
                break;
        }

        if (!response.data.success) {
            return { success: false, message: "No se pudo cambiar la clave, reintentar nuevamente" }
        }

        await AsyncStorage.multiRemove(["userToken", "rolUser"]);
        return { success: true, message: "Cambio de clave exitoso, inicia sesion nuevamente" }


    } catch (error) {
        console.error("Error", error.message)
        return {
            success: false,
            message: error?.response?.data?.message || "Error al reprogramar la cita",
            status: error?.response?.status || 500
        };
    }
}

export const cambiarCorreo = async (correo, id, rol) => {
    try {
        let response;
        switch (rol) {
            case "Paciente":
                response = await api.post("cambiar/correo/paciente/" + id, { correo });
                break;
            case "Doctor":
                response = await api.post("cambiar/correo/medico/" + id, { correo });
                break;
            case "Admin":
                response = await api.post("cambiar/correo/Admin/" + id, { correo });
                break;
            case "Recepcionista":
                response = await api.post("cambiar/correo/recepcionista/" + id, { correo });
                break;

            default:
                Alert.alert("Error rol", "No pudimos validar tu rol, Inicia Sesion otra vez");
                await AsyncStorage.multiRemove(["userToken", "rolUser"]);
                break;
        }

        if (!response.data.success) {
            return { success: false, message: response.data.message ? response.data.message : "No se pudo cambiar el correo, reintentar nuevamente" }
        }

        await AsyncStorage.multiRemove(["userToken", "rolUser"]);
        return { success: true, message: "Cambio de correo exitoso, inicia sesion nuevamente" }


    } catch (error) {
        console.error("Error", error.message)
        return {
            success: false,
            message: error?.response?.data?.message || "Error al reprogramar la cita",
            status: error?.response?.status || 500
        };
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


export const enviarCodigoDeVerificacion = async(email) =>{
  try {
        const response = await api.post("/enviar/codigoVerificacion",{email}); 
        if (!response.data.success) {
            console.error("Error al enviar codigo", response.data);
            return { success: false, message: response.data?.message }
            
        }
        
        return { success: true, message: response.data?.message}

    } catch (error) {
        console.error("Error", error.message)
        return {
            success: false,
            message: error?.response?.data?.message || "Error de conexion con el servidor",
            status: error?.response?.status || 500
        };
    }
}



export const verificarCodigo = async(correo, codigo) =>{
  try {
        const response = await api.post("/verificar/codigo",{correo, codigo}); 
        if (!response.data.success) {
            return { success: false, message: response.data.message }
        }
        return { success: true, message: response.data.message}
    } catch (error) {
       
        return {
            success: false,
            message: error?.response?.data?.message || "Error de conexion con el servidor",
            status: error?.response?.status || 500
        };
    }
}


export const olvideMiClave = async (rol, clave, correo) => {
    
    try {
        let response;
        switch (rol) {
            case "Paciente":
                response = await api.put("/olvide/clave/Paciente", { clave, correo });
                break;
            case "Doctor":
                response = await api.put("/olvide/clave/Doctor", { clave, correo });
                break;
            case "Administradores":
                response = await api.put("/olvide/clave/Admin", { clave, correo });
                break;
            case "Recepcionista":
                response = await api.put("/olvide/clave/Recepcionista", { clave, correo });
                break;
            default:
                Alert.alert("Error rol", "No pudimos validar tu rol, Inicia Sesion otra vez");
                await AsyncStorage.multiRemove(["userToken", "rolUser"]);
                break;
        }

        if (!response.data.success) {
            return { success: false, message: "No se pudo cambiar la clave, reintentar nuevamente" }
        }


        return { success: true, message: "Cambio de clave exitoso, inicia sesion" }


    } catch (error) {
        console.error("Error", error.message)
        return {
            success: false,
            message: error?.response?.data?.message || "Error de conexion con el servidor",
            status: error?.response?.status || 500
        };
    }
}