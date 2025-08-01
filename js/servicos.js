$(document).ready(function() {



    $('.registro-rodizio, .registro-gado, .registro-comedouros, .registro-bebedouros, .registro-metros, .registro-sensores, .regitro-piquetes, .registro-estoque, .registro-graficos').hover(
        function () {
          $(this).css('transform', 'scale(1.05)');
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
      
      $('.ancora-login *').hover(
        function () {
          $(this).css({
            'transform': 'scale(1.08)',
            'transition': 'transform 0.3s ease-in-out'
          });
        },
        function () {
          $(this).css({
            'transform': 'scale(1)',
            'transition': 'transform 0.3s ease-in-out'
          });
        }
      );

      $('.pesquisa').on('focus', function () {
        $(this).css({
          'width': '105%',
          'box-shadow': '0 0 8px rgba(94, 113, 83, 0.2)',
          'transition': 'all 0.3s ease-in-out',
          'outline': 'none',
          'background-color': '#fdfcf8'
        });
      });
    
      $('.pesquisa').on('blur', function () {
        $(this).css({
          'width': '100%',
          'box-shadow': 'none',
          'transition': 'all 0.3s ease-in-out',
          'background-color': ''
        });
      });
    
    });