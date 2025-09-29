const axios = require('axios');

const executarTemplate = async (pergunta) => {
  const apiKey = process.env.SAI_API_KEY;

  try {
    const response = await axios({
      method: 'post',
      url: 'https://sai-library.saiapplications.com/api/templates/68287dd3d20e909e41fbdab4/execute',
      headers: {
        'X-Api-Key': apiKey
      },
      data: {
        inputs: {
          descricaopergunta: pergunta
        }
      }
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao chamar o SaI Library:', error.response?.data || error.message);
    throw error;
  }
};

module.exports = {
  executarTemplate,
};