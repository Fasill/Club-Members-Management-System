import { Users } from '../../models/User.js';
import bcrypt from 'bcrypt';

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user with the given email exists
    const userSnapshot = await Users.where('email', '==', email).get();

    if (userSnapshot.empty) {
      return res.status(404).send({ message: 'User not found' });
    }

    const userData = userSnapshot.docs[0].data();

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, userData.password);

    if (!passwordMatch) {
      return res.status(401).send({ message: 'Invalid password' });
    }

    // At this point, the login is successful
    res.status(200).send({ message: 'Login successful', user: userData });

  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'Internal server error' });
  }
};

