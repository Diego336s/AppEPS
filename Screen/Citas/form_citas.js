import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function NuevaCitaScreen() {
  const [especialidad, setEspecialidad] = useState("");
  const [motivo, setMotivo] = useState("");
  const [doctor, setDoctor] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");

  return (
    <ScrollView style={styles.container}>
      {/* Encabezado */}
      <Text style={styles.header}>Nueva Cita</Text>
      <Text style={styles.subHeader}>Completa todos los pasos en esta página</Text>

      {/* Paso 1 - Especialidad */}
      <View style={styles.card}>
        <Text style={styles.stepTitle}>1. Especialidad</Text>
        <TextInput
          style={styles.input}
          placeholder="Selecciona una especialidad"
          placeholderTextColor="#aaa"
          value={especialidad}
          onChangeText={setEspecialidad}
        />
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Describe brevemente el motivo de tu consulta..."
          placeholderTextColor="#aaa"
          multiline
          value={motivo}
          onChangeText={setMotivo}
        />
      </View>

      {/* Paso 2 - Doctor */}
      <View style={styles.card}>
        <Text style={styles.stepTitle}>2. Doctor</Text>
        <TextInput
          style={styles.input}
          placeholder="Selecciona un doctor"
          placeholderTextColor="#aaa"
          value={doctor}
          onChangeText={setDoctor}
        />
      </View>

      {/* Paso 3 - Fecha y Hora */}
      <View style={styles.card}>
        <Text style={styles.stepTitle}>3. Fecha y Hora</Text>
        <TextInput
          style={styles.input}
          placeholder="AAAA-MM-DD"
          placeholderTextColor="#aaa"
          value={fecha}
          onChangeText={setFecha}
        />
        <TextInput
          style={styles.input}
          placeholder="HH:MM"
          placeholderTextColor="#aaa"
          value={hora}
          onChangeText={setHora}
        />
      </View>

      {/* Paso 4 - Confirmar */}
      <View style={styles.card}>
        <Text style={styles.stepTitle}>4. Confirmar</Text>
        <Text style={styles.confirmText}>
          Especialidad: {especialidad || "-"} {"\n"}
          Doctor: {doctor || "-"} {"\n"}
          Fecha: {fecha || "-"} {"\n"}
          Hora: {hora || "-"}
        </Text>
      </View>

      {/* Botón Final */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Agendar Cita</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b1a2e",
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
    textAlign: "center",
  },
  subHeader: {
    fontSize: 14,
    color: "#bbb",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#12263f",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#1e3a5f",
    borderRadius: 8,
    padding: 10,
    color: "#fff",
    marginBottom: 12,
  },
  confirmText: {
    color: "#ddd",
    fontSize: 14,
    lineHeight: 22,
  },
  button: {
    backgroundColor: "#1e88e5",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 40,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
