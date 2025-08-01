$(document).ready(function() {
    // Função para aplicar o efeito
    $('.link, .image, .monitoramento, .saude, .seguranca, .tecnologia').on('mouseenter', function() {
        $(this).css({
            'transform': 'scale(1.1)',           
            'transition': 'transform 0.3s ease, box-shadow 0.3s ease',
            
        });
    });

    
    $('.link, .image, .monitoramento, .saude, .seguranca, .tecnologia').on('mouseleave', function() {
        $(this).css({
            'transform': 'scale(1)',
            'box-shadow': 'none'
        });
    });
   




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

      $('.facebook, .instagram, .whatsaap, .linkedin').hover(
        function () {
          $(this).css('transform', 'scale(1.15)');
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