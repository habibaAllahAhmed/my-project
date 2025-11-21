$(document).ready(function () {
    function updateSparkles() {
        let theme = localStorage.getItem("theme");
        $("#Characters ul li img").each(function () {
            if (theme === "light") {
                $(this).attr("src", "images/characters/img/sparkle.png");
            } else {
                $(this).attr("src", "images/characters/img/blacksparkle.png");
            }
        });
    }


    let theme = localStorage.getItem("theme");
    if (theme === "dark") {
        $("body").addClass("dark-mode");
        $(".mode").addClass("change");
    } else {
        $("body").removeClass("dark-mode");
        $(".mode").removeClass("change");
    }
    updateSparkles();

    $(".theme .fa-moon").click(function () {
        $("body").removeClass("dark-mode");
        $(".mode").removeClass("change");
        localStorage.setItem("theme", "light");
        updateSparkles();
    });

    $(".theme .fa-sun").click(function () {
        $("body").addClass("dark-mode");
        $(".mode").addClass("change");
        localStorage.setItem("theme", "dark");
        updateSparkles();
    });
});
