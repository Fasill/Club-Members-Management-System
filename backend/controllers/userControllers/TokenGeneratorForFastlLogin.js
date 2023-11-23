import { generateToken } from "../../utils/tokenGenerator.js";
import {  Users } from "../../models/User.js";

export const FastLogin = async (req, res) => {
  try {
    
    let userSnapshot;

    // If email is not provided in the query parameters, use a default one
  
      var targetEmail = 'fasilhawultie19@gmail.com';
      userSnapshot = await Users.where('email', '==', targetEmail).get();

    if (userSnapshot.empty) {
      return res.status(404).json({ message: `${targetEmail} User not found` });
    }

    const userDoc = userSnapshot.docs[0];
    const userId = userDoc.id;

    return res.status(200).json({ message: `Fast Login Token email = ${targetEmail}`, token: generateToken(userId) });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
