const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database.js'); // Pastikan ini menggunakan promise pool/connection

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Semua kolom wajib diisi!" });
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, 10);
        
        // Simpan ke database menggunakan promise
        const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        await db.execute(query, [name, email, passwordHash]);
        
        return res.status(201).json({ success: true, message: "Registrasi berhasil!" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email dan password wajib diisi!" });
        }

        // Cari user berdasarkan email menggunakan promise
        const query = 'SELECT * FROM users WHERE email = ?';
        const [rows] = await db.execute(query, [email]);

        if (rows.length === 0) {
            return res.status(401).json({ success: false, message: "Email atau password salah." });
        }

        const user = rows[0];

        // Cocokkan password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Email atau password salah." });
        }

        // Buat token JWT
        const token = jwt.sign(
            { id: user.id, email: user.email }, 
            process.env.JWT_SECRET || 'rahasia_jwt_kamu', 
            { expiresIn: '1d' }
        );
        
        return res.status(200).json({
            success: true,
            data: {
                token: token, 
                tokenType: 'Bearer',
                user: { id: user.id, name: user.name, email: user.email }
            }
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    register,
    login
};