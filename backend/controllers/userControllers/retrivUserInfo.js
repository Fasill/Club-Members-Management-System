import { decodeTokenAndGetId } from "../../utils/decodeTokenAndGetId.js";
import {Users} from '../../models/User.js';

// Retrieve all members based on division and user role
export const retrieveAllMembers = async (req, res) => {
    
    const {division,token} = req.query;
    try {
        const id = decodeTokenAndGetId(token);
        const userSnapshot = await Users.doc(id).get();

        if (!userSnapshot.exists) {
            return res.status(404).send({ message: 'User not found' });
        }

        const userData = userSnapshot.data();

        if (userData.role !== 'president' && userData.role !== 'admin') {
            return res.status(403).send({ message: 'You are not eligible for this.' });
        }

        let membersSnapshot;

        if (division) {
            membersSnapshot = await Users.where('division', 'array-contains', division).get();
        } else {
            membersSnapshot = await Users.where('role', '==', 'member').get();
        }

        const membersData = membersSnapshot.docs.map(doc => doc.data());

        res.status(200).send({ members: membersData });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};


export const retrieveAdmins = async (req, res) => {
    
    const {token} = req.query;

    try {
        const id = decodeTokenAndGetId(token);
        const userSnapshot = await Users.doc(id).get();

        if (!userSnapshot.exists) {
            return res.status(404).send({ message: 'User not found' });
        }

        const userData = userSnapshot.data();

        if (userData.role !== 'president' ) {
            return res.status(403).send({ message: 'You are not eligible for this.' });
        }

        const membersSnapshot = await Users.where('role', '==', 'admin').get();
        
        const membersData = membersSnapshot.docs.map(doc => doc.data());

        res.status(200).send({ members: membersData });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

export const retrieveLoggedInUserInfo = async (req, res) => {
    console.log("ee")
    const { token } = req.query;

    const id = decodeTokenAndGetId(token);

    try {
        const userSnapshot = await Users.doc(id).get();

        const userData = userSnapshot.data();

        res.send(userData);
    } catch (error) {
        console.error(error);

        res.status(500).send({ message: 'Internal Server Error' });
    }
};