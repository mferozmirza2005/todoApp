var todoInp = document.getElementById('todoInp');
var nodeList = document.getElementById('todoListItems');

function addNode() {

    // todo Value
    
    var todoValue = todoInp.value;
    
    // list items creation 
    
    var newLi = document.createElement('li');
    var liItem = document.createTextNode(todoValue);
    
    
    newLi.appendChild(liItem);
    
    // list button div creation

    var listBTNs = document.createElement('div');
    newLi.appendChild(listBTNs);

    // Edit button creation
    
    var editBtn = document.createElement('button');
    var edittxt = document.createTextNode('EDIT');
    editBtn.setAttribute('onclick', 'EditLI(this)');
    editBtn.appendChild(edittxt);
    editBtn.setAttribute('class', 'btn');
    listBTNs.appendChild(editBtn);
    
    // Delete button creation
    
    var delBtn = document.createElement('button');
    var deltxt = document.createTextNode('DELETE');
    delBtn.setAttribute('onclick', 'DelLi(this)');
    delBtn.appendChild(deltxt);
    delBtn.setAttribute('class', 'btn');
    listBTNs.appendChild(delBtn); 

    // Append list item in list 

    nodeList.appendChild(newLi);
    todoInp.value = ''; 
}

function EditLI(element) {
    element.parentNode.parentNode.firstChild.nodeValue = prompt("edit your value", "");
}

function DelLi(element) {
    element.parentNode.parentNode.remove();
}

function delAllNode() {
    nodeList.innerHTML = '';
}