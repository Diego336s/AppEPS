import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, Alert } from "react-native";
import { cargarCitasPorPaciente } from "../../Src/Services/PacientesService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../Src/Services/Conexion";

export default function HistorialMedico() {
  const [usuario, setUsuario] = useState(null);
  const [citas, setCitas] = useState([]);
  const [mensaje, setMensaje] = useState(null);
  const [searchText, setSearchText] = useState(""); // 👈 Estado para el filtro

  useEffect(() => {
    const CargarPerfil = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) {
          await AsyncStorage.multiRemove(["userToken", "rolUser"]);
          Alert.alert("No se encontró el token, redirigiendo al login");
          return;
        }
        const response = await api.get("/me/Paciente");
        setUsuario(response.data);
      } catch (error) {
        console.error("Error al cargar el perfil:", error);
      }
    };

    CargarPerfil();
  }, []);

  useEffect(() => {
    if (!usuario?.user?.documento) return;
    const CargarCitas = async () => {
      try {
        const response = await cargarCitasPorPaciente(usuario.user.documento);
        if (response.message) {
          setMensaje(response.message);
          setCitas([]);
          return;
        }
        setCitas(response.citas || []);
      } catch (error) {
        console.error("Error al cargar las citas: " + error);
        Alert.alert("Error, no se puede cargar las citas del paciente.");
      }
    };
    CargarCitas();
  }, [usuario]);

  // 👇 Filtrar citas según lo escrito
  const filteredCitas = citas.filter((item) => {
    const search = searchText.toLowerCase();
    return (
      item?.fecha?.toLowerCase().includes(search) ||
      item?.nombre_medico?.toLowerCase().includes(search) ||
      item?.apellido_medico?.toLowerCase().includes(search) ||
      item?.especialidad?.toLowerCase().includes(search) ||
      item?.descripcion?.toLowerCase().includes(search) ||
      item?.estado?.toLowerCase().includes(search)
    );
  });

  return (
    <View style={styles.container}>
      {/* Buscador */}
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar cita..."
        placeholderTextColor="#999"
        value={searchText}
        onChangeText={setSearchText} // 👈 actualiza el estado
      />

      <ScrollView>
        {mensaje && <Text style={{ color: "white" }}>{mensaje}</Text>}
        {filteredCitas.length > 0 ? (
          filteredCitas.map((item, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.fecha}>{item?.fecha} - {item?.hora_inicio}</Text>
              <Text style={styles.doctor}>Doc. {item?.nombre_medico} {item.apellido_medico}</Text>
              <Text style={styles.especialidad}>{item?.especialidad}</Text>

              <Text style={styles.label}>Motivo:</Text>
              <Text style={styles.text}>{item?.descripcion}</Text>

              <Text style={styles.label}>Estado:</Text>
              <Text
                style={[
                  styles.text,
                  item?.estado === "Confirmada" && styles.estadoConfirmada,
                  item?.estado === "Cancelada" && styles.estadoCancelada,
                  item?.estado === "Pendiente" && styles.estadoPendiente,
                  item?.estado === "Finalizada" && styles.estadoFinalizada
                ]}
              >
                {item?.estado}
              </Text>
            </View>
          ))
        ) : (
          <Text style={{ color: "white", textAlign: "center" }}>No se encontraron citas</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0c1a2b", padding: 10 },
  searchInput: {
    backgroundColor: "#1e2a3c",
    color: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#1e2a3c",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  fecha: { color: "#fff", fontWeight: "bold", marginBottom: 5 },
  doctor: { color: "#fff", fontSize: 16 },
  especialidad: { color: "#aaa", marginBottom: 10 },
  label: { color: "#00bfff", fontWeight: "bold" },
  text: { color: "#ddd", marginBottom: 5 },
  estadoConfirmada: { marginTop: 10, alignSelf: "flex-end", color: "#2bff00ff", fontWeight: "bold" },
  estadoCancelada: { marginTop: 10, alignSelf: "flex-end", color: "red", fontWeight: "bold" },
  estadoPendiente: { marginTop: 10, alignSelf: "flex-end", color: "#f2fa12ff", fontWeight: "bold" },
  estadoFinalizada: { marginTop: 10, alignSelf: "flex-end", color: "#1c4507ff", fontWeight: "bold" },
});
