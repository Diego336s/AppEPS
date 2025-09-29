import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from "react-native";

import { actualizarPacientes } from "../../Src/Services/PacientesService";
import api from "../../Src/Services/Conexion";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { actualizarAdmin } from "../../Src/Services/AdminService";
import { actualizarDoctor } from "../../Src/Services/MedicosService";
import { actualizarRecepcionista } from "../../Src/Services/RecepcionService";

export default function Editar_perfil({ navigation }) {
  const [usuario, setUsuario] = useState(null);
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [documento, setDocumento] = useState("");
  const [telefono, setTelefono] = useState("");
  const [sexo, setSexo] = useState("");
  const [nacionalidad, setNacionalidad] = useState("");
  const [rh, setRh] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [rol, setRol] = useState("");
  useEffect(() => {
    const cargarRol = async () => {

      const rolUsuario = await AsyncStorage.getItem("rolUser");
      if (!rolUsuario) {
        showMessage({
          message: "Error de rol 📞",
          description: "No se pudo cargar el rol porfavor, volver a iniciar sesion 😰",
          type: "danger"
        });
        await AsyncStorage.multiRemove(["userToken", "rolUser"]);
      }
      setRol(rolUsuario);

    }
    cargarRol();
  }, [])


  useEffect(() => {
    if (!rol) {
      return;
    }
    const CargarPerfil = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) {
          await AsyncStorage.multiRemove(["userToken", "rolUser"]);
          Alert.alert("No se encontró el token, redirigiendo al login");
          return;
        }
        const response = await api.get("/me/" + rol);
        setUsuario(response.data);
      } catch (error) {
        console.error("Error al cargar el perfil:", error);
      }
    };

    CargarPerfil();


  }, [rol]);

  useEffect(() => {

    setNombre(usuario?.user?.nombre);
    setApellido(usuario?.user?.apellido);
    setDocumento(usuario?.user?.documento);
    setTelefono(usuario?.user?.telefono);
    setSexo(usuario?.user?.sexo);
    setNacionalidad(usuario?.user?.nacionalidad);
    setRh(usuario?.user?.rh);
    setFechaNacimiento(usuario?.user?.fecha_nacimiento);
    setId(usuario?.user?.id)
  }, [usuario])

  const enviarForm = async () => {
    if (!nombre || !apellido || !documento || !telefono) {

      showMessage({
        message: "Error ☹️",
        description: "Debes completar todos los campos 😰",
        type: "danger"
      });
      return;
    }


    if (telefono.length !== 10) {
      showMessage({
        message: "Error 📞",
        description: "El numero de telefono esta mal 😰",
        type: "danger"
      });

      return;
    }




    try {
      let response;
      switch (rol) {
        case "Paciente":
          response = await actualizarPacientes(id, nombre, apellido, documento, telefono);
          break;
        case "Doctor":
          response = await actualizarDoctor(id, nombre, apellido, documento, telefono);
          break;
        case "Admin":
          response = await actualizarAdmin(id, nombre, apellido, documento, telefono);
          break;
        case "Recepcionista":
          response = await actualizarRecepcionista(id, nombre, apellido, documento, telefono);
          break;

        default:
          Alert.alert("Error rol", "No pudimos validar tu rol, Inicia Sesion otra vez");
          await AsyncStorage.multiRemove(["userToken", "rolUser"]);
          break;
      }

      if (!response?.success) {
        Alert.alert(response?.message)
        console.log(response?.message);
        return;
      }

      Alert.alert(rol + " Actualizado", response.message);
      navigation.navigate("Perfil_paciente");

    } catch (error) {
      Alert.alert("Error al registrar " + response.message || "Ocurrio un error al actualizar");
      console.log("Error al registrar " + response.message || "Ocurrio un error al actualizar");

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
          <Text style={styles.title}>Actualizar - {rol}</Text>

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              placeholderTextColor="#94a3b8"
              value={nombre}
              onChangeText={setNombre}
            />

            <TextInput
              style={styles.input}
              placeholder="Apellido"
              placeholderTextColor="#94a3b8"
              value={apellido}
              onChangeText={setApellido}
            />




            <TextInput
              style={styles.input}
              placeholder="Teléfono"
              placeholderTextColor="#94a3b8"
              value={telefono}
              keyboardType="phone-pad"
              onChangeText={setTelefono}
            />

            <TextInput
              style={styles.inputNoEditable}
              placeholder="Número de documento"
              placeholderTextColor="#94a3b8"
              value={documento}
              keyboardType="numeric"
              editable={false}
              onChangeText={setDocumento}
            />
            {rol === "Paciente" && (
              <View>
                <TextInput
                  style={styles.inputNoEditable}
                  placeholder="Fecha de nacimiento"
                  placeholderTextColor="#94a3b8"
                  value={fechaNacimiento}
                  onChangeText={setFechaNacimiento}
                  editable={false}
                />
                <TextInput
                  style={styles.inputNoEditable}
                  placeholder="Sexo"
                  placeholderTextColor="#94a3b8"
                  value={sexo === "M" ? "Masculino" : "Femenino"}
                  onChangeText={setSexo}
                  editable={false}
                />
                <TextInput
                  style={styles.inputNoEditable}
                  placeholder="Nacionalidad"
                  placeholderTextColor="#94a3b8"
                  value={nacionalidad}
                  onChangeText={setNacionalidad}
                  editable={false}
                />
                <TextInput
                  style={styles.inputNoEditable}
                  placeholder="Rh"
                  placeholderTextColor="#94a3b8"
                  value={rh}
                  onChangeText={setRh}
                  editable={false}
                />
              </View>
            )}






            <TouchableOpacity style={styles.registerBtn} onPress={enviarForm}>
              <Text style={styles.registerText}>Actualizar {rol}</Text>
            </TouchableOpacity>

            <View style={styles.iniciarSesionBtn}>
              <Button
                onPress={() => navigation.navigate("Perfil_paciente")}
                title="Volver"
              />
            </View>
          </View>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 20,
    justifyContent: "center",
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "#0f172a"
  },
  title: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  form: {
    backgroundColor: "#1e293b",
    padding: 20,
    borderRadius: 10,
  },
  select: {
    backgroundColor: "#334155",
    color: "white",
    borderRadius: 8,
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#334155",
    color: "white",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  inputNoEditable: {
    backgroundColor: "#0f1114ff",
    color: "white",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  registerBtn: {
    backgroundColor: "#16a34a",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  registerText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  iniciarSesionBtn: {
    marginTop: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
});



