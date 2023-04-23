import * as SQLite from 'expo-sqlite';
import { store } from '../store/store';
import { hydrateProofs } from '../features/proofs/proofSlice';

export const db = SQLite.openDatabase('pp.db');

const initArray = [
  `
  CREATE TABLE IF NOT EXISTS proofs (
  id TEXT NOT NULL,   
  amount INT NOT NULL,
  secret TEXT NOT NULL,
  C TEXT PRIMARY KEY NOT NULL)`,
];

export function initDatabase() {
  return new Promise((resolve, reject) => {
    db.transaction(async (tx) => {
      initArray.forEach((table) => {
        tx.executeSql(
          table,
          null,
          () => {
            console.log('DB init success!');
            resolve(null);
          },
          (_, error) => {
            console.error(error);
            reject();
            return true;
          },
        );
      });
    });
  });
}

export async function addProofToDatabase({ id, amount, secret, C }) {
  const sql = 'INSERT OR REPLACE INTO proofs (id, amount, secret, C) VALUES (?, ?, ?, ?)';
  const params = [id, amount, secret, C];
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        sql,
        params,
        () => {
          console.log('Successfully added to DB');
          resolve(null);
        },
        (_, error) => {
          console.error(error);
          reject(error);
          return true;
        },
      );
    });
  });
}

export const hydrateStoreFromDatabase = async () => {
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM proofs',
      [],
      (_, { rows: { _array } }) => {
        console.log(_array);
        store.dispatch(hydrateProofs(_array));
      },
      (_, error) => {
        console.log('Error querying users', error);
        return false;
      },
    );
  });
};

export function deleteProofsFromDb(ids) {
  const formattedIds = ids.map((id) => `"${id}"`);
  db.transaction((tx) => {
    tx.executeSql(
      `DELETE from proofs WHERE C in (${formattedIds})`,
      [],
      (_, result) => {
        console.log(result);
      },
      (_, error) => {
        console.log('Error querying users', error);
        return false;
      },
    );
  });
}
