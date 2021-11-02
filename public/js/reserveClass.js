$(document).ready(function(){

    $('.datepicker').datepicker({
        format: 'dd-mm-yyyy',
        autoclose: true,
        startDate: '0d'
    });

    $('.cell').click(function(){
        $('.cell').removeClass('select');
        $(this).addClass('select');
    });

});

// const datepicker = $.fn.datepicker.noConflict(); // return $.fn.datepicker to previously assigned value
// $.fn.bootstrapDP = datepicker;

async function timeslotHandler(event) {
    event.preventDefault();
    const time = event.target.textContent;
    console.log(time);
    const node = event.target.parentElement.parentElement.parentElement;
    
    console.log(node);
} 


const timeslots = document.querySelectorAll('.cell');
console.log(timeslots);

for(let i = 0; i<timeslots.length; i++) {
    timeslots[i].addEventListener('click', timeslotHandler);
}