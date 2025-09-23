import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PerfilScreen from "../../../Screen/Perfil/Perfil";
import Editar_perfil from "../../../Screen/Perfil/Editar_perfil";

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
        name="Perfil_paciente"
        component={PerfilScreen}
        options={{ title: "Perfil" }}
      />

      <Stack.Screen
        name="Editar_perfil"
        component={Editar_perfil}
        options={{ title: "Actualizar perfil" }}
      />
     
    </Stack.Navigator>
  );
}
