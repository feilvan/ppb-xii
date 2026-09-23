import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  Note,
  addNote,
  deleteNote,
  getNotes,
  updateNote,
} from "./lib/database";

export default function Sqlite() {
  const db = useSQLiteContext();

  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<number | null>(
    null,
  );

  async function loadNotes() {
    const result = await getNotes(db);
    setNotes(result);
  }

  useEffect(() => {
    loadNotes().catch(console.error);
  }, []);

  async function saveNote() {
    if (!title.trim()) {
      Alert.alert("Error", "Title is required");
      return;
    }

    try {
      if (editingId !== null) {
        await updateNote(
          db,
          editingId,
          title.trim(),
          content.trim(),
        );
      } else {
        await addNote(db, title.trim(), content.trim());
      }

      setTitle("");
      setContent("");
      setEditingId(null);

      await loadNotes();
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Could not save note");
    }
  }

  function editNote(note: Note) {
    setEditingId(note.id);
    setTitle(note.title);
    setContent(note.content);
  }

  async function removeNote(id: number) {
    await deleteNote(db, id);
    await loadNotes();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>SQLite Notes</Text>

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, styles.textarea]}
        placeholder="Content"
        value={content}
        onChangeText={setContent}
        multiline
      />

      <Button
        title={
          editingId !== null ? "Update Note" : "Add Note"
        }
        onPress={saveNote}
      />

      {editingId !== null && (
        <Button
          title="Cancel Edit"
          onPress={() => {
            setEditingId(null);
            setTitle("");
            setContent("");
          }}
        />
      )}

      <FlatList
        style={styles.list}
        data={notes}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={<Text>No notes yet.</Text>}
        renderItem={({ item }) => (
          <View style={styles.note}>
            <Text style={styles.noteTitle}>
              {item.title}
            </Text>

            <Text>{item.content}</Text>

            <View style={styles.actions}>
              <Button
                title="Edit"
                onPress={() => editNote(item)}
              />

              <Button
                title="Delete"
                color="red"
                onPress={() => removeNote(item.id)}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    maxWidth: 700,
    width: "100%",
    alignSelf: "center",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  textarea: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  list: {
    marginTop: 20,
  },
  note: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 12,
    gap: 8,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 12,
  },
});
