const fs = require('fs');
const mysql = require('mysql2/promise'); // Using promise-based API for async/await

// Create a pool to manage connections to the database
const pool = mysql.createPool({
  host: process.env.DB_SQL_HOST,
  port: process.env.DB_SQL_PORT,
  user: process.env.DB_SQL_USER,
  password: process.env.DB_SQL_PASS,
  database: process.env.DB_SQL_NAME,
  waitForConnections: true, // Whether to queue queries when no connections are available
  connectionLimit: 10, // Maximum number of connections in the pool
  queueLimit: 0, // Maximum number of connection requests the pool will queue
  ssl: {
    // key: fs.readFileSync('./certs/client-key.pem'),
    // cert: fs.readFileSync('./certs/client-cert.pem')
    ca: fs.readFileSync('./resource/certs/ca.pem'),
  },
});

module.exports = { pool };
