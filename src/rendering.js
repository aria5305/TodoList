import{Project} from "./project.js"; 
import {Todo} from "./todos.js";
import {storage} from "./storage.js";


const addProject = () => {

    const name = prompt("what's the name of your new list/project?");
        
    if(name === null){
        alert("you must enter a name for new to do list");
        return;
    }

    let project = new Project(name);
    storage.push(project);
    // return storage;
}



const addTodo = project => {
    const title = document.querySelector(".list__add").value; 
    const description = document.querySelector(".list__add-describe").value;
    const date = document.querySelector(".list__add-duedate").value;
    const todo = new Todo(title,description,date);
    project.addTodo(todo);
    renderTodos(project);
}


const renderRemoveProject = (project, storage) => {
    let headerContainer = document.querySelector(".task__header-left");
    let icon = document.createElement("i"); 
    icon.classList.add("fas", "fa-trash"); 

    headerContainer.appendChild(icon); 

    let index = storage.indexOf(project); 

    icon.addEventListener("click", ()=> {
        storage.splice(index, 1);
        console.log(storage);
        renderProject();

        if (document.querySelector(".plussign")) {
            let addTodoButton = document.querySelector(".plussign");
            addTodoButton.parentNode.removeChild(addTodoButton);
        }

        if (document.querySelector('.list__add')) {
            let add = document.querySelector('.list__add');
            add.parentNode.removeChild(add);
            const container = document.querySelector(".inputfieldContainer");
            container.parentNode.removeChild(container);

            
            let submit = document.querySelector(".btn-submit");
            let cancel = document.querySelector(".btn-cancel");
            let form = document.querySelector(".addTodo");
            form.removeChild(submit);
            form.removeChild(cancel);
            
           
            
          
        }
        window.localStorage.setItem("data", JSON.stringify(storage));

        if(document.querySelector(".todo")){
        renderTodos(storage[0]);
        renderTaskButton(storage[0]); 
        }
    })

}

const renderProject = () =>{

    let list = document.querySelectorAll(".todo");
    list.forEach(function(el) {
      el.parentNode.removeChild(el);
    });


    for(let project of storage){
        const lastChild = document.querySelector("#addProject");
        const projectList = document.querySelector(".taskBar");

        let li = document.createElement("li"); 
        li.classList.add("taskBar__item", "todo");

        let icon = document.createElement("i");
        icon.classList.add("fas", "fa-sun");

        let projectName = document.createElement("span");
        projectName.classList.add("taskBar__title"); 
        projectName.textContent = project.name; 

        li.appendChild(icon);
        li.appendChild(projectName);

        projectList.insertBefore(li, lastChild);

        //when clicked on the project name - shows up with corresponding todos
        li.addEventListener("click", () => {
            renderTodos(project); 
         
            if (document.querySelector(".plussign")) {
                let addTodoButton = document.querySelector(".plussign");
                addTodoButton.parentNode.removeChild(addTodoButton);
            }

            window.localStorage.setItem("data", JSON.stringify(storage));

            if (document.querySelector('.list__add')) {
                let add = document.querySelector('.list__add');
                add.parentNode.removeChild(add);
                const container = document.querySelector(".inputfieldContainer");
                container.parentNode.removeChild(container);

                
                let submit = document.querySelector(".btn-submit");
                let cancel = document.querySelector(".btn-cancel");
                let form = document.querySelector(".addTodo");
                form.removeChild(submit);
                form.removeChild(cancel);
            }

            if(document.querySelector(".fa-trash")){
                let deleteBtn = document.querySelector(".fa-trash"); 
                deleteBtn.parentNode.removeChild(deleteBtn);
            }


            renderRemoveProject(project, storage);
            renderTaskButton(project); 
         

        });
       
    
    }
    console.log(storage);
}



const renderTaskButton = (project) => {
    // const inputCon = document.querySelector(".task__inputContainer");
    const taskBtn = document.createElement("div"); 
    const form = document.querySelector(".addTodo");
    taskBtn.classList.add("plussign"); 
    form.insertAdjacentElement("beforebegin",taskBtn);

    taskBtn.addEventListener("click", () => {
        
        if(!document.querySelector(".list__add")){
            renderinputField(project);
            window.localStorage.setItem("data", JSON.stringify(storage));
        }else{
           
            form.classList.toggle("hide");
        }
    });

  
};

