import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";

const resultadosMock = [
  { id: "1", tipo: "Hemograma Completo", fecha: "2024-01-10", doctor: "Dra. María González", estado: "disponible" },
  { id: "2", tipo: "Radiografía de Tórax", fecha: "2024-01-08", doctor: "Dr. Carlos Ruiz", estado: "disponible" },
  { id: "3", tipo: "Electrocardiograma", fecha: "2024-01-05", doctor: "Dra. Ana Martínez", estado: "disponible" },
  { id: "4", tipo: "Perfil Lipídico", fecha: "2023-12-20", doctor: "Dra. María González", estado: "disponible" },
];

export default function MisResultadosScreen() {
  const [busqueda, setBusqueda] = useState("");

  const resultadosFiltrados = resultadosMock.filter((item) =>
    item.tipo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Mis Resultados</Text>
      <Text style={styles.subtitulo}>Historial médico y exámenes</Text>

      <TextInput
        style={styles.input}
        placeholder="Buscar resultados..."
        placeholderTextColor="#aaa"
        value={busqueda}
        onChangeText={setBusqueda}
      />

      <FlatList
        data={resultadosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitulo}>{item.tipo}</Text>
            <Text style={styles.cardInfo}>{item.fecha}  -  {item.doctor}</Text>
            <TouchableOpacity style={styles.boton}>
              <Text style={styles.botonTexto}>Ver detalles</Text>
            </TouchableOpacity>
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
  cardTitulo: { fontSize: 16, fontWeight: "bold", color: "#fff" },
  cardInfo: { fontSize: 12, color: "#ccc", marginVertical: 5 },
  boton: {
    backgroundColor: "#2563eb",
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  botonTexto: { color: "#fff", fontWeight: "600" },
});
