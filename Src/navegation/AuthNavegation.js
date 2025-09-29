import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../../Screen/Auth/login";
import Registrar from "../../Screen/Auth/registrar";
import OlvideClave from"../../Screen/Auth/olvideClave";


const Stack = createNativeStackNavigator();

export default function AuthNavegation(){
    return(
        <Stack.Navigator
           screenOptions={{
        headerStyle: { backgroundColor: "#051038" }, // Color de fondo
        headerTintColor: "#fff", // Color del texto y los íconos (flecha atrás, etc.)
        headerTitleStyle: { fontWeight: "bold" }, // Opcional: estilo del título
      }}>
            <Stack.Screen
            name="Login"
            component={Login}
            options={{title: "Iniciar Sesion"}}
            />              
            <Stack.Screen
            name="Registrar"
            component={Registrar}
            options={{title: "Registro"}}
            />

             <Stack.Screen
            name="OlvideClave"
            component={OlvideClave}
            options={{title: "Olvide mi clave"}}
            />  
        </Stack.Navigator>
    )
}