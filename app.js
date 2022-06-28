//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterToDo);
function addTodo(event) {
	event.preventDefault();

	//Create LI
	const todoDiv = document.createElement("div");
	todoDiv.classList.add("todo");

	const newTodo = document.createElement("li");
	newTodo.innerText = todoInput.value;

	newTodo.classList.add("todo-item");
	todoDiv.appendChild(newTodo);

	//ADD TODO TO LOCAL STORAGE
	saveLocalTodos(todoInput.value);

	//CHECK MARK BUTTON

	const completedButton = document.createElement("button");
	completedButton.innerHTML = '<i class="fa fa-check" ></i>';
	completedButton.classList.add("complete-btn");
	todoDiv.appendChild(completedButton);

	const trashButton = document.createElement("button");
	trashButton.innerHTML = '<i class="fas fa-trash" ></i>';
	trashButton.classList.add("trash-btn");
	todoDiv.appendChild(trashButton);

	//APPEND TO LİST
	todoList.appendChild(todoDiv);
	todoInput.value = "";
}

function deleteCheck(e) {
	const item = e.target;
	if (item.classList[0] === "trash-btn") {
		const todo = item.parentElement;
		//ANIMATONS
		todo.classList.add("fall");
		deleteLocalTodo(todo);
		todo.addEventListener("transitionend", function () {
			//adding transitionend when transition end will use this function
			todo.remove();
		});
	} else if (item.classList[0] === "complete-btn") {
		const todo = item.parentElement;
		todo.classList.toggle("Completed");
	}
}
function filterToDo(e) {
	const todos = todoList.childNodes;
	todos.forEach(function (todo) {
		switch (e.target.value) {
			case "All":
				todo.style.display = "flex";
				break;
			case "Completed":
				if (todo.classList.contains("Completed")) {
					todo.style.display = "flex";
				} else {
					todo.style.display = "none";
				}
				break;
			case "Uncompleted":
				if (todo.classList.contains("Completed")) {
					todo.style.display = "none";
				} else {
					todo.style.display = "flex";
				}
				break;
		}
	});
}

function saveLocalTodos(todo) {
	let todos;
	if (localStorage.getItem("todos") == null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}
	todos.push(todo);
	localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
	let todos;
	if (localStorage.getItem("todos") == null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}
	todos.forEach(function (todo) {
		const todoDiv = document.createElement("div");
		todoDiv.classList.add("todo");

		const newTodo = document.createElement("li");
		newTodo.innerHTML = todo;
		newTodo.classList.add("todo-item");
		todoDiv.appendChild(newTodo);

		const completedButton = document.createElement("button");
		completedButton.innerHTML = '<i class="fa fa-check" ></i>';
		completedButton.classList.add("complete-btn");
		todoDiv.appendChild(completedButton);

		const trashButton = document.createElement("button");
		trashButton.innerHTML = '<i class="fas fa-trash" ></i>';
		trashButton.classList.add("trash-btn");
		todoDiv.appendChild(trashButton);

		//APPEND TO LİST
		todoList.appendChild(todoDiv);
	});
}
function deleteLocalTodo(todo) {
	let todos;
	if (localStorage.getItem("todos") == null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}
	const todoIndex = todo.childNodes[0].innerText;
	todos.splice(todos.indexOf(todoIndex), 1);
	localStorage.setItem("todos", JSON.stringify(todos));
}
