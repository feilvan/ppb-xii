// app/index.tsx
import { Link } from "expo-router";
import { useState } from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Index() {
  const [jumlah, setJumlah] = useState(0);
  const [nama, setNama] = useState("");
  const [simpanNama, setSimpanNama] = useState("");

  const styles = StyleSheet.create({
    judul: {
      fontSize: 28,
      color: "blue",
      fontWeight: "bold",
    },
  });

  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Link href={"/profile"}>Halaman Profile</Link>
        <Text style={styles.judul}>View, Text, Image</Text>
        {/* Gambar pakai URL */}
        <Image
          source={{ uri: "https://picsum.photos/200" }}
          style={{ width: 200, height: 200 }}
        />
        {/* Gambar pakai file lokal */}
        <Image
          source={require("@/assets/images/react-logo.png")}
        />
        <Text style={styles.judul}>State</Text>
        <Text>Jumlah: {jumlah}</Text>
        <Button
          title="Tambah"
          onPress={() => setJumlah(jumlah + 2)}
        />
        <Button
          title="Reset"
          onPress={() => setJumlah(0)}
        />
        <TextInput
          placeholder="Masukkan nama"
          value={nama}
          onChangeText={(text) => setNama(text)}
          style={{ borderColor: "blue", borderWidth: 1 }}
        />
        <Button
          title="Simpan"
          onPress={() => setSimpanNama(nama)}
        />
        <Text>Nama: {simpanNama}</Text>
      </View>
    </ScrollView>
  );
}
