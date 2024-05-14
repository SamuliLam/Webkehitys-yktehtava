
const signupForm = document.getElementById('signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', async function(event){
        event.preventDefault();
        await createUser();
    });
}

export async function getUsernameAvailability(username){
    const response = await fetch(`https://10.120.32.94/restaurant/api/v1/users/available/${username}`);
    const data = await response.json();
    if(response.status === 200){
        return data;
    }
}

async function createUser(){
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;

    try {
        const availability = await getUsernameAvailability(username);
        if (!availability.available) {
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


    if(response.status === 200){
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('username', data.data.username);
        sessionStorage.setItem('email', data.data.email);
        window.location.href = 'index.html';
    }
}