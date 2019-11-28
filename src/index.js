import {addProject, renderProject, renderTaskButton, renderTodos, renderRemoveProject} from'./rendering.js';
import {storage} from'./storage.js';


const init = () => {
    const form = document.querySelector('.addTodo');
        form.addEventListener('submit', event => {
        event.preventDefault()
    });

    const plus = document.querySelector("#addProject");
    
    plus.addEventListener("click", () => {
        addProject();
        renderProject();
    }); 


    // localStorage.clear(); 
    ////////////////local data storage
    let storageLocal = JSON.parse(window.localStorage.getItem('data'));
  
    if(storageLocal ===null){
    storageLocal = [
          {
            name: 'Default List',
            todos: [
              {
                title:
                  'Welcome to toDoList! Let’s get you started with a few tips: ',
                description: 'You can add todos, edit or remove them!',
                dueDate: '',
                importance:false,
                done: false,
              },
  
              {
                title: 'Set your todos high priority!',
                description:'Toggle your todos completed by clicking the checkbox',
                dueDate: '',
                importance:true,
                done: false,
              }
            ],
          },
        ];
    }

    console.log(storage.length , "storage legnth");
    

    if(storageLocal !== null){
        if(storageLocal != [] && storage.length === 0){
            for( let i = 0; i < storageLocal.length; i++){
                storage.push(storageLocal[i]);
                console.log(storage, "storage");

              //add every project saved 
              //from previous interaction to the local storage

            }

            //storage[x] = individual project
            for (let x = 0; x < storage.length; x++){
              const addTodoMethod = "addTodo";
              const toggleImpMethod = "toggleImportance"; 
              const toggleDoneMethod = "toggleDone"; 
              
              storage[x][addTodoMethod] = function (todo){
                this.todos.push(todo);
              };
            

              for(let y = 0; y < storage[x].todos.length; y++){
                storage[x].todos[y][toggleImpMethod] = function () {
                  this.importance = this.importance === false? true:false;
                  
                };

                storage[x].todos[y][toggleDoneMethod] = function(){
                  this.done = this.done === false? true: false;
                } 
              
                    
              }
                
          }



            
          renderProject();
          renderRemoveProject(storage[0],storage);
          renderTodos(storage[0]); 
          renderTaskButton(storage[0]);
            if(storage[0] == undefined){
              return; 
            }

     
        }
    }
}

init();

