import firebaseConfig from "./config.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithCustomToken,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/*===========================================================================================
LISTENS TO AUTH CHANGES
=========================================================================================== */
onAuthStateChanged(auth, (user) => {
  if (!user) {
    console.log("No login detected");
    return;
  }

  console.log("Login Detected");
  console.log(user.uid);
  console.log(user.email);
});

/*===========================================================================================
CREATES THE USER ACCOUNT

- Sends the credentials to backend
- backend connects to firebase ADMIN SDK, registers the account
- returns single sign in token as response 
- that token is used to login
=========================================================================================== */
const createNewUser = async (email, pass) => {
  const endPoint = "http://localhost:3000/auth/create-user";

  try {
    const response = await fetch(endPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        pass,
      }),
    });

    if (!response.ok) {
      throw new Error("Response is NOT OK", response.status);
    }
    const data = await response.json();

    if (!data.isSuccess) {
      throw new Error(data.error);
    }

    const { customToken } = data;

    await signInWithCustomToken(auth, customToken);
  } catch (error) {
    console.log(error.message);
  }
};

/*===========================================================================================
LOGIN THE USER

- auto login / client sends credentials to firebase CLIENT SDK
=========================================================================================== */
const loginUser = async (email, pass) => {
  try {
    await signInWithEmailAndPassword(auth, email, pass);
  } catch (error) {
    console.log(error.message);
  }
};

/*===========================================================================================
SIGNOUT THE USER
=========================================================================================== */
const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error.message);
  }
};

/*===========================================================================================
GETTING THE PROTECTED INFO FROM SERVER
=========================================================================================== */
const getProtectedData = async () => {
  const endPoint = "http://localhost:3000/auth/protected";
  try {
    const idToken = await auth.currentUser.getIdToken();

    const response = await fetch(endPoint, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Response is not OK");
    }

    const data = await response.json();

    if (!data.isSuccess) {
      throw new Error(data.error);
    }
    console.log("Protected Content is", data.protectedContent);
  } catch (error) {
    console.log(error.message);
  }
};
/*===========================================================================================
MAKES CURRENT USER AS ADMIN
=========================================================================================== */
const makeAdmin = async () => {
  if (!auth.currentUser) {
    throw new Error("No login detected");
  }
  const endPoint = "http://localhost:3000/auth/make-admin";
  try {
    const response = await fetch(endPoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${await auth.currentUser.getIdToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error("Response is not OK");
    }

    const data = await response.json();

    if (data.isSuccess) {
      auth.currentUser.getIdToken(true);
    }
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
};

/*===========================================================================================
ATTACHING ALL FUNCTIONS TO WINDOW OBJECT SO THAT I COULD DIRECTLY USE THEM IN BROWSER CONSOLE
=========================================================================================== */

window.auth = auth;
window.createNewUser = createNewUser;
window.loginUser = loginUser;
window.signOutUser = signOutUser;
window.getProtectedData = getProtectedData;
window.makeAdmin = makeAdmin;
