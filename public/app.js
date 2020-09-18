function storeTask() {
  console.log('Stores the tasks');
  // Javascript
  let taskDescription = document.getElementById('task_description').value;
  console.log('taskDescription', taskDescription);

  let payload = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ description: taskDescription })
  };
  fetch('/tasks', payload)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw "Error en la llamada Ajax";
      }
    })
    .then(task => {
      document.getElementById('task_description').value = '';
      addTask(task);
    })
    .catch(error => {
      console.log('Error: ', error);
    })
}

function addTask(task) {
  let html =
  `
  <div id = "card${task.id}" class="card my-3">
    <div class="card-body">
      <p id = "task${task.id} class="card-text">${task.description}</p>
      <form>
        <a id="doneTask${task.id}" href="javascript:markDone(${task.id});" onclick="doneTask(${task.id});" class="card-link">Done</a>
      </form>
      <form>
        <a id="delete${task.id}" href="javascript:"deleteTaskView(${task.id});";" onclick="deleteTask(${task.id});" class="card-link">Delete</a>
      </form>
    </div>
  </div>
  `;
  let node = document.createRange().createContextualFragment(html);
  document.getElementById('task_list').prepend(node);
}

function doneTask(id) {
  console.log('Mark as done the task');

  let payload = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: id })
  };
  fetch('/update/'+id, payload)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw "Error en la llamada Ajax";
      }
    })
    .then(task => {
      markDone(id)
    })
    .catch(error => {
      console.log('Error: ', error);
    })
}

function markDone(id){
  console.log('donde task');
  let doneEl = document.getElementById('doneTask'+id)
  doneEl.classList.add('text-success')
}

function deleteTask(id) {
  console.log('Delete the task');

  let payload = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: id })
  };
  fetch('/delete/'+id, payload)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw "Error en la llamada Ajax";
      }
    })
    .then(task => {
      deleteTaskView(id)
    })
    .catch(error => {
      console.log('Error: ', error);
    })
}

function deleteTaskView(id){
  let delEl = document.getElementById('delete'+id)
  let task = document.getElementById('card'+id)
  delEl.parentNode.removeChild(task)
}
