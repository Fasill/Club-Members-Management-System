import { Events } from '../../models/User.js';

export async function GetOrderedEvents(req, res) {
  try {
    // Query events from Firestore ordered by timestamp in ascending order
    const eventsSnapshot = await Events.orderBy('timestamp').get();

    // Extract events from the snapshot
    const orderedEvents = eventsSnapshot.docs.map((doc) => doc.data());

    return res.status(200).json({ success: true, events: orderedEvents });
  } catch (error) {
    console.error('Error retrieving ordered events:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}



export async function publicGetOrderedEvents(req, res) {
  try {
    // Query events from Firestore ordered by timestamp in ascending order
    const eventsSnapshot = await Events.orderBy('timestamp').get();

    // Extract events from the snapshot
    const allEvents = eventsSnapshot.docs.map((doc) => doc.data());

    // Filter events where visibility is 'all-people'
    const filteredEvents = allEvents.filter((event) => event.visibility === 'all-people');

    return res.status(200).json({ success: true, events: filteredEvents });
  } catch (error) {
    console.error('Error retrieving ordered events:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}

export default publicGetOrderedEvents;
