import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateTimePicker from "react-native-modal-datetime-picker";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,

} from "react-native";
import api from "../../Src/Services/Conexion";



export default function NuevaCitaScreen() {

const [cargarEspecialidades, setCargarEspecialidades] = useState([]);
const [cargarMedicosFiltrados, setCargarMedicosFiltrados] = useState([]);
  const [especialidad, setEspecialidad] = useState("");
const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [motivo, setMotivo] = useState("");
  const [doctor, setDoctor] = useState("");
  const [fecha, setFecha] = useState("");
const [hora, setHora] = useState(new Date().toString());

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
      
    setFecha(fDate);
    hideDatePicker();
  };


   
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    setShow(false); // cierra el picker
    if (selectedDate) {
      setHora(selectedDate);
    }
  };


  useEffect(()=>{
    const cargarEspecialidades = async()=>{
       try {
        
        const response = await api.get("/listarEspecialidades");
        console.log(response.data);
        setCargarEspecialidades(response.data);
      } catch (error) {
       
        console.error("Error al cargar las especialidades:", error);
       
      }
    }
    cargarEspecialidades();
  },[])

  const cargarMedicos = async($id_especialidad)=>{
    if($id_especialidad !== ""){
        try {
        
        const response = await api.get("/filtrarMedicosPorEspecialidad/"+$id_especialidad);
        console.log(response.data);
        setCargarMedicosFiltrados(response.data);
      } catch (error) {
        console.error("Error al cargar los medicos :", error);
       
      }
    }else{
       setCargarMedicosFiltrados([]);
     console.log("Debes seleccionar una especialidad");
    }
   
  }

  return (
    <ScrollView style={styles.container}>
      {/* Encabezado */}
      <Text style={styles.header}>Nueva Cita</Text>
      <Text style={styles.subHeader}>Completa todos los pasos en esta página</Text>

      {/* Paso 1 - Especialidad */}
      <View style={styles.card}>
        <Text style={styles.stepTitle}>1. Especialidad</Text>
        <Picker
      
        style={styles.select}
        selectedValue={especialidad}
        onValueChange={(itemValue) => {
       
            cargarMedicos(itemValue);
         
          setEspecialidad(itemValue);      
         
        }}
        >
     <Picker.Item label="-- Selecciona una Especialidad --" value=""/>
      {cargarEspecialidades.map((especialidad, index) =>(
    
        <Picker.Item key={index} label={especialidad?.nombre} value={especialidad?.id} />
       
      ))}

        </Picker>
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
       <Picker
      
        style={styles.select}
        selectedValue={doctor}
        onValueChange={(itemValue) => {
          setDoctor(itemValue)
          
        }}
        >
      
       <Picker.Item label="-- Selecciona una medico --" value=""/>
       {cargarMedicosFiltrados.map((medicos, index) =>(
        <Picker.Item key={index} label={medicos?.nombre+" "+medicos?.apellido} value={medicos?.nombre+" "+medicos?.apellido}/>
       ))}
        </Picker>
      </View>
     

      {/* Paso 3 - Fecha y Hora */}
      <View style={styles.card}>
        <Text style={styles.stepTitle}>3. Fecha y Hora</Text>
        <TouchableOpacity onPress={showDatePicker}>
                 <TextInput
                   style={styles.input}
                   placeholder="Fecha de la cita"
                   placeholderTextColor="#94a3b8"
                   value={fecha}
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
          placeholder="Hora de la cita"
          placeholderTextColor="#aaa"  
               
          onPress={()=>setShow(true)}
        />

         {show && (
       <DateTimePicker
          value={hora}
          mode="time"          // 👈 solo hora
          is24Hour={true}      // 👈 formato 24 horas (pon false si quieres AM/PM)
          display="spinner"    // 👈 prueba con "clock", "spinner", "default"
          onChange={onChange}
        />
      )}
      </View>

      {/* Paso 4 - Confirmar */}
      <View style={styles.card}>
        <Text style={styles.stepTitle}>4. Confirmar</Text>
        <Text style={styles.confirmText}>          
          Motivo: {motivo || "-"} {"\n"}
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
  select: {
    backgroundColor: "#1e3a5f",
    borderRadius: 8,
    padding: 10,
    color: "#fff",
    marginBottom: 12,
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
