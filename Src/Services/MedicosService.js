import api from "./Conexion";

export const listarMedicosConEspecialidad = async () => {
    try {
        const response = await api.get("/listarMedicosConEspecialidades");
    return { success: true, medicos: response?.data?.medicos };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data || "Error al cargar los medicos",
        };
    }
};
