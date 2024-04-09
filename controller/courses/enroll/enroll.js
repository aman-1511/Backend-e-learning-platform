// const Enrollment = require('../models/enrollmentModel'); // Adjust the path as necessary
// const Course = require('../models/courseModel'); // Adjust the path as necessary
// const User = require('../models/userModel'); // Adjust the path as necessary

const Course = require("../../../models/couserModel");
const Enrollment = require("../../../models/enrolledModel");
const User = require("../../../models/userModel");
const resend = require('resend');
const resendClient = new resend.Resend('re_dne62Ak5_NVLF2epAZPBCCM7qfANQowXs');



const enrollmentController = {
    enrollInCourse: async (req, res) => {
        const { userId, courseId } = req.body;

        try {
            const course = await Course.findById(courseId);
            const user = await User.findById(userId);

            if (!course || !user) {
                return res.status(404).json({ success: false, message: 'Course or user not found' });
            }

            const existingEnrollment = await Enrollment.findOne({ user: userId, course: courseId });
            // if (existingEnrollment) {
            //     return res.status(400).json({ success: false, message: 'Already enrolled' });
            // }

            const enrollment = new Enrollment({ user: userId, course: courseId });
            await enrollment.save();

            await resendClient.emails.send({
                from: 'onboarding@resend.dev',
                to:'aman.chaudhary1511@gmail.com',
                subject: 'Enrollment Confirmation',
                html: `<p>Hello ${user.fullName}, you have been successfully enrolled in ${course.name}.</p>`
            });


            return res.status(201).json({ success: true, enrollment });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Enrollment failed' });
        }
    }
};

module.exports = enrollmentController;
