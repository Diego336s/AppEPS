import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashboardScreen from "../../../Screen/Admin/dashboardAdmin";
import BuscarDoctoresScreen from "../../../Screen/Doctores/buscarDocotores";

const Stack = createNativeStackNavigator();

export default function AdminStack() {
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
        </Stack.Navigator>
    );
}
