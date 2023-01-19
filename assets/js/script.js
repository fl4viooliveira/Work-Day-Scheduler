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

// var workHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];
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
console.log(hourOfDay());

var timeRow;

function amPm(index) {
  if (workHours[index][0] <= 12) {
    return workHours[index][0] + " " + workHours[index][1];
  } if(workHours[index][0] > 12) {
    return workHours[index][0] - 12 + " " + workHours[index][1];
  }
}

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
        $(
          `<div class="col-2 hour"><h4>${amPm(i)}</h4></div>`
        ),
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
        $(
          `<div class="col-2 hour"><h4>${amPm(i)}</h4></div>`
        ),
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
setInterval(displayTime, 1000);
