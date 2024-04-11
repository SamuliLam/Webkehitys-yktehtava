export function attachListEventListeners(restaurantContainer, favoriteIcon, infoBox) {
    favoriteIcon.addEventListener('click', function (event) {
        event.stopPropagation();
        this.classList.toggle('favorited');
    });

    restaurantContainer.addEventListener('click', function () {
        infoBox.classList.toggle('show-info');
        this.classList.toggle('highlight');
    });

}