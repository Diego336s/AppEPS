import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Button,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform
} from "react-native";

import { Fontisto, MaterialIcons, FontAwesome6 } from "@expo/vector-icons";
import { loginPaciente } from "../../Src/Services/AuthService";
import FlashMessage, { showMessage } from "react-native-flash-message";

export default function Login({ navigation }) {
  const [ocultar, setOcultar] = useState(false);
  const [ocultarRoles, setOcultarRoles] = useState(false);
  const [userType, setUserType] = useState("Paciente");
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [esperando, setEsperando] = useState(false);
  const handleLogin = async () => {
    setEsperando(true);
    if (!correo || !clave) {
      showMessage({
        message: "Error ☹️",
        description: "Debes completar todos los campos 😰",
        type: "danger"
      });
      setEsperando(false);
      return;
    }
    try {
      if (userType === "Paciente") {
        const response = await loginPaciente(correo, clave);
        if (response.success) {
          showMessage({
            message: "Bienvenido 😊",
            description: "Inicio de sesion exitoso ✅",
            type: "success"
          });
        } else {
          Alert.alert("Error de Login", response?.message || "ocurrio un error al inicar sesion",);
        }

      }

    } catch (error) {
      console.error("Error inesperado en Login:", error.data.message);
      Alert.alert("Error:", "Ocurrio un error inesperado al intentar iniciar sesion")
    } finally {
      setEsperando(false);
    }
  }





  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.container}>
          <FlashMessage position="top" />
          {!ocultarRoles && (
            <View>
              <Text style={styles.title}>Selecciona el tipo de usuario</Text>

              {/* Botones de roles */}
              <TouchableOpacity
                style={[
                  styles.roleButton,
                  userType === "Paciente" && styles.roleSelected,
                ]}
                onPress={() => {
                  setUserType("Paciente");
                  setOcultar(false);

                }}
              >
                <View style={styles.alinear}>
                  <MaterialIcons name="people" size={24} color="white" />
                  <Text style={styles.roleText}>Pacientes</Text>
                </View>
                <Text style={styles.roleSub}>Acceso para pacientes y familiares</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.roleButton,
                  userType === "Doctor" && styles.roleSelected,
                ]}
                onPress={() => {
                  setUserType("Doctor");
                  setOcultar(true);

                }}
              >


                <View style={styles.alinear}>
                  <FontAwesome6 name="user-doctor" size={24} color="white" />
                  <Text style={styles.roleText}>Doctores</Text>
                </View>

                <Text style={styles.roleSub}>Acceso para médicos especialistas</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.roleButton,
                  userType === "Administradores" && styles.roleSelected,
                ]}
                onPress={() => {
                  setUserType("Administradores");
                  setOcultar(true);

                }}
              >
                <View style={styles.alinear}>
                  <MaterialIcons name="admin-panel-settings" size={24} color="white" />
                  <Text style={styles.roleText}>Administradores</Text>
                </View>

                <Text style={styles.roleSub}>Acceso para administradores del sistema</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.roleButton,
                  userType === "Recepcionista" && styles.roleSelected,
                ]}
                onPress={() => {
                  setUserType("Recepcionista");
                  setOcultar(true);

                }}
              >
                <View style={styles.alinear}>
                  <Fontisto name="headphone" size={24} color="white" />
                  <Text style={styles.roleText}>Recepcionistas</Text>
                </View>

                <Text style={styles.roleSub}>Acceso para personal administrativo</Text>
              </TouchableOpacity>
              <TouchableOpacity disabled={esperando} onPress={() => setOcultarRoles(true)} style={styles.loginBtn}>
                <Text style={styles.loginText}>Ingresar como {userType}</Text>
              </TouchableOpacity>
            </View>
          )}
          {ocultarRoles && (
            <View style={styles.form}>
              {/* Formulario */}
              <Text style={styles.formTitle}>Acceso para {userType}</Text>


              <TextInput
                style={styles.input}
                placeholder="Correo"
                placeholderTextColor="#94a3b8"
                keyboardType="email-address"
                value={correo}
                onChangeText={setCorreo}
              />



              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="#94a3b8"
                secureTextEntry
                value={clave}
                onChangeText={setClave}
              />

              <TouchableOpacity>
                <Text style={styles.forgot}>¿Olvidaste tu contraseña?</Text>
              </TouchableOpacity>

              <TouchableOpacity disabled={esperando} onPress={handleLogin} style={styles.loginBtn}>
                <Text style={styles.loginText}>Iniciar sesion como {userType}</Text>
              </TouchableOpacity>

              {/* Solo mostrar el botón de registro si ocultar es falso */}
              {!ocultar && (
                <View style={styles.registerBtn}>
                  <Button
                    onPress={() => navigation.navigate("Registrar")}
                    title="Registrar Paciente"
                    color="#22c55e"
                  />
                </View>
              )}
              <TouchableOpacity disabled={esperando} onPress={() => setOcultarRoles(false)} style={styles.volverBtn}>
                <Text style={styles.loginText}>Cambiar rol</Text>
              </TouchableOpacity>
            </View>
          )}




        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  alinear: {
    flexDirection: "row",   // Alinea en fila
    alignItems: "center",   // Centra verticalmente
    gap: 8,                 // Espacio entre icono y texto (en RN 0.71+)
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "#0f172a"
  },
  container: {
    flex: 1,
    padding: 50,
  },
  title: {
    paddingTop: 5,
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  roleButton: {
    backgroundColor: "#1e293b",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
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
    marginTop: 3,
  },
  form: {
    backgroundColor: "#1e293b",
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
  },
  formTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#334155",
    color: "white",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 14,
  },
  forgot: {
    color: "#3b82f6",
    fontSize: 13,
    marginBottom: 15,
    textAlign: "right",
  },
  loginBtn: {
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  }, volverBtn: {
    backgroundColor: "#8e9095ff",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  loginText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
  registerBtn: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
});
