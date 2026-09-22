const db = require('../config/database');

class CategoryRepository {
  // Menampilkan semua kategori
  async findAll() {
    const query = `SELECT id, category_name FROM course_categories`;
    const [rows] = await db.execute(query);
    return rows;
  }

  // Menampilkan detail kategori beserta daftar kursus di dalamnya
  async findByIdWithCourses(id) {
    // Ambil data kategori
    const categoryQuery = `SELECT id, category_name FROM course_categories WHERE id = ?`;
    const [categories] = await db.execute(categoryQuery, [id]);
    
    if (categories.length === 0) return null;

    // Ambil daftar kursus yang memiliki category_id ini
    const coursesQuery = `SELECT id, course_name, description, price, quota, level, status FROM courses WHERE category_id = ?`;
    const [courses] = await db.execute(coursesQuery, [id]);

    return {
      ...categories[0],
      courses: courses
    };
  }

  // Mencari kategori berdasarkan ID saja
  async findById(id) {
    const query = `SELECT id, category_name FROM course_categories WHERE id = ?`;
    const [rows] = await db.execute(query, [id]);
    return rows[0];
  }

  // Menambahkan kategori baru
  async create(categoryData) {
    const { name } = categoryData;
    const query = `INSERT INTO course_categories (category_name) VALUES (?)`;
    const [result] = await db.execute(query, [name]);
    return result.insertId;
  }

  // Mengupdate kategori
  async update(id, categoryData) {
    const { name } = categoryData;
    const query = `UPDATE course_categories SET category_name = ? WHERE id = ?`;
    const [result] = await db.execute(query, [name, id]);
    return result.affectedRows;
  }

  // Menghapus kategori
  async delete(id) {
    const query = `DELETE FROM course_categories WHERE id = ?`;
    const [result] = await db.execute(query, [id]);
    return result.affectedRows;
  }

  // Mengecek apakah ada kursus yang menggunakan kategori ini (untuk validasi delete)
  async countCoursesByCategoryId(categoryId) {
    const query = `SELECT COUNT(*) as total FROM courses WHERE category_id = ?`;
    const [rows] = await db.execute(query, [categoryId]);
    return rows[0].total;
  }
}

module.exports = new CategoryRepository();