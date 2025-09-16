import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ConfiguracionesScreen from "../../../Screen/Configuracion/configuraciones";
import CambiarClave from "../../../Screen/Configuracion/cambiar_clave";
import CambiarCorreo from "../../../Screen/Configuracion/cambiar_correo";
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
        name="Configuraciones"
        component={ConfiguracionesScreen}
        options={{ title: "Configuraciones" }}
      />

      <Stack.Screen
        name="Cambiar_clave"
        component={CambiarClave}
        options={{ title: "Actualizar clave" }}
      />

      <Stack.Screen
        name="Cambiar_correo"
        component={CambiarCorreo}
        options={{ title: "Actualizar correo" }}
      />

     
    </Stack.Navigator>
  );
}
