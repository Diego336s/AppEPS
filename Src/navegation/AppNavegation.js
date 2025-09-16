import {NavigationContainer} from "@react-navigation/native";
import AuthNavegation from "./AuthNavegation"; 
import NavegacionPrincipal from "./NavegacionPrincipal";
import StackPricipalPancientes from "./Stack/PrincipalStack";

export default  function AppNavegation(){
    return(
        <NavigationContainer>
               
               
            <NavegacionPrincipal/>         
        </NavigationContainer>
    )
}