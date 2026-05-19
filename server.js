const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/student', require('./routes/studentRoutes'));

app.get('/', (req, res) => res.send('VTOP Backend Running'));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});