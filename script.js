document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task-input");
    const dueDateInput = document.getElementById("due-date-input");
    const statusInput = document.getElementById("status-input");
    const addTaskBtn = document.getElementById("add-task-btn");
    const taskList = document.getElementById("task-list");
    const filterBtn = document.getElementById("filter-btn");
;
    // Load tasks from localStorage
    const loadTasks = () => {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.forEach((task) => {
        addTaskToDOM(task.text, task.dueDate, task.status, task.completed);
      });
    };
  
    // Save tasks to localStorage
    const saveTasks = () => {
      const tasks = [];
      document.querySelectorAll(".task-item").forEach((taskItem) => {
        tasks.push({
          text: taskItem.querySelector(".task-text").textContent,
          dueDate: taskItem.querySelector(".due-date").textContent,
          priority: taskItem.querySelector(".status").textContent,
          completed: taskItem.classList.contains("completed"),
        });
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    };
  
    // Add task to the DOM
    const addTaskToDOM = (taskText, dueDate, status, isCompleted = false) => {
      const taskRow = document.createElement("tr");
      taskRow.className = "task-item";
      if (isCompleted) {
        taskRow.classList.add("completed");
      }
  
      taskRow.innerHTML = `
        <td class="task-text">${taskText}</td>
        <td class="due-date">${dueDate || "No due date"}</td>
        <td class="priority ${status}">${status}</td>
        <td>
          <div class="task-buttons">
            <button class="complete-btn">Complete</button>
            <button class="delete-btn">Delete</button>
          </div>
        </td>
      `;
  
      // Add button functionality
      taskRow.querySelector(".complete-btn").addEventListener("click", () => {
        taskRow.classList.toggle("completed");
        saveTasks();
      });
  
      taskRow.querySelector(".delete-btn").addEventListener("click", () => {
        taskList.removeChild(taskRow);
        saveTasks();
      });
  
      taskList.appendChild(taskRow);
      saveTasks();
    };
  
    // Add Task Button Listener
    addTaskBtn.addEventListener("click", () => {
      const taskText = taskInput.value.trim();
      const dueDate = dueDateInput.value;
      const status = statusInput.value;
  
      if (taskText === "") {
        alert("Please enter a task!");
        return;
      }
  
      addTaskToDOM(taskText, dueDate, status);
      taskInput.value = "";
      dueDateInput.value = "";
    });
  
    // Event Listeners for Filters
    filterBtn.addEventListener("click", filterTasks => {
      searchInput.value = "";
      filterPriority.value = "";
      filterDate.value = "";
      filterTasks();
    });
  
    // Initialize by loading tasks
    loadTasks();
  });


