import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, query, orderByChild, limitToLast } from 'firebase/database';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "your api key",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
  databaseURL: "" // Adding Realtime Database URL
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const analytics = getAnalytics(app);

// Function to listen to real-time attendance updates
export const subscribeToAttendance = (callback: (data: any) => void) => {
  const attendanceRef = ref(database, 'attendance');
  const recentAttendanceQuery = query(attendanceRef, orderByChild('timestamp'), limitToLast(100));
  
  return onValue(recentAttendanceQuery, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
};

export { database, analytics }; 