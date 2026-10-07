# lets-do-this-again

Time tracking app for me and my friend to help visualize when our schedules overlap.


To do:
[X] - Make a horizontal bar to represewnt each day of the week.
[X]   - Make each bar consist of 24 labled segments. With each segment representing an hour.
[X]   - Color code each hour segment to show better or worse times for meeting.
[X]     - Grey lines: No overlap
[X]     - Yellow: Overlap but not ideal (right after or before work)
[X]     - Green: Good overlap; ideal time to meet
[X] - Write a function to take hour availability from an object and populate the bars with said data.
[X] - Add a button to import image files.
[X]   - Add a debug mode to show the image submitted.
[ ] - Write code to make a call to a VLLM to extract data from schedule screenshots and return the data in neetly compiled JSON format.
[ ] - Write a function to compare sets of availability data from multiple people and return a single data set of 24 idevidual markers of that hours availability. Return 7 of those to make up the whole week.