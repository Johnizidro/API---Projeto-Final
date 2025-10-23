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
  menu.style.left = "0px";

  // Adiciona um listener para fechar o menu ao clicar fora
  document.addEventListener("click", fecharAoClicarFora);
}

function fecharMenu() {
  const menu = document.getElementById("menuLateral");
  menu.style.left = "-250px";

  // Remove o listener quando o menu for fechado
  document.removeEventListener("click", fecharAoClicarFora);
}

function fecharAoClicarFora(event) {
  const menu = document.getElementById("menuLateral");

  // Verifica se o clique foi fora do menu e fora do botão que abre o menu
  if (
    !menu.contains(event.target) &&
    !event.target.closest(".menu img") // substitua por seu botão real de abertura se necessário
  ) {
    fecharMenu();
  }
}

