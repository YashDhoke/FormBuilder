const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv') ; 

dotenv.config() ; 


const app = express();
const PORT = process.env.PORT || 3000 ;
const formRoutes = require('./routes/forms');
app.use('/api/forms', formRoutes);
app.use(cors());
app.use(express.json());

mongoose.connect('process.env.MONGODB_URI', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Connection error', error));
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });