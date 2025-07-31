import mysql from "mysql2/promise";
import pg from "pg";
// export const db = mysql.createPool({
//     host: "localhost",
//     user: "root",
//     password: "sanket8088",
//     database: "ameyzingengineer(lms)",
//     /* waitForConnections: true,
//     connectionLimit: 10,
//     maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
//     idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
//     queueLimit: 0,
//     enableKeepAlive: true,
//     keepAliveInitialDelay: 0, */
// });
export const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: true,
    ca: process.env.COCKROACH_CERT // Base64 encoded CA cert
  }
});

// Example usage/test (optional)
db.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('DB error:', err);
  } else {
    console.log('CockroachDB time:', res.rows);
  }
});