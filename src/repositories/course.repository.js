const db = require('../config/database');

class CourseRepository {
  // Mengambil semua data kursus beserta nama kategori dan instrukturnya
  async findAll() {
    const query = `
      SELECT 
        courses.id, 
        courses.course_name, 
        courses.description, 
        courses.price, 
        courses.quota, 
        course_categories.category_name, 
        users.name AS instructor_name
      FROM courses
      INNER JOIN course_categories ON courses.category_id = course_categories.id
      INNER JOIN users ON courses.instructor_id = users.id;
    `;
    const [rows] = await db.execute(query);
    return rows;
  }

  // Mengambil data kursus berdasarkan ID tertentu
  async findById(id) {
    const query = `
      SELECT 
        courses.id, 
        courses.course_name, 
        courses.description, 
        courses.price, 
        courses.quota, 
        course_categories.category_name, 
        users.name AS instructor_name
      FROM courses
      INNER JOIN course_categories ON courses.category_id = course_categories.id
      INNER JOIN users ON courses.instructor_id = users.id
      WHERE courses.id = ?;
    `;
    const [rows] = await db.execute(query, [id]);
    return rows[0];
  }

  // Menambahkan kursus baru ke database (Create)
  async create(courseData) {
    const { course_name, description, price, quota, category_id, instructor_id } = courseData;
    const query = `
      INSERT INTO courses (course_name, description, price, quota, category_id, instructor_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [result] = await db.execute(query, [
      course_name,
      description,
      price || 0,
      quota || 10,
      category_id,
      instructor_id || 1
    ]);
    return result.insertId;
  }

  // Mengubah data kursus berdasarkan ID (Update)
  async update(id, courseData) {
    const { course_name, description, price, quota, category_id, instructor_id } = courseData;
    const query = `
      UPDATE courses 
      SET course_name = ?, description = ?, price = ?, quota = ?, category_id = ?, instructor_id = ?
      WHERE id = ?
    `;
    const [result] = await db.execute(query, [
      course_name,
      description,
      price,
      quota,
      category_id,
      instructor_id,
      id
    ]);
    return result.affectedRows;
  }

  // Menghapus data kursus berdasarkan ID (Delete)
  async delete(id) {
    const query = `DELETE FROM courses WHERE id = ?`;
    const [result] = await db.execute(query, [id]);
    return result.affectedRows;
  }
}

module.exports = new CourseRepository();