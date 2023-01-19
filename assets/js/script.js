// Get elements
var currentDay = $("#currentDay");
var timeBlocks = $(".container");

// Moment.js

function displayTime() {
  var now = moment().format("DD MMM YYYY [at] hh:mm:ss a");
  currentDay.text(now);
}

function hourOfDay() {
  var hour = moment().hour();
  if (hour > 12) {
    hour = hour - 12;
  }
  return hour;
}

var workHours = [9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7];

console.log(hourOfDay());


function setTimeBlocks() {
  for (var i = 0; i < workHours.length; i++) {
    var timeRow = $(`<div id="id-${i}" class="row">
      <div class="col-2 hour"></div>
        <textarea class="col-8 description "></textarea>
        <button class="col-2 saveBtn">
          <i class="fas fa-save"></i>
        </button>
      </div>`);
    timeBlocks.append(timeRow);

    // if(workHours[i] < hourOfDay){
    // }
  }
}

setTimeBlocks();
setInterval(displayTime, 1000);
