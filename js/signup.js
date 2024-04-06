
const signupForm = document.getElementById('signup-form');
signupForm.addEventListener('submit', async function(event){
    event.preventDefault();
    await createUser();
});

async function getUsernameAvailability(){
    const username = document.getElementById('username').value;
    const response = await fetch(`https://10.120.32.94/restaurant/api/v1/users/available/${username}`);
    const data = await response.json();
    console.log(data)
    console.log(data.message);
    if(response.status === 200){
        return data;
    }
}

async function createUser(){
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;

    try {
        const availability = await getUsernameAvailability();
        if (!availability.available) {
            console.log('Username is already taken');
            return;
        }
    } catch (error) {
        console.error('Error checking username availability:', error.message);
        return;
    }

    const response = await fetch("https://10.120.32.94/restaurant/api/v1/users", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password,
            email: email
        })
    });
    const data = await response.json();
    console.log(data.message)


    if(response.status === 200){
        console.log('user successfully created!')
        window.location.href = 'index.html';
    }
}