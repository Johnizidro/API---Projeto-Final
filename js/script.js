const swiper = new Swiper('.swiper', {
    loop: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    breakpoints: {
        515: {
          slidesPerView: 1,
        },
        600: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        950: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        1550: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
      },
}
);
  


function abrirMenu() {
    const menu = document.getElementById("menuLateral");
    if (menu.style.left === "0px") {
        menu.style.left = "-250px";
    } else {
        menu.style.left = "0px";
    }
}

function abrirMenu() {
    document.getElementById("menuLateral").style.left = "0px";
}

function fecharMenu() {
    document.getElementById("menuLateral").style.left = "-250px";
}

