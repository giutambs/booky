# Booky — leituras pessoais

Um diário de leitura pessoal: cada pessoa cria sua própria conta e mantém sua
estante, avaliações e progresso de leitura em privado.

Inspirado no app de clube do livro, mas redesenhado para uso individual:
sem membros fixos, sem dados compartilhados — cada login é único e criado
pelo próprio usuário.

## Stack

- **Next.js 15** (App Router) + TypeScript
- **Tailwind CSS v4** — paleta própria baseada em `#263C20`
- **Poppins** (títulos) + **Inter** (texto) via `next/font`
- **Prisma + SQLite** — banco local, fácil de trocar por Postgres depois
- **NextAuth v5** (Credentials) — login/senha reais, com senha criptografada (bcrypt)

## Funcionalidades

- Cadastro e login por e-mail/senha (contas únicas, uma por pessoa)
- **Início**: livro atual, estatísticas rápidas (livros lidos, meses seguidos, nota média) e atividade recente
- **Estante**: grade de livros com busca e filtro por status (quero ler / lendo / lido / abandonado)
- **Adicionar livro**: título, autor(a), capa (URL opcional), páginas, status inicial
- **Detalhe do livro**: mudar status, avaliar com estrelas, registrar progresso de leitura com nota, humor (emoji) e marcação de spoiler — cada registro fica no histórico do livro
- **Perfil**: estatísticas gerais e livros lidos por ano, logout

## Como rodar localmente

```bash
npm install
cp .env.example .env      # ajuste o AUTH_SECRET se quiser
npx prisma migrate dev    # cria o banco SQLite local
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) e crie sua conta.

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

- Upload de capa (em vez de só URL)
- Recuperação de senha por e-mail
- "Retrospectiva do ano" pessoal (estilo wrapped)
- Exportar/importar estante
- Deploy (Vercel + Postgres, por exemplo)

Este é um primeiro projeto para revisão — o fluxo principal (cadastro, estante,
progresso e estatísticas) está funcional e testado ponta a ponta.
