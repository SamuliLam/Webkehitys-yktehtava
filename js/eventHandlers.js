export function attachMainEventListeners() {
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        header.classList.toggle('sticky', window.scrollY > 0);
    });

    document.getElementById('hamburger-icon').addEventListener('click', function() {
        document.getElementById('sidebar').classList.toggle('show');
    });

    document.getElementById('hamburger-icon-sidebar').addEventListener('click', function() {
        document.getElementById('sidebar').classList.toggle('show');
    });

    document.getElementById('name-section').addEventListener('click', function() {
        // displayRestaurants('name');
        this.querySelector('.triangle').classList.toggle('rotated');
    });

    document.getElementById('city-section').addEventListener('click', function() {
        // displayRestaurants('city');
        this.querySelector('.triangle').classList.toggle('rotated');
    });

    // The favorite section does not do anything yet
    document.getElementById('favorite-section').addEventListener('click', function() {
        // TODO: Implement favorite filtering
        this.querySelector('.triangle').classList.toggle('rotated');
    });
}

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