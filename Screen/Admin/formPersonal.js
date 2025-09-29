import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Button,
    Alert,
    ScrollView,
    KeyboardAvoidingView,
    Platform
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { registrarRecepcion } from "../../Src/Services/RecepcionService";
import { registrarDoctor } from "../../Src/Services/MedicosService";
import api from "../../Src/Services/Conexion";
export default function FormPersonal({ navigation }) {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [documento, setDocumento] = useState("");
    const [telefono, setTelefono] = useState("");
    const [rol, setRol] = useState("");
    const [especialidad, setEspecialidad] = useState("");
    const [cargarEspecialidad, setCargarEspecialidad] = useState(null);
    const [correo, setCorreo] = useState("");
    const [clave, setClave] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        const cargarEspecialidades = async () => {
            try {
                const response = await api.get("/listarEspecialidades");
                setCargarEspecialidad(response.data.especialidades);
            } catch (error) {
                console.error("Error al cargar las especialidades:", error);
            }
        };
        cargarEspecialidades();
    }, [])




    const enviarForm = async () => {
        if (!nombre || !apellido || !documento || !telefono || !rol || !correo || !clave || !confirmPassword) {

            showMessage({
                message: "Error ☹️",
                description: "Debes completar todos los campos 😰",
                type: "danger"
            });
            return;
        }

        if (clave !== confirmPassword) {
            showMessage({
                message: "Error 🔒",
                description: "Las contraseñas no coninciden 😰",
                type: "danger"
            });
            return;
        }

        if (!clave.length >= 6 && !confirmPassword.length >= 6) {
            showMessage({
                message: "Error 🔒",
                description: "Las contraseña debe tener minimo 6 caracteres 😰",
                type: "danger"
            });

            return;
        }
        if (telefono.length !== 10) {
            showMessage({
                message: "Error 📞",
                description: "El numero de telefono esta mal 😰",
                type: "danger"
            });

            return;
        }

        try {
            let response;
            switch (rol) {
                case "Recepcionista":
                    response = await registrarRecepcion(nombre, apellido, documento, telefono, correo, clave);
                    break;
                case "Doctor":
                    if (especialidad === "" || !especialidad) {
                        showMessage({
                            message: "Error ☹️",
                            description: "Debes seleccionar especialidad 😰",
                            type: "danger"
                        });
                        return;
                    }
                   
                    response = await registrarDoctor(nombre, apellido, documento, telefono, correo, clave, especialidad);
                    break;
                default:
                    Alert.alert("Rol seleccionado no valido");
                    break;
            }
            if (!response.success) {
                console.log("Algo salio mal en agregar personal");
                Alert.alert("Error de registro ❌", response.message);
                return;
            }
            Alert.alert("Personal Registrado ✅", response.message);
            navigation.navigate("Dashboard");
        } catch (error) {
            Alert.alert("Error al registrar", error.response.message || "Ocurrio un error al registrar")
        }

    }

    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <ScrollView contentContainerStyle={styles.scroll}>

                <View style={styles.container}>
                    <FlashMessage position="top" />
                    <Text style={styles.title}>Registrar personal</Text>

                    <View style={styles.form}>
                        <TextInput
                            style={styles.input}
                            placeholder="Nombre"
                            placeholderTextColor="#94a3b8"
                            value={nombre}
                            onChangeText={setNombre}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Apellido"
                            placeholderTextColor="#94a3b8"
                            value={apellido}
                            onChangeText={setApellido}
                        />


                        <TextInput
                            style={styles.input}
                            placeholder="Número de documento"
                            placeholderTextColor="#94a3b8"
                            value={documento}
                            keyboardType="numeric"
                            onChangeText={setDocumento}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Teléfono"
                            placeholderTextColor="#94a3b8"
                            value={telefono}
                            keyboardType="phone-pad"
                            onChangeText={setTelefono}
                        />



                        <Picker selectedValue={rol}
                            style={styles.select}
                            onValueChange={(itemValue) => {
                                setRol(itemValue)

                            }
                            }>
                            <Picker.Item label="-- Selecciona el rol --" value="" />
                            <Picker.Item label="Recepcionista" value="Recepcionista" />
                            <Picker.Item label="Doctor" value="Doctor" />
                        </Picker>
                        {rol === "Doctor" && (
                            <View>
                                <Picker
                                    style={styles.select}
                                    selectedValue={especialidad}
                                    onValueChange={(itemValue) => {
                                        setEspecialidad(itemValue);
                                    }}
                                >
                                    <Picker.Item label="-- Selecciona una Especialidad --" value="" />
                                    {cargarEspecialidad.map((esp) => (
                                        <Picker.Item key={esp.id} label={esp.nombre} value={esp.id} />
                                    ))}
                                </Picker>
                            </View>
                        )}



                        <TextInput
                            style={styles.input}
                            placeholder="Correo electrónico"
                            placeholderTextColor="#94a3b8"
                            keyboardType="email-address"
                            value={correo}
                            onChangeText={setCorreo}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Contraseña"
                            placeholderTextColor="#94a3b8"
                            secureTextEntry
                            value={clave}
                            onChangeText={setClave}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Confirmar contraseña"
                            placeholderTextColor="#94a3b8"
                            secureTextEntry
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />

                        <TouchableOpacity style={styles.registerBtn} onPress={()=>enviarForm()}>
                            <Text style={styles.registerText}>Enviar</Text>
                        </TouchableOpacity>

                        <View style={styles.iniciarSesionBtn}>
                            <Button
                                onPress={() => navigation.navigate("Dashboard")}
                                title="Volver"
                            />
                        </View>
                    </View>
                </View>
                
            </ScrollView>
        </KeyboardAvoidingView>


    );
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



