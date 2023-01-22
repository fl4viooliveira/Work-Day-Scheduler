// Get elements
var currentDay = $("#currentDay");
var timeBlocks = $(".container");

// Moment.js
// Function to update date and time
function displayTime() {
  var now = moment().format("DD MMM YYYY [at] hh:mm:ss a");
  currentDay.text(now);
}

function hourOfDay() {
  var hour = moment().hour();
  return hour;
  // to test
  // return 12;
}

// Array with working hours, easy way to add or remove hours
var workHours = [
  [9, "am"],
  [10, "am"],
  [11, "am"],
  [12, "pm"],
  [13, "pm"],
  [14, "pm"],
  [15, "pm"],
  [16, "pm"],
  [17, "pm"],
];

// Function to convert in 12 hours 
function amPm(index) {
  if (workHours[index][0] <= 12) {
    return workHours[index][0] + " " + workHours[index][1];
  }
  if (workHours[index][0] > 12) {
    return workHours[index][0] - 12 + " " + workHours[index][1];
  }
}

var timeRow;

// Function to create a row in looping, appending each element based on conditions
function setTimeBlocks() {
  for (var i = 0; i < workHours.length; i++) {
    timeRow = $(`<div id="id-${i}" class="row">
      </div>`);

    if (workHours[i][0] < hourOfDay()) {
      timeRow.append(
        $(`<div class="col-2 hour"><h4> ${amPm(i)}</h4></div>`),
        $('<textarea class="col-8 description past">'),
        $(`
        <button class="col-2 saveBtn">
          <i class="fas fa-save"></i>
        </button>
          `)
      );
    }
    if (workHours[i][0] === hourOfDay()) {
      timeRow.append(
        $(`<div class="col-2 hour"><h4>${amPm(i)}</h4></div>`),
        $('<textarea class="col-8 description present">'),
        $(`
        <button class="col-2 saveBtn">
          <i class="fas fa-save"></i>
        </button>
          `)
      );
    }
    if (workHours[i][0] > hourOfDay()) {
      timeRow.append(
        $(`<div class="col-2 hour"><h4>${amPm(i)}</h4></div>`),
        $('<textarea class="col-8 description future">'),
        $(`
        <button class="col-2 saveBtn">
          <i class="fas fa-save"></i>
        </button>
          `)
      );
    }
    timeBlocks.append(timeRow);
  }
}

setTimeBlocks();
hourOfDay();

var dayTasks = {};

// Function to create a tasks object on localStorage and add dayTasks object
function storeTasks() {
  localStorage.setItem("tasks", JSON.stringify(dayTasks));
}

// Get JSON from localStorage and convert to object 
function persistEvents() {
  var storage = JSON.parse(localStorage.getItem("tasks"));

// Run a loop to update the local object and populate the textarea
  for (var task in storage) {
    dayTasks[task] = storage[task];
    $(`#${task}`).children("textarea").text(`${storage[task]}`);
  }
}

persistEvents();

var saveBtn = $("button");

/*
* On click function will be created the variable rowId to get the parent id form the clicked button
* also will be created the variable to textarea value on the same row of the clicked button, to get the text
* Update the dayTasks object with the rowId as a key and textareaValue as a value. 
*/
saveBtn.click(function () {
  var rowId = $(this).parent().attr("id");
  var textareaValue = $(`#${rowId}`).children("textarea").val();

  // We use square brackets to be able to add variables keys
  dayTasks[rowId] = textareaValue;

  storeTasks();
});

setInterval(displayTime, 1000);

/*
 * To update the conditions around the hourOfDay function.
 * We will reload the page every hour.
 * We can have a current minute. If we subtract from hour,
 * we can find remaining minutes to new hour.
 */
setTimeout(function () {
  location.reload();
}, 1000 * (60 - moment().minutes()));
