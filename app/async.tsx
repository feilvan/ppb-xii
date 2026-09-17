import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Button, Text, View } from "react-native";

export default function Async() {
  const [nama, setNama] = useState("");
  const simpanNama = async () => {
    await AsyncStorage.setItem("nama", "AAAA");
  };

  const ambilNama = async () => {
    await AsyncStorage.getItem("nama", (error, result) => {
      setNama(result ? result : "");
    });
  };

  return (
    <View>
      <Button title="Simpan" onPress={simpanNama} />
      <Button title="Ambil" onPress={ambilNama} />
      <Text>{nama}</Text>
    </View>
  );
}
