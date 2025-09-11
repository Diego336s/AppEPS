import {NavigationContainer} from "@react-navigation/native";
import AuthNavegation from "./AuthNavegation"; 
import NavegacionPrincipal from "./NavegacionPrincipal";
import Pacientes_Stack from "./Stack/PacientesStack";

export default  function AppNavegation(){
    return(
        <NavigationContainer>
            <AuthNavegation/>                
        </NavigationContainer>
    )
}