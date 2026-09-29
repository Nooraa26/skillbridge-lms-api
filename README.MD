# Fullstack LMS Backend API

Backend API untuk platform Learning Management System (LMS) yang dibangun menggunakan **Node.js**, **Express**, dan **MySQL** dengan menerapkan arsitektur **MVC (Model-View-Controller)** dan sistem keamanan berbasis **JWT (JSON Web Token)**.

---

## 🚀 Fitur Utama
- **Autentikasi (Auth):** Register user (dengan *hashing* password menggunakan `bcryptjs`) dan Login (menghasilkan JWT *token*).
- **Manajemen Kursus (Courses):** Endpoint CRUD lengkap untuk mengelola data kursus.
- **Middleware Keamanan:** Proteksi rute menggunakan verifikasi Token JWT (`Bearer Token`).
- **Status Code yang Sesuai:** Menggunakan standar `201 Created` untuk pembuatan data baru, `200 OK` untuk sukses umum, serta `401 Unauthorized` / `404 Not Found` untuk penanganan error.

---

## 🛠️ Prasyarat
Pastikan komputer kamu sudah menginstal:
- [Node.js](https://nodejs.org/) (versi LTS direkomendasikan)
- MySQL / XAMPP / Laragon (sebagai server database)
- [Postman](https://www.postman.com/) (untuk pengujian API)

---

## 📥 Cara Instalasi & Menjalankan Project

Ikuti langkah-langkah di bawah ini untuk menjalankan project di komputer lokal:

### 1. Clone atau Ekstrak Project
Buka terminal di dalam folder project backend kamu, lalu jalankan perintah berikut untuk menginstal seluruh dependensi:
```bash
npm install