async function alerter() {
    alert("You must be logged in to sign up for a class!");
    document.location.replace('/login');
}

const timeslots = document.querySelectorAll('.cell');


for (let i = 0; i < timeslots.length; i++) {
    timeslots[i].addEventListener('click', alerter);
}