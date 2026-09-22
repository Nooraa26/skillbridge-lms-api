const mysql = require('mysql2');
require('dotenv').config();

// Membuat koneksi ke database menggunakan pool agar lebih efisien
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'skillbridge_lms',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Mengubah pool agar mendukung async/await (Promise)
const promisePool = pool.promise();

// Test koneksi database
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Gagal terhubung ke database MySQL:', err.message);
  } else {
    console.log('✅ Berhasil terhubung ke database MySQL (skillbridge_lms)');
    connection.release();
  }
});

module.exports = promisePool;