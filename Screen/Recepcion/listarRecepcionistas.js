import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { listarRecepcionistas } from "../../Src/Services/RecepcionService";
import api from "../../Src/Services/Conexion";
import FlashMessage, { showMessage } from "react-native-flash-message";
export default function ListarRecepcionistasScreen({navigation}) {



    const [recepcionista, setRecepcionista] = useState([]);
    const [noHayRecepcionistas, setNoHayRecepcionistas] = useState(true);

    const [searchText, setSearchText] = useState(""); // 👈 Estado de búsqueda

    useEffect(() => {
        const cargarRol = async () => {
            const rolGuardado = await AsyncStorage.getItem("rolUser");
            setRol(rolGuardado);
        }
        cargarRol();
    }, []);

    const cargarRecepcionistas = async () => {
        try {
            const response = await listarRecepcionistas();
            if (!response?.success) {
                setNoHayRecepcionistas(true);
                setRecepcionista([]);
                return;
            }

            setNoHayRecepcionistas(false);
            setRecepcionista(response?.recepcionistas);
        } catch (error) {
            console.error("Error al cargar los recepcionistas: " + error.message);
            Alert.alert("Error, no se puede cargar los recepcionistas.");
        }
    };

    useEffect(() => {


        cargarRecepcionistas();
    }, []);

    const aleretaEliminarRecepcionista = (id) => {

        Alert.alert(
            "Eliminar recepcionista",
            "¿Seguro que quieres eliminar el recepcionista?",
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
                        eliminarRecepcionista(id);
                    },
                },
            ],
            { cancelable: true } // permite cerrar tocando fuera
        );


    }
    const eliminarRecepcionista = async (id) => {
        if (id === "") {
            Alert.alert("No se a podido obtener el ID del recepcionista, Intenta nuevamente")
        }

        try {
            const response = await api.delete("eliminarRecepcionistas/" + id);
            if (!response.data.success) {
                Alert.alert("Error ❌", response?.data.message || "Error al intentar eliminar el recepcionista")
                return;
            }

            showMessage({
                message: "Recepcionista eliminado 🫡",
                description: "El recepcionista a sido eliminado correctamente",
                type: "success"
            });
            cargarRecepcionistas();

        } catch (error) {
            const mensaje =
                error?.response?.data?.message ||
                error?.message ||
                "Error interno, intente más tarde";
            Alert.alert("Error", mensaje);
        }

    }

    // 👇 Filtrar médicos según lo escrito
    const recepcionistasFiltrados = recepcionista?.filter((item) => {
        const search = searchText.toLowerCase();
        return (
            item?.nombre?.toLowerCase().includes(search) ||
            item?.apellido?.toLowerCase().includes(search) ||
            item?.especialidad?.toLowerCase().includes(search)
        );
    });

    return (
        <View style={styles.container}>
            <FlashMessage position="top" />
            <Text style={styles.titulo}>Buscar Recepcionistas</Text>
            <Text style={styles.subtitulo}>Encuentra el Recepcionista</Text>

            <TextInput
                style={styles.input}
                placeholder="Buscar por nombre o documento..."
                placeholderTextColor="#aaa"
                value={searchText}
                onChangeText={setSearchText} // 👈 actualiza estado
            />

            {noHayRecepcionistas && (
                <View>
                    <Text style={{ color: "white" }}>
                        No hay recepcionistas registrados
                    </Text>
                </View>
            )}

            <FlatList
                data={recepcionistasFiltrados} // 👈 se muestran filtrados
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.nombre}>{item.nombre} {item.apellido}</Text>
                        <Text style={styles.telefono}>{item.telefono}</Text>
                        <Text style={styles.telefono}>{item.correo}</Text>
                        <Text style={styles.telefono}>{item.documento}</Text>

                        <View style={styles.buttonsRow}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("FormActualizarPersonal", { id: item?.id, rol: "Recepcionista" })}
                                style={styles.rescheduleBtn}
                            >
                                <Text style={styles.btnText}>Actualizar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => aleretaEliminarRecepcionista(item?.id)}
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
    nombre: { fontSize: 16, fontWeight: "bold", color: "#fff" },
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
