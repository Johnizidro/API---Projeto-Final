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

      // Insere fora da .main, abaixo dela
      $('.main').after(mensagem);

      setTimeout(() => {
          mensagem.fadeOut(400, function () {
              $(this).remove();
          });
      }, 4000);
  }

  $('.formCadastro').submit(function (event) {
      event.preventDefault();

      const nome = $('#nome').val().trim();
      const email = $('#email').val().trim();
      const telefone = $('#telefone').val().trim();
      const senha = $('#senha').val().trim();
      const confirmeSenha = $('#confsenha').val().trim();

      if (!nome || !email || !telefone || !senha || !confirmeSenha) {
          mostrarMensagem('Por favor, preencha todos os campos obrigatórios!!', 'erro');
          return false;
      }

      if (senha !== confirmeSenha) {
          mostrarMensagem('As senhas não coincidem!', 'erro');
          return false;
      }

      mostrarMensagem('Cadastro realizado com sucesso!', 'sucesso');

      // Resetar formulário (opcional, pode ser removido se não quiser limpar)
      $('.formCadastro')[0].reset();
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
$('.formCadastro').submit(function (event) {
  event.preventDefault();
  console.log("Submit capturado!");
});