import * as SQLite from "expo-sqlite";

export type Note = {
  id: number;
  title: string;
  content: string;
  created_at: string;
};

export async function initializeDatabase(
  db: SQLite.SQLiteDatabase,
) {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

export async function getNotes(
  db: SQLite.SQLiteDatabase,
): Promise<Note[]> {
  return db.getAllAsync<Note>(
    "SELECT * FROM notes ORDER BY id DESC",
  );
}

export async function addNote(
  db: SQLite.SQLiteDatabase,
  title: string,
  content: string,
) {
  return db.runAsync(
    "INSERT INTO notes (title, content) VALUES (?, ?)",
    title,
    content,
  );
}

export async function updateNote(
  db: SQLite.SQLiteDatabase,
  id: number,
  title: string,
  content: string,
) {
  return db.runAsync(
    `UPDATE notes
     SET title = ?, content = ?
     WHERE id = ?`,
    title,
    content,
    id,
  );
}

export async function deleteNote(
  db: SQLite.SQLiteDatabase,
  id: number,
) {
  return db.runAsync("DELETE FROM notes WHERE id = ?", id);
}
