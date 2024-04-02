
const signupForm = document.getElementById('signup-form');
signupForm.addEventListener('submit', async function(event){
    event.preventDefault();
    await createUser();
    console.log('user created');
});

async function createUser(){
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;


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
    }
}