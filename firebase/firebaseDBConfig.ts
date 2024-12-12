import { initializeApp, getApps  } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {

    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    dbURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Inicializa o Firebase Realtime Database e obtém uma referência ao serviço
const database = getDatabase(app);

export { database };
