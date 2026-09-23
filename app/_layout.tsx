import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { initializeDatabase } from "./lib/database";

export default function RootLayout() {
  return (
    <SQLiteProvider
      databaseName="notes.db"
      onInit={initializeDatabase}
    >
      <Stack />
    </SQLiteProvider>
  );
}
