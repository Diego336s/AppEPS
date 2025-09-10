import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

export default function DashboardScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="person-circle" size={50} color="white" />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.welcome}>Bienvenido, Juan</Text>
          <Text style={styles.sub}>CC: 12345678</Text>
        </View>
      </View>

      {/* Resumen rápido */}
      <View style={styles.summaryRow}>
        <View style={styles.summaryCard}>
          <Ionicons name="calendar" size={24} color="white" />
          <Text style={styles.summaryNumber}>5 días</Text>
          <Text style={styles.summaryText}>Próxima Cita</Text>
        </View>

        <View style={styles.summaryCard}>
          <MaterialIcons name="monitor-heart" size={24} color="white" />
          <Text style={styles.summaryNumber}>3</Text>
          <Text style={styles.summaryText}>Citas este mes</Text>
        </View>

        <View style={styles.summaryCard}>
          <Ionicons name="notifications" size={24} color="white" />
          <Text style={styles.summaryNumber}>2</Text>
          <Text style={styles.summaryText}>Recordatorios</Text>
        </View>
      </View>

      {/* Acciones rápidas */}
      <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
      <View style={styles.actionsRow}>
        <TouchableOpacity style={[styles.actionCard, { backgroundColor: "#2563eb" }]}>
          <Ionicons name="add-circle" size={22} color="white" />
          <Text style={styles.actionText}>Nueva Cita</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionCard, { backgroundColor: "#22c55e" }]}>
          <Ionicons name="search" size={22} color="white" />
          <Text style={styles.actionText}>Buscar Doctor</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity style={[styles.actionCard, { backgroundColor: "#3b82f6" }]}>
          <Ionicons name="document-text" size={22} color="white" />
          <Text style={styles.actionText}>Resultados</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionCard, { backgroundColor: "#a855f7" }]}>
          <FontAwesome5 name="heartbeat" size={20} color="white" />
          <Text style={styles.actionText}>Historial</Text>
        </TouchableOpacity>
      </View>

      {/* Próximas citas */}
      <Text style={styles.sectionTitle}>Próximas Citas</Text>
      <View style={styles.appointmentCard}>
        <Text style={styles.doctor}>Dr. María González</Text>
        <Text style={styles.specialty}>Medicina General</Text>
        <Text style={styles.date}>📅 2024-01-15   🕒 10:30 AM</Text>
        <Text style={styles.location}>📍 Consultorio 201</Text>

        <View style={styles.buttonsRow}>
          <TouchableOpacity style={styles.rescheduleBtn}>
            <Text style={styles.btnText}>Reprogramar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelBtn}>
            <Text style={styles.btnText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
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
