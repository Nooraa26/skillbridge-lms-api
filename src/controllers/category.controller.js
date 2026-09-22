const categoryRepository = require('../repositories/category.repository');

class CategoryController {
  // GET /api/categories
  async getAllCategories(req, res) {
    try {
      const categories = await categoryRepository.findAll();
      res.status(200).json({
        success: true,
        message: 'Data kategori berhasil diambil',
        data: categories
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server' });
    }
  }

  // GET /api/categories/{id}
  async getCategoryById(req, res) {
    try {
      const { id } = req.params;
      const category = await categoryRepository.findByIdWithCourses(id);

      if (!category) {
        return res.status(404).json({
          success: false,
          message: 'Data tidak ditemukan'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Detail kategori berhasil diambil',
        data: category
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server' });
    }
  }

  // POST /api/categories
  async createCategory(req, res) {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({
          success: false,
          message: 'Validasi gagal, nama kategori wajib diisi'
        });
      }

      const newId = await categoryRepository.create({ name });

      res.status(201).json({
        success: true,
        message: 'Kategori berhasil ditambahkan',
        data: { id: newId, name }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server' });
    }
  }

  // PUT /api/categories/{id}
  async updateCategory(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const existing = await categoryRepository.findById(id);
      if (!existing) {
        return res.status(404).json({
          success: false,
          message: 'Data tidak ditemukan'
        });
      }

      await categoryRepository.update(id, { name });

      res.status(200).json({
        success: true,
        message: 'Kategori berhasil diupdate',
        data: { id: Number(id), name }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server' });
    }
  }

  // DELETE /api/categories/{id}
  async deleteCategory(req, res) {
    try {
      const { id } = req.params;

      const existing = await categoryRepository.findById(id);
      if (!existing) {
        return res.status(404).json({
          success: false,
          message: 'Data tidak ditemukan'
        });
      }

      // Sesuai instruksi: "Menghapus kategori kursus (jika tidak ada kursus terkait)"
      const courseCount = await categoryRepository.countCoursesByCategoryId(id);
      if (courseCount > 0) {
        return res.status(400).json({
          success: false,
          message: 'Kategori tidak dapat dihapus karena masih ada kursus yang terikat dengan kategori ini'
        });
      }

      await categoryRepository.delete(id);

      res.status(200).json({
        success: true,
        message: 'Kategori berhasil dihapus'
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server' });
    }
  }
}

module.exports = new CategoryController();