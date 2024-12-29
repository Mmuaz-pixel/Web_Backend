import Progress from '../models/Progress.js';

// Get user's progress
export const getUserProgress = async (req, res) => {
  try {
    const progress = await Progress.find({ user: req.user._id }).populate('course');
    const enrolledCourses = progress.map(p => p.course);
    res.status(200).json({ progress, enrolledCourses });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update progress
export const updateProgress = async (req, res) => {
  try {
    const { courseId, lessonsCompleted } = req.body;
    const progress = await Progress.findOneAndUpdate(
      { user: req.user._id, course: courseId },
      { lessonsCompleted },
      { new: true }
    );
    if (!progress) return res.status(404).json({ error: 'Progress not found' });
    res.status(200).json({ message: 'Progress updated successfully', progress });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

