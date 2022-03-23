import { Todo } from "./todo.class";

export class TodoList {
    constructor() {
        //this.todos = [];
        this.loadLocalStorage();
    }

    newTodo(todo) {
        this.todos.push(todo);
        this.saveLocalStorage();
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id != id)
        this.saveLocalStorage();
    }

    checkComplete(id) {
        for (const todo of this.todos) {
            if (todo.id == id) {
                todo.completado = !todo.completado;
                this.saveLocalStorage();
                break;
            }
        }
    }

    deleteAllComplete() {
        this.todos = this.todos.filter(todo => !todo.completado)
        this.saveLocalStorage();
    }

    saveLocalStorage() {
        localStorage.setItem('todo', JSON.stringify(this.todos));
    }

    loadLocalStorage() {
        this.todos = (localStorage.getItem('todo'))
            ? JSON.parse(localStorage.getItem('todo'))
            : [];

        //this.todos = this.todos.map(obj => Todo.fromJson(obj));
        this.todos = this.todos.map(Todo.fromJson);
    }
}