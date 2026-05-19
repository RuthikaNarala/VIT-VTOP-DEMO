const db = require('../config/db');

exports.getProfile = async (req, res) => {
  const { register_number } = req.student;
  try {
    const [student] = await db.query(
      'SELECT * FROM students WHERE register_number = ?',
      [register_number]
    );
    const [hostel] = await db.query(
      'SELECT * FROM hostel_info WHERE register_number = ?',
      [register_number]
    );
    const [proctor] = await db.query(
      'SELECT * FROM proctor_info WHERE register_number = ?',
      [register_number]
    );
    res.json({ student: student[0], hostel: hostel[0], proctor: proctor[0] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};