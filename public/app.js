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
    <div class="card-body" id="card">
      <p id = "task${task.id} class="card-text">${task.description}</p>
      <form id="done-link">
        <a id="doneTask${task.id}" href="javascript:markDone(${task.id});" onclick="doneTask(${task.id});" class="card-link">Done</a>
      </form>
      <form id="delete-link">
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
        return response.text();
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
  console.log('done task');
  // let doneEl = document.getElementById('doneTask'+id)
  // doneEl.classList.add('text-success')

  let cardBody = document.getElementById('card')
  let doneLink = document.getElementById('done-link')
  let deleteLink = document.getElementById('delete-link')
  let doneEl = document.getElementById('doneTask'+id)
  let delEl = document.getElementById('delete'+id)
  doneLink.removeChild(doneEl);
  deleteLink.removeChild(delEl);
  cardBody.removeChild(cardBody.lastElementChild)
  cardBody.removeChild(cardBody.lastElementChild)
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
        return response.text();
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
  let task = document.getElementById('card'+id)
  task.parentNode.removeChild(task)
}
