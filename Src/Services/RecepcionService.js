import api from "./Conexion";

export const actualizarRecepcionista = async (id, nombre, apellido, documento, telefono) => {
    try {
        const response = await api.put("actualizarRecepcionistas/" + id, { nombre, apellido, documento, telefono });
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



export const registrarRecepcion = async (
    nombre,
    apellido,
    documento,
    telefonoString,
    correo,
    clave,
) => {
    try {
        const telefono = parseInt(telefonoString);
        const response = await api.post("/crearRecepcionista", {
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


export const listarRecepcionistas = async () => {
    try {
        const response = await api.get("/listarRecepcionistas");
        if (!response.data.success) {
            return {
                success: false
            }
        }
        return { success: true, recepcionistas: response?.data?.recepcionistas };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || "Error al cargar los medicos",
        };
    }
};


export const citasPendientes = async ()=>{
 try {
        const response = await api.get("/citasPendientes");
        if (!response.data.success) {
            return {
                success: false
            }
        }
        return { success: true, citas: response?.data?.citas };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || "Error al cargar los medicos",
        };
    }
}



export const cargarCitasConMedicosEspecialidades = async () => {
   
    try {
        const response = await api.get("citas/conMedicos/especialidades");
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
