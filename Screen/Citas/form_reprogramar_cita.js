import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert,
} from "react-native";
import api from "../../Src/Services/Conexion";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { reprogramarCita, cargarDatosCita } from "../../Src/Services/PacientesService";

export default function ReprogramarCita({ navigation }) {

    const route = useRoute();
    const idCita = route.params.id;


    const [datosCita, setDatosCita] = useState(null);

    const [usuario, setUsuario] = useState(null);

    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState(new Date());
    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

    // Picker Fecha
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const showDatePicker = () => setDatePickerVisibility(true);
    const hideDatePicker = () => setDatePickerVisibility(false);

    const handleConfirm = (date) => {
        const fDate =
            date.getFullYear() +
            "-" +
            (date.getMonth() + 1).toString().padStart(2, "0") +
            "-" +
            date.getDate().toString().padStart(2, "0");
        setFecha(fDate);
        hideDatePicker();
    };

    // Picker Hora
    const [show, setShow] = useState(false);
    useEffect(() => {
        const traerDatos = async () => {
            if (!idCita) return;

            try {
                const response = await cargarDatosCita(idCita);

                if (!response.success) {
                    Alert.alert(response?.message);
                    return;
                }

                const cita = response.cita[0];
                setDatosCita(cita);

                console.log("Datos cita", cita);
            } catch (error) {
                Alert.alert(error?.response?.data?.message || "Error al cargar la fecha y hora de la cita");
            }
        };
        traerDatos();


    }, [idCita]);
    useEffect(() => {
        if (!idCita) return;
        const mostrarDatos = function () {
            setHora(datosCita?.hora_inicio);
            const horaDate = new Date(`1970-01-01T${datosCita?.hora_inicio}`);
            setHora(horaDate);
            setFecha(datosCita?.fecha);
        }

        mostrarDatos();

    }, [datosCita]);

    const [rol, setRol] = useState(null);
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

        const CargarPerfil = async () => {
            if(!rol || rol === null)return;
            try {
                const token = await AsyncStorage.getItem("userToken");
                if (!token) {
                    Alert.alert("No se encontro el token del usuario, redirigiendo al login");
                    return;
                }
                const response = await api.get("/me/" + rol);
                console.log(response.data);
                setUsuario(response.data);
            } catch (error) {
                console.error("Error al cargar el perfil:", error);
                if (error.isAuthError || error.shoulRedirectToLogin) {
                    console.log("Error de autemticacion menejado por el interceptor, redirigiendo al login");
                    return;
                }
                if (error.response) {
                    Alert.alert("Error del servidor:", `Error ${error.response.status} : ${error.response.data?.message || "Ocurrio un error al cargar el perfil"}`,
                        [{
                            text: "OK",
                            onPress: async () => {
                                await AsyncStorage.multiRemove(["userToken", "rolUser"]);
                            }
                        }]
                    )
                } else {
                    Alert.alert(
                        "error",
                        "Ocurrio un error inesperado al cargar el perfil.",
                        [{
                            text: "OK",
                            onPress: async () => {
                                await AsyncStorage.multiRemove(["userToken", "rolUser"]);
                            }
                        }]
                    );
                }
            }
        }
        CargarPerfil();
    }, [])

    const handleAgendarCita = async () => {
        if (!fecha || !hora) {
            showMessage({
                message: "Error ☹️",
                description: "Debes completar todos los campos 😰",
                type: "danger",
            });
            return;
        }

        try {
            // Asegurar que la hora se pasa en Date o formato HH:mm
            const result = await reprogramarCita(
                hora,
                fecha,
                idCita
            );

            if (!result?.success) {
                Alert.alert(result.message);

                return;
            }

            Alert.alert("Reprogramacion exitosa ✅", "La reprogramacion de la cita ha sido exitosa, esperando confirmacion de la recepcion 😊");
            navigation.navigate("Dashboard"); // <-- directo
        } catch (error) {
            showMessage({
                message: "Error en la reservación 😰",
                description: error?.message || "Ocurrió un error al reservar",
                type: "danger",
            });
            console.error(error?.message || "Ocurrió un error al reservar")
        }
    };


    return (
        <ScrollView style={styles.container}>
            <FlashMessage position="top" />
            {/* Encabezado */}

            <Text style={styles.header}>Reprogramar Cita</Text>
            <Text style={styles.subHeader}>
                Coloca la nueva hora y fecha de la cita
            </Text>
            {!mostrarConfirmacion && (
                <View>


                    {/*  Fecha y Hora */}
                    <View style={styles.card}>
                        <Text style={styles.stepTitle}>Fecha y Hora</Text>
                        <TouchableOpacity onPress={showDatePicker}>
                            <TextInput
                                style={styles.input}
                                placeholder="Fecha de la cita"
                                placeholderTextColor="#94a3b8"
                                value={fecha}
                                editable={false}
                            />
                        </TouchableOpacity>

                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                            minimumDate={new Date()}
                        />

                        <TouchableOpacity onPress={() => setShow(true)}>
                            <TextInput
                                style={styles.input}
                                placeholder="Hora de la cita"
                                placeholderTextColor="#aaa"
                                value={
                                    hora
                                        ? hora.toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })
                                        : ""
                                }
                                editable={false}
                            />
                        </TouchableOpacity>

                        {show && (
                            <DateTimePicker
                                value={hora || new Date()} // fallback por si hora está null
                                mode="time"
                                is24Hour={true}
                                display="spinner"
                                onChange={(event, selectedDate) => {
                                    setShow(false);
                                    if (selectedDate) {
                                        setHora(selectedDate);
                                    }
                                }}
                            />
                        )}
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => setMostrarConfirmacion(true)}>
                        <Text style={styles.buttonText}>Agendar Cita</Text>
                    </TouchableOpacity>
                </View>
            )}


            {/* Paso 4 - Confirmar */}
            {mostrarConfirmacion && (
                <View>
                    <View style={styles.card}>
                        <Text style={styles.stepTitle}>4. Confirmar</Text>
                        <Text style={styles.confirmText}>
                            Paciente: {usuario?.user.nombre + " " + usuario?.user.apellido || "-"} {"\n"}
                            Fecha: {fecha || "-"} {"\n"}
                            Hora:{" "}
                            {hora
                                ? hora.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                                : "-"}
                        </Text>
                    </View>

                    <View>
                        <TouchableOpacity
                            style={styles.buttonConfirmar}
                            onPress={handleAgendarCita}
                        >
                            <Text style={styles.buttonText}>Confirmar Cita</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.buttonVolver]} // opcional: distinto color para "Volver"
                            onPress={() => setMostrarConfirmacion(false)}
                        >
                            <Text style={styles.buttonText}>Volver</Text>
                        </TouchableOpacity>
                    </View>



                </View>
            )}






        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#0b1a2e", padding: 16 },
    header: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 4,
        textAlign: "center",
    },
    subHeader: {
        fontSize: 14,
        color: "#bbb",
        marginBottom: 20,
        textAlign: "center",
    },
    card: {
        backgroundColor: "#12263f",
        padding: 16,
        borderRadius: 12,
        marginBottom: 20,
    },
    stepTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 10,
    },
    select: {
        backgroundColor: "#1e3a5f",
        borderRadius: 8,
        padding: 3,
        color: "#fff",
        marginBottom: 12,
    },
    input: {
        backgroundColor: "#1e3a5f",
        borderRadius: 8,
        padding: 10,
        color: "#fff",
        marginBottom: 12,
    },
    confirmText: { color: "#ddd", fontSize: 14, lineHeight: 22 },
    button: {
        backgroundColor: "#1e88e5",
        padding: 14,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 40,
    },
    buttonVolver: {
        backgroundColor: "#665d5dff",
        padding: 14,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 40,
    },
    buttonConfirmar: {
        backgroundColor: "#1e88e5",
        padding: 14,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 15,
    },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