const renderinputField  = (project) => {

        console.log(project, "InputField")
        const form = document.querySelector(".addTodo");
        const todo = document.createElement("input"); 
        todo.type = "text"; 
        todo.classList.add("list__add", "getValue");
        todo.placeholder = "Add task here"; 
        form.appendChild(todo); 


    
        const container = document.createElement("div"); 
        container.classList.add("inputfieldContainer"); 
        
        const desc = document.createElement("input"); 
        const label = document.createElement("label");
        label.classList.add("duedate-label");
        const date = document.createElement("input"); 
        date.type = "date";
        date.id="duedate";
        date.min = "2019-11-13";
        date.max ="2099-12-31";
        date.valueAsDate  = new Date();

        date.classList.add("getValue", "list__add-duedate");
        label.textContent = "Due date: ";
        desc.classList.add("getValue", "list__add-describe");
        desc.placeholder ="Brief description of task";
        container.appendChild(desc);
        container.appendChild(label);
        container.appendChild(date);
    form.appendChild(container);

        const cancel = document.createElement("button"); 
        const submit = document.createElement("button"); 
        cancel.classList.add("btn-cancel");
        submit.classList.add("btn-submit");
        submit.type ="submit";
        submit.textContent = "Submit"; 
        cancel.textContent = "Cancel";
    form.appendChild(submit);
    form.appendChild(cancel);


    cancel.addEventListener("click", () => {
        const container = document.querySelector(".addTodo");
        container.classList.toggle("hide");
    })
  
    submit.addEventListener("click", () => {
        if(todo.value !== ""){
            addTodo(project);
            todo.value = "";
            desc.value  = ""; 
            date.valueAsDate = new Date();
            window.localStorage.setItem("data", JSON.stringify(storage));
        }else{
            alert("you must have a task!")
        }

    });

    

   
 

// 


}
   
