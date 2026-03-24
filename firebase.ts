import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from './firebase-applet-config.json';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore with the specific database ID from config
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

// Test connection to Firestore
async function testConnection() {
  try {
    // Attempt to get a dummy document to verify connection
    await getDocFromServer(doc(db, '_connection_test_', 'init'));
    console.log("Firebase connection verified.");
  } catch (error: any) {
    if (error.message?.includes('the client is offline') || error.message?.includes('unavailable')) {
      console.warn("Firestore is currently unavailable. This may be transient or due to initial provisioning. The client will operate in offline mode.");
    } else if (error.code === 'permission-denied' || error.message?.includes('insufficient permissions')) {
      console.log("Firestore connection established (Permission Denied is expected for the test document).");
    } else {
      console.error("Firestore connection error:", error.message);
    }
  }
}

testConnection();

export default app;
