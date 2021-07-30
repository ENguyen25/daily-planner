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

function localStorage() {
    localStorage.setItem('tasks', JSON.stringify(taskList));    
}

localStorage();

for (var i = 0; i < timeMoment.length; i++) {
    $("<div>").attr(
        {
            id: `${timeMoment[i].time}`,
            class: "time-block row",
            "data-id": [i],
        }
    ).appendTo(".container");
    $("<p>").addClass("hour").text(`${timeMoment[i].time}`).appendTo(`#${timeMoment[i].time}`);
    $("<textarea>").addClass("task-input").appendTo(`#${timeMoment[i].time}`);
    $("<button>").addClass("saveBtn").appendTo(`#${timeMoment[i].time}`);

    if (timeMoment[i].current == currentTime) {
        $(`#${timeMoment[i].time}`).find(".task-input").toggleClass("present");
    } else if (timeMoment[i].current < currentTime) {
        $(`#${timeMoment[i].time}`).find(".task-input").toggleClass("past");        
    } else {
        $(`#${timeMoment[i].time}`).find(".task-input").toggleClass("future");        
    }

    var savedTask = JSON.parse(localStorage.getItem("tasks"));

    if (savedTask.length > 0) {
        var renderTask = savedTask.filter(function(item) {
            return item.id == i;
        })
    
        console.log(renderTask);
    
        if (renderTask.length > 0) {
            var value = renderTask[0].task;
            console.log(value);
            $(`#${timeMoment[i].time}`).find(".task-input").append(value);
        }
    }
}


container.addEventListener('click', function(event) {
    var onClick = event.target;

    if (onClick.matches("button")) {
        var newTask = {
            id: onClick.parentElement.dataset.id,
            task: onClick.previousSibling.value
        }
        taskList.push(newTask);
        console.log(taskList);
        localStorage.setItem('tasks', JSON.stringify(taskList));
    } else {
        return;
    }
});