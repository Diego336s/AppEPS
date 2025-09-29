import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "../../Src/Services/Conexion";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { listarEspecialidad } from "../../Src/Services/AdminService";
export default function Listar_EspecialidadesScreen({navigation}) {



    const [especialidades, setEspecialidades] = useState([]);
    const [noHayEspecialidades, setNoHayEspecialidades] = useState(true);

    const [searchText, setSearchText] = useState(""); // 👈 Estado de búsqueda

    useEffect(() => {
        const cargarRol = async () => {
            const rolGuardado = await AsyncStorage.getItem("rolUser");
            setRol(rolGuardado);
        }
        cargarRol();
    }, []);

    const cargarEspecialidades = async () => {
        try {
            const response = await listarEspecialidad();
            if (!response?.success) {
                setNoHayEspecialidades(true);
                setEspecialidades([]);
                return;
            }

            setNoHayEspecialidades(false);
            setEspecialidades(response?.especialidades);
        } catch (error) {
            console.error("Error al cargar los recepcionistas: " + error.message);
            Alert.alert("Error, no se puede cargar los recepcionistas.");
        }
    };

    useEffect(() => {


        cargarEspecialidades();
    }, []);

    const alertaEliminar = (id) => {

        Alert.alert(
            "Eliminar Especialidad",
            "¿Seguro que quieres eliminar la especialidad?",
            [
                {
                    text: "No", // Texto del botón
                    onPress: () => console.log("Cancelado ❌"),
                    style: "cancel", // estilo especial para iOS
                },
                {
                    text: "Sí",
                    onPress: () => {

                        // aquí llamas a la función que cancela la cita
                        eliminarEspecialidad(id);
                    },
                },
            ],
            { cancelable: true } // permite cerrar tocando fuera
        );


    }
    const eliminarEspecialidad = async (id) => {
        if (id === "") {
            Alert.alert("No se a podido obtener el ID de la especialidad, Intenta nuevamente")
        }

        try {
            const response = await api.delete("eliminarEspecialidades/" + id);
            if (!response.data.success) {
                Alert.alert("Error ❌", response?.data.message || "Error al intentar eliminar la especialidad")
                return;
            }

            showMessage({
                message: "Especialidad eliminada 🫡",
                description: "La especialidad a sido eliminado correctamente",
                type: "success"
            });
            cargarEspecialidades();

        } catch (error) {
            const mensaje =
                error?.response?.data?.message ||
                error?.message ||
                "Error interno, intente más tarde";
            Alert.alert("Error", mensaje);
        }

    }

    // 👇 Filtrar médicos según lo escrito
    const Filtrados = especialidades?.filter((item) => {
        const search = searchText.toLowerCase();
        return (
            item?.nombre?.toLowerCase().includes(search) 
            
        );
    });

    return (
        <View style={styles.container}>
            <FlashMessage position="top" />
            <Text style={styles.titulo}>Buscar Especialidad</Text>
            <Text style={styles.subtitulo}>Encuentra la especialidad</Text>

            <TextInput
                style={styles.input}
                placeholder="Buscar por nombre"
                placeholderTextColor="#aaa"
                value={searchText}
                onChangeText={setSearchText} // 👈 actualiza estado
            />

            {noHayEspecialidades && (
                <View>
                    <Text style={{ color: "white" }}>
                        No hay especialidades registrados
                    </Text>
                </View>
            )}

            <FlatList
                data={Filtrados} // 👈 se muestran filtrados
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.nombre}>🧑‍⚕️ {item.nombre}</Text>
                    
                        <View style={styles.buttonsRow}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("FromEspecialidad", { id: item?.id })}
                                style={styles.rescheduleBtn}
                            >
                                <Text style={styles.btnText}>Actualizar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => alertaEliminar(item?.id)}
                                style={styles.cancelBtn}
                            >
                                <Text style={styles.btnText}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>


                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#101828", padding: 16 },
    titulo: { fontSize: 20, fontWeight: "bold", color: "#fff" },
    subtitulo: { fontSize: 14, color: "#aaa", marginBottom: 10 },
    input: {
        backgroundColor: "#1e293b",
        padding: 10,
        borderRadius: 8,
        color: "#fff",
        marginBottom: 15,
    },
    card: {
        backgroundColor: "#1f2937",
        borderRadius: 12,
        padding: 15,
        marginBottom: 12,
    },
    nombre: { fontSize: 20, paddingBottom: 10, fontWeight: "bold", color: "#fff" },
    especialidad: { fontSize: 14, color: "#60a5fa", marginBottom: 5 },
    telefono: { fontSize: 14, color: "#c3cbd3ff", marginBottom: 5 },
    botones: { flexDirection: "row", marginTop: 10, justifyContent: "space-between" },
    botonPrimario: { backgroundColor: "#2563eb", padding: 10, borderRadius: 8, flex: 1, marginRight: 5, alignItems: "center" },
    botonSecundario: { backgroundColor: "#334155", padding: 10, borderRadius: 8, flex: 1, marginLeft: 5, alignItems: "center" },
    botonTexto: { color: "#fff", fontWeight: "600" },
    buttonsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    rescheduleBtn: {
        flex: 1,
        backgroundColor: "#3b82f6",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginRight: 5,
    },
    cancelBtn: {
        flex: 1,
        backgroundColor: "#ef4444",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginLeft: 5,
    }, btnText: {
        color: "white",
        fontWeight: "bold",
    },
});
