import React, { useEffect } from "react"; // ✅ React desde "react"
import { Alert, StyleSheet, View } from "react-native";
import AppNavegation from "./Src/navegation/AppNavegation";

import * as Notificaciones from "expo-notifications";


export default function App() {
  useEffect(() => {
    Notificaciones.setNotificationHandler({
      handleNotification: async () => ({      
        shouldShowBanner: true, // Muestra la notificacion como banner en la parte superior 
        shouldPlaySound: true, // Reproduce sonido de la notificacion
        shouldShowList: true, // No cambia icono de la notificacion
      }),
    });
    const getPermisos = async () => {
      const { status } = await Notificaciones.requestPermissionsAsync();
      
      if (status !== "granted" ) {
      Alert.alert("Se requiren permisos para recibir notificaciones.");
      }
    }
    getPermisos();
  }, []);
  return (
    <AppNavegation />
  );
}


