import dbpool from '../config/dbpool.js'

export function getTransactionConn() {
  return new Promise((resolve, reject) => {
    dbpool.getConnection((err, conn) => {
      if (err) {
        reject(err);
      } else {
        conn.beginTransaction(async (err) => {
          if (err) {
            conn.release();
            reject(err);
          } else {
            resolve(conn);
          }
        });
      }
    });
  });
}

export function getConn() {
  return new Promise((resolve, reject) => {
    dbpool.getConnection((err, conn) => {
      if (err) {
        reject(err);
      } else {
        resolve(conn);
      }
    });
  });
}

export function commitTranAndRelConn(conn) {
  return new Promise((resolve, reject) => {
    conn.commit((err) => {
      if (err) {
        conn.rollback(() => {
          conn.release();
          reject(err);
        });
      } else {
        conn.release();
        resolve();
      }
    });
  });
}

export async function rollbackAndThrowError(conn, error) {
  return new Promise((resolve, reject) => {
    conn.rollback(() => {
      conn.release();
      reject(error);
    });
  });
}

export async function rollbackAndReleseConn(conn) {
  return new Promise((resolve, reject) => {
    conn.rollback(() => {
      conn.release();
      resolve();
    });
  });
}

export function performSqlOperation(conn, data, queryFunction) {
  return new Promise((resolve, reject) => {
    conn.query(queryFunction(data), (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}