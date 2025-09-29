import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Alert } from "react-native";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { cambiarClave, olvideMiClave } from "../../Src/Services/AuthService";

import { useRoute } from "@react-navigation/native";

export default function Cambiar_clave() {
    const route = useRoute();
    const rol = route.params.rol;
    const [clave, setClave] = useState("");
    const [confirmarClave, setConfirmarClave] = useState("");
    const [correo, setCorreo] = useState("");


    const enviarForm = async () => {
        if (clave === "" || confirmarClave === "" || correo === "") {
            Alert.alert("Campos incompletos ☹️", "Debes rellenar todos los campos")

            return;
        }

        if (clave !== confirmarClave) {
            Alert.alert("Error no coinciden 😣", "Las contraseñas no coinciden")

            return;
        }

        if (clave.length < 6 || confirmarClave.length < 6) {
            Alert.alert("Error minimo no alcanzado 😰", "La contraseña debe tener minimo 6 caracteres")

            return;
        }    


        try {

            const response = await olvideMiClave(rol,clave, correo);
            if (!response.success) {
                Alert.alert("Error cambio de clave ☹️", response.message)
                return;
            }
            Alert.alert("Cambio de clave exitoso 🫡", response.message)

        } catch (error) {
            Alert.alert("Error al cambiar la contraseña", error.message)
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
                        <Text style={styles.title}>Olvideo mi clave 🔐</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Correo"
                            placeholderTextColor="#94a3b8"
                            value={correo}
                            onChangeText={setCorreo}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Nueva Contraseña"
                            placeholderTextColor="#94a3b8"
                            secureTextEntry
                            value={clave}
                            onChangeText={setClave}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Confirmar nueva contraseña"
                            placeholderTextColor="#94a3b8"
                            secureTextEntry
                            value={confirmarClave}
                            onChangeText={setConfirmarClave}
                        />
                    </View>
                    <TouchableOpacity style={styles.registerBtn} onPress={enviarForm}>
                        <Text style={styles.registerText}>Cambiar clave</Text>
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
