let availabilityData = {
  monday: ["dead", "dead", "dead", "dead", "dead", "dead", "dead", "dead", "dead", "dead", "dead", "dead", "dead", "dead", "dead", "dead", "dead", "dead", "dead", "dead", "low-match", "low-match", "full-match", "full-match"],
  
  tuesday: ["full-match", "full-match", "low-match", "low-match", "dead", "dead", "dead", "dead", "dead", "dead", "dead", "dead", "dead", "dead", "dead", "dead", "dead", "dead", "dead", "dead", "dead", "dead", "dead", "dead"]
}

const weekDays = document.querySelectorAll(".day")
console.log("Week days:", weekDays)
console.log("")

for (const day of weekDays) {
  populateHours(day.id)
}

function populateHours(day) {
  let dayDiv = document.getElementById(day)
  let availability = availabilityData[day]
  console.log("DAY:", dayDiv)
  console.log("Availability:", availability)
  console.log("")

  for (const i in availability) {
    const newHour = document.createElement("div")
    newHour.classList.add("hour", availability[i])
    newHour.id = i
    dayDiv.children[0].append(newHour)
  }
}