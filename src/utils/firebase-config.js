// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyDzsoDbgXn7BMQ5dx7qjNvgEZ1_PEFo71A",
    authDomain: "mtechzilla-task.firebaseapp.com",
    projectId: "mtechzilla-task",
    storageBucket: "mtechzilla-task.appspot.com",
    messagingSenderId: "273339679397",
    appId: "1:273339679397:web:9b5cce1f16b2560ba6c34c",
    measurementId: "G-M3PCHRWXYG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export {app}