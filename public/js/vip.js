// const moment = require('moment');

async function upgradeHandler(event) {
    event.preventDefault()
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
    const confirmPassword = document.querySelector('#confirm-password').value.trim();
    const isVip = document.querySelector('#isVip:checked') ? true : false;
    // console.log(email, password, confirmPassword,isVip);
    if ((password.length >= 8 && password === confirmPassword) && email && isVip) {
        const response = await fetch('/api/users/upgrade', {
            method: 'PUT',
            body: JSON.stringify({email,password,isVip}),
            headers: {'Content-Type': 'application/json'}
        });
        if(response.ok) {
            swal("User Upgraded!");
            document.location.replace('/');
        }else{
            alert(response.statusText);
        }
    }else {
        alert('Invalid information inputted.');
    }
}

document.querySelector('.upgrade-form').addEventListener('submit', upgradeHandler);