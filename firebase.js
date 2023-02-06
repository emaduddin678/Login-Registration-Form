// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import {
  getDatabase,
  set,
  ref,
  update,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
import {
  getAuth,
  // connectAuthEmulator,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtz7PVmzxYb-LVM0IIOWvHOK7w7jjoq1Y",
  authDomain: "new-f9747.firebaseapp.com",
  projectId: "new-f9747",
  storageBucket: "new-f9747.appspot.com",
  messagingSenderId: "939642479110",
  appId: "1:939642479110:web:c64152079ca9f067419987",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

// connectAuthEmulator(auth, "http://localhost:9099");
// const loginEmailPassword = async () => {
//   const loginEmail = txtEmail.value;
//   const loginPassword = txtPassword.value;

//   const userCredential = await sighInWithEmailAndPassword(
//     auth,
//     loginEmail,
//     loginPassword
//   );
//   console.log(userCredential.user);
// };

// dom selection
const submitBtn = document.getElementById("signup");
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const email = document.getElementById("emailup").value;
  const password = document.getElementById("passwordup").value;
  console.log(email);
  console.log(password);
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("Resolved");
      // Signed in
      const user = userCredential.user;
      const datex = new Date().getTime();
      const daten = new Date(datex).toLocaleDateString();
      const daten2 = new Date(datex).toLocaleTimeString();
      const date = daten + "  at: " + daten2;

      set(ref(database, "users/" + user.uid), {
        username: username,
        email: email,
        sign_in_time: date,
      });

      alert(`User Created.. \nChecked in Firebase database`);
      // ...
    })
    .catch((error) => {
      console.log("Rejected");
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
});

const loginBtn = document.getElementById("login");
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("Hlelo");
  const email = document.getElementById("emailin").value;
  console.log(email);
  const password = document.getElementById("passwordin").value;
  console.log(password);
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("Resolved");
      const user = userCredential.user;
      console.log(user);
      // const pass = userCredential.additionalUserInfo.providerData;
      const datex = new Date().getTime();
      const daten = new Date(datex).toLocaleDateString();
      const daten2 = new Date(datex).toLocaleTimeString();
      const date = daten + "  at: " + daten2;
      update(ref(database, "users/" + user.uid), {
        last_login: date,
      });
      // alert(`${user.displayName} logged in!`);
      alert(`${user.email} logged in!`);
    })
    .catch((error) => {
      console.log("Rejected");
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
});

// State observer
const user = auth.currentUser;

onAuthStateChanged(auth, (user) => {
  if (user) {
    // sendEmailVerification(user).then(() => {
    //   // Email verification sent!
    //   console.log("Emal Sent!")
    //   // ...
    // });

    // The user object has basic properties such as display name, email, etc.
    // const displayName = user.displayName;
    // const email = user.email;
    // const photoURL = user.photoURL;
    // const emailVerified = user.emailVerified;

    // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    console.log(user);
    // console.log(email);
    // console.log(displayName);
    // console.log(photoURL);
    // console.log(emailVerified);

    // specific data
    // user.providerData.forEach((profile) => {
    //   console.log("Sign-in provider: " + profile.providerId);
    //   console.log("  Provider-specific UID: " + profile.uid);
    //   console.log("  Name: " + profile.displayName);
    //   console.log("  Email: " + profile.email);
    //   console.log("  Photo URL: " + profile.photoURL);
    // });
    // ...
  } else {
    // User is signed out
    // ...
    console.log("No user is loged in, now!");
  }
});
