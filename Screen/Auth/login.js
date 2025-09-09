import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";

export default function LoginScreen() {
  const [userType, setUserType] = useState("Paciente");
  const [documento, setDocumento] = useState("");
  const [password, setPassword] = useState("");
 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tipo de Usuario</Text>

      {/* Botones de roles */}
      <TouchableOpacity
        style={[
          styles.roleButton,
          userType === "Paciente" && styles.roleSelected,
        ]}
        onPress={() => {
            setUserType("Paciente");
           
        }}
      >
        <Text style={styles.roleText}>Pacientes</Text>
        <Text style={styles.roleSub}>Acceso para pacientes y familiares</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.roleButton,
          userType === "Doctor" && styles.roleSelected,
        ]}
        onPress={() => setUserType("Doctor")}
      >
        <Text style={styles.roleText}>Doctores</Text>
        <Text style={styles.roleSub}>Acceso para médicos especialistas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.roleButton,
          userType === "Recepcionista" && styles.roleSelected,
        ]}
        onPress={() =>{
setUserType("Recepcionista");
        } }
      >
        <Text style={styles.roleText}>Recepcionistas</Text>
        <Text style={styles.roleSub}>Acceso para personal administrativo</Text>
      </TouchableOpacity>

      {/* Formulario */}
      <View style={styles.form}>
        <Text style={styles.formTitle}>Acceso para {userType}</Text>

        <TextInput
          style={styles.input}
          placeholder="Cédula o documento de identidad"
          placeholderTextColor="#94a3b8"
          value={documento}
          onChangeText={setDocumento}
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#94a3b8"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Text style={styles.forgot}>¿Olvidaste tu contraseña?</Text>

        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>Ingresar como {userType}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a", // azul oscuro
    padding: 100,
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  roleButton: {
    backgroundColor: "#1e293b",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  roleSelected: {
    backgroundColor: "#2563eb",
  },
  roleText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  roleSub: {
    color: "#cbd5e1",
    fontSize: 12,
  },
  form: {
    backgroundColor: "#1e293b",
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  formTitle: {
    color: "white",
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#334155",
    color: "white",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  forgot: {
    color: "#3b82f6",
    fontSize: 12,
    marginBottom: 15,
    textAlign: "right",
  },
  loginBtn: {
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  loginText: {
    color: "white",
    fontWeight: "bold",
  },
});
