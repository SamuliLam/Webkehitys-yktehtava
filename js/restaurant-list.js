'use strict';
import * as utils from './utils.js';
import * as eventHandlers from './eventHandlers.js';
import { customIcon } from './map.js';


const restaurantList = document.getElementById('restaurant-list');

const searchField = document.getElementById('search-field');

searchField.addEventListener('keyup', (event) => {
    const searchString = event.target.value.toLowerCase();
    displayRestaurants(searchString);
});

export let markers = {};

export async function displayRestaurants(filteredRestaurants = null, searchString = '') {
    try {
        if (!filteredRestaurants) {
            filteredRestaurants = await utils.fetchRestaurantData();
        }

        const filteredRestaurantsBySearch = filterRestaurantsBySearch(filteredRestaurants, searchString);
        restaurantList.innerHTML = '';

        for (const restaurant of filteredRestaurantsBySearch) {

            // Create HTML elements
            const restaurantListRow = utils.restaurantRow();
            const restaurantContainer = utils.restaurantContainer();
            const restaurantName = utils.restaurantName(restaurant);
            const restaurantAddress = utils.restaurantAddress(restaurant);
            const favoriteIcon = utils.favoriteIcon();
            const infoBox = utils.infoBox();
            const restaurantInfo = utils.CreateRestaurantInfo(restaurant);
            const dailyMenuButton = utils.dailyMenuButton();
            const weeklyMenuButton = utils.weeklyMenuButton();
            const viewOnMapButton = utils.viewOnMapButton();
            const buttonsContainer = utils.buttonsContainer();

            eventHandlers.attachListEventListeners(restaurantContainer, favoriteIcon, infoBox);

            // Append elements to the DOM
            restaurantContainer.appendChild(restaurantName);
            restaurantContainer.appendChild(restaurantAddress);
            restaurantContainer.appendChild(favoriteIcon);
            infoBox.appendChild(restaurantInfo);
            infoBox.appendChild(buttonsContainer);
            buttonsContainer.appendChild(dailyMenuButton);
            buttonsContainer.appendChild(weeklyMenuButton);
            buttonsContainer.appendChild(viewOnMapButton);
            restaurantListRow.appendChild(restaurantContainer);
            restaurantListRow.appendChild(infoBox);
            restaurantList.appendChild(restaurantListRow);

            dailyMenuButton.addEventListener('click', async () => {
                // Clear any existing menus
                const existingMenus = infoBox.querySelectorAll('.menu-table');
                existingMenus.forEach(menu => menu.remove());

                // Check if the daily menu has already been added
                if (infoBox.querySelector('.daily-menu-table')) {
                    return;
                }

                const dailyMenuData = await utils.fetchDailyMenu(restaurant._id);

                // Use the date from the daily menu data if available, otherwise use the current date
                const date = dailyMenuData.date || new Date().toLocaleDateString('fi-FI', { weekday: 'long', day: 'numeric', month: 'long' });

                const dailyMenuTable = utils.createMenuTable(dailyMenuData.courses, 'daily', date);
                infoBox.appendChild(dailyMenuTable);
            });

            weeklyMenuButton.addEventListener('click', async () => {
                // Clear any existing menus
                const existingMenus = infoBox.querySelectorAll('.menu-table');
                existingMenus.forEach(menu => menu.remove());

                // Check if the weekly menu has already been added
                if (infoBox.querySelector('.weekly-menu-table')) {
                    return;
                }

                const weeklyMenuData = await utils.fetchWeeklyMenu(restaurant._id);
                weeklyMenuData.days.forEach(day => {
                    const weeklyMenuTable = utils.createMenuTable(day.courses, 'weekly', day.date);
                    infoBox.appendChild(weeklyMenuTable);
                });
            });

            const coords = [restaurant.location.coordinates[1], restaurant.location.coordinates[0]];
            let marker = L.marker(coords, {icon: customIcon}).addTo(map);
            marker.bindPopup(restaurant.name + '<br>' + restaurant.address);
            markers[restaurant._id] = marker; // store the marker in the markers object

            viewOnMapButton.addEventListener('click', () => {
                window.location.href = `map.html?restaurant=${restaurant._id}`;
            });
        }

    } catch (error) {
        console.error('Error displaying restaurant data', error);
        document.getElementById('slogan').textContent = 'Error fetching restaurant data';
    }

}


function filterRestaurantsBySearch(restaurants, searchString){
    if (!searchString){
        return restaurants;
    }
    return restaurants.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(searchString);
    });

}

displayRestaurants();