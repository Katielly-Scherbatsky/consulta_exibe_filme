# Formulário de Cadastro

Este projeto implementa um formulário de cadastro com múltiplas seções e validações em tempo real. O formulário é dividido em três seções principais, e a validação dos campos é feita conforme o usuário preenche os dados, com feedback visual para erros.

## 1. Estrutura do Formulário

### Informações Pessoais
- **Nome Completo**: Campo obrigatório. Deve conter pelo menos dois nomes (nome e sobrenome).
- **Data de Nascimento**: Campo obrigatório. Deve ser inserido no formato **DD/MM/AAAA**.
- **CPF**: Campo obrigatório. Deve seguir o formato **XXX.XXX.XXX-XX** ou apenas números (11 dígitos). A validação do CPF é realizada utilizando o algoritmo de verificação dos dígitos verificadores.
- **Telefone Fixo**: Campo obrigatório. O número deve incluir o **DDD** e seguir o formato **(XX) XXXX-XXXX**. A validação verifica se o número possui 10 dígitos.
- **Celular**: Campo obrigatório. O número deve incluir o **DDD** e o nono dígito, seguindo o formato **(XX) 9XXXX-XXXX**. A validação verifica se o número possui 11 dígitos.

### Informações Complementares (para menores de idade)
- Se a idade do usuário for inferior a 18 anos, os seguintes campos se tornam obrigatórios:
  - **Nome do Pai**: Campo obrigatório para menores de 18 anos.
  - **Nome da Mãe**: Campo obrigatório para menores de 18 anos.

### Endereço
- **CEP**: Campo obrigatório. Deve seguir o formato **XXXXX-XXX** ou conter exatamente 8 dígitos numéricos. A validação verifica a formatação do CEP.
- **Endereço**: Campo obrigatório.
- **Número**: Campo obrigatório.
- **Complemento**: Opcional.
- **Cidade**: Campo obrigatório.
- **Estado**: Campo obrigatório.

### Informações da Conta
- **Email**: Campo obrigatório. O email deve ser validado para garantir que o formato seja válido (ex: usuario@dominio.com).
- **Senha**: Campo obrigatório. Deve ter no mínimo 8 caracteres e pode conter letras maiúsculas, minúsculas, números e caracteres especiais. Feedback visual é fornecido se a senha não atender aos critérios de segurança.
- **Confirmar Senha**: Campo obrigatório. Deve ser idêntico ao campo de senha.

## 2. Requisitos de Validação

### Nome Completo
- Não pode ser vazio.
- Deve conter pelo menos dois nomes (nome e sobrenome).

### Data de Nascimento
- Deve ser inserida no formato **DD/MM/AAAA** ou outro padrão coerente.
- Deve ser validada para garantir que seja uma data válida.
- A idade é calculada com base na data informada.
- Se a idade for menor que 18 anos, os campos **Nome do Pai** e **Nome da Mãe** se tornam obrigatórios.

### CPF
- Deve seguir o formato **XXX.XXX.XXX-XX** ou apenas números (11 dígitos).
- Implementação da validação do CPF utilizando o algoritmo de verificação dos dígitos verificadores.

### Telefone Fixo
- Deve incluir o **DDD** e o número no formato **(XX) XXXX-XXXX**.
- O número deve ter 10 dígitos, incluindo o DDD.
- A validação garante que o formato esteja correto.

### Celular
- Deve incluir o **DDD** e o número, com o nono dígito obrigatório, no formato **(XX) 9XXXX-XXXX**.
- O número deve ter 11 dígitos, incluindo o DDD.
- A validação garante que o formato esteja correto.

### CEP
- Deve seguir o padrão **XXXXX-XXX** ou conter exatamente 8 dígitos numéricos.
- Validação da formatação do CEP.

### Email
- A validação garante que o formato do email seja válido (ex: usuario@dominio.com).

### Senha
- A senha deve ter no mínimo 8 caracteres.
- Preferencialmente, deve conter letras maiúsculas, minúsculas, números e caracteres especiais.
- Feedback visual é fornecido caso a senha não atenda aos critérios de segurança.

### Confirmar Senha
- Deve ser idêntico ao campo de senha.

### Campos para Menores de Idade
- Se a data de nascimento indicar que o usuário tem menos de 18 anos, os campos **Nome do Pai** e **Nome da Mãe** se tornam obrigatórios.

## 3. Tecnologias Utilizadas
- **React** (ou outro framework JS)
- **React Hook Form** (ou outra biblioteca para manipulação de formulários)
- **Yup** ou outra biblioteca de validação para JavaScript
- **CSS** (ou styled-components) para os estilos e feedback visual

## 4. Instalação e Execução

1. Clone este repositório:
   ```bash
   git clone https://github.com/seuusuario/seurepositorio.git
# consulta_exibe_filme
