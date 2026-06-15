// // Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
// import { getDatabase, ref, set, get, update, remove } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-database.js";
// // initializeApp – to initialize your Firebase app.
// // getDatabase – to get a reference to the Firebase Realtime Database.
// // set – to write data to the database.
// // get – to read data from the database.
// // ref – to create references (paths) in the database.


// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries
// // Your web app's Firebase configuration
//  const firebaseConfig = {
//     apiKey: "AIzaSyAdVag9XzrX1ijkvGSOPd_QCOWvR7geQsg",
//     authDomain: "amit-project-d190e.firebaseapp.com",
//     databaseURL: "https://amit-project-d190e-default-rtdb.firebaseio.com",
//     projectId: "amit-project-d190e",
//     storageBucket: "amit-project-d190e.firebasestorage.app",
//     messagingSenderId: "971127983940",
//     appId: "1:971127983940:web:fcf62fd9c2d8fe2a795111"
//   };

// // Initialize Firebase
// // initializeApp(firebaseConfig) initializes your Firebase application using the config.
// // getDatabase(app) gets the Realtime Database instance connected to your Firebase project.
// const app = initializeApp(firebaseConfig);
//     const database = getDatabase(app)

// console.log(database)


// // Function to write user data to Firebase Realtime Database
// // Function to write user data with unique ID
// function writeUserData(userId, name, email) {
//   // Create a reference to 'users' collection
//   const usersRef = ref(database, 'users/' + userId);

//   // push() generates a unique key for the new child
//   //const newUserRef = push(usersRef);

//   // set() stores the data at that unique location
//   set(usersRef, {
//     name: name,
//     email: email
//   })
//   .then(() => {
//     console.log("User added successfully with ID:", userId);
//   })
//   .catch((error) => {
//     console.error("Error adding user:", error);
//   });
// }

// // Expose the function to the global scope so it can be accessed from HTML (e.g., via button click)
// window.writeUserData = writeUserData;


// // ref(db, 'users') points to the users path.
// // get(userRef) gets the data at that path.
// // snapshot.forEach(...) loops over each child node (each user).
// // childsnapshot.val() gives the actual data (name and email), which is printed.
// function readUser(){
//     const userRef = ref(database,'users')
//     get(userRef).then((snapshot)=>{
//         snapshot.forEach((childsnapshot)=>{
//             console.log(childsnapshot.val());
//         })
//     })
// }
// //readUser()
// window.readUser = readUser;


// // Read a single user by ID and show the result on the page.
// function readUserById(userId) {
//   const userRef = ref(database, 'users/' + userId);
//   get(userRef).then((snapshot) => {
//     const user = snapshot.val();
//     console.log("User found:", user);
//     document.getElementById('read-result').textContent =
//       "Name: " + user.name +  " | " + "Email: " + user.email;
//   });
// }
// window.readUserById = readUserById;



// // Fetch an existing user by ID and load their data into the update input fields,
// // so the values can be edited and then saved with updateUserData().
// function fetchUserForUpdate(userId) {
//   const userRef = ref(database, 'users/' + userId);
//   get(userRef).then((snapshot) => {
//     const user = snapshot.val();
//     document.getElementById('update-name').value = user.name;
//     document.getElementById('update-email').value = user.email;
//     console.log("Loaded user into form:", user);
//   });
// }
// window.fetchUserForUpdate = fetchUserForUpdate;


// function updateUserData(userId, updatedData) {
//   const userRef = ref(database, 'users/' + userId);
//   update(userRef, updatedData)
//     .then(() => {
//       console.log("User updated successfully");
//     })
//     .catch((error) => {
//       console.error("Error updating user:", error);
//     });
// }

// // Example usage:
// //updateUserData();
// window.updateUserData = updateUserData;



// function deleteUserData(userId) {
//   const userRef = ref(database, 'users/' + userId);
//   remove(userRef)
//     .then(() => {
//       console.log("User deleted successfully");
//     })
//     .catch((error) => {
//       console.error("Error deleting user:", error);
//     });
// }

// // Example usage:
// //deleteUserData(2);
// window.deleteUserData = deleteUserData;










// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  get,
  update,
  remove
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-database.js";

// Firebase Config
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
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

/* ---------------- CREATE / WRITE ---------------- */
function writeUserData(
  userId,
  firstName,
  lastName,
  age,
  email,
  phone,
  address,
  city,
  country,
  gender,
  occupation
) {
  const usersRef = ref(database, "users/" + userId);

  set(usersRef, {
    firstName,
    lastName,
    age,
    email,
    phone,
    address,
    city,
    country,
    gender,
    occupation
  })
    .then(() => {
      console.log("User added successfully:", userId);
    })
    .catch((error) => {
      console.error("Error adding user:", error);
    });
}

window.writeUserData = writeUserData;

/* ---------------- READ ALL USERS ---------------- */
function readUser() {
  const userRef = ref(database, "users");

  get(userRef).then((snapshot) => {
    snapshot.forEach((child) => {
      console.log(child.key, child.val());
    });
  });
}

window.readUser = readUser;

/* ---------------- READ USER BY ID ---------------- */
function readUserById(userId) {
  const userRef = ref(database, "users/" + userId);

  get(userRef).then((snapshot) => {
    const user = snapshot.val();

    if (user) {
      document.getElementById("read-result").textContent =
        `Name: ${user.firstName} ${user.lastName} | Email: ${user.email}`;
    } else {
      document.getElementById("read-result").textContent =
        "User not found";
    }
  });
}

window.readUserById = readUserById;

/* ---------------- FETCH FOR UPDATE ---------------- */
function fetchUserForUpdate(userId) {
  const userRef = ref(database, "users/" + userId);

  get(userRef).then((snapshot) => {
    const user = snapshot.val();

    if (user) {
      document.getElementById("update-firstName").value = user.firstName || "";
      document.getElementById("update-lastName").value = user.lastName || "";
      document.getElementById("update-age").value = user.age || "";
      document.getElementById("update-email").value = user.email || "";
      document.getElementById("update-phone").value = user.phone || "";
      document.getElementById("update-address").value = user.address || "";
      document.getElementById("update-city").value = user.city || "";
      document.getElementById("update-country").value = user.country || "";
      document.getElementById("update-gender").value = user.gender || "";
      document.getElementById("update-occupation").value = user.occupation || "";
    }
  });
}

window.fetchUserForUpdate = fetchUserForUpdate;

/* ---------------- UPDATE USER ---------------- */
function updateUserData(userId, updatedData) {
  const userRef = ref(database, "users/" + userId);

  update(userRef, updatedData)
    .then(() => {
      console.log("User updated successfully");
    })
    .catch((error) => {
      console.error("Update error:", error);
    });
}

window.updateUserData = updateUserData;

/* ---------------- DELETE USER ---------------- */
function deleteUserData(userId) {
  const userRef = ref(database, "users/" + userId);

  remove(userRef)
    .then(() => {
      console.log("User deleted successfully");
    })
    .catch((error) => {
      console.error("Delete error:", error);
    });
}

window.deleteUserData = deleteUserData;