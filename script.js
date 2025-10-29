const displayDate = document.getElementById("displayDate");
const displayResults = document.getElementById("results");
const wwt = 20;
let overtime = Number(localStorage.getItem("overtime")) || 0;
let hoursInt = 0;
let minutesInt = 0;
let timeInMinutes = Number(localStorage.getItem("timeInMinutes")) || 0;
let overtimeHours = 0;
let overtimeMinutes = 0;
let overtimeMinFloat = 0;

if (timeInMinutes > 1200) {
  let hoursFloat = timeInMinutes / 60;
  hoursInt = Math.floor(hoursFloat);
  minutesInt = Math.round((hoursFloat - hoursInt) * 60);
  overtime = (timeInMinutes - 1200) / 60;
    overtimeHours = Math.floor(overtime);
    overtimeMinutes = Math.round((overtime - overtimeHours) * 60);
    displayResults.innerHTML = `Insg. Arbeitszeit: ${hoursInt}h ${minutesInt}min, Überstunden: ${overtimeHours}h ${overtimeMinutes}min`;
} else {
  let hoursFloat = timeInMinutes / 60;
  hoursInt = Math.floor(hoursFloat);
  minutesInt = Math.round((hoursFloat - hoursInt) * 60);
displayResults.innerHTML = `Insg. Arbeitszeit: ${hoursInt}h ${minutesInt}min, Überstunden: 0h 0min`;}

//Datum
const weekdays = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"]; 
const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
const weekday = date.getDay();
const debug = false;
displayDate.innerHTML = `${weekdays[weekday]}, ${day}.${month}.${year}`;

function add() {
  //get Input
  let hoursBegin = parseInt(document.getElementById("hoursBegin").value);
  let hoursEnd = parseInt(document.getElementById("hoursEnd").value);
  let minutesBegin = parseInt(document.getElementById("minutesBegin").value);
  let minutesEnd = parseInt(document.getElementById("minutesEnd").value);

  // converting + calculating
  let timeBegin = (hoursBegin * 60) + minutesBegin;
  let timeEnd = (hoursEnd * 60) + minutesEnd;
  timeInMinutes += timeEnd - timeBegin;
  let hoursFloat = timeInMinutes / 60;
  hoursInt = Math.floor(hoursFloat);
  minutesInt = Math.round((hoursFloat - hoursInt) * 60);

  // overtime?
  if (timeInMinutes > 1200) {
    overtime = (timeInMinutes - 1200) / 60;
    overtimeHours = Math.floor(overtime);
    overtimeMinutes = Math.round((overtime - overtimeHours) * 60);
    displayResults.innerHTML = `Insg. Arbeitszeit: ${hoursInt}h ${minutesInt}min, Überstunden: ${overtimeHours}h ${overtimeMinutes}min`;
  } else {
  displayResults.innerHTML = `Insg. Arbeitszeit: ${hoursInt}h ${minutesInt}min,   Überstunden: 0h 0min`;}
  if (minutesInt < 0) {
   minutesInt = 0;}
  if (debug) {
    console.log(`Tag: ${weekdays[weekday]}, Datum: ${day}, Monat: ${month}, Jahr: ${year}, hoursBegin: ${hoursBegin}, minutesBegin: ${minutesBegin}, hoursEnd: ${hoursEnd}, minutesEnd: ${minutesEnd}, timeBegin: ${timeBegin}, timeEnd: ${timeEnd}, HoursFloat: ${hoursFloat}, Stunden: ${hoursInt} Minuten: ${minutesInt}, ArbZeit/Woche: ${wwt}, timeInMinutes ${timeInMinutes}, Overtime HoursFloat: ${overtime}, Overtime min: ${overtimeMinutes}`);
  }
document.getElementById("infoText").innerHTML = "";
localStorage.setItem("overtime", overtime);
  localStorage.setItem("timeInMinutes", timeInMinutes);
   }

function reset() {
  timeInMinutes = 0;
localStorage.setItem("timeInMinutes", 0);
  overtime =  0;
localStorage.setItem("overtime", 0);
  displayResults.innerHTML = "Insg. Arbeitszeit: 0h 0min,   Überstunden: 0h 0min";
}

