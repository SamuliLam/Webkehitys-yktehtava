'use strict';
import { fetchRestaurantData } from './utils.js';

var map = L.map('map')
navigator.geolocation.getCurrentPosition(position => {
    console.log(position.coords.latitude, position.coords.longitude);
    const coords = [position.coords.latitude, position.coords.longitude];
    map.setView(coords, 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
});


// new Leaflet control for the search box
let SearchControl = L.Control.extend({
    onAdd: function(map) {
        // Create a new div element for the search box
        let searchBox = L.DomUtil.create('div', 'search-box');

        // Create the search input field and button
        let searchInput = L.DomUtil.create('input', '', searchBox);
        searchInput.type = 'text';
        searchInput.id = 'search-field';
        searchInput.placeholder = 'Find a restaurant: ';

        let searchButton = L.DomUtil.create('button', '', searchBox);
        searchButton.id = 'search-button';
        searchButton.textContent = 'Search';

        // Create the green icon and instruction text
        let greenIcon = L.DomUtil.create('img', '', searchBox);
        greenIcon.src = 'assets/green-restaurant.png';
        greenIcon.style.height = '60px';
        greenIcon.style.marginLeft = '10px';


        let instructionText = L.DomUtil.create('span', 'instruction-text', searchBox);
        instructionText.textContent = 'Closest restaurant';

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
    // Only add the marker if the restaurant is not the closest one
    if (restaurant !== closestRestaurant) {
        let marker = L.marker(coords, {icon: customIcon}).addTo(map);
        marker.bindPopup(restaurant.name + '<br>' + restaurant.address);
    }
}

// Add the marker for the closest restaurant separately
if (closestRestaurant) {
    const coords = [closestRestaurant.location.coordinates[1], closestRestaurant.location.coordinates[0]];
    let marker = L.marker(coords, {icon: greenIcon}).addTo(map);
    marker.bindPopup(closestRestaurant.name + '<br>' + closestRestaurant.address);
}

// Get the restaurant ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const restaurantId = urlParams.get('restaurant');

// Find the corresponding restaurant
const restaurant = restaurants.find(r => r._id === restaurantId);

if (restaurant) {
    // Set the map view to the restaurant's marker
    const coords = [restaurant.location.coordinates[1], restaurant.location.coordinates[0]];
    map.setView(coords, 13);
}