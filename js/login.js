const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    await loginUser();
});


async function loginUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch("https://10.120.32.94/restaurant/api/v1/auth/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    });
    const user = await response.json();
    console.log(user.message);

    if(response.status === 200){
        console.log('user successfully logged in');
        sessionStorage.setItem('token', user.token);
        sessionStorage.setItem('username', user.data.username);
        sessionStorage.setItem('email', user.data.email);
        sessionStorage.setItem('favouriteRestaurant', user.data.favouriteRestaurant);
        const avatarUrl = `https://10.120.32.94/restaurant/uploads/${user.data.avatar}`;
        sessionStorage.setItem('avatar', avatarUrl);
        window.location.href = 'index.html';
    } else {
        console.log('user not logged in');
    }
}

