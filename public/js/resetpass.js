// const moment = require('moment');

async function resetHandler(event) {
    event.preventDefault()
    const first_name = document.querySelector('#firstName').value.trim();
    const last_name = document.querySelector('#lastName').value.trim();
    const email = document.querySelector('#email').value.trim();
    const phone_number = document.querySelector('#phoneNumber').value.trim();
    const date_of_birth = document.querySelector('#dateOfBirth').value.trim();
    const password = document.querySelector('#password').value.trim();
    const confirmPassword = document.querySelector('#confirm-password').value.trim();
    const zipcode = document.querySelector('#zipcode').value.trim();
    // const isVip = document.querySelector('#isVip:checked') ? true : false;
    // date_of_birth = moment(date_of_birth).format('MM DD YYYY')
    console.log(date_of_birth, first_name, last_name, email, phone_number, password, zipcode, confirmPassword);
    if ((password.length >= 8 && password === confirmPassword) && first_name && last_name && email && phone_number && date_of_birth && zipcode) {
        const response = await fetch('/api/users/reset', {
            method: 'PUT',
            body: JSON.stringify({first_name, last_name, email, phone_number, date_of_birth, password, zipcode,}),
            headers: {'Content-Type': 'application/json'}
        });
        if(response.ok) {
            swal("Password Reset!");
            document.location.replace('/login');
        }else{
            alert(response.statusText);
        }
    }else {
        alert('Invalid information inputted.');
    }
}

document.querySelector('.reset-form').addEventListener('submit', resetHandler);