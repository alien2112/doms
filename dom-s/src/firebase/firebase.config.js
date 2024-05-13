
import {initializeApp} from 'firebase/app';
const firebaseConfig = {
    apiKey : import.meta.env.VITE_APIKEY,
    auth
}


const app = initializeApp(firebaseConfig);
export default app;