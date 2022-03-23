import { Todo } from '../classes';
import { todoList } from '../index';

//Referencias en el HTML
const divTodoList   = document.querySelector('.todo-list');
const txtInput      = document.querySelector('.new-todo');
const btnDeleteAll  = document.querySelector('.clear-completed');
const ulFilter      = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = (todo) => {
    const htmlTodo = `
    <li class="${(todo.completado) ? 'completed' : ''}" data-id="${todo.id}">
		<div class="view">
			<input class="toggle" type="checkbox" ${(todo.completado) ? 'checked' : ''}>
			<label>${todo.tarea}</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
    </li>
    `;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    divTodoList.append(div.firstElementChild);
    return div.firstElementChild;
}

//EVENTOS
txtInput.addEventListener('keyup', (event) => {
    if (event.keyCode === 13 && txtInput.value.length > 0) {
        const newTodo = new Todo(txtInput.value);
        todoList.newTodo(newTodo);

        crearTodoHtml(newTodo);
        txtInput.value = '';
    }

});

divTodoList.addEventListener('click', (event) => {

    const nameElement = event.target.localName;// input, label, button 
    const todoElement = event.target.parentElement.parentElement;
    const todoId = todoElement.getAttribute('data-id');

    if (nameElement.includes('input')) {
        todoList.checkComplete(todoId);
        todoElement.classList.toggle('completed');
    } else if (nameElement.includes('button')) {
        todoList.deleteTodo(todoId);
        divTodoList.removeChild(todoElement);
    }


});

btnDeleteAll.addEventListener('click', () => {
    todoList.deleteAllComplete();
    for (let i = divTodoList.children.length - 1; i >= 0; i--) {
        const elemento = divTodoList.children[i];
        if (elemento.classList.contains('completed')) {
            divTodoList.removeChild(elemento);
        }
    }
});

ulFilter.addEventListener('click', () => {
    const filtro = event.target.text;
    if (!filtro) { return; }
    
    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    for (const elemento of divTodoList.children) {
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');
        switch (filtro) {
            case 'Pendientes':
                if (completado) {
                    elemento.classList.add('hidden')
                }
                break;
                case 'Completados':
                    if (!completado) {
                        elemento.classList.add('hidden')
                    }
                    break;                
        }

    }
});