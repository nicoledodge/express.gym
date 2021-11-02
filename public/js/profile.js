async function showClasses() {
    const response = await fetch('/api/users/user-timeslot', {
        method: 'GET',
    });
    console.log(response);
    const data = await response.json();
    console.log(data);
}

showClasses();