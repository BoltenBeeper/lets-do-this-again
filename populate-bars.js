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

  for (let i = 0; i < 24; i++) {
    const newHour = document.createElement("div")
    try {
      newHour.classList.add("hour", availability[i])
    } catch {
      newHour.classList.add("hour", "error")
    }
    newHour.id = i
    dayDiv.children[0].append(newHour)
  }
}

//Debugging:

const overlay = document.querySelector(".overlay")

function toggleOverlay() {
  if (overlay.style.display == "none") {
    overlay.style.display = "flex"
  } else {
    overlay.style.display = "none"
  }
}

// For taking screenshot file:

const screenshotPreview = document.getElementById("screenshot-preview")
const fileInput = document.getElementById("upload-input")
let selectedFile
let imageURL

fileInput.addEventListener('change', function(event) {
            const files = event.target.files;

            if (files && files.length > 0) {
                selectedFile = files[0];
                imageURL = URL.createObjectURL(selectedFile);

                screenshotPreview.src = imageURL;
            }
        });

// Analyzing image:

import OpenAI from "openai";

const openai = new OpenAI();

const response = await openai.responses.create({
  model: "gpt-6-astra",
  input: [
    {
      role: "user",
      content: [
        { type: "input_text", text: "what's in this image?" },
        {
          type: "input_image",
          image_url:
            "https://api.nga.gov/iiif/a2e6da57-3cd1-4235-b20e-95dcaefed6c8/full/!800,800/0/default.jpg",
          detail: "auto",
        },
      ],
    },
  ],
});

console.log(response.output_text);