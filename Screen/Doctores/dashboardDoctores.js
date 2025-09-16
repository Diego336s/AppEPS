import React from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";

const agendaMock = [
  {
    id: "1",
    paciente: "Dr. María González",
    especialidad: "Medicina General",
    fecha: "2024-01-15",
    hora: "10:30 AM",
    lugar: "Consultorio 201",
    estado: "confirmada",
  },
  {
    id: "2",
    paciente: "Dr. Carlos Ruiz",
    especialidad: "Cardiología",
    fecha: "2024-01-15",
    hora: "11:00 AM",
    lugar: "Consultorio 105",
    estado: "pendiente",
  },
];

export default function DashboardDoctor() {
  return (
    <View style={styles.container}>
      {/* Bienvenida */}
      <View style={styles.header}>
        <Text style={styles.titulo}>Bienvenido, Dr. García</Text>
        <Text style={styles.subtitulo}>Reg: MED-2024-001</Text>
      </View>

      {/* Estadísticas rápidas */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Pacientes Hoy</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>145</Text>
          <Text style={styles.statLabel}>Consultas Mes</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Pendientes</Text>
        </View>
      </View>

      {/* Acciones rápidas */}
      <Text style={styles.seccion}>Acciones Rápidas</Text>
      <View style={styles.quickActions}>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: "#2563eb" }]}>
          <Text style={styles.actionText}>Agenda Médica</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: "#22c55e" }]}>
          <Text style={styles.actionText}>Mis Pacientes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: "#3b82f6" }]}>
          <Text style={styles.actionText}>Historial Clínico</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: "#8b5cf6" }]}>
          <Text style={styles.actionText}>Consultas</Text>
        </TouchableOpacity>
      </View>

      {/* Agenda del día */}
      <Text style={styles.seccion}>Agenda del Día</Text>
      <FlatList
        data={agendaMock}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.paciente}>{item.paciente}</Text>
            <Text style={styles.info}>{item.especialidad}</Text>
            <Text style={styles.info}>📅 {item.fecha} ⏰ {item.hora}</Text>
            <Text style={styles.info}>📍 {item.lugar}</Text>
            <Text style={[styles.estado, { color: item.estado === "confirmada" ? "green" : "orange" }]}>
              {item.estado}
            </Text>

            <View style={styles.botones}>
              <TouchableOpacity style={styles.botonPrimario}>
                <Text style={styles.botonTexto}>Reprogramar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.botonSecundario}>
                <Text style={styles.botonTexto}>Cancelar</Text>
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
  header: { marginBottom: 15 },
  titulo: { fontSize: 20, fontWeight: "bold", color: "#fff" },
  subtitulo: { fontSize: 14, color: "#aaa" },
  statsRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 15 },
  statCard: {
    flex: 1,
    backgroundColor: "#1f2937",
    borderRadius: 10,
    padding: 12,
    marginHorizontal: 5,
    alignItems: "center",
  },
  statNumber: { fontSize: 18, fontWeight: "bold", color: "#fff" },
  statLabel: { fontSize: 12, color: "#aaa" },
  seccion: { fontSize: 16, fontWeight: "bold", color: "#fff", marginVertical: 10 },
  quickActions: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  actionButton: {
    flex: 0.48,
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    alignItems: "center",
  },
  actionText: { color: "#fff", fontWeight: "600" },
  card: {
    backgroundColor: "#1f2937",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
  },
  paciente: { fontSize: 16, fontWeight: "bold", color: "#fff" },
  info: { fontSize: 12, color: "#ccc" },
  estado: { fontSize: 12, fontWeight: "bold", marginTop: 5 },
  botones: { flexDirection: "row", marginTop: 10, justifyContent: "space-between" },
  botonPrimario: { backgroundColor: "#2563eb", padding: 10, borderRadius: 8, flex: 1, marginRight: 5, alignItems: "center" },
  botonSecundario: { backgroundColor: "#dc2626", padding: 10, borderRadius: 8, flex: 1, marginLeft: 5, alignItems: "center" },
  botonTexto: { color: "#fff", fontWeight: "600" },
});
