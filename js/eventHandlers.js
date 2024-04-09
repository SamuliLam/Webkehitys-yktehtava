export function attachListEventListeners(restaurantListRow, restaurantContainer, favoriteIcon, infoBox) {
    favoriteIcon.addEventListener('click', function (event) {
        event.stopPropagation();
        this.classList.toggle('favorited');
    });

    restaurantListRow.addEventListener('click', function () {
        infoBox.classList.toggle('show-info');
    });

    restaurantContainer.addEventListener('click', function () {
        this.classList.toggle('highlight');
    });

}