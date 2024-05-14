// Description: Utility functions for fetching data and creating elements
// Fetching data from the API
export async function fetchRestaurantData() {
    try {
        const response = await fetch('https://10.120.32.94/restaurant/api/v1/restaurants');
        const restaurants = await response.json();
        return restaurants;
    } catch (error) {
        console.error('Error fetching restaurant data', error);
    }
}

export async function fetchDailyMenu(id, lang = 'fi') {
    try {
        const url = `https://10.120.32.94/restaurant/api/v1/restaurants/daily/${id}/${lang}`;
        const response = await fetch(url);
        const data = await response.json();

        if (response.status === 200) {
            return data;
        }
    } catch (error) {
        console.error('Error fetching daily menu', error);
    }
}

export async function fetchWeeklyMenu(id, lang = 'fi') {
    try {
        const url = `https://10.120.32.94/restaurant/api/v1/restaurants/weekly/${id}/${lang}`;
        const response = await fetch(url);
        const data = await response.json();

        if (response.status === 200) {
            return data;
        }
    } catch (error) {
        console.error('Error fetching weekly menu', error);
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

export const CreateRestaurantInfo = (restaurant) => {
    const restaurantInfo = document.createElement('div');
    restaurantInfo.className = 'restaurant-info';

    const infoList = document.createElement('ul');
    restaurantInfo.appendChild(infoList);

    const address = document.createElement('li');
    const city = document.createElement('li');
    const company = document.createElement('li');
    const phone = document.createElement('li');
    const postalCode = document.createElement('li');

    address.textContent = 'Address: ' + restaurant.address;
    city.textContent = 'City: ' + restaurant.city;
    company.textContent = 'Company: ' + restaurant.company;
    phone.textContent = 'Phone: ' + restaurant.phone;
    postalCode.textContent = 'Postal code: ' + restaurant.postalCode;

    infoList.appendChild(address);
    infoList.appendChild(city);
    infoList.appendChild(company);
    infoList.appendChild(phone);
    infoList.appendChild(postalCode);

    return restaurantInfo;
}

export const buttonsContainer = () => {
    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('buttons-container');
    return buttonsContainer;
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

export const viewOnMapButton = () => {
    const viewOnMapButton = document.createElement('button');
    viewOnMapButton.textContent = 'View on map';
    viewOnMapButton.id = 'view-on-map-button';
    return viewOnMapButton;

}

export function createMenuTable(courses, menuType, date) {
    let table;
    if (Array.isArray(courses) && typeof courses[0] === 'object' && !Array.isArray(courses[0])) {
        table = createDayTable(courses, date);
        table.classList.add(`${menuType}-menu-table`);
        return table;
    } else if (Array.isArray(courses) && Array.isArray(courses[0])) {

        const menuContainer = document.createElement('div');
        menuContainer.className = 'menu-container';

        // Iterate over each day
        courses.forEach(day => {
            const dayTable = createDayTable(day.courses, day.date);
            dayTable.classList.add(`${menuType}-menu-table`);
            menuContainer.appendChild(dayTable);
        });

        return menuContainer;
    }
}

function createDayTable(courses, date) {
    const table = document.createElement('table');
    table.className = 'menu-table';
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    const tr = document.createElement('tr');

    const headers = [date, 'Price', 'Diets'];

    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        tr.appendChild(th);
    });

    thead.appendChild(tr);
    table.appendChild(thead);

    courses.forEach(course => {
        const tr = document.createElement('tr');

        const tdName = document.createElement('td');
        tdName.textContent = course.name;
        tr.appendChild(tdName);

        const tdPrice = document.createElement('td');
        if (course.price){
            tdPrice.textContent = course.price;
        } else {
            tdPrice.textContent = 'Not available';
        }
        tr.appendChild(tdPrice);

        const tdDiets = document.createElement('td');
        tdDiets.textContent = course.diets;
        tr.appendChild(tdDiets);

        tbody.appendChild(tr);
    });

    table.appendChild(tbody);

    return table;
}
