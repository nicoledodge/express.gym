async function loginHandler(event) {
    event.preventDefault();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
    
    if (email && password) {
        console.log(email, password);
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {'Content-Type':'application/json'}
        });
        console.log(response.ok);
        if(response.ok) {
            await swal("You're logged in!");
            document.location.replace('/');
        }else{
            const message = response.json();
            alert(message.message);
        }
    }
}

document.querySelector('.login-form').addEventListener('submit', loginHandler);