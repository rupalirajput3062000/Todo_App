displayTable();

// To add the todo to the localStorage

let addtaskBtn = document.getElementById("addTaskBtn");
addtaskBtn.addEventListener("click", function () {
  let val = document.getElementById("addTodo");
  if (val.value.trim() != 0) {
    let webTask = localStorage.getItem("localtask");
    if (webTask == null) {
      taskObj = [];
    } else {
      taskObj = JSON.parse(webTask);
    }

    taskObj.push(val.value);
    // console.log("Add Task Clicked");
    // console.log(ar);
    localStorage.setItem("localtask", JSON.stringify(taskObj));
  }
  val.value = "";
  displayTable();
});

// .value is used to get the value present inside the textbox

// Display the content in table Format

function displayTable() {
  let val = document.getElementById("tableContent");
  let webTask = localStorage.getItem("localtask");
  if (webTask == null) {
    taskObj = [];
  } else {
    taskObj = JSON.parse(webTask);
  }
  let html = " ";

  taskObj.forEach((item, index) => {
    html += `
      <tr>
      <td>${index + 1}</td>
      <td>${item}</td>
      <td><button type="button" style="border: none;" class="btn btn-small btn-outline-primary" onClick="editTask(${index})" >Edit <i class="fa fa-edit"></i></button></td>
      <td><button type="button" style="border: none;" class="btn btn-small btn-outline-danger" onClick="delTask(${index})" >Delete <i class="fa fa-trash-o"></i></button></td>
  </tr>
      `;
  });
  val.innerHTML = html;
}

// Edit task put the value in add Input box

const editTask = (indx) => {
  let webTask = localStorage.getItem("localtask");
  let taskObj = JSON.parse(webTask);
  let val = taskObj[indx];
  let hiddenEle = document.getElementById("hideEle");
  hiddenEle.innerHTML = indx;
  let valTodo = document.getElementById("addTodo");
  valTodo.value = val;
  let addtaskBtn = document.getElementById("addTaskBtn");
  addtaskBtn.style.display = "none";
  let addsaveBtn = document.getElementById("addSaveBtn");
  addsaveBtn.style.display = "inline-block";
};

// For deleting the clicked Todo's

const delTask = (indx) => {
  let webTask = localStorage.getItem("localtask");
  let taskObj = JSON.parse(webTask);
  if (taskObj != null) {
    taskObj.splice(indx, 1);
    localStorage.setItem("localtask", JSON.stringify(taskObj));
  }

  displayTable();
};

// The save button to save the edit task in localStorage

let addsaveBtn = document.getElementById("addSaveBtn");
addsaveBtn.addEventListener("click", function () {
  let val = document.getElementById("addTodo");
  if (val.value.trim() != 0) {
    let webTask = localStorage.getItem("localtask");

    taskObj = JSON.parse(webTask);

    let hiddenEle = document.getElementById("hideEle");
    let idx = hiddenEle.innerText;
    console.log(idx);
    taskObj[idx] = val.value;
    // console.log("Add Task Clicked");
    // console.log(ar);
    localStorage.setItem("localtask", JSON.stringify(taskObj));
  }
  let addtaskBtn = document.getElementById("addTaskBtn");
  addtaskBtn.style.display = "inline-block";
  let addsaveBtn = document.getElementById("addSaveBtn");
  addsaveBtn.style.display = "none";
  val.value = "";
  displayTable();
});

// Delete the whole todo
let adddeleteAllBtn = document.getElementById("addDeleteBtn");
adddeleteAllBtn.addEventListener("click", function () {
  localStorage.clear();
  displayTable();
});

// Search Bar is here

let searchBar = document.getElementById("searchBar");
searchBar.addEventListener("input", function () {
  let trList = document.querySelectorAll("tr");
  console.log(trList);

  Array.from(trList).forEach((item) => {
    let searchedText = item.getElementsByTagName("td")[1].innerHTML;
    console.log(searchedText);
    let re = new RegExp(searchBar.value, "gi"); // Global Insensitive
    if (searchedText.match(re)) {
      item.style.display = "table-row";
    } else {
      item.style.display = "none";
    }
  });
});
