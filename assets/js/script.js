// Get elements
var currentDay = $("#currentDay")
var timeBlocks = $(".container")

// Creating elements
var hourCol = $("<div></div")
hourCol.attr('class', 'hour col-2')

var textAreaCol = $("<textarea></textarea>")
textAreaCol.attr('class', 'textarea present col-8')

var saveCol = $("<div></div>")
saveCol.attr('class', 'saveBtn col-2')

var row9 = $('<div></div>')
row9.attr('class', 'row')
row9.append(hourCol)
row9.append(textAreaCol)
row9.append(saveCol)


// Moment.js
function displayTime(){
var now = moment().format('DD MMM YYYY [at] hh:mm:ss a')
currentDay.text(now)
}
setInterval(displayTime, 1000)

// currentDay.text(now.format("dddd MMMM Do"))

// TimeBlocks
// timeBlocks.appendChild(row).text("It is the Time Blocks")
row9.appendTo(timeBlocks)
