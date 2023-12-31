import { decodeTokenAndGetId } from "../../utils/decodeTokenAndGetId.js";
import { Users } from '../../models/User.js';
import bcrypt from 'bcrypt';

export const editSelfInfo = async (req, res) => {
    try {
        const { token, fullName, email, phoneNo, collegeId, department, password } = req.body;
        const id = decodeTokenAndGetId(token);

        const userSnapshot = await Users.doc(id).get();

        if (!userSnapshot.exists) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Hash the password if provided
        let hashedPassword;
        if (password) {
            const saltRounds = 10;
            hashedPassword = await bcrypt.hash(password, saltRounds);
        }

        // Update user information based on provided fields
        const updatedUserInfo = {
            ...(fullName && { fullName }),
            ...(email && { email }),
            ...(phoneNo && { phoneNo }),
            ...(collegeId && { collegeId }),
            ...(department && { department }),
            ...(hashedPassword && { password: hashedPassword }),
        };

        // Update the user document in Firestore if there are any changes
        if (Object.keys(updatedUserInfo).length > 0) {
            // Remove undefined fields from the updated user info
            Object.keys(updatedUserInfo).forEach(key => updatedUserInfo[key] === undefined && delete updatedUserInfo[key]);

            await Users.doc(id).update(updatedUserInfo);

            return res.status(200).json({ message: 'User information updated successfully' });
        } else {
            return res.status(200).json({ message: 'No changes were made to user information' });
        }
    } catch (error) {
        console.error('Error updating user information:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const editMembersInfo = async (req, res) => {
    try {
      const { token, fullName, email, phoneNo, collegeId, department, role, division, oldEmail} = req.body;
      const id = decodeTokenAndGetId(token);
  
      // Check if the user making the request is an admin or president
      const adminSnapshot = await Users.doc(id).get();
      const adminData = adminSnapshot.data();
  
      if (!(adminData.role === 'president' || adminData.role === 'admin')) {
        return res.status(403).json({ message: 'You are not eligible for this action.' });
      }
  
      // Check if the member to be updated exists
      const memberSnapshot = await Users.where('email', '==', oldEmail).get();
  
      if (memberSnapshot.empty) {
        return res.status(404).json({ message: 'Member not found.' });
      }
      const updatedUserInfo = {
        ...(fullName && { fullName }),
        ...(email && { email }),
        ...(phoneNo && { phoneNo }),
        ...(collegeId && { collegeId }),
        ...(department && { department }),
        ...(role &&{role}) ,
        ...(division && {division})
    
    };
  
        // Update the user document in Firestore if there are any changes
        if (Object.keys(updatedUserInfo).length > 0) {
            // Remove undefined fields from the updated user info
            Object.keys(updatedUserInfo).forEach(key => updatedUserInfo[key] === undefined && delete updatedUserInfo[key]);
            const memberId = memberSnapshot.docs[0].id;
            await Users.doc(memberId).update(updatedUserInfo);

            return res.status(200).json({ message: 'User information updated successfully' });
        } else {
            return res.status(200).json({ message: 'No changes were made to user information' });
        }
    } catch (error) {
        console.error('Error updating user information:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const fireUser = async (req, res) => {
    const { collegeId, token } = req.query;
    const Pid = decodeTokenAndGetId(token);

    try {
        // Check if the user making the request is a president
        const PSnapshot = await Users.doc(Pid).get();
        const PData = PSnapshot.data();

        if (PData.role !== 'president') {
            return res.status(403).json({ message: 'You are not eligible for this action.' });
        }

        // Find and delete the member with the given collegeId
        const memberSnapshot = await Users.where('collegeId', '==', collegeId).get();

        if (memberSnapshot.empty) {
            return res.status(404).json({ message: 'Member not found.' });
        }

        const memberId = memberSnapshot.docs[0].id;

        // Delete the user document from Firestore
        await Users.doc(memberId).delete();

        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};