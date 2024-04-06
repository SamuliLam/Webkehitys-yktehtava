// Description: Utility functions for fetching data and creating elements
// Fetching data from the API
export async function fetchRestaurantData() {
    try {
        const response = await fetch('https://10.120.32.94/restaurant/api/v1/restaurants');
        const restaurants = await response.json();
        console.log(restaurants);
        return restaurants;
    } catch (error) {
        console.error('Error fetching restaurant data', error);
    }
}

export async function fetchDailyMenu(id, lang = 'fi' ) {
    try {
        const url = `https://10.120.32.94/restaurant/api/v1/restaurants/daily/${id}/${lang}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error fetching daily menu', error);
    }
}

// --------------------------------------------
// Creating elements for the restaurant list

export const restaurantRow = () => {
    const restaurantListRow = document.createElement('li');
    return restaurantListRow;
}

export const restaurantContainer = () => {
    const restaurantContainer = document.createElement('div');
    restaurantContainer.className = 'restaurant-header';
    return restaurantContainer;
}

export const restaurantName = (restaurant) => {
    const restaurantName = document.createElement('p');
    restaurantName.className = 'restaurant-name';
    restaurantName.textContent = restaurant.name;
    return restaurantName;
}

export const restaurantAddress = (restaurant) => {
    const restaurantAddress = document.createElement('p');
    restaurantAddress.className = 'restaurant-address';
    restaurantAddress.textContent = restaurant.city;
    return restaurantAddress;
}

export const favoriteIcon = () => {
    const favoriteIcon = document.createElement('i');
    favoriteIcon.className = 'favorite-icon';
    favoriteIcon.textContent = '☆';
    return favoriteIcon;
}

export const infoBox = () => {
    const infoBox = document.createElement('div');
    infoBox.classList.add('info-box');
    return infoBox;
}

export const dailyMenuButton = () => {
    const dailyMenuButton = document.createElement('button');
    dailyMenuButton.textContent = 'Daily Menu';
    return dailyMenuButton;
}

export const weeklyMenuButton = () => {
    const weeklyMenuButton = document.createElement('button');
    weeklyMenuButton.textContent = 'Weekly Menu';
    return weeklyMenuButton;
}

export const menuContent = () => {
    const menuContent = document.createElement('div');
    menuContent.className = 'menu-content';
    return menuContent;
}