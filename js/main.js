window.addEventListener('DOMContentLoaded', () => {

    const signInLinks = [
        document.getElementById('sign-in-link'),
        document.getElementById('sign-in-link-sidebar')
    ];

    const token = sessionStorage.getItem('token');
    if (token) {
        signInLinks.forEach(signInLink => {
            signInLink.textContent = 'PROFILE';
            signInLink.href = 'profile.html';
        });
        const signOutLinks = [
            document.getElementById('sign-out-link'),
            document.getElementById('sign-out-link-sidebar')
        ];
        signOutLinks.forEach(signOutLink => {
            signOutLink.style.display = 'block';
            signOutLink.addEventListener('click', () => {
                sessionStorage.clear();
                signInLinks.forEach(signInLink => {
                    signInLink.textContent = 'SIGN IN';
                    signInLink.href = 'login.html';
                });
                signOutLinks.forEach(signOutLink => {
                    signOutLink.style.display = 'none';
                });
            });
        });
    }
    const username = document.getElementById('profile-username');
    const email = document.getElementById('profile-email');
    if (username && email) {
        username.value = sessionStorage.getItem('username');
        email.value = sessionStorage.getItem('email');
    }

    const profileImg = document.getElementById('profile-img');
    if (profileImg) {
        const avatarUrl = sessionStorage.getItem('avatar');
        profileImg.src = avatarUrl || 'assets/profile-picture.png';
    }
});

window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

document.getElementById('hamburger-icon').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('show');
});

document.getElementById('hamburger-icon-sidebar').addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('show');
});

