import * as utils from './utils.js';
import { displayRestaurants } from './restaurant-list.js';

document.getElementById('name-filter').addEventListener('click', function () {
    this.querySelector('.triangle').classList.toggle('rotated');
});

document.getElementById('city-filter').addEventListener('click', function () {
    this.querySelector('.triangle').classList.toggle('rotated');
});

document.getElementById('favorite-filter').addEventListener('click', function () {
    this.querySelector('.triangle').classList.toggle('rotated');
});

const nameFilter = document.getElementById('name-filter');
const cityFilter = document.getElementById('city-filter');
const favoritesFilter = document.getElementById('favorite-filter');

let restaurants = await utils.fetchRestaurantData();

function filterRestaurants(data, filterType) {
    const favoriteRestaurantId = sessionStorage.getItem('favouriteRestaurant');

    switch (filterType) {
        case 'name':
            return [...data].sort((a, b) => a.name.localeCompare(b.name));
        case 'city':
            return [...data].sort((a, b) => a.city.localeCompare(b.city));
        case 'favorites':
            return data.filter(restaurant => restaurant._id === favoriteRestaurantId);
        default:
            return data;
    }
}

let activeFilter = null;
nameFilter.addEventListener('click', () => {
    if (activeFilter === 'name') {
        activeFilter = null;
        displayRestaurants(restaurants);
    } else {
        activeFilter = 'name';
        const filteredRestaurants = filterRestaurants(restaurants, 'name');
        displayRestaurants(filteredRestaurants);
    }
});

cityFilter.addEventListener('click', () => {
    if (activeFilter === 'city') {
        activeFilter = null;
        displayRestaurants(restaurants);
    } else {
        activeFilter = 'city';
        const filteredRestaurants = filterRestaurants(restaurants, 'city');
        displayRestaurants(filteredRestaurants);
    }
});

if (sessionStorage.getItem('token')){
    favoritesFilter.addEventListener('click', () => {
        if (activeFilter === 'favorites') {
            activeFilter = null;
            displayRestaurants(restaurants);
        } else {
            activeFilter = 'favorites';
            const filteredRestaurants = filterRestaurants(restaurants, 'favorites');
            displayRestaurants(filteredRestaurants);
        }
    });
}
