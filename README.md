# IBM Backend

Este projeto foi construído para a realização de um teste para a empresa [IBM](https://www.ibm.com/br-pt).

A Versão Frontend pode ser acessada clicando [aqui](https://github.com/MagnoBelloni/IBM-Frontend).

## O Desafio

![Preview](https://github.com/MagnoBelloni/IBM-Frontend/blob/main/Imagem-Desafio.png)

## Início

### Pré-requisitos:

NodeJS
NPM

Além disso crie um arquivo .env na raiz do projeto e coloque a chave como o exemplo do arquivo: [.env.example](https://github.com/MagnoBelloni/IBM-Backend/blob/main/.env.example).

### Como rodar a aplicação

```
npm install
npx sequelize db:migrate
npm run start:dev
```

## Rotas

[GET] /profile: Busca informações do usuário logado, necessário token.

### Request:
- Vazio

### Response:

```
{
  "user": {
    "balance": 60,
    "transactions": [
      {
        "type": "deposit",
        "value": "50",
        "oldBalance": 0,
        "newBalance": 50,
        "date": "2020-12-15T19:44:23.199Z"
      },
      {
        "type": "withdraw",
        "value": "10",
        "oldBalance": 50,
        "newBalance": 40,
        "date": "2020-12-15T19:44:27.268Z"
      },
      {
        "type": "outgoing transfer",
        "value": "20",
        "oldBalance": 40,
        "newBalance": 20,
        "date": "2020-12-15T19:44:34.818Z",
        "to": "12345"
      },
      {
        "type": "income transfer",
        "value": "20",
        "oldBalance": 40,
        "newBalance": 60,
        "date": "2020-12-15T19:44:34.820Z",
        "from": "Fulano - 12345"
      }
    ],
    "_id": "5fd9120dc9e53344c450467d",
    "name": "Fulano",
    "age": "30",
    "email": "fulano@fulano.com",
    "account_number": "12345",
    "password": "$2b$04$oPZGVNthYh/vGV7BNv78VOtA1euMXdPd86yYRKkgs2EwU2WK0n..u",
    "__v": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDgwNjgxNjksImV4cCI6MTYwODE1NDU2OSwiaWQiOiI1ZmQ5MTIwZGM5ZTUzMzQ0YzQ1MDQ2N2QifQ.EhV6mZwzFZxLWuBKhBohM8ZWcDBzFmQW1JJFnvkLOYg"
}
```


[POST] /login: Realiza o login na aplicação.

### Request:
```
{
	"account_number" : "12345",
	"password": "1"
}
```

### Response:

```
{
  "user": {
    "balance": 60,
    "transactions": [
      {
        "type": "deposit",
        "value": "50",
        "oldBalance": 0,
        "newBalance": 50,
        "date": "2020-12-15T19:44:23.199Z"
      },
      {
        "type": "withdraw",
        "value": "10",
        "oldBalance": 50,
        "newBalance": 40,
        "date": "2020-12-15T19:44:27.268Z"
      },
      {
        "type": "outgoing transfer",
        "value": "20",
        "oldBalance": 40,
        "newBalance": 20,
        "date": "2020-12-15T19:44:34.818Z",
        "to": "12345"
      },
      {
        "type": "income transfer",
        "value": "20",
        "oldBalance": 40,
        "newBalance": 60,
        "date": "2020-12-15T19:44:34.820Z",
        "from": "Fulano - 12345"
      }
    ],
    "_id": "5fd9120dc9e53344c450467d",
    "name": "Fulano",
    "age": "30",
    "email": "fulano@fulano.com",
    "account_number": "12345",
    "password": "$2b$04$oPZGVNthYh/vGV7BNv78VOtA1euMXdPd86yYRKkgs2EwU2WK0n..u",
    "__v": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDgwNjgxNjksImV4cCI6MTYwODE1NDU2OSwiaWQiOiI1ZmQ5MTIwZGM5ZTUzMzQ0YzQ1MDQ2N2QifQ.EhV6mZwzFZxLWuBKhBohM8ZWcDBzFmQW1JJFnvkLOYg"
}
```

[POST] /client: Cria um novo usuário.

### Request:
```
{
    "name" : "Magno",
    "age" : 20,
    "email" : "m@m.com",
    "password": "123",
    "account_number": "1234567"
}
```

### Response:

```
{
  "balance": 0,
  "transactions": [],
  "_id": "5fd92d2872fc8d2c04c75086",
  "name": "Magno",
  "age": "20",
  "email": "m@m.com",
  "password": "$2b$04$RoCh7jv53e4EgifcSOlMUOj6DG.JSDUCEN12vBEpkAjI.a.KMAbjK",
  "account_number": "12345678",
  "__v": 0
}
```



[POST] /transaction/deposit: Depositar um valor na conta, , necessário token.

### Request:
```
{
	"value": 50.0
}
```

### Response:

```
{
  "oldBalance": 60,
  "newBalance": 110,
  "name": "Fulano"
}
```

[POST] /transaction/withdraw: Sacar um valor da conta, necessário token.

### Request:
- Vazio

### Response:

```
[
  {
    "_id": "5fd9120dc9e53344c450467d",
    "balance": 110,
    "transactions": [
      {
        "type": "deposit",
        "value": "50",
        "oldBalance": 0,
        "newBalance": 50,
        "date": "2020-12-15T19:44:23.199Z"
      },
      {
        "type": "withdraw",
        "value": "10",
        "oldBalance": 50,
        "newBalance": 40,
        "date": "2020-12-15T19:44:27.268Z"
      },
      {
        "type": "outgoing transfer",
        "value": "20",
        "oldBalance": 40,
        "newBalance": 20,
        "date": "2020-12-15T19:44:34.818Z",
        "to": "12345"
      },
      {
        "type": "income transfer",
        "value": "20",
        "oldBalance": 40,
        "newBalance": 60,
        "date": "2020-12-15T19:44:34.820Z",
        "from": "Fulano - 12345"
      },
      {
        "type": "deposit",
        "value": 50,
        "oldBalance": 60,
        "newBalance": 110,
        "date": "2020-12-15T21:40:58.630Z"
      }
    ],
    "account_number": "12345"
  }
]
```
[POST] /transaction/transfer/:numero_conta : Transfere um valor para uma conta, necessário token.

### Request:
```
{
	"value": 50.0
}
```

### Response:

```
{
  "oldBalance": 50,
  "newBalance": 30,
  "name": "Magno",
  "to": "Magno - 1234567"
}
```



[GET] /transaction/ :
Busca o histórico de transações da conta, necessário token.

### Request:
```
{
	"value": 50.0
}
```

### Response:

```
[
  {
    "id": 1,
    "type": "deposit",
    "value": 50,
    "oldBalance": 0,
    "newBalance": 50,
    "to": null,
    "from": null,
    "clientId": 1,
    "createdAt": "2020-12-21T17:37:53.284Z",
    "updatedAt": "2020-12-21T17:37:53.284Z"
  },
  {
    "id": 2,
    "type": "withdraw",
    "value": 50,
    "oldBalance": 50,
    "newBalance": 0,
    "to": null,
    "from": null,
    "clientId": 1,
    "createdAt": "2020-12-21T17:39:47.887Z",
    "updatedAt": "2020-12-21T17:39:47.887Z"
  }
]
```


## Autor:

- **Magno Belloni** - [LinkedIn](https://www.linkedin.com/in/magnobelloni/)
