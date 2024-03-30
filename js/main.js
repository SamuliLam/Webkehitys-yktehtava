'use strict';

window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

document.getElementById('hamburger-icon').addEventListener('click', function() {
    document.getElementById('sidebar').classList.toggle('show');
});

document.getElementById('hamburger-icon-sidebar').addEventListener('click', function() {
    document.getElementById('sidebar').classList.toggle('show');
});

// fetch restaurant data from the server
async function fetchRestaurantData() {
    try {
        const response = await fetch('https://10.120.32.94/restaurant/api/v1/restaurants');
        const restaurants = await response.json();
        console.log(restaurants);
        return restaurants;
    } catch (error) {
        console.error('Error fetching restaurant data', error);
    }
}

const restaurantList = document.getElementById('restaurant-list');

async function displayRestaurants() {
    try {
        const restaurants = await fetchRestaurantData();

        for (const restaurant of restaurants) {
            const restaurantItem = document.createElement('li');

            const restaurantHeader = document.createElement('div');
            restaurantHeader.className = 'restaurant-header';

            const restaurantName = document.createElement('p');
            restaurantName.className = 'restaurant-name';
            restaurantName.textContent = restaurant.name;
            restaurantHeader.appendChild(restaurantName);

            const restaurantAddress = document.createElement('p');
            restaurantAddress.className = 'restaurant-address';
            restaurantAddress.textContent = restaurant.city;
            restaurantHeader.appendChild(restaurantAddress);

            const favoriteIcon = document.createElement('i');
            favoriteIcon.className = 'favorite-icon';
            favoriteIcon.textContent = '☆';
            restaurantHeader.appendChild(favoriteIcon);

            const restaurantInfo = document.createElement('div');
            restaurantInfo.className = 'restaurant-info';

            const infoList = document.createElement('ul');
            infoList.className = 'info-list';
            restaurantInfo.appendChild(infoList);

            restaurantItem.appendChild(restaurantHeader);
            restaurantItem.appendChild(restaurantInfo);

            restaurantList.appendChild(restaurantItem);
        }
    } catch (error) {
        console.error('Error displaying restaurant data', error);
    }
}

displayRestaurants();