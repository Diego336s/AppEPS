import {NavigationContainer} from "@react-navigation/native";
import AuthNavegation from "./AuthNavegation"; 

export default  function AppNavegation(){
    return(
        <NavigationContainer>
            <AuthNavegation/>
        </NavigationContainer>
    )
}