import Event from '../models/Event.js';

// Get Events
export const getEvents = async (req, res) => {
  try {
    const { type, date, location } = req.query;
    const filters = {};
    if (type) filters.type = type;
    if (date) filters.date = new Date(date);
    if (location) filters.location = location;

    const events = await Event.find(filters);
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create Event
export const createEvent = async (req, res) => {
  try {
    const event = new Event({ createdBy: req.user._id, ...req.body });
    await event.save();
    res.status(201).json({ message: 'Event created successfully', event });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update Event
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.status(200).json({ message: 'Event updated successfully', event });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

