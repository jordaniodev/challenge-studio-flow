# Studio Flow - Teste Técnico

Este projeto simula um **kanban de cenas** utilizado por um estúdio para organizar a produção de conteúdo. A ideia é simples: cada "cena" passa por diferentes status (ex: planejada, em produção, finalizada), e deve poder ser movida entre eles conforme seu progresso.

## Contexto

Um desenvolvedor júnior iniciou esse projeto, mas não conseguiu concluí-lo. O código está incompleto, desorganizado e apresenta diversos problemas. Agora, com um prazo apertado de **5 dias**, precisamos que ele funcione como deveria.

Este teste serve para avaliar sua capacidade de:

* Ler e entender código legado
* Resolver bugs
* Refatorar e organizar a base de código
* Implementar novas funcionalidades
* Entregar uma aplicação funcional

## O que precisa ser feito

Você pode (e deve) alterar **o que for necessário** para fazer o projeto funcionar corretamente, com qualidade e estabilidade.

Não se limite apenas a corrigir bugs visíveis — use seu julgamento técnico para fazer melhorias na estrutura geral do projeto.

## Bugs identificados pela QA

* Cenas desaparecem ao serem movidas entre status
* O botão de salvar não funciona em algumas situações
* Cenas podem ser movidas para status inválidos
* Cenas são duplicadas na primeira renderização
* A aplicação quebra ao mover uma cena sem título

## Outros problemas conhecidos

* Problemas de performance ao renderizar listas maiores
* Estrutura de código confusa e pouco coesa
* Repetição de lógica em diferentes partes da aplicação
* Falta de tratamento de erros

## Funcionalidades que ainda precisam ser implementadas

Além de corrigir os problemas existentes, também é necessário:

* Permitir **criação de uma nova cena** no kanban
* Implementar a **reordenação das cenas dentro de cada coluna**

## Como rodar o projeto

```bash
# Instale as dependências
pnpm install

# Inicie o servidor de desenvolvimento
pnpm run dev
```

A aplicação estará disponível em `http://localhost:3000`.

## Entrega

Você tem liberdade total para reestruturar, remover ou adicionar o que achar necessário para entregar um sistema funcional, com código limpo, organizado e performático.
