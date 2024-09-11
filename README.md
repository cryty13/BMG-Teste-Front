# BMG Front

## Pré-requisitos

- **Node.js**: Certifique-se de ter o **Node.js** instalado em sua máquina, na versão **14.20.0** ou superior.
  - Para verificar a versão do Node.js instalada, use o comando:
    ```bash
    node -v
    ```
  - Se você ainda não tem o Node.js instalado, faça o download [aqui](https://nodejs.org/) e siga as instruções de instalação.

## Como rodar o projeto

1. Clone este repositório para sua máquina local:

    ```bash
    git clone https://github.com/cryty13/BMG-Teste-Front.git
    ```

2. Navegue até a pasta do projeto:

    ```bash
    cd bmg-front
    ```

3. Instale as dependências necessárias:

    ```bash
    npm install
    ```

4. Para iniciar o servidor de desenvolvimento, execute o comando:

    ```bash
    npm run start
    ```

    Isso irá iniciar o projeto, e você poderá acessá-lo no navegador no endereço `http://localhost:3000` (ou na porta configurada).

## Tecnologias Utilizadas

- **Tailwind CSS**: Usado para a estilização da interface. Tailwind é um framework CSS utilitário que permite construir layouts personalizados de forma rápida.
  
  Para mais informações sobre Tailwind CSS, consulte a [documentação oficial](https://tailwindcss.com/docs).

- **TanStack/React-Query**: Utilizado para fazer as requisições de dados e gerenciamento de estado assíncrono. O React Query simplifica o gerenciamento de requisições HTTP e a manipulação de cache.

  Para mais informações sobre o React Query, veja a [documentação oficial](https://react-query.tanstack.com/).

## Estrutura do Projeto

Este é o projeto frontend do BMG, desenvolvido em React. Ele se conecta a um backend .NET Core 8.0 e a um banco de dados MariaDB.


Link: https://bmg-teste.willianbuqui.dev/