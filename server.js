const express = require('express');
const connectDB = require('./config/db');
const customerRoutes = require('./routes/customerRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const importRoutes = require('./routes/importRoutes');
const errorHandler = require('./middleware/error');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Use routes
app.use('/api/customers', customerRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/import', importRoutes);

// Error handling middleware
app.use(errorHandler);

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Server started on port ${port}`));