import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DashboardPacientes from "../../Screen/Pacientes/dashboardPacientes";
import Perfil_paciente from "../../Screen/Pacientes/perfil_paciente";
import Configuracion from"../../Screen/Configuracion/configuraciones_paciente";
import {FontAwesome6, Ionicons, Feather} from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function NavegacionPrincipal(){
    return(
        <Tab.Navigator
        screenOptions={{
            tabBarStyle:{
                backgroundColor: "#0d0847ff",
                borderTopWidth: 1,
                borderTopColor: "#f4f4f4ff",
                height: 60,
                paddingBottom: 5,
                paddingTop: 5
            },
            tabBarActiveTintColor: "green",
            tabBarInactiveBackgroundColor: "#808080",
            tabBarLabelStyle:{
                fontSize: 12,
                fontWeight: "600",
                marginTop: 2,
            },             
        }}
        >
           
            <Tab.Screen 
            name="Inicio"
            component={DashboardPacientes}
            options={{
                headerShown: false,
                tabBarIcon:({color, size}) =>{
                    <FontAwesome6 name="house" size={size} color={color} />
                }
            }}
            />

                <Tab.Screen 
            name="Perfil"
            component={Perfil_paciente}
            options={{
                headerShown: false,
                tabBarIcon:({color, size}) =>{
                    <Ionicons name="people-circle" size={size} color={color}/>
                }
            }}
            />

          <Tab.Screen 
            name="Configuracion"
            component={Configuracion}
            options={{
                headerShown: false,
                tabBarIcon:({color, size}) =>{
                  <Feather name="settings" size={size} color={color} />
                }
            }}
            />

        </Tab.Navigator>
    )
}