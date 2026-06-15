  // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getDatabase, ref, set, get, update, remove } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-database.js";
// initializeApp – to initialize your Firebase app.
// getDatabase – to get a reference to the Firebase Realtime Database.
// set – to write data to the database.
// get – to read data from the database.
// ref – to create references (paths) in the database.


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
 const firebaseConfig = {
    apiKey: "AIzaSyAdVag9XzrX1ijkvGSOPd_QCOWvR7geQsg",
    authDomain: "amit-project-d190e.firebaseapp.com",
    databaseURL: "https://amit-project-d190e-default-rtdb.firebaseio.com",
    projectId: "amit-project-d190e",
    storageBucket: "amit-project-d190e.firebasestorage.app",
    messagingSenderId: "971127983940",
    appId: "1:971127983940:web:fcf62fd9c2d8fe2a795111"
  };

// Initialize Firebase
// initializeApp(firebaseConfig) initializes your Firebase application using the config.
// getDatabase(app) gets the Realtime Database instance connected to your Firebase project.
const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  console.log(database);




//Function to write user data to Firebase Realtime Database
function writeUserData(userId, firstname, lastname, age, email, phone, address, city, country, gender, occupation) {
    const database = getDatabase();
  set(ref(database, 'users/' + userId), {
    firstname: firstname,
    lastname: lastname,
    age: age,
    email: email,
    phone: phone,
    address: address,
    city: city,
    country: country,
    gender: gender,
    occupation: occupation
  });
}

// 10 Users with 10 Fields Each
writeUserData(1, "Abi", "Khanal", 21, "abi@gmail.com", "9800000001", "Baneshwor", "Kathmandu", "Nepal", "Male", "Student");

writeUserData(2, "Amit", "Pokharel", 22, "amit@gmail.com", "9800000002", "Koteshwor", "Kathmandu", "Nepal", "Male", "Student");

writeUserData(3, "Sita", "Sharma", 20, "sita@gmail.com", "9800000003", "Lalitpur", "Lalitpur", "Nepal", "Female", "Designer");

writeUserData(4, "Ram", "Thapa", 24, "ram@gmail.com", "9800000004", "Bhaktapur", "Bhaktapur", "Nepal", "Male", "Engineer");

writeUserData(5, "Hari", "Karki", 23, "hari@gmail.com", "9800000005", "Pokhara", "Pokhara", "Nepal", "Male", "Developer");

writeUserData(6, "Gita", "Rai", 21, "gita@gmail.com", "9800000006", "Dharan", "Sunsari", "Nepal", "Female", "Teacher");

writeUserData(7, "Anish", "Basnet", 25, "anish@gmail.com", "9800000007", "Butwal", "Rupandehi", "Nepal", "Male", "Manager");

writeUserData(8, "Priya", "Adhikari", 22, "priya@gmail.com", "9800000008", "Chitwan", "Chitwan", "Nepal", "Female", "Nurse");

writeUserData(9, "Rohan", "Bista", 23, "rohan@gmail.com", "9800000009", "Biratnagar", "Morang", "Nepal", "Male", "Accountant");

writeUserData(10, "Sneha", "Joshi", 20, "sneha@gmail.com", "9800000010", "Dhangadhi", "Kailali", "Nepal", "Female", "Student");



// function readUser() {
//     const userRef = ref(db, 'users');

//     get(userRef).then((snapshot)=>{
//         snapshot.forEach((childsnapshot)=>{
//             console.log(childsnapshot.val());
//         })
//     })
// }
// readUser();


// function updateUserData(userId, updatedData) {
//     const userRef = ref(db, 'users/' + userId);

//     update(userRef, updatedData)
//         .then(() => {
//             console.log("User updated successfully");
//         })
//         .catch((error) => {
//             console.error("Error updating user:", error);
//         });
// }

// // Update user 1
// updateUserData(1, {
//     firstname: "Amit",
//     lastname: "Pokharel"
// });



// import { ref, remove } from "firebase/database";

// function deleteUserData(userId) {
//   const userRef = ref(db, 'users/' + userId);

//   remove(userRef)
//     .then(() => {
//       console.log("User deleted successfully");
//     })
//     .catch((error) => {
//       console.error("Error deleting user:", error);
//     });
// }

// // Example usage:
// deleteUserData(1);

// // //console.log("Added! Good")