export function attachListEventListeners(restaurantContainer, favoriteIcon, infoBox) {
    favoriteIcon.addEventListener('click', function (event) {
        event.stopPropagation();
        this.classList.toggle('favorited');
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