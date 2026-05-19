const bcrypt = require('bcryptjs');
const mysql  = require('mysql2/promise');
require('dotenv').config();

const STUDENTS = [
  { reg: '23BCE9079', name: 'NARALA RUTHIKA',  password: 'Ruthika@123' },
  { reg: '23BCE7421', name: 'ARJUN MEHTA',     password: 'Arjun@456'   },
  { reg: '23BCS5812', name: 'PRIYA SHARMA',    password: 'Priya@789'   },
];

async function seed() {
  const db = await mysql.createConnection({
    host:     process.env.DB_HOST,
    user:     process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  console.log('Connected to DB. Seeding passwords...\n');

  for (const s of STUDENTS) {
    const hash = await bcrypt.hash(s.password, 10);
    await db.execute(
      'UPDATE students SET password_hash = ? WHERE register_number = ?',
      [hash, s.reg]
    );
    console.log(`✓ ${s.reg} (${s.name}) → hash updated`);
    console.log(`  Plain: ${s.password}`);
    console.log(`  Hash : ${hash}\n`);
  }

  await db.end();
  console.log('Done! All 3 student passwords seeded.');
}

seed().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
