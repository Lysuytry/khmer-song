import admin from 'firebase-admin';
import serviceAccount from './my-message-925b6-firebase-adminsdk-zwbec-c21bfefd00.json';

const { DBURL } = process.env;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: DBURL
});

export default admin;
