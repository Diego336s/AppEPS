import {NavigationContainer} from "@react-navigation/native";
import AuthNavegation from "./AuthNavegation"; 
import PacienteNavegacion from "./PacienteNavegacion";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {useState, useEffect, useRef, use} from "react";
import { AppState } from "react-native";

export default  function AppNavegation(){
    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState(null);
    const appState = useRef(AppState.currentState);
    const [rolUser, setRolUser] = useState(null);

    const loadToken = async()=>{
        try {
            const token = await AsyncStorage.getItem("userToken");
            setUserToken(token);
            const rol = await AsyncStorage.getItem("rolUser");
            setRolUser(rol);
        } catch (error) {
            console.error("Error al cargar el token desde AsyncStrorage:", error);
        }finally{
            setIsLoading(false);
        }
    }

    useEffect(()=>{
        loadToken();
        
    },[]);

    useEffect(()=>{
        const handleAppStateChange = (nexAppState)=>{
         if(appState.current.match(/inactive|background/) && nexAppState === "active"){
            console.log("La aplicacion ha vuelto al primer plano, verificando el token...");
            loadToken();
         }
         appState.current = nexAppState;
        }
        const subscription = AppState.addEventListener("change", handleAppStateChange);
    }, []);

    useEffect(()=>{
    const interval = setInterval(()=>{
loadToken();
    }, 2000);
    return ()=> clearInterval(interval);
    }, []);

    return(
        <NavigationContainer>
      {!userToken ? (
        <AuthNavegation/>
      ) : rolUser === "Paciente" ? (
        <PacienteNavegacion />
      ) : rolUser === "Doctor" ? (
        <DoctorNavegacion />
      ) : rolUser === "Admin" ? (
        <AdminNavegacion />
      ): rolUser === "Recepcionista" ? (
        <RecepcionNavegacion/>
      ) : (
        <AuthNavegation /> // fallback en caso de rol desconocido
      )}
    </NavigationContainer>
    )
}