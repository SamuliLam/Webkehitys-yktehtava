'use strict';
import { fetchRestaurantData } from './utils.js';

var map = L.map('map')
navigator.geolocation.getCurrentPosition(position => {
    const coords = [position.coords.latitude, position.coords.longitude];
    map.setView(coords, 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
});


let SearchControl = L.Control.extend({
    onAdd: function(map) {
        let searchBox = L.DomUtil.create('div', 'search-box');

        let searchInput = L.DomUtil.create('input', '', searchBox);
        searchInput.type = 'text';
        searchInput.id = 'search-field';
        searchInput.placeholder = 'Find a restaurant: ';

        let container = L.DomUtil.create('div', '', searchBox);
        container.className = 'search-child-container';

        let searchButton = L.DomUtil.create('button', '', container);
        searchButton.id = 'search-button';
        searchButton.textContent = 'Search';

        searchButton.addEventListener('click', function() {
            let query = searchInput.value;

            let restaurant = searchRestaurant(restaurants, query);

            if (restaurant) {
                const coords = [restaurant.location.coordinates[1], restaurant.location.coordinates[0]];
                map.setView(coords, 13);
            }
        });

        let greenIcon = L.DomUtil.create('img', '', container);
        greenIcon.src = 'assets/green-restaurant.png';
        greenIcon.style.height = '60px';
        greenIcon.style.marginLeft = '10px';

        let instructionText = L.DomUtil.create('span', 'instruction-text', container);
        instructionText.textContent = 'CLOSEST';

        return searchBox;
    }
});

map.addControl(new SearchControl({ position: 'topleft' }));

map.addControl(new SearchControl({ position: 'topleft' }));

const restaurants = await fetchRestaurantData();

let iconOptions = {
    iconUrl: 'assets/restaurant.png',
    iconSize: [35, 35],
    iconAnchor: [17.5, 35]
};

let greenIconOptions = {
    iconUrl: 'assets/green-restaurant.png',
    iconSize: [35, 35],
    iconAnchor: [17.5, 35]
};

export const customIcon = L.icon(iconOptions);
export const greenIcon = L.icon(greenIconOptions);


let closestRestaurant;
let minDistance = Infinity;

for (const restaurant of restaurants) {
    const coords = [restaurant.location.coordinates[1], restaurant.location.coordinates[0]];
    let distance = map.getCenter().distanceTo(coords);
    if (distance < minDistance) {
        minDistance = distance;
        closestRestaurant = restaurant;
    }
    if (restaurant !== closestRestaurant) {
        let marker = L.marker(coords, {icon: customIcon}).addTo(map);
        marker.bindPopup(restaurant.name + '<br>' + restaurant.address);
    }
}

if (closestRestaurant) {
    const coords = [closestRestaurant.location.coordinates[1], closestRestaurant.location.coordinates[0]];
    let marker = L.marker(coords, {icon: greenIcon}).addTo(map);
    marker.bindPopup(closestRestaurant.name + '<br>' + closestRestaurant.address);
}

const urlParams = new URLSearchParams(window.location.search);
const restaurantId = urlParams.get('restaurant');

const restaurant = restaurants.find(r => r._id === restaurantId);

if (restaurant) {
    const coords = [restaurant.location.coordinates[1], restaurant.location.coordinates[0]];
    map.setView(coords, 13);
}

function searchRestaurant(restaurants, query) {
    query = query.toLowerCase();

    for (const restaurant of restaurants) {
        if (restaurant.name.toLowerCase().includes(query)) {
            return restaurant;
        }
    }

    return null;
}
