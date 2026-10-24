import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

interface Barang {
  id: number;
  nama: string;
  jumlah: number;
  harga: number;
}

export default function BarangScreen() {
  const db = useSQLiteContext();

  const [nama, setNama] = useState<string>("");
  const [jumlah, setJumlah] = useState<string>("");
  const [harga, setHarga] = useState<string>("");
  const [barang, setBarang] = useState<Barang[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [msg, setMsg] = useState<string>("");

  async function loadBarang(): Promise<void> {
    const data = await db.getAllAsync<Barang>(
      "SELECT * FROM barang ORDER BY id DESC",
    );
    setBarang(data);
  }

  useEffect((): void => {
    loadBarang().catch(() =>
      // Alert.alert("Error", "Gagal memuat data barang"),
      setMsg("Gagal memuat data barang"),
    );
  }, [db]);

  function resetForm(): void {
    setNama("");
    setJumlah("");
    setHarga("");
    setEditId(null);
  }

  async function simpanBarang(): Promise<void> {
    const n: string = nama.trim();
    const j: number = Number(jumlah);
    const h: number = Number(harga);

    if (!n || !jumlah.trim() || !harga.trim()) {
      // Alert.alert("Validasi", "Semua kolom wajib diisi");
      setMsg("Semua kolom wajib diisi");
      return;
    }

    if (
      !Number.isSafeInteger(j) ||
      j <= 0 ||
      !Number.isFinite(h) ||
      h <= 0
    ) {
      // Alert.alert(
      //   "Validasi",
      //   "Jumlah harus bilangan bulat dan harga harus angka nonnegatif",
      // );
      setMsg(
        "Jumlah harus bilangan bulat dan harga harus angka nonnegatif",
      );
      return;
    }

    try {
      if (editId === null) {
        await db.runAsync(
          "INSERT INTO barang (nama, jumlah, harga) VALUES (?, ?, ?)",
          n,
          j,
          h,
        );
      } else {
        await db.runAsync(
          "UPDATE barang SET nama = ?, jumlah = ?, harga = ? WHERE id = ?",
          n,
          j,
          h,
          editId,
        );
      }

      resetForm();
      await loadBarang();
      // Alert.alert(
      //   "Berhasil",
      //   "Data barang berhasil disimpan",
      // );
      setMsg("");
    } catch {
      // Alert.alert("Error", "Data barang gagal disimpan");
      setMsg("Data barang gagal disimpan");
    }
  }

  function pilihEdit(item: Barang): void {
    setNama(item.nama);
    setJumlah(String(item.jumlah));
    setHarga(String(item.harga));
    setEditId(item.id);
  }

  async function hapusBarang(id: number): Promise<void> {
    try {
      await db.runAsync(
        "DELETE FROM barang WHERE id = ?",
        id,
      );
      await loadBarang();

      if (editId === id) resetForm();
    } catch {
      // Alert.alert("Error", "Data barang gagal dihapus");
      setMsg("Data barang gagal dihapus");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {editId === null ? "Tambah Barang" : "Edit Barang"}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nama barang"
        value={nama}
        onChangeText={setNama}
      />

      <TextInput
        style={styles.input}
        placeholder="Jumlah"
        value={jumlah}
        onChangeText={setJumlah}
        keyboardType="number-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Harga"
        value={harga}
        onChangeText={setHarga}
        keyboardType="decimal-pad"
      />

      <Button
        title={
          editId === null
            ? "Simpan Barang"
            : "Simpan Perubahan"
        }
        onPress={simpanBarang}
      />

      {msg}

      {editId !== null && (
        <Button title="Batal Edit" onPress={resetForm} />
      )}

      <Text style={styles.subtitle}>Daftar Barang</Text>

      <FlatList
        data={barang}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.nama}</Text>
            <Text>Jumlah: {item.jumlah}</Text>
            <Text>Harga: Rp{item.harga}</Text>

            <Button
              title="Edit"
              onPress={() => pilihEdit(item)}
            />
            <Button
              title="Hapus"
              onPress={() => hapusBarang(item.id)}
            />
          </View>
        )}
        ListEmptyComponent={
          <Text>Belum ada data barang.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 24,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  card: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 10,
    gap: 6,
  },
});
