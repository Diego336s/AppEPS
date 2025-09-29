import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashboardScreen from "../../../Screen/Doctores/dashboardDoctores";

import HistorialCitas from "../../../Screen/Doctores/historial";
import BuscarPaciente from "../../../Screen/Pacientes/buscarPaciente";
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
        name="HistorialCitas"
        component={HistorialCitas}
        options={{ title: "Historial Citas" }}
      />

         <Stack.Screen
        name="BuscarPaciente"
        component={BuscarPaciente}
        options={{ title: "Pacientes atendidos" }}
      />
    </Stack.Navigator>
  );
}
