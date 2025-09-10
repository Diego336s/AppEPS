import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../../Screen/Auth/login";
import Registrar from "../../Screen/Auth/registrar";
import DashboardPacientes from "../../Screen/Pacientes/dashboardPacientes";

const Stack = createNativeStackNavigator();

export default function AuthNavegation(){
    return(
        <Stack.Navigator>
            <Stack.Screen
            name="Login"
            component={Login}
            options={{title: "Iniciar Sesion"}}
            />
               <Stack.Screen
            name="DasbohoardPacientes"
            component={DashboardPacientes}
            options={{title: "Dasbohoard Pacientes"}}
            />
            <Stack.Screen
            name="Registrar"
            component={Registrar}
            options={{title: "Registrar Paciente"}}
            />
        </Stack.Navigator>
    )
}