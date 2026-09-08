import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Index() {
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
        }}
      >
        <Text style={styles.judul}>
          Edit app/index.tsx to edit this screen.
        </Text>
        <Image
          source={{ uri: "https://picsum.photos/200" }}
          style={{ width: 200, height: 200 }}
        />
      </View>
    </ScrollView>
  );
}
