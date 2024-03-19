// window.addEventListener('load', () => {
//     const form = document.querySelector("#new-task-form");
//     const input = document.querySelector("#new-task-input");
//     const list_el = document.querySelector("#tasks");

//     form.addEventListener('submit', (e) => {
//         e.preventDefault();

//         const task = input.value;

//         if (!task) {
//             alert("Please fill out the task");
//             return;
//         } 

//         const task_el = document.createElement("div");
//         task_el.classList.add("task");

//         const task_content_el = document.createElement("div");
//         task_content_el.classList.add("content");

//         task_el.appendChild(task_content_el);

//         const task_input_el = document.createElement("input");
//         task_input_el.classList.add("text");
//         task_input_el.type = "text";
//         task_input_el.value = task;
//         task_input_el.setAttribute("readonly", "readonly");

//         task_content_el.appendChild(task_input_el);

//         const task_actions_el = document.createElement("div");
//         task_actions_el.classList.add("actions");

//         const task_edit_el = document.createElement("button");
//         task_edit_el.classList.add("edit");
//         task_edit_el.innerHTML = "Edit";

//         const task_delete_el = document.createElement("button");
//         task_delete_el.classList.add("delete");
//         task_delete_el.innerHTML = "Delete";

//         task_actions_el.appendChild(task_edit_el);
//         task_actions_el.appendChild(task_delete_el);

//         task_el.appendChild(task_actions_el);

//         list_el.appendChild(task_el);

//         input.value = "";

//         task_edit_el.addEventListener('click', () => {
//             if (task_edit_el.innerText.toLowerCase() == "edit") {
//                 task_input_el.removeAttribute("readonly");
//                 task_input_el.focus();
//                 task_edit_el.innerText = "Save";
//             } else {
//                 task_input_el.setAttribute("readonly", "readonly");
//                 task_edit_el.innerText = "Edit";
//             }
//         });

//         task_delete_el.addEventListener('click', () => {
//             list_el.removeChild(task_el);
//         })
//     })
// })


const SERVER_ROOT = 'http://127.0.0.1:5091';
const API_ADD = SERVER_ROOT + '/api/List/add';
const API_EDIT = SERVER_ROOT + '/api/edit';
const API_DELETE = SERVER_ROOT + '/api/delete';


function reset()
{
    document.getElementById("new-task-input").value = '';
}

function addTask() {
    const taskname = document.getElementById("new-task-input").value;

    let json_to_submit = {
        method: "POST",
        body: JSON.stringify(
            {
                Task_Name: taskname
            }
        ),
        headers: { "Content-Type": "application/json; charset=UTF-8; Access-Control-Allow-Origin: *" }
    }

    fetch(API_ADD, json_to_submit)
    .then((response) => response.json())
    .then((json) => {
        if (json.status == "fail") {
            alert("This task can not be added");
            return;
        }
        addTask_action(json.id, json.content);
    });
    // .then((json) => {
    //     console.log(json); 
    //     console.log(json.status); 
    //     console.log(json.id); 
    //     console.log(json.content); 
    // }); // Debug

}



function addTask_action(id, task) {
    document.getElementById("tasks").innerHTML += `
        <div class="task" id="task_${id}">
            <div class="invisible">
                <input type="text" class="text" id="id_${id}" value="${id}" readonly>
            </div>
            <div class="content">
                <input type="text" class="text" id="content_${id}" value="${task}" readonly>
            </div>
            <div class="actions">
                <button class="edit" id="editTask_${id}" onclick="editTask(${id})">EDIT</button>
                <button class="delete" id="deleteTask_${id}" onclick="deleteTask(${id})">DELETE</button>
            </div>
        </div>
    `
    reset();
}


function editTask(id) {
    if (document.getElementById(`editTask_${id}`).textContent == "EDIT") {
        document.getElementById(`content_${id}`).removeAttribute("readonly");
        document.getElementById(`content_${id}`).focus();
        document.getElementById(`editTask_${id}`).textContent = "SAVE";
    } else {  
        const content = document.getElementById(`content_${id}`).value;      
        let json_to_submit = {
            method: "POST",
            body: JSON.stringify(
                {
                    id: id,
                    content: content
                }
            ),
            headers: { "Content-Type": "application/json; charset=UTF-8; Access-Control-Allow-Origin: *" }
        }

        fetch(API_EDIT, json_to_submit)
        .then((response) => response.json())
        .then((json) => {
            if (json.status == "fail") {
                alert("This task can not be modified");
                return;
            } else if (json.status == "ok") {
                document.getElementById(`content_${id}`).value = json.content;
            } else {
                alert("Something went wrong while saving the changes.");
            }
        });
        // .then((json) => {
        //     console.log(json); 
        //     console.log(json.status); 
        //     console.log(json.id); 
        //     console.log(json.content); 
        // }); // Debug


        document.getElementById(`content_${id}`).setAttribute("readonly", "readonly");
        document.getElementById(`editTask_${id}`).textContent = "EDIT";
        // Bug / Unintended behaviour: Focus is still on this element
        // consiquence: Accidently pressing space after saving may come back to editing mode.
        // solution: Focus out to something else
        // obstacle: Not sure where to focus and yet make ui functionally ok.
    }
}


function deleteTask(id) {
    
    let json_to_submit = {
        method: "POST",
        body: JSON.stringify(
            {
                id: id
            }
        ),
        headers: { "Content-Type": "application/json; charset=UTF-8; Access-Control-Allow-Origin: *" }
    }

    fetch(API_DELETE, json_to_submit)
    .then((response) => response.json())
    .then((json) => {
        if (json.status == "fail") {
            alert("This task can not be deleted");
            return;
        } else if (json.status == "ok") {
            document.getElementById(`id_${id}`).parentElement.parentElement.remove();
        } else {
            alert("Something went wrong while deleting the task.");
        }
    });
    // .then((json) => {
    //     console.log(json); 
    //     console.log(json.status); 
    // }); // Debug
}



// // Debugs
// addTask_action(0, "First task");
// addTask_action(1, "Second task");
// addTask_action(2, "Third task");


// // function deleteTask(id) { deleteTask_action(id) }