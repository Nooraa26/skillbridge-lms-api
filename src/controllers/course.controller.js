const courseRepository = require('../repositories/course.repository');

class CourseController {
  // Menampilkan semua kursus
  async getAllCourses(req, res) {
    try {
      const courses = await courseRepository.findAll();
      res.status(200).json({
        success: true,
        message: 'Berhasil mengambil semua data courses',
        data: courses
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Gagal mengambil data courses' });
    }
  }

  // Menampilkan detail kursus berdasarkan ID
  async getCourseById(req, res) {
    try {
      const { id } = req.params;
      const course = await courseRepository.findById(id);
      
      if (!course) {
        return res.status(404).json({
          success: false,
          message: `Kursus dengan ID ${id} tidak ditemukan`
        });
      }

      res.status(200).json({
        success: true,
        message: `Berhasil mengambil data kursus ID ${id}`,
        data: course
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Gagal mengambil detail kursus' });
    }
  }

  // Menambahkan data kursus
  async createCourse(req, res) {
    try {
      const { course_name, description, price, quota, category_id, instructor_id } = req.body;

      // Validasi field wajib diisi
      if (!course_name || !description || !category_id) {
        return res.status(400).json({
          success: false,
          message: 'Validasi gagal: course_name, description, dan category_id wajib diisi'
        });
      }

      const newId = await courseRepository.create({
        course_name,
        description,
        price: price || 0,
        quota: quota || 10,
        category_id,
        instructor_id: instructor_id || 1
      });

      res.status(201).json({
        success: true,
        message: 'Data kursus berhasil ditambahkan',
        data: { id: newId, ...req.body }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server' });
    }
  }

  // Mengupdate data kursus
  async updateCourse(req, res) {
    try {
      const { id } = req.params;
      const { course_name, description, price, quota, category_id, instructor_id } = req.body;

      // Cek apakah kursus ada
      const existingCourse = await courseRepository.findById(id);
      if (!existingCourse) {
        return res.status(404).json({
          success: false,
          message: 'Data tidak ditemukan'
        });
      }

      const affectedRows = await courseRepository.update(id, {
        course_name: course_name || existingCourse.course_name,
        description: description || existingCourse.description,
        price: price !== undefined ? price : existingCourse.price,
        quota: quota !== undefined ? quota : existingCourse.quota,
        category_id: category_id || existingCourse.category_id,
        instructor_id: instructor_id || existingCourse.instructor_id
      });

      if (affectedRows === 0) {
        return res.status(400).json({
          success: false,
          message: 'Gagal mengupdate data kursus'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Data kursus berhasil diupdate',
        data: { id: Number(id), ...req.body }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server' });
    }
  }

  // Menghapus data kursus
  async deleteCourse(req, res) {
    try {
      const { id } = req.params;

      // Cek apakah kursus ada
      const existingCourse = await courseRepository.findById(id);
      if (!existingCourse) {
        return res.status(404).json({
          success: false,
          message: 'Data tidak ditemukan'
        });
      }

      await courseRepository.delete(id);

      res.status(200).json({
        success: true,
        message: 'Data kursus berhasil dihapus'
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server' });
    }
  }
}

module.exports = new CourseController();