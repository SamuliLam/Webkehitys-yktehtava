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
    const data = await response.json();
    console.log(data.message);

    if(response.status === 200){
        console.log('user successfully logged in');
    } else {
        console.log('user not logged in');
    }

}