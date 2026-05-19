const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { register_number, password } = req.body;
  try {
    const [rows] = await db.query(
      'SELECT * FROM students WHERE register_number = ?',
      [register_number]
    );
    if (!rows.length) return res.status(404).json({ message: 'Student not found' });

    const student = rows[0];
    const match = await bcrypt.compare(password, student.password_hash);
    if (!match) return res.status(401).json({ message: 'Wrong password' });

    const token = jwt.sign(
      { register_number: student.register_number },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );
    res.json({ token, name: student.name });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};