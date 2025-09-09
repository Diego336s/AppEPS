import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { Eye, EyeOff } from "lucide-react-native";

export default function Login() {
  const [formData, setFormData] = useState({ documento: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 👇 Para ejemplo fijo (puedes pasarlo como prop luego)
  const selectedUserType = "recepcionista";

  const getDocumentLabel = () => {
    switch (selectedUserType) {
      case "paciente":
        return "Número de Documento";
      case "doctor":
        return "Código de Médico";
      case "recepcionista":
        return "ID de Usuario";
      default:
        return "Documento";
    }
  };

  const getDocumentPlaceholder = () => {
    switch (selectedUserType) {
      case "paciente":
        return "Cédula o documento de identidad";
      case "doctor":
        return "Código profesional médico";
      case "recepcionista":
        return "ID de empleado";
      default:
        return "Documento";
    }
  };

  const handleLogin = async () => {
    setIsLoading(true);
    // Aquí iría la lógica de login (ej: API call)
    setTimeout(() => {
      setIsLoading(false);
      console.log("Login con:", formData);
    }, 1500);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Acceso para {selectedUserType}</Text>
      <Text style={styles.subtitle}>
        Ingresa tus credenciales para acceder al sistema
      </Text>

      {/* Documento */}
      <Text style={styles.label}>{getDocumentLabel()}</Text>
      <TextInput
        placeholder={getDocumentPlaceholder()}
        value={formData.documento}
        onChangeText={(text) => setFormData({ ...formData, documento: text })}
        style={styles.input}
      />

      {/* Password */}
      <Text style={styles.label}>Contraseña</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Ingresa tu contraseña"
          secureTextEntry={!showPassword}
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          style={[styles.input, { flex: 1 }]}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.iconButton}
        >
          {showPassword ? <EyeOff size={20} color="gray" /> : <Eye size={20} color="gray" />}
        </TouchableOpacity>
      </View>

      {/* Botón */}
      <TouchableOpacity
        disabled={isLoading || !formData.documento || !formData.password}
        onPress={handleLogin}
        style={[
          styles.button,
          (isLoading || !formData.documento || !formData.password) && styles.buttonDisabled,
        ]}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Ingresar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    margin: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
    color: "#222",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    color: "#000",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  iconButton: {
    position: "absolute",
    right: 10,
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#93c5fd",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
