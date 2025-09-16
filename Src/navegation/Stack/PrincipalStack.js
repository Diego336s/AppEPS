import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Pacientes_Stack from "./PacientesStack";


const Stack = createNativeStackNavigator()
export default function PrincipalStack(){
   <Stack.Navigator>

    <Stack.Screen
    name="StackPacientes"
    component={Pacientes_Stack}
    options={{headerShown:false}}
    />

   
   </Stack.Navigator>
}


