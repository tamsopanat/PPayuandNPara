//getting all required elements
localStorage.clear();
const inputBox = document.querySelector(".inputBlock input");
const addBtn = document.querySelector(".inputBlock button")
const taskList = document.querySelector(".taskList")
const delAllBtn = document.querySelector(".footer button")

inputBox.onkeyup = () => {
    let userData = inputBox.value; //getting user entered value
    if (userData.trim() != 0) { //if user values aren't only spaces
        addBtn.classList.add("active"); //active the add btn
    } else {
        addBtn.classList.remove("active")
    }
}
//if user click on the add button
addBtn.onclick = () => {
    let userData = inputBox.value; //getting user entered value
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage
    if (getLocalStorage == null) { //if localStorage is null
        listArr = []; //create empty array
    } else {
        listArr = JSON.parse(getLocalStorage);
    }
    listArr.push(userData); //adding user data
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js obj into a json str
    showTasks(); //calling showTasks function
}

// fucntion to add task list inside ul
function showTasks() {
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage
    if (getLocalStorage == null) { //if localStorage is null
        listArr = []; //create empty array
    } else {
        listArr = JSON.parse(getLocalStorage);
    }

    const taskNum = document.querySelector(".taskNum");
    taskNum.textContent = listArr.length; //passing the length value in taskNum
    if (listArr.length > 0) { //if array is not empty
        delAllBtn.classList.add("active");
    } else {
        delAllBtn.classList.remove("active")
    }

    let newLiTag = '';
    listArr.forEach((element, index) => {
        newLiTag += '<li><input type="checkbox" class="checkbox"/><label><label>' + element + '</label><span onclick="deleteTask(' + index + ')"><i class="fas fa-trash"></i></span></li>';
    })
    taskList.innerHTML = newLiTag; //adding new li tag inside ul tag
    inputBox.value = ''; //once task added leave the input field blank
    addBtn.classList.remove("active")

    const checkboxes = document.querySelectorAll('.checkbox');
    console.log(checkboxes)
    checkboxes.forEach((element) =>{
        console.log(element)
        element.addEventListener('change', function () {
            const task = element.nextElementSibling;
            if (element.checked) {
                task.style.textDecoration = 'line-through';
            } else {
                task.style.textDecoration = 'none';
            }
        });
    });
}

//delete task function
function deleteTask(index) {
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1); //delete the particular indexde li
    //Update the local storage
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks();
}


//delete all tasks button
delAllBtn.onclick = () => {
    listArr = []; //empty an array
    //Update the local storage
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks();
}

