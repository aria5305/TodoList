function Todo(title, description, duedate) {
    return {
        title, 
        duedate,
        description,
        done:false,
        importance:false,
        toggleDone(){
           this.done = this.done === false? true: false;
        },
        toggleImportance (){
            this.importance = this.importance === false? true:false;
        }
    }
}

export {Todo}; 