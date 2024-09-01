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
    ```
    python3 -m venv myprojectenv
    ```

3. Ative o ambiente virtual com o comando:
    ```
    source myprojectenv/bin/activate
    ```

## 2. Instalar LangChain

LangChain é uma estrutura projetada para simplificar a criação de aplicativos usando grandes modelos de linguagem. Para instalar o LangChain, execute:
    ```
    pip install langchain-core
    ```

## 3. Instalar LangChain-Google-GenAI

Este pacote contém as integrações do LangChain para Gemini por meio de seu SDK de IA generativa. Para instalar o LangChain-Google-GenAI, execute:
    ```
    pip install langchain-google-genai
    ```

## 4. Instalar Flask

Depois que o ambiente virtual estiver ativado, você pode usar o pip para instalar o Flask com o comando:
    ```
    pip install Flask
    ```

## Próximos Passos

Após concluir as etapas acima, você estará pronto para prosseguir com as próximas etapas do seu projeto. Para ter certeza de que está funcionando bem, vamos executá-lo.
Use este comando:
    ```
    python3 app.py
    ```

## Para Mais Informações

1. **Leia o Tutorial Completo**

   Acesse o tutorial completo sobre como criar um chatbot de IA usando Python e a API Gemini [aqui](https://proflead.dev/posts/ai-chatbot-using-python-and-gemini-api/).

2. **Assista ao Vídeo Tutorial**

   Confira o vídeo tutorial no canal [ProfLead no YouTube](https://www.youtube.com/@proflead/videos?sub_confirmation=1) para um passo a passo visual.