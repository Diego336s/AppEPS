import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashboardScreen from "../../../Screen/Recepcion/dashboardRecepcion";
import BuscarDoctoresScreen from "../../../Screen/Doctores/buscarDocotores";
import HistorialCitas from "../../../Screen/Recepcion/historial";

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
        name="buscarDoctores"
        component={BuscarDoctoresScreen}
        options={{ title: "Doctores" }}
      />

         <Stack.Screen
        name="HistorialCitas"
        component={HistorialCitas}
        options={{ title: "Historial Citas" }}
      />
    </Stack.Navigator>
  );
}
