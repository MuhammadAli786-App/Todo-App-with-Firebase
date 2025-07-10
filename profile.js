import {
  auth,
  db,
  doc,
  getDoc,
  onAuthStateChanged,
  updateDoc,
} from "./firebase.js";

// DOM elements
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const email = document.querySelector("#email");
const LogoutBtn = document.querySelector(".LogoutBtn");
const ProfileBtn = document.querySelector(".ProfileBtn");
const updateprofileBtn = document.querySelector(".updateprofileBtn button");
// Redirect to Todo
const todoApp = () => {
  window.location.href = "./todo.html";
};

// Logout
const logout = () => {
  window.location.replace("./index.html");
};

// Profile data loader
const updateProfile = async (user) => {
  if (!user) {
    console.log("User not logged in");
    window.location.replace("./index.html");
    return;
  }

  const currentUserID = user.uid;
  console.log("Logged-in UID:", currentUserID);
  const docRef = doc(db, "users", currentUserID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const userData = docSnap.data();
    firstName.value = userData.firstName;
    lastName.value = userData.lastName;
    email.value = userData.email;
  } else {
    console.log("User profile not found in Firestore.");
  }
};

const updateUserData = async () => {
  const updatefirstName = firstName.value;
  const updatelastName = lastName.value;

  if (!updatefirstName || !updatelastName) {
    alert("Input Fields Are Required");
    return;
  }
  const user = auth.currentUser;
  if (!user) {
    alert("No user is logged in.");
    return;
  }
  const userRef = doc(db, "users", user.uid);

  try {
    await updateDoc(userRef, {
      firstName: updatefirstName,
      lastName: updatelastName,
    });
    alert("Profile updated successfully!");
    window.location.href = "./todo.html";
  } catch (error) {
    console.error("Error updating profile:", error.message);
    alert("Profile update failed: " + error.message);
  }
};
// Call this immediately (not inside DOMContentLoaded)
onAuthStateChanged(auth, updateProfile);


// Set event listeners after DOM loads
window.addEventListener("DOMContentLoaded", () => {
  ProfileBtn.addEventListener("click", todoApp);
  LogoutBtn.addEventListener("click", logout);
});

updateprofileBtn.addEventListener("click", updateUserData);
