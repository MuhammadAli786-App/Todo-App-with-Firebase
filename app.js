import { auth, signInWithEmailAndPassword } from "./firebase.js";

const loginBtn = document.querySelector(".loginBtn button");

const loginHandler = async () => {
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    alert("Login successful!");
    console.log("Logged in user:", user);
    window.location.replace("./todo.html");
  } catch (error) {
    console.log("Login failed:", error.message);
    alert("Login failed: " + error.message);
  }
};

loginBtn.addEventListener("click", loginHandler);
