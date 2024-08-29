## Instalação

### Pré-requisitos

Liste as ferramentas e softwares necessários para rodar o projeto:

- Node.js versão 16.20.2
- NPM ou Yarn
- Expo CLI

### Passos para Instalação

1. Clone o repositório:
    ```bash
    git clone https://github.com/laura-caroline/analyze-phrase.git
    ```
2. Navegue até o diretório do projeto:
    ```bash
    cd analyze-phrase
    ```
2. Modifique a branch para master:
    ```bash
    git checkout master
    ```
3. Instale as dependências:
    ```bash
    npm install
    ```

6. Rodar comando de cli:
    ```bash
    bun run cli.ts analyze --depth 3 "Eu vi gorilas e papagaios"
    bun run cli.ts analyze --depth 2 “Eu amo papagaios”
    ```

7. Rode os testes:
    ```bash
    npm run jest
    ```
