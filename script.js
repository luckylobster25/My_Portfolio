// current moment display in main.html
setInterval(function () {
    var currentDisplayEl = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
    document.getElementById('current-date-time').textContent = currentDisplayEl
}, 0)

