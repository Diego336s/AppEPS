import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, Alert } from "react-native";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { cambiarClave } from "../../Src/Services/AuthService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../Src/Services/Conexion";
export default function Cambiar_clave() {
    const [clave, setClave] = useState("");
    const [confirmarClave, setConfirmarClave] = useState("");
    const [usuario, setUsuario] = useState(null);
    const [rol, setRol] = useState("");
    useEffect(() => {
        const cargarRol = async () => {

            const rolUsuario = await AsyncStorage.getItem("rolUser");
            if (!rolUsuario) {
                showMessage({
                    message: "Error de rol 📞",
                    description: "No se pudo cargar el rol porfavor, volver a iniciar sesion 😰",
                    type: "danger"
                });
                await AsyncStorage.multiRemove(["userToken", "rolUser"]);
            }
            setRol(rolUsuario);

        }
        cargarRol();
    }, [])

    useEffect(() => {
         if(!rol){
      return;
    }
        const CargarPerfil = async () => {
            try {
                const token = await AsyncStorage.getItem("userToken");
                if (!token) {
                    await AsyncStorage.multiRemove(["userToken", "rolUser"]);
                    Alert.alert("No se encontró el token, redirigiendo al login");
                    return;
                }
                const response = await api.get("/me/"+rol);
                setUsuario(response.data);
            } catch (error) {
                console.error("Error al cargar el perfil:", error);
            }
        };

        CargarPerfil();
    }, [rol]);

    const enviarForm = async () => {
        if (clave === "" || confirmarClave === "") {
            showMessage({
                message: "Campos incompletos ☹️",
                description: "Debes rellenar todos los campos",
                type: "danger"
            });
            return;
        }

        if (clave !== confirmarClave) {
            showMessage({
                message: "Error no coinciden 😣",
                description: "Las contraseñas no coinciden",
                type: "danger"
            });
            return;
        }

        if (clave.length < 6 || confirmarClave.length < 6) {
            showMessage({
                message: "Error minimo no alcanzado 😰",
                description: "La contraseña debe tener minimo 6 caracteres",
                type: "danger"
            });
            return;
        }
       
        if(!usuario?.user?.id){
             showMessage({
                message: "Error ID 😰",
                description: "No pudimos encontrar el ID del usuario",
                type: "danger"
            });
            return;
        }       


        try {
            const id = usuario?.user?.id;
            const response = await cambiarClave(clave, id, rol); 
            if(!response.success){
                Alert.alert("Error cambio de clave ☹️",response.message)
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
                        <Text style={styles.title}>Cambiar clave 🔐</Text>
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
