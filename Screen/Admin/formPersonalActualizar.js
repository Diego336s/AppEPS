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
import { actualizarRecepcionista } from "../../Src/Services/RecepcionService";
import { actualizarDoctorConEspecialidad } from "../../Src/Services/MedicosService";
import api from "../../Src/Services/Conexion";
import { useRoute } from "@react-navigation/native";
export default function FormPersonal({ navigation }) {

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [documento, setDocumento] = useState("");
    const [telefono, setTelefono] = useState("");
    const [rol, setRol] = useState("");
    const [especialidad, setEspecialidad] = useState("");
    const [cargarEspecialidad, setCargarEspecialidad] = useState([]);
    const [datosMedico, setDatosMedico] = useState(null);

    const route = useRoute();
    const idUser = route.params.id;
    const rolEnviado = route.params.rol;
    useEffect(() => {
        const cargarDatos = async () => {
            if (!idUser || idUser === "") return;
            try {
                let response;
                switch (rolEnviado) {
                    case "Recepcionista":
                        response = await api.get("filtrarRecepcionista/" + idUser);
                        break;
                    case "Doctor":
                        response = await api.get("filtrarMedicoConEspecialidades/" + idUser);
                        break;
                    default:
                        Alert.alert("Rol seleccionado no valido");
                        break;
                }

                if (!response.data.success) {
                    Alert.alert("Error ❌", response.data.message);
                    return;
                }
                console.log("Datos cargados", response.data.user);
                setDatosMedico(response.data.user);

            } catch (error) {
                Alert.alert(error?.response?.data?.message || "Error al los datos del usuario");
            }
        }
        cargarDatos();
    }, [])

    useEffect(() => {
        if (!idUser) return;
        if (!datosMedico || datosMedico === null) return;
        const mostrarDatos = function () {
            let medico;
            if (rolEnviado === "Doctor") {
                medico = datosMedico[0];
            } else if (rolEnviado === "Recepcionista") {
                medico = datosMedico;
            }

            setNombre(medico?.nombre);
            setApellido(medico?.apellido);
            setDocumento(medico?.documento);
            setTelefono(medico?.telefono);
            setRol(rolEnviado);
            setEspecialidad(medico?.idEspecialidad);
        }
        mostrarDatos();

    }, [datosMedico]);
    useEffect(() => {
        const cargarEspecialidades = async () => {
            try {
                const response = await api.get("/listarEspecialidades");
                setCargarEspecialidad(response.data);
            } catch (error) {
                console.error("Error al cargar las especialidades:", error);
            }
        };
        cargarEspecialidades();
    }, [])




    const enviarForm = async () => {
        if (!nombre || !apellido || !documento || !telefono || !rol) {
            Alert.alert("Error ☹️", "Debes completar todos los campos 😰");

            return;
        }



        if (telefono.length !== 10) {
            Alert.alert("Error 📞", "El numero de telefono esta mal 😰");
            return;
        }

        try {
            let response;
            switch (rolEnviado) {
                case "Recepcionista":
                    response = await actualizarRecepcionista(idUser, nombre, apellido, documento, telefono);
                    break;
                case "Doctor":
                    if (especialidad === "" || !especialidad) {
                        Alert.alert("Error ☹️", "Debes seleccionar especialidad 😰");
                        return;
                    }

                    response = await actualizarDoctorConEspecialidad(idUser, especialidad, nombre, apellido, documento, telefono);
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
            Alert.alert("Personal actualizado ✅", response.message);
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
                    <Text style={styles.title}>Registrar - {rolEnviado}</Text>

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



                        <TextInput
                            style={styles.inputNoEditable}
                            placeholder="Rol"
                            placeholderTextColor="#94a3b8"
                            value={rol}

                            onChangeText={setRol}
                            editable={false}
                        />
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





                        <TouchableOpacity style={styles.registerBtn} onPress={() => enviarForm()}>
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
    inputNoEditable: {
        backgroundColor: "#2e333aff",
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



