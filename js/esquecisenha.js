$(document).ready(function () {
    function mostrarMensagem(texto, tipo = 'erro') {
      $('#msg-feedback').remove();
  
      const cores = {
        erro: { bg: '#D94F4F', corTexto: '#fff' },
        sucesso: { bg: '#5E7153', corTexto: '#ebddba' }
      };
  
      const coresTipo = cores[tipo] || cores.erro;
  
      const mensagem = $('<div id="msg-feedback"></div>').text(texto).css({
        'margin-top': '15px',
        'padding': '10px',
        'border-radius': '8px',
        'background-color': coresTipo.bg,
        'color': coresTipo.corTexto,
        'font-weight': '600',
        'text-align': 'center',
        'box-shadow': '2px 2px 10px rgba(0,0,0,0.3)',
        'cursor': 'default',
        'user-select': 'none'
      });
  
      $('.main').after(mensagem);
  
      setTimeout(() => {
        mensagem.fadeOut(400, function () {
          $(this).remove();
        });
      }, 4000);
    }
  
    $('form.input').submit(function (event) {
      event.preventDefault();
  
      const email = $('.input1').val().trim();
  
      if (!email) {
        mostrarMensagem('Por favor, preencha o campo de e-mail.', 'erro');
        return;
      }
  
      // Aqui faz a chamada para a API
      $.ajax({
        url: 'http://localhost:3000/auth/forgot-password', // ou a rota correta que você criou
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ email }),
        success: function(res) {
          alert(res.msg || 'E-mail enviado com sucesso!');
        },
        error: function(xhr) {
          alert(xhr.responseJSON?.msg || 'Erro ao enviar e-mail.');
        }
      
      });
    });
  
    $('.entrar').hover(
      function () {
        $(this).css({
          'background-color': '#5E7153',
          'color': 'white',
          'cursor': 'pointer',
          'transition': 'all 0.3s ease-in-out'
        });
      },
      function () {
        $(this).css({
          'background-color': 'white',
          'color': '#5E7153',
          'transition': 'all 0.3s ease-in-out'
        });
      }
    );
  });