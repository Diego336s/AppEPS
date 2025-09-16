import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function PerfilScreen({navigation}) {
  const usuario = {
    nombre: "Juan Carlos Rodríguez",
    documento: "12345678",
    fechaNacimiento: "1985-03-15",
    email: "juan.rodriguez@mail.com",
    telefono: "+57 300 123 4567",
    direccion: "Calle 123 #45-67, Bogotá",
  };

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Image
          source={{ uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" }}
          style={styles.avatar}
        />
        <Text style={styles.nombre}>{usuario.nombre}</Text>
        <Text style={styles.documento}>CC: {usuario.documento}</Text>
      </View>

      {/* Información Personal */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Información Personal</Text>
        <Text style={styles.label}>📌 Nombre Completo</Text>
        <Text style={styles.value}>{usuario.nombre}</Text>

        <Text style={styles.label}>🆔 Documento</Text>
        <Text style={styles.value}>{usuario.documento}</Text>

        <Text style={styles.label}>🎂 Fecha de Nacimiento</Text>
        <Text style={styles.value}>{usuario.fechaNacimiento}</Text>
      </View>

      {/* Contacto */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Contacto</Text>
        <Text style={styles.label}>📧 Correo</Text>
        <Text style={styles.value}>{usuario.email}</Text>

        <Text style={styles.label}>📱 Teléfono</Text>
        <Text style={styles.value}>{usuario.telefono}</Text>

        <Text style={styles.label}>🏠 Dirección</Text>
        <Text style={styles.value}>{usuario.direccion}</Text>
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
