import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Button, Text, View } from "react-native";

export default function Async() {
  const [nama, setNama] = useState({});
  const simpanNama = async () => {
    await AsyncStorage.setItem("nama", "Adi");
  };

  const ambilNama = async () => {
    const data = await AsyncStorage.getItem("nama");
    setNama(data ? data : "");
  };

  return (
    <View>
      <Button title="Simpan" onPress={simpanNama} />
      <Button title="Ambil" onPress={ambilNama} />
      <Text>{String(nama)}</Text>
    </View>
  );
}
