$(document).ready(function () {
    // $.backstretch("/images/img.jpg");

    $('.datepicker').datepicker({
        format: 'dd-mm-yyyy',
        autoclose: true,
        startDate: '0d'
    });

    $('.cell').click(function () {
        $('.cell').removeClass('select');
        $(this).addClass('select');
    });

});



// const datepicker = $.fn.datepicker.noConflict(); // return $.fn.datepicker to previously assigned value
// $.fn.bootstrapDP = datepicker;

async function timeslotHandler(event) {
    event.preventDefault();
    // time should represent the timeslot id
    const timeId = event.target.getAttribute('data-id');
    // console.log(timeId);

    const response = await fetch(`/api/timeslot/${timeId}`, {
        method: 'POST',
        body: JSON.stringify({
            timeslot_id: timeId
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const message = await response.json();
    if (response.ok) {
        document.location.replace('/profile');
    } else {
        
        // console.log(message);
        alert(message.message);
    }
}

const timeslots = document.querySelectorAll('.cell');
// console.log(timeslots);

for (let i = 0; i < timeslots.length; i++) {
    timeslots[i].addEventListener('click', timeslotHandler);
}