import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from "react-native";
import { listarMedicosConEspecialidad } from "../../Src/Services/MedicosService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../Src/Services/Conexion";
import FlashMessage, { showMessage } from "react-native-flash-message";
export default function BuscarDoctoresScreen({navigation}) {

  const [rol, setRol] = useState("");
  const [medicos, setMedicos] = useState([]);
  const [noHayMedicos, setNoHayMedicos] = useState(true);
  const [searchText, setSearchText] = useState(""); // 👈 Estado de búsqueda

  useEffect(() => {
    const cargarRol = async () => {
      const rolGuardado = await AsyncStorage.getItem("rolUser");
      setRol(rolGuardado);
    }
    cargarRol();
  }, []);

  const CargarMedicos = async () => {
    try {
      const response = await listarMedicosConEspecialidad();
      if (!response.success) {
        setNoHayMedicos(true);
        setMedicos([]);
        return;
      }
      setNoHayMedicos(false);
      setMedicos(response?.medicos);
    } catch (error) {
      console.error("Error al cargar los doctores: " + error.message);
      Alert.alert("Error, no se puede cargar los doctores.");
    }
  };
  useEffect(() => {


    CargarMedicos();
  }, []);

  const alertaEliminarMedico = (id) => {

    Alert.alert(
      "Eliminar medico",
      "¿Seguro que quieres eliminar el medico?",
      [
        {
          text: "No", // Texto del botón
          onPress: () => console.log("Cancelado ❌"),
          style: "cancel", // estilo especial para iOS
        },
        {
          text: "Sí",
          onPress: () => {

            // aquí llamas a la función que cancela la cita
            eliminarMedico(id);
          },
        },
      ],
      { cancelable: true } // permite cerrar tocando fuera
    );


  }
  const eliminarMedico = async (id) => {
    if (id === "") {
      Alert.alert("No se a podido obtener el ID del medico, Intenta nuevamente")
    }

    try {
      const response = await api.delete("eliminarMedico/" + id);
      if (!response.data.success) {
        Alert.alert("Error ❌", response?.data.message || "Error al intentar eliminar el medico")
        return;
      }

      showMessage({
        message: "Medico eliminado 🫡",
        description: "El medico a sido eliminado correctamente",
        type: "success"
      });
CargarMedicos();

    } catch (error) {
      const mensaje =
        error?.response?.data?.message ||
        error?.message ||
        "Error interno, intente más tarde";
      Alert.alert("Error", mensaje);
    }

  }

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
       <FlashMessage position="top" />
      <Text style={styles.titulo}>Buscar Doctores</Text>
      <Text style={styles.subtitulo}>Encuentra el especialista ideal</Text>

      <TextInput
        style={styles.input}
        placeholder="Buscar por nombre o especialidad..."
        placeholderTextColor="#aaa"
        value={searchText}
        onChangeText={setSearchText} // 👈 actualiza estado
      />

      {noHayMedicos && (
        <View>
          <Text style={{ color: "white" }}>
            No hay medicos registrados
          </Text>
        </View>
      )}

      <FlatList
        data={doctoresFiltrados} // 👈 se muestran filtrados
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nombre}>Doc. {item.nombre} {item.apellido}</Text>
            <Text style={styles.especialidad}>{item.especialidad}</Text>
            <Text style={styles.telefono}>📞 {item.telefono}</Text>
            <Text style={styles.telefono}>📧 {item.correo}</Text>
            {rol === "Admin" && (
              <View>
                <Text style={styles.telefono}>{item.documento}</Text>
              </View>
            )}
            {rol === "Admin" && (
              <View style={styles.buttonsRow}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("FormActualizarPersonal", { id: item?.id, rol:"Doctor"})}
                  style={styles.rescheduleBtn}
                >
                  <Text style={styles.btnText}>Actualizar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => alertaEliminarMedico(item?.id)}
                  style={styles.cancelBtn}
                >
                  <Text style={styles.btnText}>Eliminar</Text>
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
