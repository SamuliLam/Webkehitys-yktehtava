import {getUsernameAvailability} from "./signup.js";
import {updateProfilePicture} from "./fetchCalls.js";

async function updateCurrentUser() {

    const username = document.getElementById('profile-username');
    const email = document.getElementById('profile-email');
    const password = document.getElementById('profile-password');

    let requestBody = {};

    if (username.value && username.value !== sessionStorage.getItem('username')) {
        requestBody.username = username.value;
        const availability = await getUsernameAvailability(username.value);
        if (!availability.available) {
            username.value = 'Username is already taken';
            console.log('Username is already taken');
            return;
        }
    }
    if (email.value && email.value !== sessionStorage.getItem('email')) {
        requestBody.email = email.value;
    }
    if (password.value) {
        requestBody.password = password.value;
    }

    const response = await fetch('https://10.120.32.94/restaurant/api/v1/users', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
        body: JSON.stringify(requestBody)
    });
    const responseBody = await response.json();
    console.log(responseBody);
    if (response.status === 200) {
        sessionStorage.setItem('username', responseBody.data.username);
        sessionStorage.setItem('email', responseBody.data.email);
    } else {
        console.error('Error updating user data: ', responseBody.message);
    }
}


const profileForm = document.getElementById('profile-form');
profileForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    await updateCurrentUser();
    const fileInput = document.getElementById('avatar-input');
    const avatarUrl = await updateProfilePicture(fileInput);
    console.log(avatarUrl);

    if (avatarUrl) {
        document.getElementById('profile-img').src = avatarUrl;
    }
});

