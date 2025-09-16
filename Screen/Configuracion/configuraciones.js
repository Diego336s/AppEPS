import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView } from "react-native";
import { useState } from "react";

export default function ConfiguracionesScreen({navigation}) {
  const [notificaciones, setNotificaciones] = useState(true);
  const [temaOscuro, setTemaOscuro] = useState(false);

  return (
    <ScrollView style={styles.container}>
     

      {/* Sección: Cuenta */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Cuenta</Text>
        <TouchableOpacity onPress={()=>navigation.navigate("Cambiar_clave")} style={styles.option}>
          <Text style={styles.optionText}>🔑 Cambiar Contraseña</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("Cambiar_correo")} style={styles.option}>
          <Text style={styles.optionText}>📧 Cambiar Correo</Text>
        </TouchableOpacity>
      </View>

      {/* Sección: Preferencias */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Preferencias</Text>

        <View style={styles.switchOption}>
          <Text style={styles.optionText}>🔔 Notificaciones</Text>
          <Switch
            value={notificaciones}
            onValueChange={setNotificaciones}
            thumbColor={notificaciones ? "#3b82f6" : "#aaa"}
          />
        </View>
        <View style={styles.switchOption}>
          <Text style={styles.optionText}>🌙 Tema Oscuro</Text>
          <Switch
            value={temaOscuro}
            onValueChange={setTemaOscuro}
            thumbColor={temaOscuro ? "#3b82f6" : "#aaa"}
          />
        </View>

     
      </View>

      {/* Sección: Otros */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Otros</Text>
       
        <TouchableOpacity style={styles.option}>
          <Text style={[styles.optionText, { color: "red" }]}>🚪 Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#101828", padding: 16 },
  title: { fontSize: 20, fontWeight: "bold", color: "#fff", marginBottom: 20 },
  card: {
    backgroundColor: "#1f2937",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  sectionTitle: { fontSize: 14, fontWeight: "bold", color: "#3b82f6", marginBottom: 10 },
  option: {
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#333",
  },
  optionText: { fontSize: 14, color: "#fff" },
  switchOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#333",
  },
});
