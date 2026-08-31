# Booky — leituras pessoais

Um diário de leitura pessoal em um único arquivo (`index.html`), sem
backend: cada pessoa cria sua própria conta e mantém sua estante,
avaliações, progresso e citações direto no navegador.

## Como usar

Basta abrir `index.html` num navegador, ou publicar no GitHub Pages
(Settings → Pages → deploy a partir da branch). Não há build, nem
instalação de dependências.

## Como funciona

- **Contas**: cada pessoa cria login (nome, usuário, senha de 4 dígitos)
  pelo próprio app. As contas e os dados de leitura ficam salvos no
  `localStorage` do navegador — por enquanto local a cada
  dispositivo/navegador, sem sincronização entre aparelhos (isso
  exigiria um backend, que pode ser adicionado depois se fizer sentido).
  As senhas são guardadas com hash SHA-256, nunca em texto puro.
- **Busca de livros**: a tela de Busca consulta a
  [Google Books API](https://developers.google.com/books) para trazer
  título, autor(a), capa e número de páginas reais. Se a busca falhar
  (sem internet, por exemplo), é possível adicionar o livro manualmente.
- **Ícones**: [Material Symbols](https://fonts.google.com/icons), via
  Google Fonts — nenhuma dependência externa de JS.
- **Fonte**: [Manrope](https://fonts.google.com/specimen/Manrope), via
  Google Fonts.
- **Transições**: navegação entre abas usa a View Transitions API
  nativa do navegador (com fallback silencioso onde não houver suporte).

## Navegação

- **Início** — livro atual, carrossel de destaques (avaliar, resenhar,
  sequência da semana, última reação, páginas do ano, avaliações,
  resenhas, ritmo de leitura, dias seguidos) e histórico de leitura em
  ordem decrescente
- **Estante** — grade de livros, busca local e filtro por status
- **+** — adicionar livro manualmente
- **Busca** — buscar um livro real (Google Books) para adicionar
- **Menu** — Perfil, Estatísticas, Configurações

Dentro do livro: mudar status (quero ler / lendo / lido / abandonado),
avaliar com estrelas, registrar progresso com anotação ou citação
(com opção de marcar como spoiler). Cada registro pode ser excluído
pelo menu "⋯" no próprio card do histórico.

## Paleta de cores

| Uso | Cor |
| --- | --- |
| Marca / botões principais | `#263C20` |
| Marca escura (hover) | `#1A2B16` |
| Verde claro / destaques | `#4A6741` |
| Sálvia (acentos pontuais) | `#8FA883` / `#DBE6D4` |
| Acento (avaliações, "lendo") | `#C98A3E` |
| Fundo da página | `#FFFFFF` |
| Superfície (cards, destaques) | `#F2F4EE` |
| Texto principal | `#22301D` |

## Próximos passos possíveis

- Logo e ícones de app (favicon, PWA)
- Backend real para contas sincronizadas entre dispositivos
- Recuperação de senha
- Upload de capa própria
