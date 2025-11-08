require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const noteRoutes = require('./routes/notes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await connectDB(process.env.MONGO_URI);
  } catch (err) {
    console.error('DB connection failed:', err.message);
    process.exit(1);
  }

  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/notes', noteRoutes);

  app.get('/', (req, res) => res.send('Mock fullstack backend Running'));
  app.use(errorHandler);

  app.listen(PORT, () => console.log(`Server listening ${PORT}`));
})();
