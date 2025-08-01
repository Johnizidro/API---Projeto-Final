$(document).ready(function() {



$('.facebook, .instagram, .whatsaap, .linkedin, .colaborador, .gestao, .manutencao, .image').hover(
    function () {
      $(this).css('transform', 'scale(1.07)');
    },
    function () {
      $(this).css('transform', 'scale(1)');
    }
  );

  // Expansão da imagem
  $('.img-gado img').hover(
    function () {
      $(this).css('transform', 'scale(1.05)');
    },
    function () {
      $(this).css('transform', 'scale(1)');
    }
  );


});