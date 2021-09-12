// getting all required elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer Button");

inputBox.addEventListener("keyup",(e) =>{
  if (e.which === 13){
    addBtn.click()
  }
})

inputBox.onkeyup = () => {
  let userData = inputBox.value; // getting user entered value
  if (userData.trim() != 0) {
    //if user values aren't only spaces
    addBtn.classList.add("active"); //active the add button
  } else {
    addBtn.classList.remove("active"); //unactive the add button
  }
};
showTasks(); //calling showTask function

// if user click on the add button

addBtn.setAttribute("onclick", `addFunc()`);

function addFunc(index) {
  console.log(index)
  if (index === undefined) {
    console.log("nnn")
    let userData = inputBox.value; //getting user entered value
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localStorage
    if (getLocalStorage == null) {
      //if local storage is null
      listArr = []; //creating blank array
    } else {
      listArr = JSON.parse(getLocalStorage); //transforming json string into a js object
    }
    listArr.push(userData); //pushing or adding user data
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a js string
    showTasks(); //calling showTask function
    addBtn.classList.remove("active"); //unactive the add button
  } else {
    
    addBtn.setAttribute('onclick',`addFunc()`);
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    console.log(index)
    // listArr[index].value="";
    listArr[index]= inputBox.value;
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming json string into a js object
    showTasks();

    
    

  }
}

// function to add li tags inside ul tag
function showTasks() {
  let getLocalStorage = localStorage.getItem("New Todo"); //getting localStorage
  if (getLocalStorage == null) {
    //if local storage is null
    listArr = []; //creating blank array
  } else {
    listArr = JSON.parse(getLocalStorage); //transforming json string into a js object
  }
  const pendingNumb = document.querySelector(".pendingNumb");
  pendingNumb.textContent = listArr.length; //passing the length value in pendingNumb
  if (listArr.length > 0) {
    deleteAllBtn.classList.add("active");
  } else {
    deleteAllBtn.classList.remove("active");
  }
  let newLiTag = "";
  listArr.forEach((element, index) => {
    newLiTag += `<li class="ui-state-default">${element} <span onclick="deleteTask(${index})" ><i class="fas fa-trash" ></i></span>
    <span class="edit" onclick="editTask(${index})" ><i class="fas fa-pen"></i></span>

        </li>`;
  });
  todoList.innerHTML = newLiTag; //adding new li tag inside ul tag
  inputBox.value = ""; //once task added leave the input field blank
}

//delete task function
function deleteTask(index) {
  let getLocalStorage = localStorage.getItem("New Todo"); //getting localStorage
  listArr = JSON.parse(getLocalStorage);
  listArr.splice(index, 1); //delete or remove the particular index li
  //after remove li again update the local storage
  localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming json string into a js object
  showTasks();
  console.log("yep1");
}

// delete all tasks function
deleteAllBtn.onclick = () => {
  listArr = []; //empty an array
  //after delete all tasks again update the local storage
  localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming json string into a js object
  showTasks();
};

// edit task function
function editTask(index) {
  inputBox.value = listArr[index];
  addBtn.setAttribute('onclick',`addFunc(${index})`);
  console.log("yep2");
  console.log("index :" + index);
  console.log(listArr)
}


