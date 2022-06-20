var today = moment();
var currentTime = moment().hour();
var container = document.querySelector(".container");
var timeBlock = document.querySelector(".time-block");
var saveInput = document.querySelector(".task-input");

var taskList = [];
var timeMoment = [
    {time: '9am', current: 9},
    {time: '10am', current: 10}, 
    {time: '11am', current: 11}, 
    {time: '12pm', current: 12}, 
    {time: '1pm', current: 13}, 
    {time: '2pm', current: 14}, 
    {time: '3pm', current: 15}, 
    {time: '4pm', current: 16}, 
    {time: '5pm', current: 17}, 
    {time: '6pm', current: 18}, 
    {time: '7pm', current: 19}, 
    {time: '8pm', current: 20}, 
    {time: '9pm', current: 21}, 
    {time: '10pm', current: 22},
];

$("#currentDay").text(today.format("LL"));

renderTable();

// Retrieves tasks saved in local storage after refresh
async function retrieveStorage(){
    var savedTask = JSON.parse(localStorage.getItem("tasks"));

    if (savedTask != null) {
        if (savedTask.length > 0) {
            taskList = savedTask
        }
    }

    return taskList
}

// Renders table
async function renderTable(){

    const retrievedTasks = await retrieveStorage();
    
    timeMoment.forEach(async (item, index) => {
    
        $("<div>").attr(
            {
                id: `${item.time}`,
                class: "time-block row",
                "data-id": `${index}`,
            }
        ).appendTo(".container");
        $("<p>").addClass("hour").text(`${item.time}`).appendTo(`#${item.time}`);
        $("<textarea>").addClass("task-input").appendTo(`#${item.time}`);
        $("<button>").addClass("saveBtn").appendTo(`#${item.time}`);
    
        if (item.current == currentTime) {
            $(`#${item.time}`).find(".task-input").toggleClass("present");
        } else if (item.current < currentTime) {
            $(`#${item.time}`).find(".task-input").toggleClass("past");        
        } else {
            $(`#${item.time}`).find(".task-input").toggleClass("future");        
        }
    
        if (retrievedTasks && retrievedTasks.length > 0) {
            // Renders tasks for corresponding time slot
            var renderTask = retrievedTasks.filter(function(item) {
                return item.id == index;
            })
            
            // Updates tasks in time slot
            if (renderTask.length > 0) {
                var value = renderTask[renderTask.length-1].task;
                $(`#${item.time}`).find(".task-input").append(value);
            }
        }
    })
}

// Saves tasks to local storage with corresponding data-id
container.addEventListener('click', function(event) {
    var onClick = event.target;

    if (onClick.matches("button")) {
        var newTask = {
            id: onClick.parentElement.dataset.id,
            task: onClick.previousSibling.value
        }
        taskList.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(taskList));
    } else {
        return;
    }
});
