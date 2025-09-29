import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashboardScreen from "../../../Screen/Admin/dashboardAdmin";
import BuscarDoctoresScreen from "../../../Screen/Doctores/buscarDocotores";
import FormPersonal from "../../../Screen/Admin/formPersonal";
import ListarRecepcionista from "../../../Screen/Recepcion/listarRecepcionistas";
import ListarEspecialidadesScreen from "../../../Screen/Especialidades/listarEspecialidades";
import FormEspecialidad from "../../../Screen/Especialidades/formEspecialidades";
import FormPersonalActualizar from "../../../Screen/Admin/formPersonalActualizar";
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
                name="Doctores"
                component={BuscarDoctoresScreen}
                options={{ title: "Doctores" }}
            />
            <Stack.Screen
                name="Form_personal"
                component={FormPersonal}
                options={{ title: "Personal" }}
            />
            <Stack.Screen
                name="ListarRecepcionistas"
                component={ListarRecepcionista}
                options={{ title: "Recepcionistas" }}
            />
               <Stack.Screen
                name="FormActualizarPersonal"
                component={FormPersonalActualizar}
                options={{ title: "Actualizar personal" }}
            />
            <Stack.Screen
        name="ListarEspecialidades"
        component={ListarEspecialidadesScreen}
        options={{ title: "Especialidades" }}
      />

      <Stack.Screen
        name="FromEspecialidad"
        component={FormEspecialidad}
        options={{ title: "Especialidad" }}
      />

        </Stack.Navigator>
    );
}
