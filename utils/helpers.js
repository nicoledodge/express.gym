const moment = require('moment');

function format_time(time) {
    return time = moment(time, 'HH:mm:ss').format('h:mm A');
} 

module.exports = {
    format_time
}