require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User'); // adjust the path to your User model
const userController = require('../controllers/userController'); // adjust the path to your userController

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('MongoDB connected...');

        // Check if the default user already exists
        const defaultUser = await User.findOne({ email: process.env.DEFAULT_USER_EMAIL });

        if (!defaultUser) {
            // If the default user doesn't exist, create it
            await userController.createUser({
                body: {
                    email: process.env.DEFAULT_USER_EMAIL,
                    password: process.env.DEFAULT_USER_PASSWORD,
                }
            }, {
                status: (status) => ({ json: (result) => console.log(`Default user created with status ${status}`) }),
                json: (result) => console.log(`Default user created with result ${JSON.stringify(result)}`)
            });
        }
    } catch (err) {
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;