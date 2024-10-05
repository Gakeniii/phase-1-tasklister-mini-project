//Arranged according to the instructions given
document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById('create-task-form');
  const taskInput= document.getElementById('new-task-description')
  const userInput = document.getElementById('user-input')
  const durationInput = document.getElementById('duration')
  const dateInput = document.getElementById('due-date')
  const priorityBtn = document.getElementById('priority-value');
  const sorting = document.getElementById('sort')
  const inputedTasks = document.getElementById('tasks');

  let tasks =[];

// UI LOGIC
//Preventing the default behaviour of the submit btn
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    addTasks()
    outputTasks();
    form.reset();
  });


//Buttons for editing and deleting tasks and priority values
  inputedTasks.addEventListener('click', (e)=> {
    const taskId = e.target.parentElement.remove();
    if(e.target.classList.contains('delete')) {
      taskDelete(taskId);    
    }else if(e.target.classList.contains('edit')) {
      taskEdit(taskId);
    }
  });

  sorting.addEventListener('change', outputTasks())

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
    tasks = tasks.filter(task => task.id != id);
    outputTasks();
  }

//Edit task 
  function taskEdit() {
    const task = tasks.find(task => task.id);
    if(task){
      taskInput.value = task.description;
      userInput.value = task.user;
      durationInput.value = task.duration;
      dateInput.value = task.dueDate;
      // priorityInput.value = task.priority;
      // tasks = tasks.filter(task => task.id != id);
      taskDelete(id);
    }
  }

// Sorting by using the inbuilt JavaScript command priority and sortSelect
  function outputTasks(){
    inputedTasks.innerHTML= "";

    const sortTasks = [...tasks].sort((a, b) => {
      const priorityValues = {low:1, medium:2, high:3};
      return sorting.value === 'asc'
        ? priorityValues[a.priority]-priorityValues[b.priority] 
        : priorityValues[b.priority]-priorityValues[a.priority]
    });
  
// The updated task
    sortTasks.forEach(task => {
      const li = document.createElement('li');
      li.dataset.id = task.id;
      
      li.className = getPriorityClass(task.priority);
      li.innerText = ` ${task.description}  ${task.user} :${task.duration} Due ${task.dueDate}`;
      
      //delete button
      // const deleteBtn = document.createElement('button');
      // deleteBtn.className = 'delete';
      // deleteBtn.textContent = 'X';
      // deleteBtn.setAttribute('class','btn btn-danger','btn-sm')

      const btnDelete = document.createElement('button')
      btnDelete.className = 'delete';
      btnDelete.textContent = 'X'
      btnDelete.setAttribute('class', 'btn btn-danger btn-remove')

      //edit button
      const editBtn = document.createElement('button')
      editBtn.className = 'edit'
      editBtn.textContent = 'Edit'
      
      li.appendChild(btnDelete)
      li.appendChild(editBtn)

      inputedTasks.appendChild(li)
    });
  }

    function getPriorityClass(priority){
      return priority === 'high' ? 'red' : priority === 'medium' ? 'yellow' : 'green';
    };
});



