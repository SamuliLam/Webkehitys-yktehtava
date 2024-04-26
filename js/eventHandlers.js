import { updateFavoriteRestaurant } from "./fetchCalls.js";

let currentFavoritedIcon = null;
export function attachListEventListeners(restaurantContainer, favoriteIcon, infoBox, restaurant) {
    favoriteIcon.addEventListener('click', function (event) {
        event.stopPropagation();
        if (currentFavoritedIcon && currentFavoritedIcon !== this) {
            currentFavoritedIcon.classList.remove('favorited');
        }
        this.classList.toggle('favorited');
        if (this.classList.contains('favorited')) {
            currentFavoritedIcon = this;
            updateFavoriteRestaurant(restaurant._id);
        }
    });

    restaurantContainer.addEventListener('click', function () {
        infoBox.classList.toggle('show-info');
        this.classList.toggle('highlight');
    });

    infoBox.addEventListener('transitionend', function () {
        if (!infoBox.classList.contains('show-info')) {
            const menus = infoBox.querySelectorAll('table');
            menus.forEach(menu => menu.remove());
        }
    });

}