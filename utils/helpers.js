const moment = require('moment');

function format_time(time) {
    return time = moment(time, 'HH:mm:ss').format('h:mm A');
} 

function format_date(date) {
    return date = moment(date ).format('LL')
}
module.exports = {
    format_time,
    format_date
}