/*таймер*/
const startButton = document.querySelector('.btn-start');
const timerDisplay = document.querySelector('.timer-display');
startButton.addEventListener('click', function () {
    startButton.innerText = "BREATHE...";
    startButton.style.pointerEvents = "none";
    startButton.style.opacity = "0.5";
    let timeLeft = 120;
    const timer = setInterval(function () {

        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        timerDisplay.innerText = minutes + ":" + seconds;
        if (timeLeft <= 0) {
            clearInterval(timer);
            startButton.innerText = "DONE";
        }

    }, 1000);
});


/* скрол сторінок на базі GSAP, який я адаптувала під свій лендинг
  https://gsap.com/community/forums/topic/44627-smooth-full-page-snapping-with-gsap-like-fullpagejs/ */

gsap.registerPlugin(ScrollToPlugin);

const screens = Array.from(document.querySelectorAll('header, section, footer'));
let isSnapping = false;

function goToScreen(index) {
    if (index < 0 || index >= screens.length) return;

    isSnapping = true;


    gsap.to(window, {
        scrollTo: { y: screens[index].offsetTop, autoKill: false },
        duration: 1.2,
        ease: "power2.inOut",
        onComplete: () => {
            setTimeout(() => { isSnapping = false; }, 300);
        }
    });
}

function getCurrentScreenIndex() {
    const currentScroll = window.scrollY;
    return screens.findIndex(screen => currentScroll < screen.offsetTop + screen.offsetHeight / 2);
}


window.addEventListener('wheel', (e) => {
    if (isSnapping) {
        e.preventDefault();
        return;
    }

    const direction = e.deltaY > 0 ? 1 : -1;
    const currentIndex = getCurrentScreenIndex();

    e.preventDefault();
    goToScreen(currentIndex + direction);
}, { passive: false });

window.addEventListener('keydown', (e) => {
    if (isSnapping) {
        if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', ' '].includes(e.key)) {
            e.preventDefault();
        }
        return;
    }

    const currentIndex = getCurrentScreenIndex();

    if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        goToScreen(currentIndex + 1);
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        goToScreen(currentIndex - 1);
    }
});

/* анімація для появи тексту на базі GSAP
  https://gsap.com/docs/v3/Plugins/ScrollTrigger/ */
gsap.registerPlugin(ScrollTrigger);


const elementsToAnimate = document.querySelectorAll('.animate-me');


elementsToAnimate.forEach((item) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 30,
        duration: 2,
        ease: "power2.out"
    });
});