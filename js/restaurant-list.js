'use strict';
import * as utils from './utils.js';
import * as eventHandlers from './eventHandlers.js';

const restaurantList = document.getElementById('restaurant-list');

async function displayRestaurants() {
    try {
        const restaurants = await utils.fetchRestaurantData();

        restaurants.forEach(restaurant => {

            // Create HTML elements
            const restaurantListRow = utils.restaurantRow();
            const restaurantContainer = utils.restaurantContainer();
            const restaurantName = utils.restaurantName(restaurant);
            const restaurantAddress = utils.restaurantAddress(restaurant);
            const favoriteIcon = utils.favoriteIcon();
            const infoBox = utils.infoBox();
            const dailyMenuButton = utils.dailyMenuButton();
            const weeklyMenuButton = utils.weeklyMenuButton();
            const menuContent = utils.menuContent();

            eventHandlers.attachListEventListeners(restaurantListRow, restaurantContainer, favoriteIcon, infoBox);

            // Append elements to the DOM
            restaurantContainer.appendChild(restaurantName);
            restaurantContainer.appendChild(restaurantAddress);
            restaurantContainer.appendChild(favoriteIcon);
            infoBox.appendChild(dailyMenuButton);
            infoBox.appendChild(weeklyMenuButton);
            infoBox.appendChild(menuContent);
            restaurantListRow.appendChild(restaurantContainer);
            restaurantListRow.appendChild(infoBox);
            restaurantList.appendChild(restaurantListRow);
        });

    } catch (error) {
        console.error('Error displaying restaurant data', error);
        document.getElementById('slogan').textContent = 'Error fetching restaurant data';
    }
}

displayRestaurants();