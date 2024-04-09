// Assuming this is in router/userRoutes/userRoutes.js

const expres=require('express')
const routerUser = expres.Router();

const courseController = require('../../controller/user/course');
const { authenticateUser } = require('../../middleware/toke');
const { login } = require('../../controller/auth/login');
const { signUp } = require('../../controller/auth/signUp');
const multer = require('multer');
const { enrollInCourse } = require('../../controller/courses/enroll/enroll');
const enrollmentController = require('../../controller/courses/enroll/enroll');
const upload = multer({ storage: multer.memoryStorage() });
routerUser.post('/enroll', authenticateUser,enrollmentController.enrollInCourse);
// Make sure courseController.getCourses is a valid and exported function from the course controller
routerUser.get('/courses', authenticateUser, courseController.getCourses);

// routerUser.post('/register', signUp)
module.exports = routerUser;

