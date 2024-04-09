const express = require('express');

const app = express();
require("./config/mongoDb").dbConnect();
const cloudinaryConnect = require('./config/cloudinary');
// Import your authController

// Connect to MongoDB and Cloudinary
cloudinaryConnect();

// Middleware for JSON and form data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routers
// const routerAdmin = require('./router/superAdmin/course');
// const routerUser = require('./router/userRoutes/userRoutes');
const { authenticateSuperadmin, authenticateUser, checkRole } = require('./middleware/toke');
const routerAdmin = require('./router/superAdmin/course');
const routerUser = require('./router/userRoutes/userRoutes');
const { login } = require('./controller/auth/login');
const { signUp } = require('./controller/auth/signUp');
const routerAuth = require('./router/auth/auth');



app.use('/admin', authenticateSuperadmin,routerAdmin);
app.use('/user',authenticateUser,routerUser);
app.use('/auth',routerAuth);
// app.use('/app/v1', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app; // Export the server for testing purposes or other modules
