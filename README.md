The full tutorial is here: https://proflead.dev/posts/ai-chatbot-using-python-and-gemini-api/

The video tutorial is here: https://www.youtube.com/@proflead/videos?sub_confirmation=1

# Configuração do Ambiente e Dependências

Este guia fornece instruções sobre como configurar um ambiente virtual e instalar as dependências necessárias para o projeto.

## 1. Configurar um Ambiente Virtual

Para gerenciar dependências separadamente para o seu projeto, é recomendável usar um ambiente virtual. Siga os passos abaixo para configurar o ambiente virtual:

1. Instale o `python3-venv` com o comando:
    ```bash
    sudo apt install python3-venv
    ```

2. Crie um ambiente virtual com o comando:
    ```bash
    python3 -m venv myprojectenv
    ```

3. Ative o ambiente virtual com o comando:
    ```bash
    source myprojectenv/bin/activate
    ```

## 2. Instalar LangChain

LangChain é uma estrutura projetada para simplificar a criação de aplicativos usando grandes modelos de linguagem. Para instalar o LangChain, execute:
    ```bash
    pip install langchain-core
    ```

## 3. Instalar LangChain-Google-GenAI

Este pacote contém as integrações do LangChain para Gemini por meio de seu SDK de IA generativa. Para instalar o LangChain-Google-GenAI, execute:
    ```bash
    pip install langchain-google-genai
    ```

## 4. Instalar Flask

Depois que o ambiente virtual estiver ativado, você pode usar o pip para instalar o Flask com o comando:
    ```bash
    pip install Flask
    ```

## Próximos Passos

Após concluir as etapas acima, você estará pronto para prosseguir com as próximas etapas do seu projeto.
