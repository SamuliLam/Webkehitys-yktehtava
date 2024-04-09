import { getUsernameAvailability } from "./signup.js";

async function updateCurrentUser(){

    const username = document.getElementById('profile-username');
    const email = document.getElementById('profile-email');
    const password = document.getElementById('profile-password');

    let requestBody = {};

    if (username.value) {
        requestBody.username = username.value;
        const availability = await getUsernameAvailability(username.value);
        if (!availability.available) {
            username.value = 'Username is already taken';
            console.log('Username is already taken');
            return;
        }
    }
    if (email.value) {
        requestBody.email = email.value;
    }
    if (password.value) {
        requestBody.password = password.value;
    }

    const response = await fetch('https://10.120.32.94/restaurant//api/v1/users', {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
        body: JSON.stringify(requestBody)
    });
    const updatedUser = await response.json();
    console.log(updatedUser);
    if(response.status === 200){
        sessionStorage.setItem('username', username.value);
        sessionStorage.setItem('email', email.value);
    } else {
        console.error('Error updating user data');
    }
}

const profileForm = document.getElementById('profile-form');
profileForm.addEventListener('submit', async function(event){
    event.preventDefault();
    await updateCurrentUser();
    //location.reload();
});