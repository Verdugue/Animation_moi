document.addEventListener('DOMContentLoaded', function() {
    var flkty = new Flickity('.js-flickity', {
        wrapAround: true,
        cellAlign: 'center',
        contain: true,
        adaptiveHeight: true,
        selectedAttraction: 0.2,
        friction: 0.8,
        percentPosition: false,
        on: {
            ready: function() {
                this.resize();
            },
            change: function() {
                this.resize();
            }
        }
    });
});