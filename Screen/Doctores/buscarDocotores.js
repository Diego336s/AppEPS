import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from "react-native";
import { listarMedicosConEspecialidad } from "../../Src/Services/MedicosService";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function BuscarDoctoresScreen() {

  const [rol, setRol] = useState("");
  const [medicos, setMedicos] = useState([]);
  const [mensaje, setMensaje] = useState(null);
  const [searchText, setSearchText] = useState(""); // 👈 Estado de búsqueda

  useEffect(() => {
    const cargarRol = async () => {
      const rolGuardado = await AsyncStorage.getItem("rolUser");
      setRol(rolGuardado);
    }
    cargarRol();
  }, []);

  useEffect(() => {

    const CargarMedicos = async () => {
      try {
        const response = await listarMedicosConEspecialidad();
        if (response?.message) {
          setMensaje(response?.message);
          setMedicos([]);
          return;
        }
        setMedicos(response?.medicos || []);
      } catch (error) {
        console.error("Error al cargar los doctores: " + error.message);
        Alert.alert("Error, no se puede cargar los doctores.");
      }
    };
    CargarMedicos();
  }, []);

  // 👇 Filtrar médicos según lo escrito
  const doctoresFiltrados = medicos?.filter((item) => {
    const search = searchText.toLowerCase();
    return (
      item?.nombre?.toLowerCase().includes(search) ||
      item?.apellido?.toLowerCase().includes(search) ||
      item?.especialidad?.toLowerCase().includes(search)
    );
  });

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Buscar Doctores</Text>
      <Text style={styles.subtitulo}>Encuentra el especialista ideal</Text>

      <TextInput
        style={styles.input}
        placeholder="Buscar por nombre o especialidad..."
        placeholderTextColor="#aaa"
        value={searchText}
        onChangeText={setSearchText} // 👈 actualiza estado
      />

      {mensaje && <Text style={{ color: "white" }}>{mensaje}</Text>}

      <FlatList
        data={doctoresFiltrados} // 👈 se muestran filtrados
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nombre}>Doc. {item.nombre} {item.apellido}</Text>
            <Text style={styles.especialidad}>{item.especialidad}</Text>
            <Text style={styles.telefono}>{item.telefono}</Text>
            <Text style={styles.telefono}>{item.correo}</Text>
            {rol === "Admin" && (
              <View style={styles.buttonsRow}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("formReprogramar", { id: itemsCita?.id })}
                  style={styles.rescheduleBtn}
                >
                  <Text style={styles.btnText}>Reprogramar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => alertaCancelarCita(item?.id)}
                  style={styles.cancelBtn}
                >
                  <Text style={styles.btnText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            )}

          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#101828", padding: 16 },
  titulo: { fontSize: 20, fontWeight: "bold", color: "#fff" },
  subtitulo: { fontSize: 14, color: "#aaa", marginBottom: 10 },
  input: {
    backgroundColor: "#1e293b",
    padding: 10,
    borderRadius: 8,
    color: "#fff",
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#1f2937",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
  },
  nombre: { fontSize: 16, fontWeight: "bold", color: "#fff" },
  especialidad: { fontSize: 14, color: "#60a5fa", marginBottom: 5 },
  telefono: { fontSize: 14, color: "#c3cbd3ff", marginBottom: 5 },
  botones: { flexDirection: "row", marginTop: 10, justifyContent: "space-between" },
  botonPrimario: { backgroundColor: "#2563eb", padding: 10, borderRadius: 8, flex: 1, marginRight: 5, alignItems: "center" },
  botonSecundario: { backgroundColor: "#334155", padding: 10, borderRadius: 8, flex: 1, marginLeft: 5, alignItems: "center" },
  botonTexto: { color: "#fff", fontWeight: "600" },
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
  }, btnText: {
    color: "white",
    fontWeight: "bold",
  },
});
