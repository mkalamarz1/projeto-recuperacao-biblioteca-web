
# Biblioteca Web

## Descrição
Sistema web para gerenciamento de uma biblioteca, desenvolvido como projeto de recuperação do Módulo 01 do SCTEC.

## Funcionalidades
- Login com validação de e-mail e senha.
- Dashboard com estatísticas do acervo.
- Cadastro de usuários.
- Consulta de endereço por CEP utilizando a API ViaCEP.
- Cadastro de livros.
- Listagem de livros cadastrados.
- Layout responsivo para diferentes tamanhos de tela.
- Navegação entre as páginas e opção de sair do sistema.

## Tecnologias utilizadas
- HTML5
- CSS3
- JavaScript
- JavaScript Modules (import/export)
- Session Storage
- Moment.js
- API ViaCEP
- Git e GitHub

## Estrutura do projeto
- `index.html`: página inicial e redirecionamento.
- `login/`: tela e lógica de login.
- `dashboard/`: painel de estatísticas.
- `cadastro-usuario/`: cadastro de usuários.
- `cadastro-livro/`: cadastro de livros.
- `listagem-livro/`: listagem do acervo.
- `dados/`: dados iniciais de usuários e livros.
- `js/`: classes e funções JavaScript.

## Como executar
1. Clone ou baixe este repositório.
2. Abra a pasta do projeto no Visual Studio Code.
3. Execute o arquivo `index.html` com a extensão Live Server.
4. A aplicação será aberta no navegador.

## Observações
Este projeto utiliza dados em memória e `sessionStorage` no navegador. Não possui backend nem banco de dados.

## Autoria
Desenvolvido por Márcia Figueiró Kalamarz como atividade do SCTEC.
