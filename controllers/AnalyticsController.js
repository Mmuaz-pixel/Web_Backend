export const getSalesAnalytics = async (req, res) => {
  try {
    const analytics = {}; // todo 
    res.status(200).json(analytics);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getTrainingAnalytics = async (req, res) => {
  try {
    const analytics = {}; // todo 
    res.status(200).json(analytics);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
