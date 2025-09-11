import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashboardScreen from "../../../Screen/Pacientes/dashboardPacientes";
import CrearCitas  from "../../../Screen/Pacientes/crear_cita";

const Stack = createNativeStackNavigator();

export default function Pacientes_Stack(){
    return(
        <Stack.Navigator>
        <Stack.Screen
        name="DashboardPacientes"
        component={DashboardScreen}
        options={{title: "Dashboard Pacientes"}}
        />

         <Stack.Screen
        name="crearCitas"
        component={CrearCitas}
        options={{title: "Agendar cita"}}
        />
        

        </Stack.Navigator>
    )
}