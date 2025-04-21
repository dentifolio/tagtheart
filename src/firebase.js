import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  onSnapshot,
  updateDoc,
  increment
} from 'firebase/firestore';
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL
} from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

/**
 * Add a comment to a pin
 */
async function addComment(pinId, text) {
  const commentsRef = collection(db, 'pins', pinId, 'comments');
  await addDoc(commentsRef, {
    text,
    createdAt: new Date()
  });
}

/**
 * Increment report count on a pin
 */
async function reportPin(pinId) {
  const pinRef = doc(db, 'pins', pinId);
  await updateDoc(pinRef, {
    reports: increment(1)
  });
}

export {
  db,
  storage,
  collection,
  doc,
  addDoc,
  onSnapshot,
  updateDoc,
  increment,
  storageRef,
  uploadBytes,
  getDownloadURL,
  addComment,
  reportPin
};
