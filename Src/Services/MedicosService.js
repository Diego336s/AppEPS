import api from "./Conexion";

export const listarMedicosConEspecialidad = async () => {
    try {
        const response = await api.get("/listarMedicosConEspecialidades");
        if(!response.data.success){
            return{
                success: false
            }
        }
        return { success: true, medicos: response?.data?.medicos };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || "Error al cargar los medicos",
        };
    }
};

export const registrarDoctor = async (
    nombre,
    apellido,
    documento,
    telefonoString,    
    correo,
    clave,
    especialidad
) => {
    try {
        const telefono = parseInt(telefonoString);
        const response = await api.post("/crearMedico/"+especialidad, {
            nombre,
            apellido,
            documento,
            telefono,
            correo,
            clave,
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

export const actualizarDoctor = async (id, nombre, apellido, documento, telefono) => {
    try {
        const response = await api.put(`actualizarMedico/${id}`, { nombre, apellido, documento, telefono });
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


export const actualizarDoctorConEspecialidad = async (id, idEspecialidad, nombre, apellido, documento, telefono) => {
    try {
        const response = await api.put(`actualizarMedicoConEspecialida/${id}/${idEspecialidad}`, { nombre, apellido, documento, telefono });
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