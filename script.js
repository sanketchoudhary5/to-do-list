const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Render tasks to the DOM
function renderTasks() {
  taskList.innerHTML = ""; // Clear current list

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
      <span>${task.text}</span>
      <div class="actions">
        <button class="complete-btn">${task.completed ? "Undo" : "Complete"}</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;

    // Mark task as complete/incomplete
    li.querySelector(".complete-btn").addEventListener("click", () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    });

    // Delete task
    li.querySelector(".delete-btn").addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    taskList.appendChild(li);
  });
}

// Add a new task
function addTasks() {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Please enter a task");
    return;
  }

  tasks.push({
    text: taskText,
    completed: false,
  });

  taskInput.value = ""; // Clear input field
  saveTasks();
  renderTasks();
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Event listeners
addTaskBtn.addEventListener("click", addTasks);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTasks();
  }
});

// Initial rendering of tasks
renderTasks();