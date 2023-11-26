import { Events } from '../../models/User.js';
import { v4 as uuidv4 } from 'uuid';

async function AddEvent(req, res) {
  try {
    // Extract event data from the request body
    const { title, time, location, description,visibility } = req.body;

    // Generate a unique event ID
    const eventId = `csec/${uuidv4()}/event`;

    // Add timestamp with day
    const timestamp = new Date();

    // Format the timestamp with day
    const formattedTimestamp = `${timestamp.toISOString()} (Day: ${timestamp.getDate()})`;

    // Add the event to Firestore with title, time, location, description, and formatted timestamp
    await Events.add({
      eventId: eventId,
      title: title,
      time: time,
      location: location,
      description: description,
      timestamp: formattedTimestamp,
      visibility:visibility
    });

    return res.status(201).json({ success: true, eventId: eventId });
  } catch (error) {
    console.error('Error adding event:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}

export default AddEvent ;
