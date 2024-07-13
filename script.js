document.addEventListener("DOMContentLoaded", function() {
    // Function to add a new task to the list
    function addTask() {
      var taskInput = document.getElementById("addTodo");
      var taskText = taskInput.value.trim(); // Trim any leading or trailing whitespace
  
      if (taskText !== "") { // Check if input is not empty
        var todoList = document.getElementById("todoList");
        var newTask = document.createElement("li");
        newTask.textContent = taskText;
        todoList.appendChild(newTask);
        taskInput.value = ""; // Clear the input field
      } else {
        alert("Please enter a task!"); // Alert if input is empty
      }
    }
  
    // Event listener for the "Add" button
    document.getElementById("add").addEventListener("click", addTask);
  });
  