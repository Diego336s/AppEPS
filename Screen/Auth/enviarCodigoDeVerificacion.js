import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Alert } from "react-native";
import FlashMessage, { showMessage } from "react-native-flash-message";



import { enviarCodigoDeVerificacion } from "../../Src/Services/AuthService";

export default function EnvioCodigoDeVerificacion({ navigation }) {

    const [correo, setCorreo] = useState("");
    const [cargando, setCargando] = useState(false);

    const enviarForm = async () => {
        setCargando(true);
        if (correo === "") {
            Alert.alert("Campos incompletos ☹️", "Debes rellenar todos los campos")
            setCargando(false);
            return;
        }



        try {

            const response = await enviarCodigoDeVerificacion(correo);
            if (!response.success) {
                Alert.alert("Error al enviar codigo ❌", response.message)
                setCargando(false);
                return;
            }
            Alert.alert("Codigo enviado ✅", response.message)
           
            navigation.navigate("VerificarCodigo", { correo: correo });
             setCargando(true);
        } catch (error) {
            Alert.alert("Error inesperado ❌", error.message)
        }
    }

    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            < ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.container}>
              
                    <View style={styles.form}>
                        <Text style={styles.title}>Enviar codigo de verficacion 📧</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Correo"
                            placeholderTextColor="#94a3b8"
                            keyboardType="email-address"
                            value={correo}
                            onChangeText={setCorreo}
                        />

                    </View>
                    <TouchableOpacity style={styles.registerBtn} disabled={cargando} onPress={enviarForm}>
                        <Text style={styles.registerText}>Enviar codigo</Text>
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
        marginBottom:30
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
