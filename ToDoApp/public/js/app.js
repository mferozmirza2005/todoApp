// =================================== import firebase tools ========================================

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-analytics.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
} from "https://www.gstatic.com/firebasejs/9.6.4/firebase-auth.js";
import {
  getDatabase,
  onValue,
  update,
  remove,
  push,
  set,
  ref,
} from "https://www.gstatic.com/firebasejs/9.6.4/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// =================================== firebase initialization ======================================

const firebaseConfig = {
  apiKey: "AIzaSyDQpQDMMZQxOSNIuSHRvo6Mj34UQEkOqrQ",
  authDomain: "todo-application-jp.firebaseapp.com",
  databaseURL: "https://todo-application-jp-default-rtdb.firebaseio.com",
  projectId: "todo-application-jp",
  storageBucket: "todo-application-jp.appspot.com",
  messagingSenderId: "403241094989",
  appId: "1:403241094989:web:cfe12034fe68ceb4ae7104",
  measurementId: "G-JTMSLVM1M2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase();
const auth = getAuth();

// =================================== user login or signup =========================================

var loginBtn = document.getElementById("loginBtn");
var Already = document.getElementById("Already");
var UserLogin = document.getElementById("UserLogin");

var CurrentUser;

loginBtn.addEventListener("click", () => {
  var login = document.getElementById("login");
  if (login.style.display == "") {
    login.style.display = "block";
  } else {
    login.style.display = "";
  }
});

Already.addEventListener("click", (e) => {
  e.preventDefault();
  var login = document.getElementById("login");
  login.children[1].remove();
  var signIn = login.children[0];
  var signInBtn = login.children[3].children[0];

  signIn.innerText = "Sign in";
  signInBtn.innerText = "Sign in";
  signInBtn.id = "UserSignin";
  Already.style.display = "none";

  var UserSignin = document.getElementById("UserSignin");
  UserSignin.addEventListener("click", (e) => {
    e.preventDefault();
    var email = document.getElementById("email").value;
    var pass = document.getElementById("pass").value;

    signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user.uid;

        console.clear();

        var date = new Date();
        CurrentUser = user;
        // ...

        var dbRef = ref(database, "users/" + CurrentUser);

        update(dbRef, {
          date:
            date.getDate() + ":" + date.getMonth() + ":" + date.getFullYear(),
        });

        alert("congratulations! user Sign in successfully");

        var notesRef = ref(database, "notes/" + CurrentUser);

        var DataKeys = [];

        onValue(
          notesRef,
          (snapshot) => {
            snapshot.forEach((childSnapshot) => {
              DataKeys.push(childSnapshot.key);
              Data.push(childSnapshot.val());
            });
            Data.forEach((e, i) => {
              var blankNotes = document.getElementById("blankNotes");
              if (blankNotes.style.display === "") {
                blankNotes.style.display = "none";
              }

              var id = DataKeys[i];
              Data[i].id = id;
              var addItem = `
                <li id="${id}">
                  <h2>${e.title}</h2>
                  <p class="nodeItem">${e.note}</p>
                  <button onclick="editNote(this)">
                    <i class="fad fa-edit"></i>
                  </button>
                  <button onclick="deleteNote(this)">
                    <i class="fad fa-trash-alt"></i>
                  </button>
                </li>
                `;
              nodeList.innerHTML += addItem;
            });
          },
          {
            onlyOnce: true,
          }
        );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Oops! " + errorMessage);
      });
  });
});

UserLogin.addEventListener("click", (e) => {
  e.preventDefault();
  var UserName = document.getElementById("UserName").value;
  var email = document.getElementById("email").value;
  var pass = document.getElementById("pass").value;

  createUserWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user.uid;

      console.clear();

      var date = new Date();
      CurrentUser = user;
      // ...

      alert("congratulations! user created successfully");

      var dbRef = ref(database, "users/" + CurrentUser);
      set(dbRef, {
        UserName,
        email,
        date: date.getDate() + ":" + date.getMonth() + ":" + date.getFullYear(),
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      // ..

      alert("Oops!" + errorMessage);
    });
});

// ======================================= application working ======================================

var Data = [];

var todoTitle = document.getElementById("todoTitle");
var todoInp = document.getElementById("todoInp");
var addNote = document.getElementById("addNote");

var nodeList = document.getElementById("todoListItems");

if (nodeList.children.length === 0) {
  nodeList.innerHTML = `
  <div id="blankNotes" class="text-center my-5 py-5">
    You Have no to yet.
  </div>
  `;
}

addNote.addEventListener("click", () => {
  var title = todoTitle.children[0].value;
  var note = todoInp.children[0].value;

  if (CurrentUser === undefined) {
    alert("please login to use your todo app.");
  } else {
    var blankNotes = document.getElementById("blankNotes");
      if (blankNotes.style.display === "") {
        blankNotes.style.display = "none";
      }

    var dbRef = push(ref(database, "notes/" + CurrentUser));
    var id = dbRef.key;

    var obj = {
      title,
      note,
      id,
    };

    Data.push(obj);
    var addItem = `
    <li id="${id}">
      <h2>${title}</h2>
      <p class="nodeItem">${note}</p>
      <button onclick="editNote(this)">
        <i class="fad fa-edit"></i>
      </button>
      <button onclick="deleteNote(this)">
        <i class="fad fa-trash-alt"></i>
      </button>
    </li>
    `;
    nodeList.innerHTML += addItem;

    set(dbRef, {
      title,
      note,
    });
  }
  todoTitle.children[0].value = "";
  todoInp.children[0].value = "";
});

window.editNote = function (e) {
  var element = e.parentNode;
  for (let i = 0; i < Data.length; i++) {
    if (element.id === Data[i].id) {
      var editor = document.getElementById("editor");
      if (editor.style.display === "") {
        editor.style.display = "flex";
      }
      editor.children[1].addEventListener("click", () => {
        element.children[1].innerText = editor.children[0].value;

        var dbRef = ref(database, "notes/" + CurrentUser + "/" + Data[i].id);
        update(dbRef, {
          note: editor.children[0].value,
        });
        editor.children[0].value = "";
        editor.style.display = "none";
      });
    }
  }
};

window.deleteNote = function (e) {
  var element = e.parentNode;
  for (let i = 0; i < Data.length; i++) {
    if (element.id === Data[i].id) {
      element.remove();
      remove(ref(database, "notes/" + CurrentUser + "/" + Data[i].id));
    }
  }
};
