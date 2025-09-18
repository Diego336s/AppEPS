import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import api from "../../Src/Services/Conexion";

export default function PerfilScreen({navigation}) {
  const [usuario, setUsuario] = useState(null);
const [cargando, setCargando] = useState(true);

  useEffect(()=>{
    const cargarPerfil = async()=>{
      try {
        const token = await AsyncStorage.getItem("userToken");
        if(!token){
          Alert.alert("No se encontro el token del usuario, redirigiendo al login");
          return;
        }
        const response = await api.get("/me");
        console.log(response.data);
        setUsuario(response.data);
      } catch (error) {
        console.error("Error al cargar el perfil:", error);
        if(error.isAuthError || error.shoulRedirectToLogin){
          console.log("Error de autemticacion menejado por el interceptor, redirigiendo al login");
          return;
        }
        if(error.response){
          Alert.alert("Error del servidor:", `Error ${error.response.status} : ${error.response.data?.message || "Ocurrio un error al cargar el perfil"}`,
            [{
              text: "OK",
              onPress: async()=>{
                await AsyncStorage.removeItem("userToken");
              }
            }]
          )
        }else{
          Alert.alert(
            "error",
            "Ocurrio un error inesperado al cargar el perfil.",
            [{
              text: "OK",
              onPress: async()=>{
                await AsyncStorage.removeItem("userToken");
              }
            }]
          );
        }
      }finally{
        setCargando(false);
      }
    }
    cargarPerfil();
  },[]);


  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Image
          source={{ uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" }}
          style={styles.avatar}
        />
        <Text style={styles.nombre}>{usuario.user.nombre}</Text>
        <Text style={styles.documento}>CC: {usuario.documento}</Text>
      </View>

      {/* Información Personal */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Información Personal</Text>
        <Text style={styles.label}>📌 Nombre Completo</Text>
        <Text style={styles.value}>{usuario.user.nombre} {usuario.apellido}</Text>

        <Text style={styles.label}>🆔 Documento</Text>
        <Text style={styles.value}>{usuario.documento}</Text>

        <Text style={styles.label}>🎂 Fecha de Nacimiento</Text>
        <Text style={styles.value}>{usuario.fecha_nacimiento}</Text>
      </View>

      {/* Contacto */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Contacto</Text>
        <Text style={styles.label}>📧 Correo</Text>
        <Text style={styles.value}>{usuario.correo}</Text>

        <Text style={styles.label}>📱 Teléfono</Text>
        <Text style={styles.value}>{usuario.telefono}</Text>
      </View>

      {/* Botón de editar */}
      <TouchableOpacity onPress={()=>{navigation.navigate("editar_perfil")}} style={styles.botonEditar}>
        <Text style={styles.botonTexto}>✏️ Editar Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#101828", padding: 16 },
  header: { alignItems: "center", marginBottom: 20 },
  avatar: { width: 90, height: 90, borderRadius: 50, marginBottom: 10 },
  nombre: { fontSize: 18, fontWeight: "bold", color: "#fff" },
  documento: { fontSize: 14, color: "#aaa" },
  card: {
    backgroundColor: "#1f2937",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  sectionTitle: { fontSize: 16, fontWeight: "bold", color: "#fff", marginBottom: 10 },
  label: { fontSize: 12, fontWeight: "600", color: "#3b82f6", marginTop: 8 },
  value: { fontSize: 14, color: "#ddd" },
  botonEditar: {
    backgroundColor: "#2563eb",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  botonTexto: { color: "#fff", fontWeight: "bold" },
});
