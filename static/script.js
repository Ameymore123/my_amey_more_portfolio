document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = target.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    });
});









VanillaTilt.init(document.querySelectorAll(".timeline-content"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
});




// Optionally use VanillaTilt for enhanced tilt
document.addEventListener("DOMContentLoaded", function () {
    if (typeof VanillaTilt !== "undefined") {
        VanillaTilt.init(document.querySelectorAll(".tilt-effect"), {
            max: 15,
            speed: 400,
            glare: false,
            "max-glare": 0.3,
        });
    }
});


VanillaTilt.init(document.querySelectorAll(".tilt-me"), {
    max: 15,
    speed: 400,
    glare: false,
    "max-glare": 0.3
});


VanillaTilt.init(document.querySelectorAll(".flip-card"), {
    max: 25,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
});










// Disable right-click
document.addEventListener('contextmenu', event => event.preventDefault());



document.onkeydown = function (e) {
    if (e.keyCode == 123 || // F12
        (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) || // Ctrl+Shift+I
        (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) || // Ctrl+Shift+C
        (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) || // Ctrl+Shift+J
        (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) // Ctrl+U
    ) {
        return false;
    }
};

