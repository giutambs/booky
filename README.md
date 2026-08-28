# Booky — leituras pessoais

Um diário de leitura pessoal em um único arquivo (`index.html`), sem
backend: cada pessoa cria sua própria conta e mantém sua estante,
avaliações, progresso e citações direto no navegador.

## Como usar

Basta abrir `index.html` num navegador, ou publicar no GitHub Pages
(Settings → Pages → deploy a partir da branch). Não há build, nem
instalação de dependências.

## Como funciona

- **Contas**: cada pessoa cria login (nome, e-mail, senha) pelo próprio
  app. As contas e os dados de leitura ficam salvos no `localStorage` do
  navegador — por enquanto local a cada dispositivo/navegador, sem
  sincronização entre aparelhos (isso exigiria um backend, que pode ser
  adicionado depois se fizer sentido). As senhas são guardadas com hash
  SHA-256, nunca em texto puro.
- **Busca de livros**: a tela de Busca consulta a API pública do
  [Open Library](https://openlibrary.org/dev/docs/api/search) para trazer
  título, autor(a) e capa reais. Se a busca falhar (sem internet, por
  exemplo), é possível adicionar o livro manualmente.
- **Ícones**: todos em SVG, desenhados no próprio arquivo — sem nenhuma
  dependência externa de JS.
- **Fonte**: [Manrope](https://fonts.google.com/specimen/Manrope), via
  Google Fonts.

## Navegação

- **Início** — livro atual, estatísticas rápidas, atividade recente
- **Estante** — grade de livros, busca local e filtro por status
- **+** — adicionar livro manualmente
- **Busca** — buscar um livro real (Open Library) para adicionar
- **Menu** — Perfil, Estatísticas, Configurações

Dentro do livro: mudar status (quero ler / lendo / lido / abandonado),
avaliar com estrelas, registrar progresso com anotação ou citação
(com opção de marcar como spoiler).

## Paleta de cores

| Uso | Cor |
| --- | --- |
| Marca / botões principais | `#263C20` |
| Marca escura (hover) | `#1A2B16` |
| Verde claro / destaques | `#4A6741` |
| Sálvia (fundos suaves) | `#8FA883` / `#DBE6D4` |
| Acento (avaliações, "lendo") | `#C98A3E` |
| Fundo (papel) | `#FAF6EC` |
| Superfície (cards) | `#FFFDF8` |
| Texto principal | `#22301D` |

## Próximos passos possíveis

- Logo e ícones de app (favicon, PWA)
- Backend real para contas sincronizadas entre dispositivos
- Recuperação de senha
- Upload de capa própria
