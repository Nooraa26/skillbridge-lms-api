const express = require('express');
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
const path = require('path');
const authRoutes = require('./auth/authRoutes.js');


// 2. Pasang rute auth ke Express (biasanya diletakkan di bawah inisialisasi app)
app.use('/api/auth', authRoutes);

app.use(express.static(path.join(__dirname, '../public')));

// Panggil koneksi database (tanpa src/)
require('./config/database');

// Import Routes (tanpa src/)
const courseRoutes = require('./routes/course.routes');
const categoryRoutes = require('./routes/category.routes');

// Gunakan Routes
app.use('/api/courses', courseRoutes);
app.use('/api/categories', categoryRoutes);

app.get('/', (req, res) => {
  res.send('Server SkillBridge LMS berjalan!');
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});