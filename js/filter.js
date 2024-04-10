
document.getElementById('name-filter').addEventListener('click', function () {
    // displayRestaurants('name');
    this.querySelector('.triangle').classList.toggle('rotated');
});

document.getElementById('city-filter').addEventListener('click', function () {
    // displayRestaurants('city');
    this.querySelector('.triangle').classList.toggle('rotated');
});

// The favorite section does not do anything yet
document.getElementById('favorite-filter').addEventListener('click', function () {
    // TODO: Implement favorite filtering
    this.querySelector('.triangle').classList.toggle('rotated');
});

