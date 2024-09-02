/**
 * Chama o modelo Gemini com a imagem e/ou partes de texto fornecidas,
 * transmitindo a saída como uma função geradora.
 */
export async function* streamGemini({
  model = 'gemini-pro', // usa 'gemini-pro' para texto -> texto
  contents = [],
} = {}) {
  // Envia o prompt para o backend Python
  // Chama a API definida em main.py
  let response = await fetch("/api/generate", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ model, contents }) // Envia o modelo e o conteúdo para a API
  });

  yield* streamResponseChunks(response); // Processa a resposta em chunks (blocos) de texto
}

/**
 * Um auxiliar que transmite chunks de saída de texto de uma resposta fetch().
 */
async function* streamResponseChunks(response) {
  let buffer = '';

  const CHUNK_SEPARATOR = '\n\n'; // Define o separador de chunks

  // Função que processa o buffer e extrai os chunks de texto
  let processBuffer = async function* (streamDone = false) {
    while (true) {
      let flush = false;
      let chunkSeparatorIndex = buffer.indexOf(CHUNK_SEPARATOR);
      if (streamDone && chunkSeparatorIndex < 0) { // Se o stream terminou e não há mais separadores
        flush = true;
        chunkSeparatorIndex = buffer.length; // Processa o restante do buffer
      }
      if (chunkSeparatorIndex < 0) { // Se não encontrou o separador, sai do loop
        break;
      }

      // Extrai o chunk de texto até o separador e atualiza o buffer
      let chunk = buffer.substring(0, chunkSeparatorIndex);
      buffer = buffer.substring(chunkSeparatorIndex + CHUNK_SEPARATOR.length);
      chunk = chunk.replace(/^data:\s*/, '').trim(); // Remove 'data:' e espaços em branco
      if (!chunk) { // Se o chunk estiver vazio, continua
        if (flush) break;
        continue;
      }
      let { error, text } = JSON.parse(chunk); // Converte o chunk de JSON para um objeto
      if (error) { // Se houver um erro, lança uma exceção
        console.error(error);
        throw new Error(error?.message || JSON.stringify(error));
      }
      yield text; // Retorna o texto processado
      if (flush) break; // Se terminou de processar, sai do loop
    }
  };

  const reader = response.body.getReader(); // Cria um leitor para a resposta
  try {
    while (true) {
      const { done, value } = await reader.read() // Lê os dados da resposta
      if (done) break; // Se a leitura terminou, sai do loop
      buffer += new TextDecoder().decode(value); // Decodifica e adiciona ao buffer
      console.log(new TextDecoder().decode(value)); // Loga o valor decodificado
      yield* processBuffer(); // Processa o buffer para extrair os chunks
    }
  } finally {
    reader.releaseLock(); // Libera o bloqueio do leitor
  }

  yield* processBuffer(true); // Processa o restante do buffer
}