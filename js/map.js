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

const restaurants = await fetchRestaurantData();

let iconOptions = {
    iconUrl: 'assets/restaurant.png',
    iconSize: [35, 35],
    iconAnchor: [17.5, 35]
};

export const customIcon = L.icon(iconOptions);

for (const restaurant of restaurants) {
    const coords = [restaurant.location.coordinates[1], restaurant.location.coordinates[0]];
    let marker = L.marker(coords, {icon: customIcon}).addTo(map);
    marker.bindPopup(restaurant.name + '<br>' + restaurant.address);
}

