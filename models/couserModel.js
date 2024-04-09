const mongoose = require('mongoose');
const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        required: true
    },
    popularity: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
  
});
const Course = mongoose.model('Course', courseSchema);
module.exports = Course;