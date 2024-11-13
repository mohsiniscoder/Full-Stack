const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Add this line
const app = express();
const PORT = 5000;

// Use CORS middleware to allow requests from your React app
app.use(cors()); // Enable CORS for all routes

// Middleware to parse JSON data
app.use(express.json());

// MongoDB Connection
const mongoURI = 'mongodb+srv://mohsinbhai894:mohsinisgood666@cluster0.fdiqf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';


// Connect to MongoDB Atlas
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB Atlas:', err);
  });
/*mongoose.connect('mongodb://localhost:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection error:', err));
*/
// Basic Route for Root Path
app.get('/', (req, res) => {
  res.send('Welcome to the Ecommerce App!');
});

// Routes
const authRoutes = require('./routes/auth'); // Importing auth routes
app.use('/auth', authRoutes);

const productRoutes = require('./routes/product'); // Importing product routes
app.use('/products', productRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
