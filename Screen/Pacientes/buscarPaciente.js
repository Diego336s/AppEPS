import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, Alert } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../Src/Services/Conexion";
import { pacientesAtendidosPorDoctor } from "../../Src/Services/MedicosService";

export default function HistorialMedico() {
    const [usuario, setUsuario] = useState(null);
    const [citas, setCitas] = useState([]);
    const [mensaje, setMensaje] = useState(null);
    const [searchText, setSearchText] = useState(""); // 👈 Estado para el filtro

    useEffect(() => {
        const CargarPerfil = async () => {
            try {
                const token = await AsyncStorage.getItem("userToken");
                if (!token) {
                    await AsyncStorage.multiRemove(["userToken", "rolUser"]);
                    Alert.alert("No se encontró el token, redirigiendo al login");
                    return;
                }
                const response = await api.get("/me/Doctor");
                setUsuario(response.data);
            } catch (error) {
                const mensaje =
                    error?.response?.data?.message ||
                    error?.message ||
                    "Error interno, intente más tarde";
                Alert.alert("Error", mensaje);
            }
        };

        CargarPerfil();
    }, []);



    useEffect(() => {

        const CargarCitas = async () => {
            if (!usuario?.user?.id) return;
            try {
                const response = await pacientesAtendidosPorDoctor(usuario?.user?.id);
                if (response.message) {
                    setMensaje(response.message);
                    setCitas([]);
                    return;
                }
                console.log("Datos paciente", response.pacientes)
                setCitas(response.pacientes);
            } catch (error) {
                console.error("Error al cargar las citas: " + error);
                Alert.alert("Error, no se puede cargar las citas del paciente.");
            }
        };
        CargarCitas();
    }, [usuario]);

    // 👇 Filtrar citas según lo escrito
    const filteredCitas = citas.filter((item) => {
        const search = searchText.toLowerCase();
        return (

            item?.nombre?.toLowerCase().includes(search) ||
            item?.apellido?.toLowerCase().includes(search) ||
            item?.documento?.toLowerCase().includes(search) ||
            item?.correo?.toLowerCase().includes(search) ||
            item?.telefono?.toLowerCase().includes(search)
        );
    });

    return (
        <View style={styles.container}>
            {/* Buscador */}
            <TextInput
                style={styles.searchInput}
                placeholder="Buscar cita..."
                placeholderTextColor="#999"
                value={searchText}
                onChangeText={setSearchText} // 👈 actualiza el estado
            />

            <ScrollView>
                {mensaje && <Text style={{ color: "white" }}>{mensaje}</Text>}
                {filteredCitas.length > 0 ? (
                    filteredCitas.map((item, index) => (
                        <View key={index} style={styles.card}>
                            <Text style={styles.label}>Paciente:</Text>
                            <Text style={styles.text}>{item?.nombre} {item?.apellido}</Text>

                            <Text style={styles.label}>Documento:</Text>
                            <Text style={styles.text}>{item?.documento}</Text>

                            <Text style={styles.label}>telefono:</Text>
                            <Text style={styles.text}>{item?.telefono}</Text>

                            <Text style={styles.label}>correo:</Text>
                            <Text style={styles.text}>{item?.correo}</Text>

                        </View>
                    ))
                ) : (
                    <Text style={{ color: "white", textAlign: "center" }}>No se encontraron citas</Text>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#0c1a2b", padding: 10 },
    searchInput: {
        backgroundColor: "#1e2a3c",
        color: "#fff",
        padding: 10,
        borderRadius: 8,
        marginBottom: 15,
    },
    card: {
        backgroundColor: "#1e2a3c",
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    fecha: { color: "#fff", fontWeight: "bold", marginBottom: 5 },
    doctor: { color: "#fff", fontSize: 16 },
    especialidad: { color: "#aaa", marginBottom: 10 },
    label: { color: "#00bfff", fontWeight: "bold" },
    text: { color: "#ddd", marginBottom: 5 },
    estadoConfirmada: { marginTop: 10, alignSelf: "flex-end", color: "#2bff00ff", fontWeight: "bold" },
    estadoCancelada: { marginTop: 10, alignSelf: "flex-end", color: "red", fontWeight: "bold" },
    estadoPendiente: { marginTop: 10, alignSelf: "flex-end", color: "#f2fa12ff", fontWeight: "bold" },
    estadoFinalizada: { marginTop: 10, alignSelf: "flex-end", color: "#1c4507ff", fontWeight: "bold" },
});
