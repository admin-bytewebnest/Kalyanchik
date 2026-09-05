const slider = document.querySelector(".slider");
const pages = [...document.querySelectorAll(".wrapper-inner")];

const nextBtn = document.getElementById("testimonialsPcNext");
const prevBtn = document.getElementById("testimonialsPcPrevent");

const GAP = 20;

// -------------------
// Клоны
// -------------------

const firstClone = pages[0].cloneNode(true);
const lastClone = pages[pages.length - 1].cloneNode(true);

slider.append(firstClone);
slider.prepend(lastClone);

// Получаем список заново

const slides = [...slider.children];

let index = 1;
let isAnimating = false;

// -------------------

function updatePosition(){

    const width = document.querySelector(".wrapper").offsetWidth;

    slider.style.transform =
        `translateX(-${index * (width + GAP)}px)`;

}

function move(){

    slider.style.transition = "transform .7s ease";

    updatePosition();

}

// -------------------
// Начальная позиция
// -------------------

slider.style.transition = "none";

updatePosition();

// -------------------

nextBtn.addEventListener("click",()=>{

    if(isAnimating) return;

    isAnimating=true;

    index++;

    move();

});

prevBtn.addEventListener("click",()=>{

    if(isAnimating) return;

    isAnimating=true;

    index--;

    move();

});

// -------------------

slider.addEventListener("transitionend",()=>{

    if(index===slides.length-1){

        slider.style.transition="none";

        index=1;

        updatePosition();

    }

    if(index===0){

        slider.style.transition="none";

        index=slides.length-2;

        updatePosition();

    }

    isAnimating=false;

});

// -------------------

window.addEventListener("resize",()=>{

    slider.style.transition="none";

    updatePosition();

});