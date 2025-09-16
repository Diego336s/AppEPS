import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashboardScreen from "../../../Screen/Pacientes/dashboardPacientes";
import CrearCitas from "../../../Screen/Citas/form_citas";
import HistorialPaciente from "../../../Screen/Pacientes/historial";
import MisResultadosScreen from "../../../Screen/Pacientes/resultados";
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
        name="DashboardPacientes"
        component={DashboardScreen}
        options={{ title: "Dashboard" }}
      />

      <Stack.Screen
        name="crearCitas"
        component={CrearCitas}
        options={{ title: "Agendar cita" }}
      />
      <Stack.Screen
        name="historialPaciente"
        component={HistorialPaciente}
        options={{ title: "Historial" }}
      />
      <Stack.Screen
        name="resultadoPacientes"
        component={MisResultadosScreen}
        options={{ title: "Resultados" }}
      />
      <Stack.Screen
        name="buscarDoctores"
        component={BuscarDoctoresScreen}
        options={{ title: "Doctores" }}
      />
    </Stack.Navigator>
  );
}
