document.addEventListener("DOMContentLoaded", function() {
    let draggedTask = null; // Variable to hold the currently dragged task
  
    // Function to add a new task to the list
    function addTask(taskText) {
      var todoList = document.getElementById("todoList"); // Get the to-do list element
      var newTask = document.createElement("li"); // Create a new list item
      newTask.draggable = true; // Enable dragging for the new task
      
      // Add dragstart event listener
      newTask.addEventListener('dragstart', () => {
        draggedTask = newTask;
        newTask.classList.add('dragging');
      });
      
      // Add dragend event listener
      newTask.addEventListener('dragend', () => {
        newTask.classList.remove('dragging');
        draggedTask = null;
      });
      
      var taskCheckbox = document.createElement("input"); // Create a new checkbox input
      taskCheckbox.type = "checkbox"; // Set the input type to checkbox
      taskCheckbox.className = "taskCheckbox"; // Add a class to the checkbox
      
      // Add event listener to handle changes in checkbox state
      taskCheckbox.addEventListener("change", function() {
        if (this.checked) {
          todoList.appendChild(newTask); // Move checked task to the end of the list
        }
      });
      
      var taskLabel = document.createElement("label"); // Create a new label element
      taskLabel.appendChild(taskCheckbox); // Append the checkbox to the label
      taskLabel.appendChild(document.createTextNode(taskText)); // Append the task text to the label
      newTask.appendChild(taskLabel); // Append the label to the new list item
      
      var deleteButton = document.createElement("button"); // Create a new delete button
      deleteButton.className = "deleteBtn"; // Add a class to the delete button
      deleteButton.textContent = "Delete"; // Set the button text
      
      // Add event listener to handle delete button clicks
      deleteButton.addEventListener("click", function() {
        deleteTask(newTask);
      });
      
      newTask.appendChild(deleteButton); // Append the delete button to the new list item
      
      todoList.insertBefore(newTask, todoList.firstChild); // Insert new task at the top of the list
    }
    
    // Function to delete a task from the list
    function deleteTask(task) {
      var todoList = document.getElementById("todoList"); // Get the to-do list element
      todoList.removeChild(task); // Remove the list item from the to-do list
    }
    
    // Event listener for the "Add" button
    document.getElementById("add").addEventListener("click", function() {
      var taskInput = document.getElementById("addTodo"); // Get the input field element
      var taskText = taskInput.value.trim(); // Get and trim the input value
      if (taskText !== "") { // Check if the input is not empty
        addTask(taskText); // Add the new task
        taskInput.value = ""; // Clear the input field
      } else {
        alert("Please enter a task!"); // Alert the user if the input is empty
      }
    });
  
    // Function to handle dragging over the to-do list
    document.getElementById("todoList").addEventListener("dragover", function(event) {
      event.preventDefault(); // Allow drop
      const afterTask = getAfterTask(event.clientY); // Get the task after which the dragged task should be placed
      const parent = document.getElementById("todoList"); // Get the to-do list element
      if (afterTask === null) {
        parent.appendChild(draggedTask); // Append dragged task at the end if no task is found after
      } else {
        parent.insertBefore(draggedTask, afterTask); // Insert dragged task before the found task
      }
    });
  
    // Function to handle dropping the dragged task
    document.getElementById("todoList").addEventListener('drop', function(event) {
      event.preventDefault(); // Prevent default drop action
      const parent = document.getElementById("todoList"); // Get the to-do list element
      parent.insertBefore(draggedTask, event.target); // Insert dragged task at the drop target
    });
  
    // Function to find the task after the current position of the dragged task
    function getAfterTask(y) {
      const tasks = [...document.querySelectorAll('#todoList li:not(.dragging)')]; // Get all list items except the one being dragged
      return tasks.reduce((closest, task) => {
        const box = task.getBoundingClientRect(); // Get bounding box of the task
        const offset = y - box.top - box.height / 2; // Calculate offset
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, task: task };
        } else {
          return closest;
        }
      }, { offset: Number.NEGATIVE_INFINITY }).task; // Return the closest task
    }
  
    // Apply drag and drop functionality to existing tasks
    const tasks = document.querySelectorAll('#todoList li'); // Get all existing list items
    tasks.forEach(task => {
      task.draggable = true; // Enable dragging for each task
      
      // Add dragstart event listener
      task.addEventListener('dragstart', () => {
        draggedTask = task;
        task.classList.add('dragging');
      });
      
      // Add dragend event listener
      task.addEventListener('dragend', () => {
        task.classList.remove('dragging');
        draggedTask = null;
      });
  
      const deleteButton = task.querySelector('.deleteBtn'); // Get the delete button of the task
      deleteButton.addEventListener('click', function() {
        deleteTask(task); // Add event listener to handle delete button clicks
      });
  
      const taskCheckbox = task.querySelector('.taskCheckbox'); // Get the checkbox of the task
      taskCheckbox.addEventListener('change', function() {
        if (this.checked) {
          document.getElementById('todoList').appendChild(task); // Move checked task to the end of the list
        }
      });
    });
  
    // Move checked tasks to the end of the list
    const checkedTasks = document.querySelectorAll('#todoList li .taskCheckbox:checked'); // Get all checked checkboxes
    checkedTasks.forEach(task => {
      document.getElementById('todoList').appendChild(task.parentElement.parentElement); // Move each checked task to the end
    });
  });
  