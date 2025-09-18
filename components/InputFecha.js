import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function App() {

  const [text, setText] = useState("");


  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      {/* TextInput para mostrar la fecha */}
      <TouchableOpacity onPress={() => setShow(true)}>
        <TextInput
          placeholder="Selecciona una fecha"
          value={text}
          editable={false} // No editable manualmente
          style={{
            borderWidth: 1,
            borderColor: "#aaa",
            padding: 10,
            borderRadius: 8,
          }}
        />
      </TouchableOpacity>

      {/* Date Picker */}
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
}
