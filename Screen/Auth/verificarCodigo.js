import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Alert } from "react-native";
import FlashMessage, { showMessage } from "react-native-flash-message";


import { useRoute } from "@react-navigation/native";
import { verificarCodigo } from "../../Src/Services/AuthService";

export default function verificacionDelCodigo({ navigation }) {
    const route = useRoute();
    const correo = route.params.correo;
    const [cargando, setCargando] = useState(false);

    const [codigo, setCodigo] = useState("");


    const enviarForm = async () => {
        setCargando(true);
        console.log(correo)

        if (!correo || correo === "") {
            Alert.alert("Error correo ❌", "Correo no obtenido");

            navigation.navigate("EnvioDeCodigo");
            setCargando(false);
            return;
        }

        if (codigo === "") {
             Alert.alert("Error codigo ❌", "Debes llenar el campo");
            setCargando(false);
            return;
        }

        if(codigo.length !== 6){
             Alert.alert("Error codigo ❌", "El codigo es de 6 digitos");
            setCargando(false);
            return;
        }



        try {

            const response = await verificarCodigo(correo, codigo);
            if (!response.success) {
                Alert.alert("Error al verificar el codigo ❌", response.message);

                navigation.navigate("EnvioDeCodigo");
                setCargando(false);
                return;
            }
            Alert.alert("Codigo verficado  ✅", response.message)

            navigation.navigate("CambiarClaveOlvidada", { correo: correo });
            setCargando(false);


        } catch (error) {
            Alert.alert("Error inesperado", error.message)
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
                        <Text style={styles.title}>Verificacion del codigo</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Codigo"
                            placeholderTextColor="#94a3b8"
                            keyboardType="phone-pad"
                            value={codigo}
                            onChangeText={setCodigo}
                        />

                    </View>
                    <TouchableOpacity disabled={cargando} style={styles.registerBtn} onPress={enviarForm}>
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
        marginBottom: 30,
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
