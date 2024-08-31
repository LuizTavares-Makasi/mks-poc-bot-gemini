# O módulo json é utilizado para trabalhar com dados no formato JSON.
# O módulo os é usado para interagir com o sistema operacional.

import json
import os

# Flask: Cria a aplicação web Flask.
# jsonify: Converte dados para o formato JSON para respostas.
# request: Acessa dados da requisição recebida.
# send_file: Envia arquivos para o cliente.
# send_from_directory: Envia arquivos de um diretório especificado.

from flask import Flask, jsonify, request, send_file, send_from_directory

# HumanMessage de langchain_core.messages: Representa uma mensagem de um usuário humano.
# ChatGoogleGenerativeAI de langchain_google_genai: Fornece uma interface de chat para a IA generativa do Google.

from langchain_core.messages import HumanMessage
from langchain_google_genai import ChatGoogleGenerativeAI


# Cria uma aplicação web Flask chamada app.
app = Flask(__name__)

# Define uma variável de ambiente GOOGLE_API_KEY com uma chave de API especificada.
os.environ["GOOGLE_API_KEY"] = "AIzaSyCKybiE4Jc8SGJ4sljig5qsSIaCAv9DUEk"; 

# Define uma rota para a página inicial (/) que envia o arquivo index.html do diretório web.
@app.route('/')
def home():
    return send_file('web/index.html')


# Define uma rota para o endpoint /api/generate que aceita requisições POST.
# Quando uma requisição POST é recebida, obtém os dados JSON do corpo da requisição.
# Extrai os campos "contents" e "model" dos dados JSON.
# Cria um modelo ChatGoogleGenerativeAI e uma HumanMessage com o conteúdo.
# Transmite a resposta do modelo em chunks, enviando cada chunk como um stream de eventos JSON.
# Se ocorrer um erro, retorna uma resposta JSON com a mensagem de erro.
@app.route("/api/generate", methods=["POST"])
def generate_api():
    if request.method == "POST":
        try:
            req_body = request.get_json()
            content = req_body.get("contents")
            model = ChatGoogleGenerativeAI(model=req_body.get("model"))
            message = HumanMessage(
                content=content
            )
            response = model.stream([message])
            def stream():
                for chunk in response:
                    yield 'data: %s\n\n' % json.dumps({ "text": chunk.content })

            return stream(), {'Content-Type': 'text/event-stream'}

        except Exception as e:
            return jsonify({ "error": str(e) })


# Define uma rota para servir arquivos estáticos do diretório web para qualquer caminho dado.
# Quando uma requisição corresponde ao caminho, envia o arquivo solicitado do diretório web.
@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('web', path)

# Se o script for executado diretamente, inicia a aplicação Flask em modo de debug.
if __name__ == '__main__':
    app.run(debug=True)
