let elForm = document.querySelector('.form');
let elInputName = document.querySelector('.todoName');
let elInputEmail = document.querySelector('.todoEmail');
let elInputPassword = document.querySelector('.todoPasswors');
let elTodoList = document.querySelector('.todoList');

let allTodos = [
  {
    name: 'Todos',
    password: 'elInputPassword',
    email: 'elInputEmail',
    todoId: 1,
  },
];

let handleTodoId;

renderTodos(allTodos);

function elCreater(elType) {
  const elementName = document.createElement(elType);
  return elementName;
}

function textContCreater(elTextCont, elAllTodoValue) {
  elTextCont.textContent = elAllTodoValue;
  const content = elTextCont;
  return content;
}

function renderTodos(todos) {
  elTodoList.innerHTML = '';
  todos.forEach((todo) => {
    let elLi = elCreater('li');
    let elDivBtns = elCreater('div');
    elDivBtns.setAttribute('class', 'btn_wrapper');
    let elParagName = elCreater('p');
    let elParagEmail = elCreater('p');
    let elParagPassword = elCreater('p');
    let elEditButton = elCreater('button');
    let elDeleteButton = elCreater('button');
    elEditButton.setAttribute('class', 'btn btnEdit');
    elDeleteButton.setAttribute('class', 'btn btnDelete');
    let elParagNameCont = textContCreater(elParagName, todo.name);
    let elParagEmailCont = textContCreater(elParagEmail, todo.email);
    let elParagPasswordCont = textContCreater(elParagPassword, todo.password);
    textContCreater(elEditButton, 'Edit Todo');
    textContCreater(elDeleteButton, 'Delete Todo');
    elLi.setAttribute('data-todo-id', todo.todoId);
    elLi.setAttribute('class', 'todoLi');
    let elLiDataId = Number(elLi.dataset.todoId);

    elDivBtns.append(elEditButton, elDeleteButton);
    elLi.append(
      elParagNameCont,
      elParagEmailCont,
      elParagPasswordCont,
      elDivBtns
    );
    elTodoList.appendChild(elLi);
    elDeleteButton.addEventListener('click', () => {
      let newTodos = allTodos.filter((todo) => elLiDataId !== todo.todoId);
      allTodos.length = 0;
      allTodos.push(...newTodos);
      renderTodos(allTodos);
      // console.log(elLiDataId, '< data-id :  todo-id >', todo.todoId);
    });
    elEditButton.addEventListener('click', () => {
      let findedTodo = allTodos.find((todo) => todo.todoId === elLiDataId);
      handleTodoId = findedTodo.todoId;
      elInputName.value = findedTodo.name;
      elInputEmail.value = findedTodo.email;
      elInputPassword.value = findedTodo.password;
    });
  });
}

elForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (handleTodoId) {
    console.log('first');
    let findUserById = allTodos.find((todo) => handleTodoId === todo.todoId);
    findUserById.name = elInputName.value;
    findUserById.password = elInputPassword.value;
    findUserById.email = elInputEmail.value;
    handleTodoId = '';
    console.log(findUserById);
    renderTodos(allTodos);
  } else if (elInputName.value && elInputEmail.value && elInputPassword.value) {
    let newTodo = {
      name: elInputName.value.trim(),
      email: elInputEmail.value.trim(),
      password: elInputPassword.value.trim(),
      todoId: allTodos.length + 1,
    };
    allTodos.push(newTodo);
    renderTodos(allTodos);
    elForm.reset();
  } else {
    alert('Please enter a name or email');
  }
});
