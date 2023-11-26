import admin from 'firebase-admin'
import serviceAccount from "../credentials/serviceAccountKey.json" assert { type: "json" };

if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: 'club-management-system-642af.appspot.com',
    });
  }

  const bucket = admin.storage().bucket();

const firebaseMiddleware = (req, res, next) => {
  req.bucket = bucket;
  next();
};

export default firebaseMiddleware;
