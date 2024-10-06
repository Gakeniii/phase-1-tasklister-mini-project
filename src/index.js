document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('create-task-form');
  const taskInput = document.getElementById('new-task-description');
  const userInput = document.getElementById('user-input');
  const durationInput = document.getElementById('duration');
  const dateInput = document.getElementById('due-date');
  const priorityBtn = document.getElementById('priority-value');
  const sorting = document.getElementById('sort');
  const inputedTasks = document.getElementById('tasks');

  let tasks = [];

  // Prevent the default behaviour of the submit button
  form.addEventListener('submit', (e) => {
      e.preventDefault();
      addTasks();
      outputTasks();
      form.reset();
  });

  // Sorting event listener
  sorting.addEventListener('change', outputTasks);

  function addTasks() {
      const task = {
          id: Date.now(),
          description: taskInput.value,
          user: userInput.value,
          duration: durationInput.value,
          dueDate: dateInput.value,
          priority: priorityBtn.value
      };
      tasks.push(task);
  }

  // Delete task 
  function taskDelete(id) {
      tasks = tasks.filter(task => task.id !== id); // Update tasks array
      outputTasks(); // Refresh task display
  }

  // Edit task 
  function taskEdit(id) {
      const task = tasks.find(task => task.id === id);
      if (task) {
          taskInput.value = task.description;
          userInput.value = task.user;
          durationInput.value = task.duration;
          dateInput.value = task.dueDate;
          priorityBtn.value = task.priority;
          taskDelete(id); // Remove the task to allow re-adding with updated info
      }
  }

  // Output tasks and sorting
  function outputTasks() {
      inputedTasks.innerHTML = "";

      const sortTasks = [...tasks].sort((a, b) => {
          const priorityValues = { low: 1, medium: 2, high: 3 };
          return sorting.value === 'asc'
              ? priorityValues[a.priority] - priorityValues[b.priority]
              : priorityValues[b.priority] - priorityValues[a.priority];
      });

      sortTasks.forEach(task => {
          const li = document.createElement('li');
          li.dataset.id = task.id;
          li.className = getPriorityClass(task.priority);
          li.innerText = ` ${task.description}  ${task.user} : ${task.duration} : Due ${task.dueDate}  `;

          // Delete button
          const btnDelete = document.createElement('button');
          btnDelete.className = 'delete';
          btnDelete.textContent = 'X';
          btnDelete.classList.add('btn', 'btn-danger', 'btn-remove');

          btnDelete.addEventListener('click', () => {
              taskDelete(task.id); // Use task ID for deletion
          });

          // Edit button
          const editBtn = document.createElement('button');
          editBtn.className = 'edit';
          editBtn.textContent = 'Edit';
          editBtn.classList.add('btn', 'btn-primary');

          editBtn.addEventListener('click', () => {
              taskEdit(task.id); // Use task ID for editing
          });

          li.appendChild(btnDelete);
          li.appendChild(editBtn);
          inputedTasks.appendChild(li);
      });
  }

  function getPriorityClass(priority) {
      return priority === 'high' ? 'red' : priority === 'medium' ? 'yellow' : 'green';
  }
});
