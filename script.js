document.addEventListener("DOMContentLoaded", function() {
    // Function to add a new task to the list
    function addTask() {
      var taskInput = document.getElementById("addTodo");
      var taskText = taskInput.value.trim(); // Trim any leading or trailing whitespace
      
      if (taskText !== "") { // Check if input is not empty
        var todoList = document.getElementById("todoList");
        var newTask = document.createElement("li");
        var taskCheckbox = document.createElement("input");
        taskCheckbox.type = "checkbox";
        taskCheckbox.className = "taskCheckbox";
        taskCheckbox.addEventListener("change", updateTaskOrder);
        var taskLabel = document.createElement("label");
        taskLabel.appendChild(taskCheckbox);
        taskLabel.appendChild(document.createTextNode(taskText));
        newTask.appendChild(taskLabel);
        todoList.appendChild(newTask);
        taskInput.value = ""; // Clear the input field
        
        // Move checked tasks to the end of the list
        var checkedTasks = todoList.querySelectorAll("li .taskCheckbox:checked");
        checkedTasks.forEach(function(task) {
          todoList.appendChild(task.parentElement.parentElement);
        });
      } else {
        alert("Please enter a task!"); // Alert if input is empty
      }
    }
    
    // Function to move completed tasks to the end of the list
    function updateTaskOrder(event) {
      var checkbox = event.target;
      var todoList = document.getElementById("todoList");
      var listItem = checkbox.parentElement.parentElement; // Get parent li element
      
      if (checkbox.checked) {
        todoList.appendChild(listItem); // Move the checked task to the end
      } else {
        todoList.insertBefore(listItem, todoList.firstChild); // Move the unchecked task to the beginning
      }
    }
    
    // Event listener for the "Add" button
    document.getElementById("add").addEventListener("click", addTask);
    
    // Event delegation for dynamically added checkboxes
    document.getElementById("todoList").addEventListener("change", function(event) {
      if (event.target && event.target.classList.contains("taskCheckbox")) {
        updateTaskOrder(event);
      }
    });
  });
  
  