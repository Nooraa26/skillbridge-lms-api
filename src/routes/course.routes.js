const express = require('express');
console.log("-> File course.routes.js BERHASIL dimuat!");
const router = express.Router();
const courseController = require('../controllers/course.controller');

// Semua rute course kini bebas diakses publik (tanpa middleware authenticate)
router.get('/', courseController.getAllCourses);  //mengambil semua data
router.get('/:id', courseController.getCourseById); // mengambil data dg id
router.post('/', courseController.createCourse); // menambah data baru   
router.put('/:id', courseController.updateCourse); // mengubah data
router.delete('/:id', courseController.deleteCourse); // menghapus data

module.exports = router;