const renderTodos = (project) => {
    const projectTitle = document.querySelector(".heading__primary");
    projectTitle.textContent = project.name; 
    let taskList = document.querySelector(".list");
    taskList.textContent ="";
    //clearing up the space each time it loads to be filled with all the items in todos


    for(let obj of project.todos){
       
        let li = document.createElement("li"); 
        li.classList.add("list__item"); 

        /////////////////checkButton
        let label = document.createElement("label");
        label.classList.add("list__check"); 

        let checkbox = document.createElement("input"); 
        checkbox.setAttribute("type", "checkbox");
        let tick = document.createElement("span"); 
        checkbox.classList.add("list__checkbox"); 
        checkbox.id = "toDoCheck"; 
        tick.classList.add("list__tick"); 

        li.appendChild(label);
        label.appendChild(checkbox);
        label.appendChild(tick); 

        taskList.appendChild(li);


        /////////////////////to do section 
        let container = document.createElement("div"); 
        container.classList.add("list__toDo"); 

        let todo = document.createElement("p"); 
        todo.classList.add("heading__secondary");
        todo.textContent = obj.title; 
        
        
        let description = document.createElement("p"); 
        description.classList.add("paragraph"); 
        description.textContent = obj.description; 

        let duedate = document.createElement("span");
        duedate.classList.add("paragraph-blue"); 
        duedate.textContent = "Due date: " + obj.duedate;


        li.appendChild(container);
        container.appendChild(todo);
        container.appendChild(description);
        container.appendChild(duedate);
     
        //////////////edit and delete

        let br = document.createElement("br"); 
        let editBtn = document.createElement("button"); 
        let deleteBtn = document.createElement("button"); 
        let important = document.createElement("button"); 

        editBtn.classList.add("list__edit"); 
        editBtn.textContent = "Edit";

        deleteBtn.classList.add("list__delete"); 
        deleteBtn.textContent = "Delete"; 

        important.classList.add("list__important");
        important.textContent = "Mark as important"; 

        let flag = document.createElement("i");
        flag.classList.add("far");
        flag.classList.add("fa-flag"); 




        important.appendChild(flag); 

        container.appendChild(br); 
        container.appendChild(important);
        container.appendChild(editBtn);
        container.appendChild(deleteBtn);

        ///making it show up as important!from previous saved data
        if(obj.importance){
            important.textContent ="Important!";
            console.log(flag);
            flag.classList.remove("far","fa-flag");
            flag.classList.add("fas", "fa-flag");
        
            important.classList.add("show");
            important.appendChild(flag); 


        }else if(obj.importance !== true){
            important.textContent = "Mark as important"; 
            important.classList.remove("show"); 
            flag.classList.remove("fas", "fa-flag");
            flag.classList.add("far", "fa-flag"); 
            important.appendChild(flag); 
        }


        if(obj.done){
            todo.classList.add("done");
            description.classList.add("done");
            checkbox.checked = true;
        }else if(obj.done ===false){
            todo.classList.remove("done");
            description.classList.remove("done");
        }
        
       
        //listners
        deleteBtn.addEventListener("click", () => {
            let index = project.todos.indexOf(obj); 
            project.todos.splice(index,1);
            li.parentNode.removeChild(li);
            console.log(project.todos);
            return window.localStorage.setItem("data", JSON.stringify(storage));
        });

        important.addEventListener("click", () => {
            obj.toggleImportance();
            console.log(obj);

            if(obj.importance){
                important.textContent ="Important!";
                important.classList.add("show");
                flag.classList.remove("far","fa-flag");
                flag.classList.add("fas", "fa-flag");
                important.appendChild(flag);


            }else if(obj.importance === false){
                important.classList.remove("show"); 
                important.textContent = "Mark as important"; 
                flag.classList.remove("fas", "fa-flag");
                flag.classList.add("far", "fa-flag"); 
                important.appendChild(flag);
                }
                window.localStorage.setItem("data", JSON.stringify(storage));
        });

        checkbox.addEventListener("click", () => {
            obj.toggleDone();
            console.log(obj);
            if(obj.done){
                todo.classList.add("done");
                description.classList.add("done");
                checkbox.check = true;

            }else if(obj.done ===false){
                todo.classList.remove("done");
                description.classList.remove("done");
                checkbox.check = false;
            }
            window.localStorage.setItem("data", JSON.stringify(storage));
        });


        editBtn.addEventListener("click", () => {
            container.removeChild(todo);
            container.removeChild(description);
            container.removeChild(duedate); 

            container.removeChild(br);
            container.removeChild(important);
            container.removeChild(editBtn);
            container.removeChild(deleteBtn);


            let editTodo = document.createElement("input");
            editTodo.classList.add("list__add");
            editTodo.value = obj.title;

            let editDescription = document.createElement("input"); 
            
            editDescription.classList.add("list__add-describe");
            if(obj.description === ""){
                editDescription.placeholder ="Brief description here";
            }else{
            editDescription.value = obj.description; 
            }

            let editDuedate = document.createElement("input");
            editDuedate.setAttribute("type", "date");
            editDuedate.classList.add("list__add-duedate");
            editDuedate.value = obj.duedate;
            
            container.appendChild(editTodo);
            container.appendChild(editDescription);
            container.appendChild(editDuedate);
            

            container.appendChild(br); 
            let saveBtn = document.createElement("button"); 
            saveBtn.classList.add("list__save");
            saveBtn.textContent ="Save"; 

            container.appendChild(saveBtn);
          
            saveBtn.addEventListener("click", () => {
                obj.title = editTodo.value;
                obj.description = editDescription.value;
                obj.duedate = editDuedate.value;

                container.removeChild(editTodo);
                container.removeChild(editDescription);
                container.removeChild(editDuedate);
                container.removeChild(saveBtn);

                todo.textContent = obj.title;
                description.textContent = obj.description;
                duedate.textContent = "Due date: " + obj.duedate;

                container.appendChild(todo);
                container.appendChild(description);
                container.appendChild(duedate);


                important.appendChild(flag); 
                container.appendChild(br); 
                container.appendChild(important);
                container.appendChild(editBtn);
                container.appendChild(deleteBtn);

                console.log(obj);
                window.localStorage.setItem("data", JSON.stringify(storage));
            })
        });

       



    }

}

export {addProject,renderRemoveProject, renderProject, renderTaskButton, renderinputField, renderTodos};