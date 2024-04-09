// routes/courseRoutes.js

const express = require('express');
const routerAdmin = express.Router();

const { authenticateSuperadmin } = require('../../middleware/toke');
const courseController = require('../../controller/courses/superAdmin/course');


// Create a new course (Superadmin only)
routerAdmin.post('/courses', authenticateSuperadmin,courseController.createCourse);

// Get paginated courses
routerAdmin.get('/courses',authenticateSuperadmin,courseController.getCourses);

// Update a course (Superadmin only)
routerAdmin.put('/courses/:id', authenticateSuperadmin,courseController.updateCourse);

// Delete a course (Superadmin only)
routerAdmin.delete('/courses/:id', authenticateSuperadmin,courseController.deleteCourse);

module.exports = routerAdmin;
