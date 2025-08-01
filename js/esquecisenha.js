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

      // Aqui o seletor usa a classe input1, pois o input não tem id
      const email = $('.input1').val().trim();

      if (!email) {
          mostrarMensagem('Por favor, preencha o campo de e-mail.', 'erro');
          return;
      }

      mostrarMensagem('E-mail enviado com sucesso!', 'sucesso');

      // Opcional: limpar o campo
      $('.input1').val('');
  });

  $('.entrar').hover(
      function () {
          // Ao passar o mouse
          $(this).css({
              'background-color': '#5E7153',
              'color': 'white',
              'cursor': 'pointer',
              'transition': 'all 0.3s ease-in-out'
          });
      },
      function () {
          // Ao tirar o mouse
          $(this).css({
              'background-color': 'white',
              'color': '#5E7153',
              'transition': 'all 0.3s ease-in-out'
          });
      }
  );
});
