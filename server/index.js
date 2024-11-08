const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const formRoutes = require('./routes/forms');

app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from your frontend
  methods: ['GET', 'POST', 'PUT'], // Allowed methods
}));

app.use(express.json());

// Now use the routes
app.use('/api/forms', formRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Connection error', error));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
