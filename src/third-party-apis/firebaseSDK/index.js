import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import {
  getAuth,
  signInWithCustomToken,
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

// Firebase Configuration

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

console.log("Firebase initialized successfully!");

const submitbtn = document.querySelector("button[type='submit']");
if (submitbtn) {
  submitbtn.addEventListener("click", function (e) {
    e.preventDefault();
    createUser(this.closest("form"), this);
  });
}

const createUser = async (form, btn) => {
  btn.disabled = true;
  const formData = new FormData(form);

  try {
    const res = await fetch("http://localhost:3000/auth/email", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });

    if (!res.ok) {
      throw new Error(`Response not OK: ${res.status}`);
    }

    const data = await res.json();

    console.log(data);

    await signInWithCustomToken(auth, data.token);

    alert("user created & logged in successfully");
  } catch (error) {
    console.log(error.message);
  }

  btn.disabled = false;
};
