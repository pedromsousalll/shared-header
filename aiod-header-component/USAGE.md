# Guia de Uso - AIOD Header Component

## Comandos de Setup

```bash
# 1. Clonar ou criar o projeto
npm init stencil component aiod-header-component
cd aiod-header-component

# 2. Instalar dependências
npm install

# 3. Build para produção
npm run build
```

## Ficheiros Principais

### 1. Componente (aiod-header.tsx)
✅ **Completo** - Tradução fiel do PHP para TypeScript/JSX
✅ **Props configuráveis** - Todas as propriedades implementadas
✅ **API Integration** - Fetch automático do menu de navegação
✅ **Theme Management** - Sistema completo de temas

### 2. CSS (aiod-header.css)
🔧 **Pronto para CSS** - Comentário placeholder onde colar o CSS do tema WordPress

### 3. Página de Teste (index.html)
✅ **Exemplos completos** - 4 casos de teste diferentes
✅ **Props demonstration** - Mostra todas as variações do componente

## Exemplo de Uso Simples

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Teste AIOD Header</title>
    
    <!-- Carregar o componente compilado -->
    <script type="module" src="./dist/aiod-header-component.esm.js"></script>
    <script nomodule src="./dist/aiod-header-component.js"></script>
</head>
<body>
    <!-- Caso 1: Header padrão, utilizador não logado -->
    <aiod-header
        variant="default"
        is-logged-in="false"
        login-url="https://auth.aiod.eu/login"
        home-url="https://aiod.eu/">
    </aiod-header>
    
    <!-- Caso 2: Header padrão, utilizador logado -->
    <aiod-header
        variant="default"
        is-logged-in="true"
        user-name="João Silva"
        user-avatar-url="https://example.com/avatar.jpg"
        home-url="https://aiod.eu/">
    </aiod-header>
    
    <!-- Caso 3: Dashboard header -->
    <aiod-header
        variant="dashboard"
        is-logged-in="true"
        user-name="Maria Santos"
        user-avatar-url="https://example.com/maria.jpg">
    </aiod-header>
</body>
</html>
```

## Integração em Diferentes Frameworks

### Angular
```typescript
// app.module.ts
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

// Adicionar script no index.html
<script type="module" src="assets/aiod-header-component.esm.js"></script>

// Usar no template
<aiod-header 
  [variant]="'default'"
  [isLoggedIn]="userService.isLoggedIn"
  [userName]="userService.userName">
</aiod-header>
```

### Laravel Blade
```php
{{-- Adicionar no layout --}}
<script type="module" src="{{ asset('js/aiod-header-component.esm.js') }}"></script>

{{-- Usar na view --}}
<aiod-header
    variant="default"
    is-logged-in="{{ auth()->check() ? 'true' : 'false' }}"
    user-name="{{ auth()->user()->name ?? '' }}"
    user-avatar-url="{{ auth()->user()->avatar ?? '' }}"
    home-url="{{ url('/') }}">
</aiod-header>
```

### WordPress
```php
// functions.php
function enqueue_aiod_header_component() {
    wp_enqueue_script(
        'aiod-header-component',
        get_template_directory_uri() . '/assets/js/aiod-header-component.esm.js',
        [],
        '1.0.0',
        true
    );
}
add_action('wp_enqueue_scripts', 'enqueue_aiod_header_component');

// template file
<aiod-header
    variant="default"
    is-logged-in="<?php echo is_user_logged_in() ? 'true' : 'false'; ?>"
    user-name="<?php echo wp_get_current_user()->display_name; ?>"
    user-avatar-url="<?php echo get_avatar_url(get_current_user_id()); ?>"
    home-url="<?php echo home_url(); ?>">
</aiod-header>
```

## Próximos Passos

1. **Colar CSS**: Adicionar o CSS completo do tema no ficheiro `aiod-header.css`
2. **Build Final**: Executar `npm run build` após adicionar o CSS
3. **Deploy**: Copiar ficheiros do `/dist` para os projetos finais
4. **Teste**: Validar em todas as aplicações target (Angular, Laravel, WordPress)

## Resolução de Problemas

### CORS na API de Navegação
Se houver problemas de CORS:
1. Configurar cabeçalhos no servidor da API
2. Ou implementar proxy no servidor de aplicação

### Estilos não Aparecem
1. Verificar se o CSS foi adicionado corretamente
2. Confirmar que o build foi executado após adicionar CSS
3. Verificar se os ficheiros do `/dist` estão atualizados

### Componente não Carrega
1. Verificar se os scripts foram incluídos corretamente
2. Confirmar suporte para Web Components no browser
3. Verificar console do browser para erros