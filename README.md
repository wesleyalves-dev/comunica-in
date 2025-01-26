# Teste técnico

## Instruções

**Requisitos**

Docker instalado e atualizado.

**Comando para inicialização**

```shell
docker compose up --build
```

**Como acessar a aplicação**

A aplicação front-end estará disponível em:

http://localhost:3000

Na tela de login use as credenciais abaixo

```
Usuário: john.doe
Senha: password
```

## Boas Práticas e Segurança

**[CORS](https://www.npmjs.com/package/cors)**

O CORS foi configurado para que a API possa ser consumida a partir de uma aplicação web. Com ele é possível que apenas páginas de domínios específicos possam acessar os endpoints. Caso um site de terceiros não habilitados tentem consumir a API, o acesso será impedido.

**[Helmet](https://www.npmjs.com/package/helmet)**

O Helmet é uma ferramenta que previne 14 tipos de vulnerabilidades na resposta de uma chamada à API. Dentre elas, o Helmet oculta o cabeçalho `X-Powered-By` que expõe a tecnologia usada para servir a porta HTTP.

**[Compression](https://www.npmjs.com/package/compression)**

O Compression é um middleware que usa o deflate ou o gzip para compactar o corpo das respostas do servidor diminuindo o volume tráfego na rede.

**Middleware not found**

O middleware not found garante que caso o client tente acessar uma rota inexistente na API, ele receba uma resposta adequada informando que o recurso em questão não existe.

**Middleware error handler**

O middleware de error handler intercepta todo erro ocorrido durante o tempo de execução da aplicação, permitindo tratar esse erro e retornar uma mensagem compreensível para o client, além de evitar que detalhes do funcionamento da aplicação sejam vazados.

**Middleware auth ([JWT](https://www.npmjs.com/package/jsonwebtoken))**

O middleware auth garante que apenas usuários autenticados possam acessar os endpoints da API. Assim que um usuário efetua login, ele recebe um token de acesso, para que a cada requisição em um endpoint privado ele possa ser autorizado a consumir o recurso correspondente. O middleware intercepta a requisição do client antes de chegar ao controller, e, permite o acesso caso o token seja válido, ou bloqueia com status 401 caso o token seja inválido.

## Requisitos

**Seção 1: Desenvolvimento de API**

Tarefa:

1. Crie uma API RESTful simples em Node.js usando Express.
2. A API deve gerenciar um recurso users com as seguintes funcionalidades:

- GET /users: Retorna uma lista de usuários.
- GET /users/:id: Retorna um usuário específico pelo ID.
- POST /users: Cria um novo usuário.
- PUT /users/:id: Atualiza um usuário existente.
- DELETE /users/:id: Remove um usuário.

Requisitos:

- Utilize um banco de dados relacional (PostgreSQL ou MySQL) para armazenar os usuários.
- Implemente validação de dados para a criação e atualização de usuários.
- Inclua testes unitários para suas rotas utilizando uma biblioteca de testes como Jest ou Mocha.

**Seção 2: Integração com API de Terceiros**

Tarefa:

1. Escolha uma API pública (por exemplo,https://swapi.dev/, OpenWeatherMap) e crie uma integração que traga dados de lá.
2. Crie um endpoint em sua API que, ao ser chamado, consulte a API de terceiros e retorne os dados obtidos.

Requisitos:

- Utilize axios ou node-fetch para realizar chamadas HTTP.
- Garanta que a integração trate erros e retorne mensagens adequadas em caso de falha.

**Seção 3: Boas Práticas e Segurança**

Tarefa:

1. Revise seu código e implemente as seguintes boas práticas:

- Middleware para tratamento de erros.
- Autenticação (por exemplo, JWT) para proteger as rotas.
- Configuração de CORS.

Requisitos:

- Documente o que foi implementado e explique como essas práticas melhoram a segurança e a manutenção do seu código.

**Seção 4: Desenvolvimento Frontend com React**

Tarefa:

1. Crie uma aplicação React que consuma a API que você desenvolveu nas seções anteriores.
2. A aplicação deve ter as seguintes funcionalidades:

- Listar todos os usuários
- Exibir detalhes de um usuário específico
- Adicionar um novo usuário
- Editar um usuário existente
- Remover um usuário
- Exibir os dados obtidos da API de terceiros que você integrou

Requisitos:

- Implemente pelo menos um componente reutilizável.
- Utilize uma biblioteca de roteamento para navegação entre diferentes views.
- Implemente tratamento de erros e feedback visual para o usuário.
- Utilize uma biblioteca de gerenciamento de estado global.
- Adicione testes unitários para pelo menos dois componentes.

## Sugestões de melhorias

- Implementar biblioteca de _inversão de controle_ (injeção de dependência)
- Configurar _rate limit_ para prevenir DDoS
- Separar _regra de acesso_ a dados de _regra de negócio_
- Implementar _refresh token_ para melhor controle de sessão
