const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 3000 ;

app.use(cors());
app.use(express.json());

mongoose.connect('', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Connection error', error));
  
  app.use('/api/forms', require('./routes/forms'));
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });