import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EnviarCodigo from "../../../Screen/Auth/enviarCodigoDeVerificacion";
import VerificarCodigo from "../../../Screen/Auth/verificarCodigo";
import CambiarClaveOlvidada from "../../../Screen/Auth/cambioDeClaveOlvidada";
import { useRoute } from "@react-navigation/native";


const Stack = createNativeStackNavigator();

export default function OlvideClaveStack() {
    const route = useRoute();
    const {rol} = route.params;
    console.log({rol});
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: "#051038" }, // Color de fondo
                headerTintColor: "#fff", // Color del texto y los íconos (flecha atrás, etc.)
                headerTitleStyle: { fontWeight: "bold" }, // Opcional: estilo del título
            }}
        >
            <Stack.Screen
                name="EnvioDeCodigo"
                component={EnviarCodigo}
                options={{ title: "Codigo de verficacion" }}
            />

            <Stack.Screen
                name="VerificarCodigo"
                component={VerificarCodigo}
                options={{ title: "Verificar codigo" }}
            />
            <Stack.Screen
                name="CambiarClaveOlvidada"
                component={CambiarClaveOlvidada}
                options={{ title: "Cambiar Clave " }}
                initialParams={{rol}}
            />





        </Stack.Navigator>
    );
}
