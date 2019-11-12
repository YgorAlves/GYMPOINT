<h1 align="center">
  <img alt="Gympoint" title="Gympoint" src="./logo.png" width="200px" />
</h1>

<h3 align="center">
  Desafio 2: API REST COMPLETA do Gympoint
</h3>

<p align="center">
  <a href="#rocket-sobre-o-desafio">Sobre o desafio</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>

# GymPoint-backend
API REST do Backend do GymPoint em Node.JS, do desafio da bootcamp da RocketSeat, feito com base nos conhecimentos aprendidos no desenvolvimento da API do GoBarber, que se encontra em outro repositório.

## Instalação

Será necessário primeiramente instalar as dependencias: npm install ou yarn.

Além das dependencias, foi utilizado o DOCKER, com banco MYSQL para os dados relacionais.

MONGODB para dados não relacionais a fim de ganhar desempenho.

REDIS para funcionar junto com o BeeQueue, para gerenciar em background jobs o envio de EMAIL com nodemailer.

```bash
npm install
ou
yarn
```

## Tecnologias/Ferramentas utilizadas

```bash
Docker Desktop
Sequelize
Mongoose
*Autenticação JWT
Bcrypt: Password HASH
Multer: Upload de imagens
NodeMailer: Envio de email com Node.JS
Handlebars: Templates de EMAIL com HTML e CSS
BeeQueue: Fila e background jobs com REDIS
Sentry.io: Tratamento de exceções
```

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

