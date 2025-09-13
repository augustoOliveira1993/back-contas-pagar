# Preven Clinica Backend.

# API Base com TypeScript

Este repositório contém um backend base desenvolvido em Node.js com TypeScript, fornecendo uma estrutura organizada e escalável para o desenvolvimento de APIs RESTful.

## Tecnologias Utilizadas

- **Node.js + TypeScript** – Desenvolvimento escalável e seguro.
- **Express.js** – Framework minimalista para criação de APIs.
- **MongoDB** – Persistência de dados.
- **KafkaJS** – Mensageria para comunicação entre serviços.
- **WebSockets** – Suporte para comunicação em tempo real.
- **Jest** – Testes unitários e de integração.

## Funcionalidades

- ✅ **Estrutura Modular** – Organização baseada em módulos para facilitar a expansão.
- ✅ **ORM/Mongoose** – Modelagem e manipulação de dados eficiente.
- ✅ **Mensageria Kafka** – Publicação e consumo de eventos assíncronos.
- ✅ **Suporte a WebSockets** – Emissão e recebimento de eventos em tempo real.
- ✅ **Monitoramento e Logs** – Registro detalhado de requisições e erros.

## Como Rodar o Projeto

### **1. Clone o repositório**
```bash
git clone https://github.com/seu-usuario/backend-base-ts.git
cd backend-base-ts
```

### **2. Instale as dependências**
```bash
yarn install
```

### **3. Configure as variáveis de ambiente**
Crie um arquivo `.env` baseado no `.env.example` e configure as credenciais necessárias.

### **4. Inicie o servidor**
```bash
yarn dev
```

## Estrutura do Projeto
```
backend-base-ts/
│-- src/
│   ├── config/          # Configuração da aplicação e serviços
│   ├── middlewares/     # Middlewares para tratamento de requisições
│   ├── modules/        # Features organizadas em módulos
│   ├── shared/         # Implementação de WebSockets e utilitários
│   ├── database/       # Configuração do banco de dados
│   ├── routes/         # Definição das rotas da API
│   ├── services/       # Serviços de integração e processamento de dados
│   ├── tests/          # Testes automatizados
```

---
Feito com ❤️ por [Augusto Oliveira](https://github.com/augustoOliveira1993) 🚀
# back-contas-pagar
