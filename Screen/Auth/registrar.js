import React, { useState } from "react";
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
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { registrarPaciente } from "../../Src/Services/AuthService";
import { Picker } from "@react-native-picker/picker";
import FlashMessage, { showMessage } from "react-native-flash-message";

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



  const paises = [
    "Afganistán", "Albania", "Alemania", "Andorra", "Angola", "Antigua y Barbuda",
    "Arabia Saudita", "Argelia", "Argentina", "Armenia", "Australia", "Austria",
    "Azerbaiyán", "Bahamas", "Bangladés", "Barbados", "Baréin", "Bélgica", "Belice",
    "Benín", "Bielorrusia", "Birmania", "Bolivia", "Bosnia y Herzegovina", "Botsuana",
    "Brasil", "Brunéi", "Bulgaria", "Burkina Faso", "Burundi", "Bután", "Cabo Verde",
    "Camboya", "Camerún", "Canadá", "Catar", "Chad", "Chile", "China", "Chipre",
    "Colombia", "Comoras", "Corea del Norte", "Corea del Sur", "Costa de Marfil",
    "Costa Rica", "Croacia", "Cuba", "Dinamarca", "Dominica", "Ecuador", "Egipto",
    "El Salvador", "Emiratos Árabes Unidos", "Eritrea", "Eslovaquia", "Eslovenia",
    "España", "Estados Unidos", "Estonia", "Etiopía", "Filipinas", "Finlandia",
    "Fiyi", "Francia", "Gabón", "Gambia", "Georgia", "Ghana", "Granada", "Grecia",
    "Guatemala", "Guyana", "Guinea", "Guinea-Bisáu", "Guinea Ecuatorial", "Haití",
    "Honduras", "Hungría", "India", "Indonesia", "Irak", "Irán", "Irlanda",
    "Islandia", "Islas Marshall", "Islas Salomón", "Israel", "Italia", "Jamaica",
    "Japón", "Jordania", "Kazajistán", "Kenia", "Kirguistán", "Kiribati", "Kuwait",
    "Laos", "Lesoto", "Letonia", "Líbano", "Liberia", "Libia", "Liechtenstein",
    "Lituania", "Luxemburgo", "Madagascar", "Malasia", "Malaui", "Maldivas", "Malí",
    "Malta", "Marruecos", "Mauricio", "Mauritania", "México", "Micronesia", "Moldavia",
    "Mónaco", "Mongolia", "Montenegro", "Mozambique", "Namibia", "Nauru", "Nepal",
    "Nicaragua", "Níger", "Nigeria", "Noruega", "Nueva Zelanda", "Omán", "Países Bajos",
    "Pakistán", "Palaos", "Panamá", "Papúa Nueva Guinea", "Paraguay", "Perú",
    "Polonia", "Portugal", "Reino Unido", "República Centroafricana", "República Checa",
    "República del Congo", "República Democrática del Congo", "República Dominicana",
    "Ruanda", "Rumania", "Rusia", "Samoa", "San Cristóbal y Nieves", "San Marino",
    "San Vicente y las Granadinas", "Santa Lucía", "Santo Tomé y Príncipe", "Senegal",
    "Serbia", "Seychelles", "Sierra Leona", "Singapur", "Siria", "Somalia", "Sri Lanka",
    "Suazilandia", "Sudáfrica", "Sudán", "Sudán del Sur", "Suecia", "Suiza", "Surinam",
    "Tailandia", "Tanzania", "Tayikistán", "Timor Oriental", "Togo", "Tonga",
    "Trinidad y Tobago", "Túnez", "Turkmenistán", "Turquía", "Tuvalu", "Ucrania",
    "Uganda", "Uruguay", "Uzbekistán", "Vanuatu", "Vaticano", "Venezuela", "Vietnam",
    "Yemen", "Yibuti", "Zambia", "Zimbabue"
  ];

  const tipos = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  // Date Picker
  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (date) => {
    const fDate =
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      date.getDate().toString().padStart(2, "0");

    setFechaNacimiento(fDate);
    hideDatePicker();
  };
  const enviarForm = async () => {
    if (!nombre || !apellido || !documento || !telefono || !fecha_nacimiento || !sexo || !nacionalidad || !rh || !correo || !clave || !confirmPassword) {
      Alert.alert("Error formulario☹️", "Debes completar todos los campos 😰");
      return;
    }

    if (clave !== confirmPassword) {
      Alert.alert("Error contraseña🔒", "Las contraseñas no coninciden 😰")

      return;
    }

    if (!clave.length >= 6 && !confirmPassword.length >= 6) {
      Alert.alert("Error contraseña🔒", "La contraseña debe tener minimo 6 caracteres 😰");

      return;
    }
    if (telefono.length !== 10) {
      Alert.alert("Error Telefono 📞", "El numero de telefono esta mal debe tener 10 digitos 😰");   

      return;
    }




    try {
      const result = await registrarPaciente(nombre, apellido, documento, telefono, fecha_nacimiento, rh, sexo, nacionalidad, correo, clave);
      if (result.success) {
        Alert.alert("Registro exitoso ✅", result.message);
      }
    } catch (error) {
      Alert.alert("Error al registrar", result.message || "Ocurrio un error al registrar")
    }

  }

  return (

    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
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


            <Picker selectedValue={sexo}
              style={styles.select}
              onValueChange={(itemValue) => setSexo(itemValue)
              }>
              <Picker.Item label="-- Selecciona el sexo --" value="" />
              <Picker.Item label="Masculino" value="M" />
              <Picker.Item label="Femenino" value="F" />
            </Picker>


            <Picker
              selectedValue={nacionalidad}
              style={styles.select}
              onValueChange={(itemValue) => setNacionalidad(itemValue)}
            >
              <Picker.Item label="-- Selecciona un país --" value="" />
              {paises.map((p, index) => (
                <Picker.Item key={index} label={p} value={p} />
              ))}
            </Picker>


            <Picker
              selectedValue={rh}
              style={styles.select}
              onValueChange={(itemValue) => setRh(itemValue)}
            >
              <Picker.Item label="-- Selecciona RH --" value="" />
              {tipos.map((t, index) => (
                <Picker.Item key={index} label={t} value={t} />
              ))}
            </Picker>

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
        <FlashMessage position="top" />
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



