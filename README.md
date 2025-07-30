# API RESTful de Cadastro e Login de Usuário

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![JWT](https://img.shields.io/badge/JWT-000000?logo=json-web-tokens&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=white)
![nodemon](https://img.shields.io/badge/nodemon-76D04B?logo=nodemon&logoColor=white)

Esta é uma API RESTful desenvolvida em **Node.js** utilizando **Express**, **MongoDB** (com Mongoose) e outras bibliotecas para autenticação, validação e segurança.  

Ela permite o cadastro de usuários, login e, após a autenticação, redireciona para uma página que exibe os dados do usuário cadastrado.

---

## Tecnologias Utilizadas

- ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white) Node.js
- ![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white) Express
- ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white) MongoDB com Mongoose
- ![bcrypt](https://img.shields.io/badge/bcrypt-FF6F00?logo=bcrypt&logoColor=white) bcrypt (para hash de senhas)
- ![JWT](https://img.shields.io/badge/JWT-000000?logo=json-web-tokens&logoColor=white) JSON Web Token (JWT) para autenticação
- ![Joi](https://img.shields.io/badge/Joi-00A7E1?logo=swagger&logoColor=white) Joi para validação de dados
- ![dotenv](https://img.shields.io/badge/dotenv-000000?logo=dotenv&logoColor=white) dotenv para gerenciamento de variáveis de ambiente
- ![cors](https://img.shields.io/badge/cors-000000) cors para permitir requisições cross-origin
- ![nodemon](https://img.shields.io/badge/nodemon-76D04B?logo=nodemon&logoColor=white) nodemon para desenvolvimento

---

## Funcionalidades

- Cadastro de usuário com validação dos dados
- Login com geração de token JWT
- Rota protegida que retorna os dados do usuário autenticado
- Redirecionamento para página com informações do usuário após login

---

## Como Rodar o Projeto

1. Clone o repositório  
```bash
git clone <URL-do-repositório>
