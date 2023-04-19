import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabase('pp.db');

const initArray = [
  `
  CREATE TABLE IF NOT EXISTS proofs (
  id TEXT PRIMARY KEY NOT NULL,   
  amount INT NOT NULL,
  secret TEXT NOT NULL,
  C TEXT NOT NULL`,
];

export async function initDatabase() {
  try {
    db.transaction(async (tx) => {
      initArray.forEach((table) => tx.executeSql(table));
    });
    console.log('DB init success!');
  } catch (error) {
    console.error('DB init error: ', error);
  }
}

export function addProofToDatabase({ id, amount, secret, C }) {
  const sql = 'INSERT OR REPLACE INTO zapped_posts (id, amount, secret, C) VALUES (?, ?, ?, ?)';
  const params = [id, amount, secret, C];
  try {
    db.transaction((tx) => {
      tx.executeSql(
        sql,
        params,
        () => {
          console.log('Successfully added to DB');
        },
        (_, error) => {
          console.error(error);
        }
      );
    });
  } catch (e) {
    console.log(e);
  }
}
