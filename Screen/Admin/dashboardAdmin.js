import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../Src/Services/Conexion";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5, FontAwesome6, AntDesign, MaterialCommunityIcons, Entypo } from "@expo/vector-icons";




export default function DashboardScreen({ navigation }) {
  const [usuario, setUsuario] = useState(null)
  const [totalMedicos, setTotalMedicos] = useState("");
  const [totalEspecialidades, setTotalEspecialidades] = useState("");



  useEffect(() => {
    const CargarPerfil = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) {
          await AsyncStorage.multiRemove(["userToken", "rolUser"]);
          Alert.alert("No se encontró el token, redirigiendo al login");
          return;
        }
        const response = await api.get("/me/Admin");
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
    const cargarTotalMedicos = async () => {
          try {
            const response = await api.get("totalMedicos");
            setTotalMedicos(response.data.total);
          } catch (error) {
            Alert.alert(error.response.data.message || "Error al contar los medicos")
          }
    }
    cargarTotalMedicos();

    const cargarTotalEspecialidades = async () => {
          try {
            const response = await api.get("totalEspecialidades");
            setTotalEspecialidades(response.data.total);
          } catch (error) {
            Alert.alert(error.response.data.message || "Error al contar los medicos")
          }
    }
    cargarTotalEspecialidades();
  }, [])



  return (
    <ScrollView style={styles.container}>

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
          <MaterialCommunityIcons name="medical-bag" size={24} color="white" />

          <Text style={styles.summaryNumber}>{totalMedicos}</Text>
          <Text style={styles.summaryText}>Total de medicos</Text>
        </View>

        <View style={styles.summaryCard}>
          <MaterialCommunityIcons name="car-esp" size={24} color="white" />

          <Text style={styles.summaryNumber}>{totalEspecialidades}</Text>
          <Text style={styles.summaryText}>Total de especialidades</Text>
        </View>


      </View>

      {/* Acciones rápidas */}
      <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
      <View style={styles.actionsRow}>
        <TouchableOpacity onPress={() => { navigation.navigate("ListarRecepcionistas") }} style={[styles.actionCard, { backgroundColor: "#2563eb" }]}>

          <FontAwesome6 name="headset" size={22} color="white" />
          <Text style={styles.actionText}>Recepcionistas</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { navigation.navigate("Doctores") }} style={[styles.actionCard, { backgroundColor: "#22c55e" }]}>
          <FontAwesome5 name="briefcase-medical" size={22} color="white" />
          <Text style={styles.actionText}>Doctores</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity onPress={() => { navigation.navigate("Form_personal") }} style={[styles.actionCard, { backgroundColor: "#a855f7", alignContent: "center" }]}>
          <AntDesign name="usergroup-add" size={20} color="white" />

          <Text style={styles.actionText}>Agregar Personal</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity onPress={() => { navigation.navigate("ListarEspecialidades") }} style={[styles.actionCard, { backgroundColor: "#d79032ff", alignContent: "center" }]}>
          <MaterialIcons name="folder-special" size={20} color="white" />

          <Text style={styles.actionText}>Especialidades</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.navigate("FromEspecialidad", { id: "" }) }} style={[styles.actionCard, { backgroundColor: "#ff0df7ff", alignContent: "center" }]}>
          <Entypo name="add-to-list" size={20} color="white" />

          <Text style={styles.actionText}>Agregar ESP</Text>
        </TouchableOpacity>
      </View>





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
    height: 50
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
