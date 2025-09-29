const todoList = [{
  name: 'review course',
  dueDate: '2025-09-29'
}];

renderTodoList();

function renderTodoList() {
  let todoListHTML = '';
  var e=0;
  for (let x of todoList){
    var html =  `
        <h>${x.name}</h>
        <h>${x.dueDate}</h>
        <button id="delete-${e++}" class="delete-todo-button js-delete-todo-button">Delete</button>
      `;
    todoListHTML=todoListHTML+html;
     
  }
  document.querySelector('.js-todo-list').innerHTML = todoListHTML;
  console.log(todoListHTML);
  
  for (let i = 0; i < todoList.length; i++) {
  const button = document.getElementById(`delete-${i}`);
  button.addEventListener('click', () => {
    todoList.splice(i, 1);  
    renderTodoList();      
  });
}
  // Loop over every toDo object and append it to "todoListHTML"
  // Show the objects inside the class "js-todo-list"
  // Loop over evey delete button and add an eventListener that deletes the toDo and rerender the Tasks


}

document.querySelector('.js-add-todo-button')
  .addEventListener('click', () => {
    addTodo();
  });

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;

  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;

  // Add these values to the variable "todoList"
  const todo = {name,dueDate};
  todoList.push(todo);
  console.log(todoList);


  inputElement.value = '';

  renderTodoList();
}