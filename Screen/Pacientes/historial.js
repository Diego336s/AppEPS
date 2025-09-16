import React from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function HistorialMedico() {
  const historial = [
    {
      fecha: "2024-01-08 11:00 AM",
      doctor: "Dr. Luis Pérez",
      especialidad: "Oftalmología",
      diagnostico: "Control rutinario - Visión normal",
      tratamiento: "Continuar con cuidados preventivos",
      documento: "Resultados_examen_visual.pdf",
      estado: "Completada",
    },
    {
      fecha: "2023-12-15 3:30 PM",
      doctor: "Dra. Carmen Silva",
      especialidad: "Medicina General",
      diagnostico: "Hipertensión arterial leve",
      tratamiento: "Medicamento antihipertensivo, dieta baja en sodio",
      documento: null,
      estado: "Completada",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Buscador */}
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar en historial médico..."
        placeholderTextColor="#999"
      />

      <ScrollView>
        {historial.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.fecha}>{item.fecha}</Text>
            <Text style={styles.doctor}>{item.doctor}</Text>
            <Text style={styles.especialidad}>{item.especialidad}</Text>

            <Text style={styles.label}>Diagnóstico:</Text>
            <Text style={styles.text}>{item.diagnostico}</Text>

            <Text style={styles.label}>Tratamiento:</Text>
            <Text style={styles.text}>{item.tratamiento}</Text>

            {item.documento && (
              <TouchableOpacity style={styles.docButton}>
                <Ionicons name="document-text-outline" size={20} color="#fff" />
                <Text style={styles.docText}>{item.documento}</Text>
              </TouchableOpacity>
            )}

            {/* Botones */}
            <View style={styles.actions}>
              <TouchableOpacity style={styles.detailButton}>
                <Ionicons name="eye-outline" size={18} color="#fff" />
                <Text style={styles.buttonText}>Ver Detalles</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.downloadButton}>
                <MaterialIcons name="file-download" size={18} color="#fff" />
                <Text style={styles.buttonText}>Descargar</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.estado}>{item.estado}</Text>
          </View>
        ))}
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
  docButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0066cc",
    padding: 8,
    borderRadius: 6,
    marginVertical: 5,
  },
  docText: { color: "#fff", marginLeft: 8 },
  actions: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  detailButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    padding: 8,
    borderRadius: 6,
    flex: 1,
    marginRight: 5,
    justifyContent: "center",
  },
  downloadButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#004080",
    padding: 8,
    borderRadius: 6,
    flex: 1,
    marginLeft: 5,
    justifyContent: "center",
  },
  buttonText: { color: "#fff", marginLeft: 5 },
  estado: {
    marginTop: 10,
    alignSelf: "flex-end",
    color: "lightgreen",
    fontWeight: "bold",
  },
});
