async function forgotPassword(event) {
    event.preventDefault()
    const first_name = document.querySelector('#firstName').value.trim();
    const last_name = document.querySelector('#lastName').value.trim();
    const email = document.querySelector('#email').value.trim();
    const phone_number = document.querySelector('#phoneNumber').value.trim();
    const date_of_birth = document.querySelector('#dateOfBirth').value.trim();
    const zipcode = document.querySelector('#zipcode').value.trim();
    const password = document.querySelector('#password').value.trim();

    console.log(date_of_birth, first_name, last_name, email, phone_number, password, zipcode);
    if ((password.length >= 8) && first_name && last_name && email && phone_number && date_of_birth && zipcode) {

        const res = await fetch('/api/users/forgotpassword', {
            method: 'PUT',
            body: JSON.stringify({
                first_name,
                last_name,
                email,
                phone_number,
                date_of_birth,
                zipcode,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (res.ok) {
            document.location.replace('/');
        } else {
            const message = res.json();
            alert(message.message);
        }

    }
}

document.querySelector('.forgotpassword-form').addEventListener('submit', forgotPassword);