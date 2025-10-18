$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const confPassword = $('#confPassword').val().trim();
    const email = urlParams.get('email'); // já pega da URL
  
    $('form.input').submit(function (e) {
      e.preventDefault();
  
      const newPassword = $('#newPassword').val().trim();
  
      if (!newPassword) {
        alert('Por favor, digite a nova senha.');
        return;
      }
  
      // Se quiser, pode pedir confirmação e validar aqui
  
      $.ajax({
        url: 'http://localhost:3000/auth/reset-password',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ token, email, newPassword, confPassword }),
        success: function (res) {
          alert(res.msg);
          // Redirecionar para login, por exemplo
          window.location.href = 'login.html';
        },
        error: function (xhr) {
          alert(xhr.responseJSON.msg || 'Erro ao atualizar senha.');
        }
      });
    });
  });
  