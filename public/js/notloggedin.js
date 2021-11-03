async function alerter() {
    alert("You must be logged in to sign up for a class!");
}


const timeslots = document.querySelectorAll('.cell');
// console.log(timeslots);

for (let i = 0; i < timeslots.length; i++) {
    timeslots[i].addEventListener('click', alerter);
}