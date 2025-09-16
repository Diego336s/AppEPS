import { createNativeStackNavigator } from "@react-navigation/native-stack";
import perfil_paciente from "../../../Screen/Pacientes/perfil_paciente";
import editar_perfil from "../../../Screen/Pacientes/editar_perfil";

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
        name="Perfil paciente"
        component={perfil_paciente}
        options={{ title: "Perfil" }}
      />

      <Stack.Screen
        name="editar_perfil"
        component={editar_perfil}
        options={{ title: "Actualizar perfil" }}
      />
     
    </Stack.Navigator>
  );
}
