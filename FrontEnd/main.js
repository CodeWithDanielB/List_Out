// window.addEventListener('load', () => )

// function fetchData() {
//     fetch('http://yourbackend.com/api/data')
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json(); 
//         })
//         .then(data => {
           
//             const dataList = document.getElementById('dataList');
//             data.forEach(item => {
//                 const listItem = document.createElement('li');
//                 listItem.textContent = JSON.stringify(item); 
//                 dataList.appendChild(listItem);
//             });
//         })
//         .catch(error => {
//             console.error('There was a problem with the fetch operation:', error);
//         });
// }


// window.onload = fetchData;


const SERVER_ROOT = 'http://127.0.0.1:5091';
const API_ADD = SERVER_ROOT + '/api/List/add';
const API_EDIT = SERVER_ROOT + '/api/List/edit';
const API_DELETE = SERVER_ROOT + '/api/List/delete';


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
                    Id: id,
                    Task_Name: content
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
            } else if (json.status == "Ok") {
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
                id: id,
                Task_Name: ""
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
        } else if (json.status == "Ok") {
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