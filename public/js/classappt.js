async function timeslotHandler(event) {
    event.preventDefault();
    // time should represent the timeslot id
    const timeId = event.target.getAttribute('data-id');
    console.log(timeId);

    const response = await fetch(`/api/timeslot/${timeId}`, {
        method: 'POST',
        body: JSON.stringify({
            timeslot_id: timeId
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log(response);
    if (response.ok) {
        document.location.replace('/');
    } else if (response.status == 400) {
        const message = await response.json();
        console.log(message);
        alert(message.message);
    }else if(response.status==418) {
        alert(response.statusText);
    }
    else if(response.status==401){
        document.location.replace('/login');
    }
}

const timeslots = document.querySelectorAll('.cell');
// console.log(timeslots);

for (let i = 0; i < timeslots.length; i++) {
    timeslots[i].addEventListener('click', timeslotHandler);
}