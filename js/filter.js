import * as utils from './utils.js';
import { displayRestaurants } from './restaurant-list.js';

document.getElementById('name-filter').addEventListener('click', function () {
    // displayRestaurants('name');
    this.querySelector('.triangle').classList.toggle('rotated');
});

document.getElementById('city-filter').addEventListener('click', function () {
    // displayRestaurants('city');
    this.querySelector('.triangle').classList.toggle('rotated');
});

// The favorite section does not do anything yet
document.getElementById('favorite-filter').addEventListener('click', function () {
    // TODO: Implement favorite filtering
    this.querySelector('.triangle').classList.toggle('rotated');
});

const nameFilter = document.getElementById('name-filter');
const cityFilter = document.getElementById('city-filter');
const favoritesFilter = document.getElementById('favorite-filter');

let restaurants = await utils.fetchRestaurantData();

// Create a function that filters the restaurant data based on the filter type
function filterRestaurants(data, filterType) {
    switch (filterType) {
        case 'name':
            return [...data].sort((a, b) => a.name.localeCompare(b.name));
        case 'city':
            return [...data].sort((a, b) => a.city.localeCompare(b.city));
        case 'favorites':
            return data.filter(restaurant => restaurant.isFavorite);
        default:
            return data;
    }
}

// In the event listeners for the filter triangles, call the filter function with the stored restaurant data and the appropriate filter type

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
    console.log(activeFilter);
});

// Enable the favorites filter only if the user is logged in
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
