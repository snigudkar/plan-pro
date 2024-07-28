$(document).ready(function() {
    $(".owl-carousel").owlCarousel({
        items: 1,
        loop: true,
        margin: 10,
        center: true,
        nav: true,
        navText: [
            "<i class='fa fa-chevron-left'></i>",
            "<i class='fa fa-chevron-right'></i>"
        ],
        onInitialized: updateOpacity,
        onTranslated: updateOpacity
    });

    function updateOpacity(event) {
        $(".owl-carousel .owl-item").removeClass("active");
        var centerIndex = Math.floor(event.item.count / 2);
        var currentIndex = event.item.index;

        $(".owl-carousel .owl-item").eq(currentIndex + centerIndex).addClass("active");
    }
});
