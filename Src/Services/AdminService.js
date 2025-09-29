import api from "./Conexion";

export const actualizarAdmin = async (id, nombre, apellido, documento, telefono) => {
    try {
        const response = await api.put("actualizar/Admin/" + id, { nombre, apellido, documento, telefono });
        if (!response.data.success) {
            return {
                success: false,
                message: response.data.message
            }
        }
        return {
            success: true,
            message: response.data.message
        }
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message || "Error al reprogramar la cita",
            status: error?.response?.status || 500
        };
    }


}


export const listarEspecialidad = async () => {
    try {
        const response = await api.get("/listarEspecialidades");
        if (!response.data.success) {
            return {
                success: false
            }
        }
        return { success: true, especialidades: response?.data?.especialidades };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || "Error al cargar las especialidades",
        };
    }
};

export const registrarEspecialidad = async (
    nombre
) => {
    try {

        const response = await api.post("/crearEspecialidades", {
            nombre
        });
        if (!response.data.success) {
            return {
                success: false,
                message: response.data.message
            }
        }

        console.log("Respuesta del servidor:", response.data);

        return { success: true, message: response.data.message };
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


export const cargarDatosEspecialidad = async (id) => {
    if (!id) {
        return {
            success: false,
            message: "No se ha obtenido el ID de la especialidad"
        };
    }

    try {
        const response = await api.get(`filtrarEspecialidad/${id}`);

        if (!response.data?.success) {
            return {
                success: false,
                message: response.data?.message || "No se a podido obtener los datos de la especialidad"
            };
        }

        return {
            success: true,
            especialidad: response.data?.especialidades
        };

    } catch (error) {

        return {
            success: false,
            message: error?.response?.data?.message || "Error al cargar los datos de la especialidad",
            status: error?.response?.status || 500
        };
    }
};


export const actualizarEspecialidad = async (id, nombre) => {
    try {
        const response = await api.put("actualizarEspecialidades/" + id, { nombre});
        if (!response.data.success) {
            return {
                success: false,
                message: response.data.message
            }
        }
        return {
            success: true,
            message: response.data.message
        }
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message || "Error al reprogramar la cita",
            status: error?.response?.status || 500
        };
    }


}