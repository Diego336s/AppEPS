import api from "./Conexion";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Alert } from "react-native";
import { measure } from "react-native-reanimated";

dayjs.extend(customParseFormat);

export const agendarCita = async (
    descripcion,
    id_medico,
    id_paciente,
    fecha,
    hora_string,
) => {
    const estado = "Pendiente";

    // Validar fecha
    if (!dayjs(fecha.trim(), "YYYY-MM-DD", true).isValid()) {
        Alert.alert("Error", "La fecha de la cita no es válida");
        return { success: false };
    }

    // Asegurar que la hora esté en formato HH:mm
    const hora_inicio = dayjs(hora_string).format("HH:mm");

    const regexHora = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!regexHora.test(hora_inicio)) {
        Alert.alert("Error", "La hora no tiene un formato válido (HH:mm).");
        return { success: false };
    }

    try {
        const response = await api.post("/crearCitas", {
            descripcion,
            id_medico,
            id_paciente,
            fecha,
            hora_inicio,
            estado,
        });

        if (!response.data.success) {
            return { success: false, message: response.data.message };
        }

        return { success: true, cita: response.data };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data || "Error al reservar la cita",
        };
    }
};
export const cargarDatosCita = async (id) => {
    if (!id) {
        return {
            success: false,
            message: "No se ha obtenido el ID de la cita"
        };
    }

    try {
        const response = await api.get(`datosCita/${id}`);

        if (!response.data?.success) {
            return {
                success: false,
                message: "No se ha podido obtener los datos de la cita"
            };
        }

        return {
            success: true,
            cita: response.data.cita || response.data // depende de cómo venga del backend
        };

    } catch (error) {
        console.error("Error en cargarDatosCita:", error);
        return {
            success: false,
            message: error?.response?.data?.message || "Error al cargar los datos de la cita",
            status: error?.response?.status || 500
        };
    }
};

export const reprogramarCita = async (hora_string, fecha, id) => {
    // Validar fecha
    if (!dayjs(fecha.trim(), "YYYY-MM-DD", true).isValid()) {
        Alert.alert("Error", "La fecha de la cita no es válida");
        return { success: false };
    }

    // Asegurar que la hora esté en formato HH:mm
    const hora_inicio = dayjs(hora_string).format("HH:mm");

    const regexHora = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!regexHora.test(hora_inicio)) {
        Alert.alert("Error", "La hora no tiene un formato válido (HH:mm).");
        return { success: false };
    }
    const estado = "Pendiente";
    try {
        const response = await api.put("actualizarCitas/" + id, {
            hora_inicio,
            fecha,
            estado
        });
        if (!response.data.success) {
            return {
                success: false,
                message: response.data.message
            }
        }
        return {
            success: true,
            message: "Cita reprogramada correctamente"
        }

    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message || "Error al reprogramar la cita",
            status: error?.response?.status || 500
        };

    }
}

export const cargarCitasPorPaciente = async (documento) => {
    if (documento === "" || documento === null) {
        console.log("Documento no valido");
        return {
            success: false,
            message: "El documento no valido para cargar citas",
        };
    }
    try {
        const response = await api.get("citasPorPacientes/" + documento);
        if (response?.data?.message) {
            return {
                success: true, message: response?.data?.message
            }
        }
        return { success: true, citas: response.data };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data || "Error al cargar las citas"
        }
    }
};

export const actualizarPacientes = async (id, nombre, apellido, documento, telefono) => {
    if (id === "" || nombre === "" || apellido === "" || documento === "", telefono === "") {
        return {
            success: false,
            message: "Faltan campos requeridos para hacer la peticion"
        }
    }

    try {
        const response = await api.put("actualizarPaciente/" + id, { nombre, apellido, documento, telefono })
        if (!response?.data.success) {
            return {
                success: false,
                message: response?.data?.message
            }
        }
        return {
            success: true,
            message: "El paciente" + " " + nombre + " " + apellido + " sea actualizado correctamente"
        }
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data.message || "Error al actualizar el paciente"
        }

    }
}

export const cargarCitasConfirmadasPorPaciente = async (documento) => {
    if (documento === "" || documento === null) {
        console.log("Documento no valido");
        return {
            success: false,
            message: "El documento no valido para cargar citas",
        };
    }
    try {
        const response = await api.get("citasPorPacientesConfirmadas/" + documento);
        if (response?.data?.message) {
            return {
                success: true, message: response?.data?.message
            }
        }
        return { success: true, citas: response.data };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data || "Error al cargar las citas"
        }
    }
};
