import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../Src/Services/Conexion";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { cargarCitasConfirmadasPorPaciente } from "../../Src/Services/PacientesService";
import FlashMessage, { showMessage } from "react-native-flash-message";


export default function DashboardScreen({ navigation }) {
  const [usuario, setUsuario] = useState(null)
  const [citas, setCitas] = useState(null);
  const [noHaycitas, setNohayCitas] = useState(true);
  const [citasEsteMes, setCitasEsteMes] = useState("");
  const [totalCita, setTotalCita] = useState("");

  useEffect(() => {
    const CargarPerfil = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) {
          await AsyncStorage.multiRemove(["userToken", "rolUser"]);
          Alert.alert("No se encontró el token, redirigiendo al login");
          return;
        }
        const response = await api.get("/me/admin");
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

  

  
  const alertaCancelarCita = (id) => {

    Alert.alert(
      "Cancelar Cita",
      "¿Seguro que quieres cancelar la cita?",
      [
        {
          text: "No", // Texto del botón
          onPress: () => console.log("Cancelado ❌"),
          style: "cancel", // estilo especial para iOS
        },
        {
          text: "Sí",
          onPress: () => {
            console.log("Cita cancelada ✅");
            // aquí llamas a la función que cancela la cita
            cancelarCita(id);
          },
        },
      ],
      { cancelable: true } // permite cerrar tocando fuera
    );


  }


  const cancelarCita = async (id) => {
    if (id === "") {
      Alert.alert("No se a podido obtener el ID de la cita, Intenta nuevamente")
    }
    const estado = "Cancelada";
    try {
      const response = await api.post("cancelarCita/" + id, { estado });
      if (!response.data.success) {
        Alert.alert("Error ❌", response?.data.message || "Error al intentar cancelar la cita")
      }

      showMessage({
        message: "Cita cancelada 🫡",
        description: "Su cita ha sido cancelada exitosamente",
        type: "success"
      });
      cargarCitas();

    } catch (error) {
      const mensaje =
        error?.response?.data?.message ||
        error?.message ||
        "Error interno, intente más tarde";
      Alert.alert("Error", mensaje);
    }

  }

  return (
    <ScrollView style={styles.container}>
      <FlashMessage position="top" />
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="person-circle" size={50} color="white" />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.welcome}>Bienvenido, {usuario?.user.nombre}</Text>
          <Text style={styles.sub}>CC: {usuario?.user.documento}</Text>
        </View>
      </View>

      {/* Resumen rápido */}
      <View style={styles.summaryRow}>
        <View style={styles.summaryCard}>
          <MaterialIcons name="monitor-heart" size={24} color="white" />
          <Text style={styles.summaryNumber}>{totalCita}</Text>
          <Text style={styles.summaryText}>Total de citas</Text>
        </View>

        <View style={styles.summaryCard}>

          <Ionicons name="calendar" size={24} color="white" />
          <Text style={styles.summaryNumber}>{citasEsteMes}</Text>
          <Text style={styles.summaryText}>Citas este mes</Text>
        </View>


      </View>

      {/* Acciones rápidas */}
      <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
      <View style={styles.actionsRow}>
        <TouchableOpacity onPress={() => { navigation.navigate("formCitas") }} style={[styles.actionCard, { backgroundColor: "#2563eb" }]}>
          <Ionicons name="add-circle" size={22} color="white" />
          <Text style={styles.actionText}>Nueva Cita</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { navigation.navigate("buscarDoctores") }} style={[styles.actionCard, { backgroundColor: "#22c55e" }]}>
          <Ionicons name="search" size={22} color="white" />
          <Text style={styles.actionText}>Buscar Doctor</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity onPress={() => { navigation.navigate("historialPaciente") }} style={[styles.actionCard, { backgroundColor: "#a855f7" }]}>
          <FontAwesome5 name="heartbeat" size={20} color="white" />
          <Text style={styles.actionText}>Historial citas</Text>
        </TouchableOpacity>
      </View>

      {/* Próximas citas */}<Text style={styles.sectionTitle}>Próximas Citas</Text>
      {noHaycitas && (
        <Text style={{ color: "white" }}>
          No hay citas disponibles
        </Text>
      )}
      {citas && citas.map((itemsCita, index) => (
        <View key={index} style={styles.appointmentCard}>
          <Text style={styles.doctor}>
            Doc. {itemsCita?.nombre_medico} {itemsCita?.apellido_medico}
          </Text>
          <Text style={styles.specialty}>
            {itemsCita?.especialidad}
          </Text>
          <Text style={styles.date}>
            📅 {itemsCita?.fecha} 🕒 {itemsCita?.hora_inicio}
          </Text>
          <Text style={styles.location}>📝 {itemsCita?.descripcion}</Text>

          <View style={styles.buttonsRow}>
            <TouchableOpacity
              onPress={() => navigation.navigate("formReprogramar", { id: itemsCita?.id })}
              style={styles.rescheduleBtn}
            >
              <Text style={styles.btnText}>Reprogramar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => alertaCancelarCita(itemsCita?.id)}
              style={styles.cancelBtn}
            >
              <Text style={styles.btnText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}



    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  welcome: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  sub: {
    color: "#94a3b8",
    fontSize: 14,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryCard: {
    backgroundColor: "#1e293b",
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
  },
  summaryNumber: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
  },
  summaryText: {
    color: "#94a3b8",
    fontSize: 12,
  },
  sectionTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 15,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  actionCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  actionText: {
    color: "white",
    marginLeft: 10,
    fontWeight: "bold",
  },
  appointmentCard: {
    backgroundColor: "#1e293b",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  doctor: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  specialty: {
    color: "#94a3b8",
    fontSize: 14,
    marginBottom: 5,
  },
  date: {
    color: "white",
    fontSize: 14,
    marginBottom: 5,
  },
  location: {
    color: "white",
    fontSize: 14,
    marginBottom: 15,
  },
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
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
  },
});
