# AIOD Header Component

Um Web Component agnóstico de framework criado com Stencil.js para ser reutilizado entre diferentes aplicações (Angular, WordPress, Laravel).

## Características

- 🔄 **Framework Agnóstico**: Funciona em qualquer aplicação web
- 🎨 **Shadow DOM**: Estilos completamente encapsulados
- 🌙 **Theme Switching**: Suporte completo para temas light/dark
- 📱 **Responsivo**: Suporte completo para mobile e desktop
- 🔗 **API Integration**: Busca automática do menu de navegação
- ⚙️ **Configurável**: Múltiplas variantes e propriedades

## Propriedades (Props)

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| `variant` | `'default' \| 'dashboard'` | `'default'` | Variação do layout do cabeçalho |
| `isLoggedIn` | `boolean` | `false` | Estado de autenticação do utilizador |
| `userName` | `string` | `''` | Nome do utilizador (quando logado) |
| `userAvatarUrl` | `string` | `'https://via.placeholder.com/40x40?text=U'` | URL do avatar do utilizador |
| `loginUrl` | `string` | `'#'` | URL para o botão "Log In" |
| `homeUrl` | `string` | `'/'` | URL base para o logo e links |

## Variantes

### Default
- Exibe menu de navegação principal
- Botão de login/avatar do utilizador
- Botão "Get Started"
- Theme switcher

### Dashboard
- Barra de pesquisa
- Botão de colapso da sidebar
- Avatar do utilizador com notificações
- Theme switcher

## Gestão de Tema

O componente implementa um sistema completo de gestão de tema:

- **Persistência**: O tema é guardado em `localStorage` com a chave `aiod-theme`
- **Aplicação**: Adiciona/remove a classe `.dark` no elemento `<html>`
- **Estados**: `'light'` (padrão) ou `'dark'`

## API de Navegação

O componente busca automaticamente o menu de navegação do endpoint:
```
https://aiod.eu/wp-json/aiod/v1/navigation
```

Suporta estruturas hierárquicas com submenus.

## Instalação e Build

```bash
# Instalar dependências
npm install

# Desenvolvimento
npm start

# Build para produção
npm run build

# Executar testes
npm test
```

## Uso em Produção

### 1. Build do Componente
```bash
npm run build
```

### 2. Ficheiros Gerados
Após o build, encontra os ficheiros em `/dist`:
- `aiod-header-component.js` - Versão ES5 (browsers antigos)
- `aiod-header-component.esm.js` - Versão ES Modules (browsers modernos)

### 3. HTML de Exemplo
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Minha Aplicação</title>
    
    <!-- Importar o componente -->
    <script type="module" src="./dist/aiod-header-component.esm.js"></script>
    <script nomodule src="./dist/aiod-header-component.js"></script>
</head>
<body>
    <!-- Uso básico -->
    <aiod-header></aiod-header>
    
    <!-- Utilizador não logado -->
    <aiod-header
        variant="default"
        is-logged-in="false"
        login-url="https://auth.meusite.com/login"
        home-url="https://meusite.com">
    </aiod-header>
    
    <!-- Utilizador logado -->
    <aiod-header
        variant="default"
        is-logged-in="true"
        user-name="João Silva"
        user-avatar-url="https://meusite.com/avatars/joao.jpg"
        home-url="https://meusite.com">
    </aiod-header>
    
    <!-- Variante Dashboard -->
    <aiod-header
        variant="dashboard"
        is-logged-in="true"
        user-name="Maria Santos"
        user-avatar-url="https://meusite.com/avatars/maria.jpg">
    </aiod-header>
</body>
</html>
```

## Integração com CSS

O componente usa Shadow DOM, por isso os estilos devem ser aplicados no ficheiro CSS do componente.

1. Abrir `/src/components/aiod-header/aiod-header.css`
2. Colar o CSS completo do tema WordPress no local indicado
3. Executar novo build: `npm run build`

## Estrutura do Projeto

```
aiod-header-component/
├── dist/                      # Ficheiros compilados
├── src/
│   ├── components/
│   │   └── aiod-header/
│   │       ├── aiod-header.tsx    # Componente principal
│   │       └── aiod-header.css    # Estilos (colar CSS aqui)
│   ├── index.html             # Página de teste
│   └── index.ts              # Entry point
├── package.json
└── stencil.config.ts
```

## Tecnologias

- **Stencil.js**: Framework para criar Web Components
- **TypeScript**: Linguagem principal
- **Shadow DOM**: Encapsulamento de estilos
- **Web Standards**: Compatível com todos os browsers modernos