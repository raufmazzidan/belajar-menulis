import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCEFxakkAutN4zR7Du07ygxGfEKefoFj5A',
  authDomain: 'belajar-menulis-d9327.firebaseapp.com',
  projectId: 'belajar-menulis-d9327',
  storageBucket: 'belajar-menulis-d9327.appspot.com',
  messagingSenderId: '794581989817',
  appId: '1:794581989817:web:32e16c1a609f075d835e68',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
