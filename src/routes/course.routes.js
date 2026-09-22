const express = require('express');
console.log("-> File course.routes.js BERHASIL dimuat!"); // Tambahkan ini
const router = express.Router();
const courseController = require('../controllers/course.controller');

// Daftarkan semua rute untuk courses di sini:
router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourseById);
router.post('/', courseController.createCourse);     // <-- Pastikan baris ini ada untuk POST
router.put('/:id', courseController.updateCourse);
router.delete('/:id', courseController.deleteCourse);

module.exports = router;