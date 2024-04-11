'use strict';
import * as utils from './utils.js';
import * as eventHandlers from './eventHandlers.js';


const restaurantList = document.getElementById('restaurant-list');

async function displayRestaurants() {
    try {
        const restaurants = await utils.fetchRestaurantData();

        for (const restaurant of restaurants) {

            // Create HTML elements
            const restaurantListRow = utils.restaurantRow();
            const restaurantContainer = utils.restaurantContainer();
            const restaurantName = utils.restaurantName(restaurant);
            const restaurantAddress = utils.restaurantAddress(restaurant);
            const favoriteIcon = utils.favoriteIcon();
            const infoBox = utils.infoBox();
            const dailyMenuButton = utils.dailyMenuButton();
            const weeklyMenuButton = utils.weeklyMenuButton();
            const buttonsContainer = utils.buttonsContainer();

            eventHandlers.attachListEventListeners(restaurantContainer, favoriteIcon, infoBox);

            // Append elements to the DOM
            restaurantContainer.appendChild(restaurantName);
            restaurantContainer.appendChild(restaurantAddress);
            restaurantContainer.appendChild(favoriteIcon);
            infoBox.appendChild(buttonsContainer);
            buttonsContainer.appendChild(dailyMenuButton);
            buttonsContainer.appendChild(weeklyMenuButton);
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
                const dailyMenuTable = utils.createMenuTable(dailyMenuData.courses, 'daily');
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
                    const weeklyMenuTable = utils.createMenuTable(day.courses, 'weekly');
                    infoBox.appendChild(weeklyMenuTable);
                });
            });
        }

    } catch (error) {
        console.error('Error displaying restaurant data', error);
        document.getElementById('slogan').textContent = 'Error fetching restaurant data';
    }

}

displayRestaurants();