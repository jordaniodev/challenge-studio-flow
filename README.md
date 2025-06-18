# Studio Flow - Solução do Teste Técnico 🚀
<p align="center">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Globo_logo_and_wordmark.svg/960px-Globo_logo_and_wordmark.svg.png" width="100" style="margin-left: 48px" />
</p>
<p align="center">
  <img src="https://www.noesis.pt/-/media/Project/Noesis/Site/brand/logo.svg?iar=0&hash=8BE9FEC81E94CF0B07FE787047937623&hash=8BE9FEC81E94CF0B07FE787047937623" width="170" />&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="https://i.ibb.co/SPGby68/jordanio.png" width="150" />
</p>

Este repositório contém a minha solução para o **Teste Técnico Studio Flow**.

O projeto original simulava uma ferramenta simples de **kanban de cenas** para gestão de produção audiovisual, mas foi propositalmente entregue com diversas falhas e limitações técnicas.

Durante os **5 dias de prazo**, meu foco foi:

- Corrigir todos os bugs mapeados ✅  
- Refatorar e reestruturar o código ✅  
- Melhorar a tipagem e a organização geral ✅  
- Implementar as funcionalidades faltantes ✅  
- Garantir um código limpo, estável e de fácil manutenção ✅  

---

## ✅ Principais Melhorias

### 💡 Qualidade de Código e Arquitetura

- **Melhoria na Tipagem Global:**  
  Refinei a tipagem em todo o projeto, incluindo actions dos contexts, estados globais, props de componentes e respostas de API.

- **Providers Tipados e Centralizados:**  
  Criei **Providers React com tipagem forte**, centralizando as regras de negócio de produção e cena, facilitando a escalabilidade.

- **Refatoração dos Reducers:**  
  Substituí os `switch cases` por **funções de dispatch com arrow functions tipadas**, garantindo melhor legibilidade e evitando actions não tratadas.

- **Padronização de Nomeclaturas:**  
  Renomeei componentes para seguir uma **convenção de nomenclatura clara e consistente**, melhorando a experiência de desenvolvimento.

- **Tratamento de Erros de API:**  
  Implementei a função `safeFetch`, garantindo **tratamento centralizado de erros** e melhor feedback visual para falhas de requisição.

---

### 🎨 Camada de UI e Componentes

- **Melhorias no Drag and Drop:**  
  Alterei o componente `Column`, responsável por controlar o arrastar e soltar de cenas entre etapas e também o reordenamento dentro da mesma coluna.

- **Filtro e Criação de Cenas:**  
  Implementei a possibilidade de filtrar e criar novas cenas diretamente no Kanban.
---

### 🛠️ Experiência do Desenvolvedor (DX)

- **Scripts Unificados no `package.json`:**  
  Configurei scripts para iniciar o Frontend e o JSON-server juntos com um único comando.

- **Estrutura de Projeto Organizada:**  
  Reestruturei pastas e a hierarquia de componentes para maior clareza e separação de responsabilidades.

- **Formatação Padronizada:**  
  Ajustei imports, espaçamentos e a estrutura de código para seguir um padrão único e consistente.
---

## ✅ Funcionalidades Entregues

- Correção de **todos os bugs descritos no teste original**.
- Implementação das funcionalidades obrigatórias:

  - **Criação de novas cenas** diretamente no Kanban.
  - **Reordenação de cenas** dentro das colunas.

---

## 🔜 Próximos Passos Recomendados

Embora o projeto já esteja funcional e estável, recomendo as seguintes melhorias para uma versão mais próxima de produção:

- **Implementar Testes Unitários:**  
  Começando por contexts, reducers e funções utilitárias.

- **Implementar Testes End-to-End (E2E):**  
  Usando ferramentas como **Cypress** ou **Playwright**, especialmente para validar drag-and-drop e modais.

- **Paginação ou Virtualização de Listas:**  
  Como o teste menciona problemas de performance com listas grandes.

- **Mensagens de Feedback Visual Pós-Ação:**  
  Exibir pequenos toasts ou mensagens de sucesso após ações como "Cena criada", "Movimentação concluída", etc.

- **Acessibilidade:**  
  Adicionar foco visível nos elementos interativos, ARIA labels nos botões de drag-and-drop e garantir navegação por teclado.

- **Implementar Skeleton Loading:**  
  Adicionar componentes de Skeleton para melhorar a experiência de carregamento, garantindo melhor percepção de performance durante requisições mais longas.
---

## 🖥️ Como Rodar o Projeto Localmente

### 1. Instalar as dependências:

```bash
pnpm install
```

### 2. Iniciar Frontend e API juntos:

```bash
pnpm run dev
```
