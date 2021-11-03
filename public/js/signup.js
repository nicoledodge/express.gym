// const moment = require('moment');

async function signupHandler(event) {
    event.preventDefault()
    const first_name = document.querySelector('#firstName').value.trim();
    const last_name = document.querySelector('#lastName').value.trim();
    const email = document.querySelector('#email').value.trim();
    const phone_number = document.querySelector('#phoneNumber').value.trim();
    const date_of_birth = document.querySelector('#dateOfBirth').value.trim();
    const password = document.querySelector('#password').value.trim();
    const zipcode = document.querySelector('#zipcode').value.trim();
    const isVip = document.querySelector('#isVip:checked') ? true : false;
    // date_of_birth = moment(date_of_birth).format('MM DD YYYY')
    console.log(date_of_birth, first_name, last_name, email, phone_number, password, zipcode, isVip);
    if ((password.length >= 8) && first_name && last_name && email && phone_number && date_of_birth && zipcode) {
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({first_name, last_name, email, phone_number, date_of_birth, password, zipcode, isVip}),
            headers: {'Content-Type': 'application/json'}
        });
        if(response.ok) {
            swal("You've signed up!");
            document.location.replace('/');
        }else{
            alert(response.statusText);
        }
    }else {
        alert('Invalid information inputted.');
    }
}

document.querySelector('.signup-form').addEventListener('submit', signupHandler);