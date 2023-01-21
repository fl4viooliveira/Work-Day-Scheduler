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
  // return hour;
  return 12;
}

function update() {
  displayTime();
  hourOfDay();
}

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

function amPm(index) {
  if (workHours[index][0] <= 12) {
    return workHours[index][0] + " " + workHours[index][1];
  }
  if (workHours[index][0] > 12) {
    return workHours[index][0] - 12 + " " + workHours[index][1];
  }
}

var timeRow;

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

var saveBtn = $("button");

// test
$("#id-3").children("textarea").text("test 1234");

saveBtn.click(function () {
  var rowId = $(this).parent().attr("id");

  console.log($(`#${rowId}`).children("textarea").val());

  console.log(rowId);
});

// setInterval(displayTime, 1000);

/*
 * To update the conditions around the hourOfDay function.
 * We will reload the page every hour.
 * We can have a current minute. If we subtract from hour,
 * we can find remaining minutes to new hour.
 */
// setTimeout(function () {
//   location.reload();
// }, 1000 * (60 - moment().minutes()));
