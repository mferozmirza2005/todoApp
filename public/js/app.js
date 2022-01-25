// // Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-analytics.js";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDQpQDMMZQxOSNIuSHRvo6Mj34UQEkOqrQ",
//   authDomain: "todo-application-jp.firebaseapp.com",
//   databaseURL: "https://todo-application-jp-default-rtdb.firebaseio.com",
//   projectId: "todo-application-jp",
//   storageBucket: "todo-application-jp.appspot.com",
//   messagingSenderId: "403241094989",
//   appId: "1:403241094989:web:cfe12034fe68ceb4ae7104",
//   measurementId: "G-JTMSLVM1M2",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

var todoInp = document.getElementById("todoInp");
var nodeList = document.getElementById("todoListItems");

function addNode() {
  // todo Value

  var todoValue = todoInp.value;

  // list items creation

  var newLi = document.createElement("li");
  var liItem = document.createTextNode(todoValue);

  newLi.appendChild(liItem);

  // list button div creation

  var listBTNs = document.createElement("div");
  newLi.appendChild(listBTNs);

  // Edit button creation

  var editBtn = document.createElement("button");
  var edittxt = document.createTextNode("EDIT");
  editBtn.setAttribute("onclick", "EditLI(this)");
  editBtn.appendChild(edittxt);
  editBtn.setAttribute("class", "btn");
  listBTNs.appendChild(editBtn);

  // Delete button creation

  var delBtn = document.createElement("button");
  var deltxt = document.createTextNode("DELETE");
  delBtn.setAttribute("onclick", "DelLi(this)");
  delBtn.appendChild(deltxt);
  delBtn.setAttribute("class", "btn");
  listBTNs.appendChild(delBtn);

  // Append list item in list

  nodeList.appendChild(newLi);
  todoInp.value = "";
}

function EditLI(element) {
  element.parentNode.parentNode.firstChild.nodeValue = prompt(
    "edit your value",
    ""
  );
}

function DelLi(element) {
  element.parentNode.parentNode.remove();
}

function delAllNode() {
  nodeList.innerHTML = "";
}
