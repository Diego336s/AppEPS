import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Alert } from "react-native";
import FlashMessage, { showMessage } from "react-native-flash-message";


import { actualizarEspecialidad, cargarDatosEspecialidad, registrarEspecialidad } from "../../Src/Services/AdminService";
import { useRoute } from "@react-navigation/native";
export default function Form_Especialidad({ navigation }) {
    const [nombre, setNombre] = useState("");
    const route = useRoute();
    const idUser = route.params.id;

    useEffect(() => {
        const cargarDatos = async () => {
            if (!idUser || idUser === "") return;
            try {
                const response = await cargarDatosEspecialidad(idUser);


                if (!response.success) {
                    Alert.alert("Error ❌", response.message);
                    return;
                }
                console.log("Datos cargados", response.especialidad);
                setNombre(response.especialidad?.nombre)


            } catch (error) {
                Alert.alert("Error de carga de datos",error?.message || error?.response?.message || "Error al cargar los datos de la especialidad");
            }
        }
        cargarDatos();
    }, [])


    const enviarForm = async () => {


        if (!nombre) {
            showMessage({
                message: "Error 😰",
                description: "Debes llenar el campo",
                type: "danger"
            });
            return;
        }



        try {
            let response;
            if (idUser) {
                response = await actualizarEspecialidad(idUser, nombre);
            } else {
                response = await registrarEspecialidad(nombre);
            }

            if (!response.success) {
                Alert.alert("Error al registrar ☹️", response.message)
                return;
            }
            Alert.alert("Proceso exitoso 🫡", response.message)
            navigation.navigate("ListarEspecialidades");

        } catch (error) {
            Alert.alert("Error al registrar", error.message)
        }
    }

    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            < ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.container}>
                    <FlashMessage position="top" />
                    <View style={styles.form}>
                        <Text style={styles.title}>Especialidad</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Especialidad"
                            placeholderTextColor="#94a3b8"
                            value={nombre}
                            onChangeText={setNombre}
                        />


                    </View>
                    <TouchableOpacity style={styles.registerBtn} onPress={enviarForm}>
                        <Text style={styles.registerText}>Enviar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0f172a",
        padding: 20,
        justifyContent: "center",
    },
    scroll: {
        flexGrow: 1,
        justifyContent: "center",
        backgroundColor: "#0f172a"
    },
    title: {
        color: "white",
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    form: {
        backgroundColor: "#1e293b",
        padding: 20,
        borderRadius: 10,
    },
    select: {
        backgroundColor: "#334155",
        color: "white",
        borderRadius: 8,
        marginBottom: 12,
    },
    input: {
        backgroundColor: "#334155",
        color: "white",
        padding: 10,
        borderRadius: 8,
        marginBottom: 12,
    },
    registerBtn: {
        backgroundColor: "#16a34a",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },
    registerText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
    iniciarSesionBtn: {
        marginTop: 10,
        borderRadius: 10,
        overflow: "hidden",
    },
});
