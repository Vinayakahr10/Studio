
import { initializeApp, getApps, getApp, type FirebaseOptions } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
let app;

// Check if all necessary Firebase config values are present, especially the API key.
if (firebaseConfig.apiKey && firebaseConfig.projectId) {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
} else {
  console.warn(
    "Firebase configuration is missing or incomplete (ensure NEXT_PUBLIC_FIREBASE_API_KEY and NEXT_PUBLIC_FIREBASE_PROJECT_ID are set in .env.local and the server is restarted). Firebase will not be initialized."
  );
  // You might want to handle this case further, e.g., by disabling Firebase-dependent features
  // or by throwing a more specific error if Firebase is critical for the app to run.
}

// Initialize Auth only if Firebase app was successfully initialized
const auth = app ? getAuth(app) : null;

export { app, auth };
