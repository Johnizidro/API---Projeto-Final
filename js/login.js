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

    // Substitui o seletor para a classe correta do form
    $('form.formCadastro').submit(function (event) {
        event.preventDefault();

        // Ajusta para pegar email no #nome (apesar do nome ser meio confuso)
        const email = $('#nome').val().trim();
        const senha = $('#senha').val().trim();

        if (!email && !senha) {
            mostrarMensagem('Preencha o e-mail e a senha.', 'erro');
            return;
        }

        if (!email) {
            mostrarMensagem('Por favor, preencha o campo de e-mail.', 'erro');
            return;
        }

        if (!senha) {
            mostrarMensagem('Por favor, preencha o campo de senha.', 'erro');
            return;
        }

        mostrarMensagem('Login realizado com sucesso!', 'sucesso');

        // Aqui pode adicionar redirecionamento ou chamada AJAX, se necessário
        // Exemplo: window.location.href = 'dashboard.html';
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
