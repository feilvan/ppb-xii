import { FlatList, Text, View } from "react-native";

const siswa = [
  {
    id: "1",
    nama: "Budi",
    kelas: "XII RPL",
  },
  {
    id: "2",
    nama: "Andi",
    kelas: "XII RPL",
  },
  {
    id: "3",
    nama: "Citra",
    kelas: "XII RPL",
  },
];

export default function Layouting() {
  return (
    <View
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
      }}
    >
      <FlatList
        data={siswa}
        renderItem={({ item }) => (
          <Card nama={item.nama} kelas={item.kelas} />
        )}
      />
    </View>
  );
}

function Card({
  nama,
  kelas,
}: {
  nama: string;
  kelas: string;
}) {
  return (
    <View
      style={{
        backgroundColor: "red",
      }}
    >
      <Text>{nama}</Text>
      <Text>{kelas}</Text>
    </View>
  );
}
