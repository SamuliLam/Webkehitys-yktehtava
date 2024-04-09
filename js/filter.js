
document.getElementById('name-section').addEventListener('click', function () {
    // displayRestaurants('name');
    this.querySelector('.triangle').classList.toggle('rotated');
});

document.getElementById('city-section').addEventListener('click', function () {
    // displayRestaurants('city');
    this.querySelector('.triangle').classList.toggle('rotated');
});

// The favorite section does not do anything yet
document.getElementById('favorite-section').addEventListener('click', function () {
    // TODO: Implement favorite filtering
    this.querySelector('.triangle').classList.toggle('rotated');
});