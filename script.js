document.addEventListener("DOMContentLoaded", function() {
    // Wait for the DOM to be fully loaded before executing the script
  
    // Function to add a new task to the list
    function addTask() {
      var taskInput = document.getElementById("addTodo"); // Get the input field element
      var taskText = taskInput.value.trim(); // Get and trim the input value
  
      if (taskText !== "") { // Check if the input is not empty
        var todoList = document.getElementById("todoList"); // Get the to-do list element
        var newTask = document.createElement("li"); // Create a new list item
        var taskCheckbox = document.createElement("input"); // Create a new checkbox input
        taskCheckbox.type = "checkbox"; // Set the input type to checkbox
        taskCheckbox.className = "taskCheckbox"; // Add a class to the checkbox
        taskCheckbox.addEventListener("change", updateTaskOrder); // Add an event listener to handle changes in checkbox state
        
        var taskLabel = document.createElement("label"); // Create a new label element
        taskLabel.appendChild(taskCheckbox); // Append the checkbox to the label
        taskLabel.appendChild(document.createTextNode(taskText)); // Append the task text to the label
        
        newTask.appendChild(taskLabel); // Append the label to the new list item
        
        var deleteButton = document.createElement("button"); // Create a new delete button
        deleteButton.className = "deleteBtn"; // Add a class to the delete button
        deleteButton.textContent = "Delete"; // Set the button text
        deleteButton.addEventListener("click", deleteTask); // Add an event listener to handle delete button clicks
        newTask.appendChild(deleteButton); // Append the delete button to the new list item
        
        todoList.appendChild(newTask); // Append the new list item to the to-do list
        taskInput.value = ""; // Clear the input field
  
        // Move checked tasks to the end of the list
        var checkedTasks = todoList.querySelectorAll("li .taskCheckbox:checked"); // Get all checked checkboxes
        checkedTasks.forEach(function(task) {
          todoList.appendChild(task.parentElement.parentElement); // Move each checked task to the end
        });
      } else {
        alert("Please enter a task!"); // Alert the user if the input is empty
      }
    }
  
    // Function to move completed tasks to the end of the list
    function updateTaskOrder(event) {
      var checkbox = event.target; // Get the checkbox that triggered the event
      var todoList = document.getElementById("todoList"); // Get the to-do list element
      var listItem = checkbox.parentElement.parentElement; // Get the parent list item of the checkbox
  
      if (checkbox.checked) {
        todoList.appendChild(listItem); // Move the checked task to the end of the list
      } else {
        todoList.insertBefore(listItem, todoList.firstChild); // Move the unchecked task to the beginning of the list
      }
    }
  
    // Function to delete a task from the list
    function deleteTask(event) {
      var listItem = event.target.parentElement; // Get the parent list item of the delete button
      var todoList = document.getElementById("todoList"); // Get the to-do list element
      todoList.removeChild(listItem); // Remove the list item from the to-do list
    }
  
    // Event listener for the "Add" button
    document.getElementById("add").addEventListener("click", addTask); // Add a click event listener to the "Add" button
  
    // Event delegation for dynamically added checkboxes
    document.getElementById("todoList").addEventListener("change", function(event) {
      if (event.target && event.target.classList.contains("taskCheckbox")) {
        updateTaskOrder(event); // Update the task order when a checkbox state changes
      }
    });
  
    // Event delegation for dynamically added delete buttons
    document.getElementById("todoList").addEventListener("click", function(event) {
      if (event.target && event.target.classList.contains("deleteBtn")) {
        deleteTask(event); // Delete the task when the delete button is clicked
      }
    });
  });
  