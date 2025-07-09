import {
  auth,
  db,
  collection,
  query,
  where,
  getDocs,
  onAuthStateChanged,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "./firebase.js";

const welUser = document.querySelector(".user h1");
const checkAuthStatus = async (user) => {
  if (user) {
    const uid = user.uid;
    console.log(user);
    const q = query(collection(db, "users"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      welUser.innerHTML = `!Welcome ${
        userData.firstName + " " + userData.lastName
      }`;
    });
  } else {
    window.location.replace = "./index.html";
  }
};

onAuthStateChanged(auth, (user) => {
  checkAuthStatus(user);
});

const deleteAllBtn = document.querySelector(".deleteBtn");
const parent = document.querySelector("#parent");
const addBtn = document.querySelector(".addBtn");
const deleteBtn = document.querySelector(".delete");
const editBtn = document.querySelector(".edit");
const LogoutBtn = document.querySelector(".LogoutBtn");
const ProfileBtn = document.querySelector(".ProfileBtn");

const getTodo = async () => {
  const inputField = document.querySelector("#input");
  const input = inputField.value;

  if (!input) {
    alert("Input Fields Are Required");
    return;
  }
  const user = auth.currentUser;
  if (!user) {
    alert("User not logged in");
    return;
  }

  const todoObj = {
    uid: user.uid,
    todo: input,
    createdAt: new Date().toISOString(),
  };

  try {
    await addDoc(collection(db, "todos"), todoObj);
    inputField.value = "";
    renderTodos();
  } catch (error) {
    console.log("Error adding todo:", error.message);
  }
};

const renderTodos = async () => {
  const user = auth.currentUser;
  if (!user) {
    return;
  }
  const q = query(collection(db, "todos"), where("uid", "==", user.uid));
  const querySnapshot = await getDocs(q);

  parent.innerHTML = "";

  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();

    const todoItem = ` 
      <div class="TodoItem" data-id="${docSnap.id}">
        <div class="item">
          <p>${data.todo}</p>
        </div>
        <div class="editBtn">
          <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
          <button class="delete"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>`;
    parent.innerHTML += todoItem;
  });
};
onAuthStateChanged(auth, (user) => {
  checkAuthStatus(user);
  if (user) {
    renderTodos();
  }
});

parent.addEventListener("click", async function (event) {
  const todoItem = event.target.closest(".TodoItem");
  if (!todoItem) {
    return;
  }
  const docId = todoItem.getAttribute("data-id");

  if (event.target.closest(".delete")) {
    await deleteDoc(doc(db, "todos", docId));
    todoItem.remove();
  }

  if (event.target.closest(".edit")) {
    const para = todoItem.querySelector("p");

    const updatedValue = prompt("Edit Your Todo", para.innerHTML);

    if (updatedValue !== null && updatedValue.trim() !== "") {
      para.innerHTML = updatedValue;

      await updateDoc(doc(db, "todos", docId), {
        todo: updatedValue,
      });
    }
  }
});

const deleteAllTodo = async () => {
  const user = auth.currentUser;
  if (!user) {
    return;
  }
  const q = query(collection(db, "todos"), where("uid", "==", user.uid));
  const querySnapshot = await getDocs(q);
  try {
    const deletePromises = [];
    querySnapshot.forEach((docSnap) => {
      const docRef = doc(db, "todos", docSnap.id);
      deletePromises.push(deleteDoc(docRef));
    });

    await Promise.all(deletePromises);
    parent.innerHTML = "";
  } catch (error) {
    console.log("Error deleting all todos:", error.message);
    alert("Something went wrong!");
  }
};

const userLogout = () => {
  window.location.replace("./index.html");
};

const userProfile = () => {
  window.location.href = "./profile.html";
};
ProfileBtn.addEventListener("click", userProfile);
LogoutBtn.addEventListener("click", userLogout);
window.addEventListener("load", renderTodos);
deleteAllBtn.addEventListener("click", deleteAllTodo);
addBtn.addEventListener("click", getTodo);
