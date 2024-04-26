export async function updateFavoriteRestaurant(restaurantId) {
    const response = await fetch(`https://10.120.32.94/restaurant/api/v1/users`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
        body: JSON.stringify({favouriteRestaurant: restaurantId})
    });
    const responseBody = await response.json();
    console.log(responseBody);
    if (response.status === 200) {
        console.log('Favourite restaurant updated');
        sessionStorage.setItem('favouriteRestaurant', responseBody.data.favouriteRestaurant);
    } else {
        console.error('Error updating user data: ', responseBody.message);
    }
}

export async function updateProfilePicture(fileInput) {
    const formData = new FormData();
    formData.append('avatar', fileInput.files[0]);

    const response = await fetch("https://10.120.32.94/restaurant/api/v1/users/avatar", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
        body: formData
    });
    const responseBody = await response.json();
    console.log(responseBody);
    if (response.status === 200) {
        console.log('Profile picture updated');
        return responseBody.data.avatar;
    } else {
        console.error('Error updating user data: ', responseBody.message);
    }
}