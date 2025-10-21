const chatBtn = document.getElementById("chatBtn");
const chatBox = document.getElementById("chatBox");
const closeChat = document.getElementById("closeChat");
const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const chatMessages = document.getElementById("chatMessages");

// Abrir o chat -> esconde o botão
chatBtn.addEventListener("click", () => {
  chatBox.style.display = "flex";
  chatBtn.style.display = "none";
});

// Fechar o chat -> mostra o botão novamente e limpa os campos
closeChat.addEventListener("click", () => {
  chatBox.style.display = "none";
  chatBtn.style.display = "flex";

  // Limpa o chat e o campo de input
  chatMessages.innerHTML = `<p class="bot-msg">Olá! Eu sou a I.A da ConectaBov, como posso ajudar?</p>`;
  userInput.value = "";
});

// Função para adicionar mensagem ao chat
function adicionarMensagem(texto, tipo) {
  const msg = document.createElement("p");
  msg.textContent = texto;

  if (tipo === "usuario") {
    msg.classList.add("user-msg");
  } else if (tipo === "bot") {
    msg.classList.add("bot-msg");
  }

  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Função principal de envio
async function enviarMensagem() {
  const msg = userInput.value.trim();
  if (!msg) return;

  // Adiciona mensagem do usuário
  adicionarMensagem(msg, "usuario");
  userInput.value = "";

  // Mensagem temporária de "pensando..."
  const thinkingMsg = document.createElement("p");
  thinkingMsg.textContent = "A IA está pensando...";
  thinkingMsg.classList.add("bot-msg");
  thinkingMsg.style.fontStyle = "italic";
  chatMessages.appendChild(thinkingMsg);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  try {
    const response = await fetch("http://localhost:3000/api/pergunta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pergunta: msg }),
    });

    if (!response.ok) {
      throw new Error(`Erro na resposta da API: ${response.statusText}`);
    }

    const data = await response.json();

    // Remove mensagem "pensando..."
    chatMessages.removeChild(thinkingMsg);

    let textoResposta = "";

    if (typeof data === "string") {
      textoResposta = data;
    } else if (data.result || data.resposta || data.outputs) {
      textoResposta = JSON.stringify(data, null, 2);
    } else {
      textoResposta = JSON.stringify(data, null, 2);
    }

    adicionarMensagem(textoResposta, "bot");
  } catch (error) {
    chatMessages.removeChild(thinkingMsg);
    adicionarMensagem(`Erro: ${error.message}`, "bot");
  }
}

// Enviar com botão
sendBtn.addEventListener("click", enviarMensagem);

// Enviar com Enter
userInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    enviarMensagem();
  }
});


function logout() {
  // Remove o token de autenticação
  localStorage.removeItem('token');

  // Redireciona para a tela de login
  window.location.href = 'login.html'; // Ajuste o caminho conforme sua estrutura
}
