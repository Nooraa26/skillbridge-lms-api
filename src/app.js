const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Panggil koneksi database (tanpa src/)
require('./config/database');

app.use(express.json());

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