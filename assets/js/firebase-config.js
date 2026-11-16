// Firebase web config (Firebase console → Project settings → Your apps → Web app).
// These values are public by design; access is enforced by firebase/firestore.rules
// and firebase/storage.rules.
export const firebaseConfig = {
  apiKey: "AIzaSyDT_Le7fAAQ6IJVrlcoV9liIWThX9ct_oc",
  authDomain: "portfolio-page-d47b6.firebaseapp.com",
  projectId: "portfolio-page-d47b6",
  storageBucket: "portfolio-page-d47b6.firebasestorage.app",
  messagingSenderId: "142017130186",
  appId: "1:142017130186:web:9aeb87102f76d270c7ce33",
  measurementId: "G-B0MRZMR7CD"
};

// Google accounts allowed to sign in to /admin/. Keep in sync with firebase/firestore.rules.
export const ADMIN_EMAILS = ["pandiyashwanth@gmail.com"];

export const isConfigured = !/REPLACE_ME/.test(firebaseConfig.projectId);
