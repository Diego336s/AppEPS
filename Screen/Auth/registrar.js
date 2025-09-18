import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
  Alert,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { registrarPaciente } from "../../Src/Services/AuthService";

export default function RegisterPatientScreen({ navigation }) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [documento, setDocumento] = useState("");
  const [telefono, setTelefono] = useState("");
  const [sexo, setSexo] = useState("");
  const [nacionalidad, setNacionalidad] = useState("");
  const [rh, setRh] = useState("");
  const [fecha_nacimiento, setFechaNacimiento] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Date Picker
  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (date) => {
    const fDate =
      date.getDate().toString().padStart(2, "0")+
      "/" +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "/" +
      date.getFullYear() ;
      
    setFechaNacimiento(fDate);
    hideDatePicker();
  };
  const enviarForm = async()=>{
    
    if(clave !== confirmPassword){
      Alert.alert("Las contraseñas no coninciden");
      return;
    }

     if(!clave.length >= 6 &&  !confirmPassword.length >= 6){
      Alert.alert("Las contraseña debe tener minimo 6 caracteres");
      return;
    }

    if(!nombre || !apellido || !documento || !telefono || !fecha_nacimiento || !sexo || !nacionalidad || !rh || !correo || !clave || !confirmPassword){
       Alert.alert("Debes completar todos los campos");
      return;
    }

   
    try {
       const result = await registrarPaciente(nombre, apellido, documento,  fecha_nacimiento, telefono, rh, sexo, nacionalidad,  correo, clave);
    if(result.success){
      Alert.alert(result.message);
    }
    } catch (error) {
      Alert.alert("Error al registrar", result.message || "Ocurrio un error al registrar")
    }
   
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Paciente</Text>

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
          placeholder="Número de documento"
          placeholderTextColor="#94a3b8"
          value={documento}
          keyboardType="numeric"
          onChangeText={setDocumento}
        />

        <TextInput
          style={styles.input}
          placeholder="Teléfono"
          placeholderTextColor="#94a3b8"
          value={telefono}
          keyboardType="phone-pad"
          onChangeText={setTelefono}
        />

        {/* FECHA DE NACIMIENTO */}
        <TouchableOpacity onPress={showDatePicker}>
          <TextInput
            style={styles.input}
            placeholder="Fecha de nacimiento"
            placeholderTextColor="#94a3b8"
            value={fecha_nacimiento}
            editable={false}
          />
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />

    

        <TextInput
          style={styles.input}
          placeholder="Sexo (M/F)"
          placeholderTextColor="#94a3b8"
          value={sexo}
          onChangeText={setSexo}
        />

        <TextInput
          style={styles.input}
          placeholder="Nacionalidad"
          placeholderTextColor="#94a3b8"
          value={nacionalidad}
          onChangeText={setNacionalidad}
        />

        <TextInput
          style={styles.input}
          placeholder="RH (Ej: O+, A-, B+)"
          placeholderTextColor="#94a3b8"
          value={rh}
          onChangeText={setRh}
        />

        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
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

        <TextInput
          style={styles.input}
          placeholder="Confirmar contraseña"
          placeholderTextColor="#94a3b8"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.registerBtn} onPress={enviarForm}>
          <Text style={styles.registerText}>Registrar Paciente</Text>
        </TouchableOpacity>

        <View style={styles.iniciarSesionBtn}>
          <Button
            onPress={() => navigation.navigate("Login")}
            title="Iniciar sesión"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 20,
    justifyContent: "center",
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
  input: {
    backgroundColor: "#334155",
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
