import {
  app,
  db,
  auth,
  setDoc,
  createUserWithEmailAndPassword,
  collection,
  addDoc,
  doc,
} from "./firebase.js";

const SignUpBtn = document.querySelector("#signupBtn");

const signupHandler = async () => {
  const firstName = document.querySelector("#firstName").value;
  const lastName = document.querySelector("#lastName").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  if (!firstName || !lastName || !email || !password) {
    alert("Input fields Are Required");
    return;
  }

  const userObj = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  };

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    console.log("user", user);

    const userCollection = collection(db, "users");

    const userInfo = {
      uid: user.uid,
      firstName: firstName,
      lastName: lastName,
      email: email,
      createdAt: new Date().toISOString(),
    };
    // const userData = await setDoc(userCollection, userInfo);
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, userInfo, { merge: true });

    alert("Signup successful!");
    window.location.href = "./index.html";
  } catch (error) {
    console.error("Signup error:", error.message);
    alert("Signup failed: " + error.message);
  }
};

SignUpBtn.addEventListener("click", signupHandler);
