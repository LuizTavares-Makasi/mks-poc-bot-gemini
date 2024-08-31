import { streamGemini } from './gemini-api.js';

let form = document.querySelector('form'); // Seleciona o formulário na página
let promptInput = document.querySelector('input[name="prompt"]'); // Seleciona o campo de input com o nome "prompt"
let output = document.querySelector('.output'); // Seleciona o elemento para exibir a saída

// Função que será executada quando o formulário for submetido
form.onsubmit = async (ev) => {
  ev.preventDefault(); // Impede o comportamento padrão do formulário (recarregar a página)
  output.textContent = 'Generating...'; // Exibe uma mensagem informando que a geração está em andamento

  try {
    // Carrega a imagem como uma string base64 (este trecho está comentado e não faz nada por enquanto)
    
    // Monta o prompt combinando o texto inserido com a imagem escolhida
    let contents = [
      {
        type: "text",
        text: promptInput.value, // Obtém o texto inserido no campo de input
      }
    ];

    // Chama o modelo gemini-pro-vision e obtém um stream de resultados
    let stream = streamGemini({
      model: 'gemini-pro',
      contents,
    });

    // Lê o stream e interpreta a saída como markdown
    let buffer = [];
    let md = new markdownit(); // Inicializa um renderizador de markdown
    for await (let chunk of stream) { // Itera sobre os chunks do stream
      buffer.push(chunk); // Adiciona o chunk ao buffer
      output.innerHTML = md.render(buffer.join('')); // Renderiza o markdown acumulado no buffer e exibe na saída
    }
  } catch (e) {
    output.innerHTML += '<hr>' + e; // Exibe qualquer erro que ocorrer durante o processo
  }
};
