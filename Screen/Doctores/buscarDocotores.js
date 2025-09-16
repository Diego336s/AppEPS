import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";

const doctoresMock = [
  {
    id: "1",
    nombre: "Dr. Carlos Ruiz",
    especialidad: "Cardiología",
    calificacion: 4.9,
    resenas: 89,
    hospital: "Hospital Central",
    disponibilidad: "Mañana 10:30 AM",
    experiencia: "12 años",
    tarifa: "$80.000",
    idiomas: ["Español"],
    estado: "Disponible",
  },
  {
    id: "2",
    nombre: "Dra. Patricia Silva",
    especialidad: "Pediatría",
    calificacion: 4.7,
    resenas: 65,
    hospital: "Clínica Norte",
    disponibilidad: "Viernes 3:00 PM",
    experiencia: "8 años",
    tarifa: "$70.000",
    idiomas: ["Español", "Inglés"],
    estado: "No disponible",
  },
];

export default function BuscarDoctoresScreen() {
  const [busqueda, setBusqueda] = useState("");

  const doctoresFiltrados = doctoresMock.filter((doc) =>
    doc.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Buscar Doctores</Text>
      <Text style={styles.subtitulo}>Encuentra el especialista ideal</Text>

      <TextInput
        style={styles.input}
        placeholder="Buscar por nombre, especialidad o ubicación..."
        placeholderTextColor="#aaa"
        value={busqueda}
        onChangeText={setBusqueda}
      />

      <FlatList
        data={doctoresFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nombre}>{item.nombre}</Text>
            <Text style={styles.especialidad}>{item.especialidad}</Text>
            <Text style={styles.info}>⭐ {item.calificacion} ({item.resenas} reseñas)</Text>
            <Text style={styles.info}>🏥 {item.hospital}</Text>
            <Text style={styles.info}>🕒 {item.disponibilidad}</Text>
            <Text style={styles.info}>🎓 {item.experiencia}</Text>
            <Text style={styles.info}>💵 {item.tarifa}</Text>
            <Text style={styles.info}>🌍 Idiomas: {item.idiomas.join(", ")}</Text>
            <Text style={[styles.estado, { color: item.estado === "Disponible" ? "green" : "red" }]}>
              {item.estado}
            </Text>

            <View style={styles.botones}>
              <TouchableOpacity style={styles.botonPrimario}>
                <Text style={styles.botonTexto}>Agendar Cita</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.botonSecundario}>
                <Text style={styles.botonTexto}>Ver Perfil</Text>
              </TouchableOpacity>
            </View>
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
  info: { fontSize: 12, color: "#ccc" },
  estado: { fontSize: 12, fontWeight: "bold", marginTop: 5 },
  botones: { flexDirection: "row", marginTop: 10, justifyContent: "space-between" },
  botonPrimario: { backgroundColor: "#2563eb", padding: 10, borderRadius: 8, flex: 1, marginRight: 5, alignItems: "center" },
  botonSecundario: { backgroundColor: "#334155", padding: 10, borderRadius: 8, flex: 1, marginLeft: 5, alignItems: "center" },
  botonTexto: { color: "#fff", fontWeight: "600" },
});
