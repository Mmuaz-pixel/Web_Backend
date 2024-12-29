
import Course from "../models/Course.js";
import Progress from "../models/Progress.js";
// Get all courses
export const getCourses = async (req, res) => {
  try {
    const { category, level, language, search, sort } = req.query;
    const filters = {};
    if (category) filters.category = category;
    if (level) filters.level = level;
    if (language) filters.language = language;
    if (search) filters.title = new RegExp(search, 'i');

    const courses = await Course.find(filters).sort(sort || 'createdAt');
    res.status(200).json({courses});
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get course details
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Enroll in a course
export const enrollInCourse = async (req, res) => {
  try {
    // Assume user info is available in req.user
    const { courseId } = req.body;
    const progress = new Progress({ user: req.user._id, course: courseId });
    await progress.save();
    res.status(201).json({ message: 'Enrolled successfully', progress });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

