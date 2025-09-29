import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashboardScreen from "../../../Screen/Pacientes/dashboardPacientes";
import Form_citas from "../../../Screen/Citas/form_citas";
import Historial from "../../../Screen/Pacientes/historial";
import Form_reprogramar from "../../../Screen/Citas/form_reprogramar_cita";

import BuscarDoctoresScreen from "../../../Screen/Doctores/buscarDocotores";

const Stack = createNativeStackNavigator();

export default function Pacientes_Stack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#051038" }, // Color de fondo
        headerTintColor: "#fff", // Color del texto y los íconos (flecha atrás, etc.)
        headerTitleStyle: { fontWeight: "bold" }, // Opcional: estilo del título
      }}
    >
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ title: "Dashboard" }}
      />

      <Stack.Screen
        name="formCitas"
        component={Form_citas}
        options={{ title: "Agendar cita" }}
      />

      <Stack.Screen
        name="formReprogramar"
        component={Form_reprogramar}
        options={{ title: "Reprogramar Cita" }}
      />     
      <Stack.Screen
        name="buscarDoctores"
        component={BuscarDoctoresScreen}
        options={{ title: "Doctores" }}
      />

       <Stack.Screen
        name="HistorialCitas"
        component={Historial}
        options={{ title: "Historial citas" }}
      />
    </Stack.Navigator>
  );
}

