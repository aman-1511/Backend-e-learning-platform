const Course = require("../../models/couserModel");


const courseController = {
    getCourses: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;

            // Build the query object
            const query = {};
            const { category, level, popularity } = req.query;
            if (category) query.category = category;
            if (level) query.level = level;
            if (popularity) query.popularity = { $gte: parseInt(popularity) };

            const totalCourses = await Course.countDocuments(query);
            const courses = await Course.find(query).skip(skip).limit(limit);

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

    // Other methods like createCourse, updateCourse, deleteCourse...
};

module.exports = courseController;
