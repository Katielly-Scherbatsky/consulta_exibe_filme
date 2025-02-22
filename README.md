# MovieApp - Pesquisa de Filmes com TMDB

## Descrição

O MovieApp é um aplicativo mobile desenvolvido em React Native que permite ao usuário pesquisar filmes utilizando a API do The Movie Database (TMDB). O app oferece uma interface intuitiva para busca, exibe uma lista dos filmes encontrados e possibilita visualizar detalhes de um filme selecionado, como sinopse, data de lançamento e avaliação.

## Funcionalidades

- **Cadastro e Configuração da API:**
  - Crie uma conta na [TMDB](https://www.themoviedb.org/) e obtenha sua chave de API.
  - Armazene a chave de forma segura (ex.: variáveis de ambiente).

- **Tela de Busca:**
  - Interface com um campo de texto para o usuário digitar o nome do filme.
  - Botão que inicia a busca na API do TMDB utilizando o texto informado.

- **Requisição à API TMDB:**
  - Utiliza o endpoint `/search/movie` para realizar a busca.
  - Exemplo de URL:
    ```
    https://api.themoviedb.org/3/search/movie?api_key=SUA_API_KEY&query=nomeDoFilme
    ```
  - Requisição realizada com `fetch` (ou bibliotecas como `axios`).

- **Exibição dos Resultados:**
  - Mostra os filmes retornados em uma lista, exibindo informações como título, data de lançamento e uma breve sinopse.
  - Utiliza componentes como `FlatList` para renderização otimizada.

- **Tela de Detalhes do Filme:**
  - Ao selecionar um filme, exibe uma tela com informações adicionais (descrição completa, avaliação, poster, etc.).
  - Utiliza o endpoint `/movie/{movie_id}` para obter os detalhes específicos do filme.

- **Feedback Visual e Tratamento de Erros:**
  - Indicador de carregamento enquanto os dados são buscados.
  - Mensagens de erro apropriadas caso a busca não retorne resultados ou haja falha na requisição.

- **Boas Práticas:**
  - Uso de componentes funcionais e hooks (`useState`, `useEffect`) para gerenciamento de estado e efeitos colaterais.
  - Código modularizado, separando a lógica de requisição da apresentação dos dados.
  - Possibilidade de implementar paginação ou carregamento incremental se necessário.

## Instalação e Configuração

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/MovieApp.git
   cd MovieApp
