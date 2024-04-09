// controllers/courseController.js


const jwt = require('jsonwebtoken');
const Course = require('../../../models/couserModel');

// Controller functions for CRUD operations and pagination
const courseController = {
    // Create a new course (Superadmin only)
    createCourse: async (req, res) => {
        try {
            const course = await Course.create(req.body);
            return res.status(201).json({ success: true, course });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Failed to create course' });
        }
    },

    // Get paginated courses
    getCourses: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;

            const courses = await Course.find()
                .skip(skip)
                .limit(limit)
                .exec();

            const totalCourses = await Course.countDocuments();

            return res.status(200).json({
                success: true,
                page,
                limit,
                totalCourses,
                courses,
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Error fetching courses' });
        }
    },

    // Update a course (Superadmin only)
    updateCourse: async (req, res) => {
        try {
            const { id } = req.params;
            const updatedCourse = await Course.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedCourse) {
                return res.status(404).json({ success: false, message: 'Course not found' });
            }
            return res.status(200).json({ success: true, updatedCourse });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Failed to update course' });
        }
    },

    // Delete a course (Superadmin only)
    deleteCourse: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedCourse = await Course.findByIdAndDelete(id);
            if (!deletedCourse) {
                return res.status(404).json({ success: false, message: 'Course not found' });
            }
            return res.status(200).json({ success: true, deletedCourse });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Failed to delete course' });
        }
    },
};

module.exports = courseController;
