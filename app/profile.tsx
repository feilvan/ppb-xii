// app/profile.tsx
import { Link, router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Profile() {
  return (
    <View>
      <Text>Ini halaman profile</Text>
      <Link href={"/"}>Kembali</Link>
      <Button
        title="Kembali (router.push())"
        onPress={() => router.push("/")}
      />
      <Button
        title="Kembali (router.back())"
        onPress={() => router.back()}
      />
    </View>
  );
}
