import api from "./Conexion";

export const listarMedicosConEspecialidad = async () => {
    try {
        const response = await api.get("/listarMedicosConEspecialidades");
        if (!response.data.success) {
            return {
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
        const response = await api.post("/crearMedico/" + especialidad, {
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

export const citasPendientesDoctor = async (id) => {
    if (!id || id === "") return;
    try {
        const response = await api.get("citas/confirmadas/doctor/" + id);
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




export const cargarCitasPorMedicosConEspecialidades = async (id) => {
    if (!id || id === "") return;
    try {
        const response = await api.get("citas/porMedicos/conEspecialidades/" + id);
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


export const pacientesAtendidosPorDoctor = async (id) => {
  if (!id || id === "") return;

  try {
    const response = await api.get("pacientes/atendidos/doctor/" + id);

    if (!response?.data?.success) {
      return {
        success: false,
        message: response?.data?.message,
      };
    }

    return { success: true, pacientes: response.data.pacientes }; // 👈 AQUÍ EL CAMBIO
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Error al cargar los pacientes",
    };
  }
};
