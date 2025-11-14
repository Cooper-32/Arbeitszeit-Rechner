const body = document.querySelector("body");
const historyDisplay = document.getElementById("historyDisplay");
const displayDate = document.getElementById("displayDate");
const displayResults = document.getElementById("results");
const infoText = document.getElementById("infoText");
const wwt = 20;
let overtime = Number(localStorage.getItem("overtime")) || 0;
let hoursInt = 0;
let minutesInt = 0;
let timeInMinutes = Number(localStorage.getItem("timeInMinutes")) || 0;
let overtimeHours = 0;
let overtimeMinutes = 0;
let overtimeMinFloat = 0;
let history = localStorage.getItem("history") || ""; 
let over20 = false;
historyDisplay.innerHTML = history;

if (timeInMinutes > 1200) {
  over20 = true;
  calculateTime();
  displayResult();
} else {
  over20 = false;
  calculateTime();
  displayResult();
}

//Datum
const newDate = new Date();
const date = {
  day: newDate.getDate(),
  month: newDate.getMonth() + 1,
  year: newDate.getFullYear(),
  weekday: newDate.getDay(),
  weekdays: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"]
};
displayDate.innerHTML = `${date.weekdays[date.weekday]}, ${String(date.day).padStart(2, "0")}.${String(date.month).padStart(2, "0")}.${date.year}`;

let debug = false;

function add() {
  //get Input
  let hoursBegin = parseInt(document.getElementById("hoursBegin").value || 0);
  let hoursEnd = parseInt(document.getElementById("hoursEnd").value || 0);
  let minutesBegin = parseInt(document.getElementById("minutesBegin").value || 0);
  let minutesEnd = parseInt(document.getElementById("minutesEnd").value || 0);

  // converting + calculating
  let timeBegin = (hoursBegin * 60) + minutesBegin;
  let timeEnd = (hoursEnd * 60) + minutesEnd;
  timeInMinutes += timeEnd - timeBegin;
  calculateTime();

  // overtime?
  if (timeInMinutes > 1200) {
    over20 = true;
    calculateTime();
    displayResult();
  } else {
    over20 = false;
    calculateTime();
  displayResult();
  }
  if (timeInMinutes < 0) {
infoText.innerHTML = "Fehler in der Eingabe!";
  infoText.style.color = "white";
  infoText.style.backgroundColor = "red";
  } else {document.getElementById("infoText").innerHTML = "";}
  if (overtime < 0) {
  
  }
  if (debug) {
    console.log(`Tag: ${weekdays[weekday]}, Datum: ${day}, Monat: ${month}, Jahr: ${year}, hoursBegin: ${hoursBegin}, minutesBegin: ${minutesBegin}, hoursEnd: ${hoursEnd}, minutesEnd: ${minutesEnd}, timeBegin: ${timeBegin}, timeEnd: ${timeEnd}, HoursFloat: ${hoursFloat}, Stunden: ${hoursInt} Minuten: ${minutesInt}, ArbZeit/Woche: ${wwt}, timeInMinutes ${timeInMinutes}, Overtime HoursFloat: ${overtime}, Overtime min: ${overtimeMinutes}`);
  }
  history += `${date.weekdays[date.weekday]}, ${String(date.day).padStart(2, "0")}.${String(date.month).padStart(2, "0")}.${date.year}<br>${String(hoursBegin).padStart(2, "0")}:${String(minutesBegin).padStart(2, "0")} - ${String(hoursEnd).padStart(2, "0")}:${String(minutesEnd).padStart(2, "0")} Uhr<br><br>`;
  historyDisplay.innerHTML = history;
  localStorage.setItem("history", history);
   }

function reset() {
if (date.weekday !== 1) {
  let answer = confirm("Es ist nicht Montag. Abbrechen um trotzdem zurückzusetzen.");
if (answer) {} else {
  timeInMinutes = 0;
localStorage.setItem("timeInMinutes", 0);
  overtime =  0;
localStorage.setItem("overtime", 0);
  displayResults.innerHTML = "Insg. Arbeitszeit: 00h 00min,   Überstunden: 00h 00min";
  history += `Insg. Arbeitszeit: ${String(hoursInt).padStart(2, "0")}h ${String(minutesInt).padStart(2, "0")}min, Überstunden: ${String(overtimeHours).padStart(2, "0")}h ${String(overtimeMinutes).padStart(2, "0")}min <br><br><br>`;
  historyDisplay.innerHTML = history;
localStorage.setItem("history", history);}
} else {
timeInMinutes = 0;
localStorage.setItem("timeInMinutes", 0);
  overtime =  0;
localStorage.setItem("overtime", 0);
  displayResults.innerHTML = "Insg. Arbeitszeit: 00h 00min,   Überstunden: 00h 00min";
  history += `Insg. Arbeitszeit: ${String(hoursInt).padStart(2, "0")}h ${String(minutesInt).padStart(2, "0")}min, Überstunden: ${String(overtimeHours).padStart(2, "0")}h ${String(overtimeMinutes).padStart(2, "0")}min <br><br><br>`;
  historyDisplay.innerHTML = history;
localStorage.setItem("history", history);}
}

function resetHistory() {
  history = "";
  historyDisplay.innerHTML = "";
  localStorage.setItem("history", "");
}

function displayResult() {
  displayResults.innerHTML = `Insg. Arbeitszeit: ${String(hoursInt).padStart(2, "0")}h ${String(minutesInt).padStart(2, "0")}min, Überstunden: ${String(overtimeHours).padStart(2, "0")}h ${String(overtimeMinutes).padStart(2, "0")}min`;
}

function calculateTime() {
  let hoursFloat = timeInMinutes / 60;
  hoursInt = Math.floor(hoursFloat);
  minutesInt = Math.round((hoursFloat - hoursInt) * 60);
  overtimeHours = 0;
  overtimeMinutes = 0;
localStorage.setItem("overtime", overtime);
localStorage.setItem("timeInMinutes", timeInMinutes);
  if (over20) {
    overtime = (timeInMinutes - 1200) / 60;
    overtimeHours = Math.floor(overtime);
    overtimeMinutes = Math.round((overtime - overtimeHours) * 60);
localStorage.setItem("overtime", overtime);
localStorage.setItem("timeInMinutes", timeInMinutes);
  }
}


