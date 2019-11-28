function Project (name) {
    return {
        name, 
        todos: [], 
        addTodo(todo){
            this.todos.push(todo);
        }
    };
}

export {Project}; 