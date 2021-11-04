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

