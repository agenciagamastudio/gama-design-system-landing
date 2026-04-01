# 🎨 GAMA Design System — Portable Edition v1.0.0

**Status:** ✅ **NATIVO** — Carregável em qualquer lugar  
**Última atualização:** 2026-04-01  
**Para usar:** Copie este arquivo para `~/.claude/` em qualquer PC

---

## 🚀 Quick Start

Copia este `.md` para:
- `~/.claude/gama-portable-design-system.md` — Carregado automaticamente em suas sessões
- Usa em qualquer editor, projeto ou contexto
- Referência completa: cores, tipografia, componentes, padrões

**Tl;dr:**
- **Primary:** `#88CE11` (verde neon)  
- **Dark:** `#161616` (background)  
- **Font:** Poppins (primary), JetBrains Mono (code)  
- **Modo:** Dark mode first

---

## 🎨 CORES

### Brand Colors

| Nome | Hex | Uso | Tailwind |
|------|-----|-----|----------|
| **Primary** | `#88CE11` | Botões, destaques, CTAs | `bg-[#88CE11]` |
| **Secondary** | `#4B5563` | Ações secundárias, texto muted | `text-[#4B5563]` |

### Semantic Colors

| Nome | Hex | Uso | Tailwind |
|------|-----|-----|----------|
| **Success** | `#10B981` | Confirmações, estados válidos | `bg-emerald-500` |
| **Warning** | `#F59E0B` | Avisos, caution | `bg-amber-400` |
| **Error** | `#E11D48` | Erros, danger | `bg-rose-600` |
| **Info** | `#3B82F6` | Informações, tooltips | `bg-blue-500` |

### Neutral Scale (0-100)

```yaml
# Escala de neutrals (use sempre estas)
'50':  #F5F5F5   # Lightest (quase branco)
'100': #EEEEEE   # Very light
'200': #E5E5E5   # Light
'300': #D4D4D4   # Light-medium
'400': #A1A1AA   # Medium (TEXT SECONDARY)
'500': #71717A   # Medium-dark
'600': #52525B   # Dark
'700': #3F3F46   # Very dark
'800': #27272A   # Almost black (SURFACE)
'900': #161616   # Darkest (BACKGROUND)
```

### Background & Surface

```yaml
# Dark mode (padrão GAMA)
Background: #161616   # bg-[#161616]
Surface:    #272727   # bg-[#272727] (cards, panels)
Text Primary:    #FFFFFF     # text-white
Text Secondary:  #A1A1AA     # text-[#A1A1AA]
Border:          #52525B     # border-[#52525B]
```

### Copy-Paste Paleta (Tailwind)

```html
<!-- Primary action button -->
<button class="bg-[#88CE11] text-[#161616] font-black px-6 py-3 rounded-xl hover:brightness-110">
  Action
</button>

<!-- Success message -->
<div class="bg-emerald-500/20 text-emerald-500 border border-emerald-500/50 px-4 py-3 rounded-lg">
  ✓ Sucesso
</div>

<!-- Error message -->
<div class="bg-rose-600/20 text-rose-600 border border-rose-600/50 px-4 py-3 rounded-lg">
  ✗ Erro
</div>

<!-- Card (dark mode) -->
<div class="bg-[#272727] border border-white/10 p-6 rounded-xl">
  Content
</div>

<!-- Input -->
<input class="bg-[#272727] border border-[#52525B] text-white px-4 py-3 rounded-lg focus:border-[#88CE11]" />
```

---

## 📝 TIPOGRAFIA

### Font Families

```yaml
Primary:  "Poppins, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
Code:     "'JetBrains Mono', 'Courier New', monospace"

# Instrução: Bold é o padrão em GAMA
# Títulos SEMPRE font-weight >= 700 (bold, extrabold)
```

### Font Sizes

| Token | Tamanho | Uso | CSS |
|-------|---------|-----|-----|
| **xs** | 12px | Labels, small text | `text-xs` |
| **sm** | 14px | Helper text | `text-sm` |
| **base** | 16px | Body text (padrão) | `text-base` |
| **lg** | 18px | Subheadings | `text-lg` |
| **xl** | 20px | Section headings | `text-xl` |
| **2xl** | 24px | Subsection | `text-2xl` |
| **3xl** | 30px | Page headings | `text-3xl` |
| **4xl** | 36px | **Hero text (MÁXIMO)** | `text-4xl` |

### Font Weights

```yaml
Regular:     400  # Body text
Medium:      500  # UI labels
Semibold:    600  # Subheadings, emphasis
Bold:        700  # Headings (padrão GAMA)
Extrabold:   800  # Strong emphasis
Black:       900  # Hero text
```

### Line Heights

```yaml
tight:   1.2   # Headings, compact
normal:  1.5   # Body text (confortável)
relaxed: 1.75  # Long-form content
loose:   2.0   # Poetry, espaçamento extra
```

### Copy-Paste Exemplos

```html
<!-- Titulo hero -->
<h1 class="text-4xl font-black leading-tight text-white">
  Seu Título Impactante
</h1>

<!-- Subtítulo -->
<h2 class="text-2xl font-bold text-white">
  Seção Principal
</h2>

<!-- Body text -->
<p class="text-base font-medium leading-normal text-[#A1A1AA]">
  Seu parágrafo com informação clara e legível.
</p>

<!-- Código inline -->
<code class="bg-[#272727] text-[#88CE11] px-2 py-1 rounded font-mono text-sm">
  const value = 42
</code>
```

---

## 📐 ESPAÇAMENTO

```yaml
xs:   4px   # Micro gaps, inline
sm:   8px   # Small padding
md:   12px  # Form inputs
base: 16px  # Default (1rem)
lg:   24px  # Section padding
xl:   32px  # Major separation
2xl:  48px  # Page sections
3xl:  64px  # Major sections
```

### Copy-Paste Padrões

```html
<!-- Padding padrão (base) -->
<div class="p-4">Content</div>

<!-- Margin padrão -->
<div class="mb-6">Section 1</div>
<div class="mb-6">Section 2</div>

<!-- Gaps em grids -->
<div class="grid grid-cols-3 gap-6">...</div>

<!-- Section spacing -->
<section class="px-6 py-12">...</section>
```

---

## 🎯 COMPONENTES

### Button

```html
<!-- Primary (padrão GAMA) -->
<button class="bg-[#88CE11] text-[#161616] font-black px-6 py-3 rounded-xl hover:brightness-110 transition">
  Click me
</button>

<!-- Secondary -->
<button class="bg-[#272727] text-white border border-[#52525B] px-6 py-3 rounded-xl hover:bg-[#3F3F46]">
  Secondary
</button>

<!-- Danger -->
<button class="bg-rose-600/20 text-rose-600 border border-rose-600/50 px-6 py-3 rounded-xl hover:bg-rose-600/30">
  Delete
</button>

<!-- Disabled -->
<button class="bg-[#52525B] text-[#71717A] px-6 py-3 rounded-xl cursor-not-allowed opacity-50">
  Disabled
</button>
```

### Input & Form

```html
<!-- Text input -->
<input 
  type="text" 
  class="w-full bg-[#272727] border border-[#52525B] text-white px-4 py-3 rounded-lg focus:border-[#88CE11] focus:outline-none"
  placeholder="Type something..."
/>

<!-- Textarea -->
<textarea 
  class="w-full bg-[#272727] border border-[#52525B] text-white px-4 py-3 rounded-lg focus:border-[#88CE11] focus:outline-none"
></textarea>

<!-- Select -->
<select class="w-full bg-[#272727] border border-[#52525B] text-white px-4 py-3 rounded-lg focus:border-[#88CE11]">
  <option>Choose...</option>
</select>
```

### Card

```html
<!-- Standard card -->
<div class="bg-[#272727] border border-white/10 p-6 rounded-xl shadow-lg">
  <h3 class="text-xl font-bold text-white mb-2">Card Title</h3>
  <p class="text-[#A1A1AA]">Card content goes here.</p>
</div>

<!-- Glassmorphism card (premium) -->
<div class="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
  <h3 class="text-xl font-bold text-white">Premium Card</h3>
</div>

<!-- Elevated card (hover state) -->
<div class="bg-[#272727] border border-white/10 p-6 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition">
  Hover me
</div>
```

### Modal / Dialog

```html
<div class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center">
  <div class="bg-[#272727] border border-white/10 p-8 rounded-2xl max-w-md w-full">
    <h2 class="text-2xl font-black text-white mb-4">Modal Title</h2>
    <p class="text-[#A1A1AA] mb-6">Your message here.</p>
    <div class="flex gap-3">
      <button class="flex-1 bg-[#88CE11] text-[#161616] font-black py-3 rounded-xl hover:brightness-110">
        Confirm
      </button>
      <button class="flex-1 bg-[#272727] border border-[#52525B] text-white py-3 rounded-xl hover:bg-[#3F3F46]">
        Cancel
      </button>
    </div>
  </div>
</div>
```

### Alert / Toast

```html
<!-- Success toast -->
<div class="bg-emerald-500/20 border border-emerald-500/50 text-emerald-500 px-4 py-3 rounded-lg flex items-center gap-3">
  <span class="text-xl">✓</span>
  <span>Operação realizada com sucesso!</span>
</div>

<!-- Error toast -->
<div class="bg-rose-600/20 border border-rose-600/50 text-rose-600 px-4 py-3 rounded-lg flex items-center gap-3">
  <span class="text-xl">✗</span>
  <span>Algo deu errado. Tente novamente.</span>
</div>

<!-- Warning toast -->
<div class="bg-amber-400/20 border border-amber-400/50 text-amber-400 px-4 py-3 rounded-lg flex items-center gap-3">
  <span class="text-xl">⚠</span>
  <span>Atenção: Esta ação não pode ser desfeita.</span>
</div>

<!-- Info toast -->
<div class="bg-blue-500/20 border border-blue-500/50 text-blue-500 px-4 py-3 rounded-lg flex items-center gap-3">
  <span class="text-xl">ℹ</span>
  <span>Informação relevante para você.</span>
</div>
```

### Badge / Tag

```html
<!-- Primary badge -->
<span class="bg-[#88CE11] text-[#161616] font-black px-3 py-1 rounded-full text-xs">
  New
</span>

<!-- Status badge (green) -->
<span class="bg-emerald-500/20 text-emerald-500 px-3 py-1 rounded-full text-xs font-medium">
  Active
</span>

<!-- Status badge (gray) -->
<span class="bg-[#52525B] text-[#A1A1AA] px-3 py-1 rounded-full text-xs font-medium">
  Inactive
</span>
```

---

## ✨ EFEITOS & ANIMATIONS

### Border Radius

```yaml
xs:  4px    # Buttons, small inputs
sm:  8px    # Standard components (PADRÃO)
md:  12px   # Cards, panels
lg:  16px   # Modals, large elements
xl:  20px   # Hero sections
full: 9999px # Circles, avatars
```

### Shadows

```html
<!-- Subtle shadow -->
<div class="shadow-sm">...</div>

<!-- Medium shadow (padrão GAMA) -->
<div class="shadow-md">...</div>

<!-- Large shadow (elevated) -->
<div class="shadow-lg">...</div>

<!-- Extra large shadow (hero) -->
<div class="shadow-xl">...</div>

<!-- Custom shadow -->
<div class="shadow-[0_4px_6px_rgba(0,0,0,0.1)]">...</div>
```

### Opacity Scale

```yaml
0:   0.0   # Hidden
25:  0.25  # Very transparent
50:  0.5   # Moderately transparent
75:  0.75  # Slightly transparent
100: 1.0   # Fully opaque
```

### Hover & Transitions

```html
<!-- Hover brightness -->
<div class="hover:brightness-110 transition">
  Hover me
</div>

<!-- Hover color -->
<div class="hover:bg-[#88CE11] transition">
  Hover me
</div>

<!-- Smooth transition -->
<div class="transition-all duration-300">
  Smooth animation
</div>

<!-- Scale on hover -->
<div class="hover:scale-105 transition-transform">
  Scale me
</div>
```

---

## 🎬 RESPONSIVE DESIGN

### Breakpoints (Tailwind Standard)

```yaml
sm: 640px   # Tablet portrait
md: 768px   # Tablet landscape
lg: 1024px  # Desktop small
xl: 1280px  # Desktop standard
2xl: 1536px # Desktop large
```

### Copy-Paste Patterns

```html
<!-- Mobile-first (padrão) -->
<div class="text-sm md:text-base lg:text-lg">
  Responsive text
</div>

<!-- Hide on mobile -->
<div class="hidden md:block">
  Visible only on tablet+
</div>

<!-- Grid responsive -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Auto-responsive -->
</div>

<!-- Padding responsive -->
<section class="px-4 md:px-8 lg:px-12 py-6 md:py-12">
  Content
</section>
```

---

## 🌙 DARK MODE (Padrão GAMA)

**Tudo em GAMA é Dark Mode First.** Nunca crie componentes para light mode primeiro.

```html
<!-- Estrutura padrão (sempre dark) -->
<div class="bg-[#161616] text-white">
  <!-- Surface cards -->
  <div class="bg-[#272727] text-white">
    Content
  </div>
</div>

<!-- Se precisar de light mode (raro), use dark: prefix -->
<div class="bg-white dark:bg-[#161616]">
  Adaptive (não recomendado em GAMA)
</div>
```

---

## 🎯 PATTERNS & BEST PRACTICES

### Layout Base

```html
<!-- Full page layout -->
<div class="min-h-screen bg-[#161616]">
  <!-- Header -->
  <header class="bg-[#272727] border-b border-white/10 px-6 py-4">
    <div class="max-w-7xl mx-auto flex justify-between items-center">
      <h1 class="text-2xl font-black text-[#88CE11]">Logo</h1>
      <nav><!-- nav items --></nav>
    </div>
  </header>

  <!-- Main content -->
  <main class="max-w-7xl mx-auto px-6 py-12">
    <!-- Seu conteúdo -->
  </main>

  <!-- Footer -->
  <footer class="bg-[#272727] border-t border-white/10 px-6 py-8 text-center text-[#A1A1AA]">
    © 2026 GAMA
  </footer>
</div>
```

### CTA Section

```html
<section class="bg-[#272727] border border-white/10 rounded-2xl p-8 text-center">
  <h2 class="text-3xl font-black text-white mb-4">
    Ready to start?
  </h2>
  <p class="text-[#A1A1AA] mb-6">
    Join thousands of users building amazing things.
  </p>
  <button class="bg-[#88CE11] text-[#161616] font-black px-8 py-4 rounded-xl hover:brightness-110 text-lg">
    Get Started Now
  </button>
</section>
```

### Feature Grid

```html
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
  <div class="bg-[#272727] border border-white/10 p-6 rounded-xl">
    <h3 class="text-xl font-bold text-white mb-2">Feature 1</h3>
    <p class="text-[#A1A1AA]">Description here</p>
  </div>
  <!-- Repeat for other features -->
</div>
```

---

## 📦 QUICK COPY-PASTE TEMPLATES

### Minimal Page

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GAMA</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { font-family: 'Poppins', sans-serif; }
    code { font-family: 'JetBrains Mono', monospace; }
  </style>
</head>
<body class="bg-[#161616] text-white">
  <main class="max-w-7xl mx-auto px-6 py-12">
    <h1 class="text-4xl font-black mb-6">Bem-vindo à GAMA</h1>
    <button class="bg-[#88CE11] text-[#161616] font-black px-6 py-3 rounded-xl hover:brightness-110">
      Clique aqui
    </button>
  </main>
</body>
</html>
```

---

## 🔥 COMBINAÇÕES PRONTAS (Copy-Paste)

### "Elegant CTA"
```html
<div class="bg-gradient-to-r from-[#88CE11]/20 to-transparent border border-[#88CE11]/50 p-8 rounded-2xl">
  <h2 class="text-2xl font-black text-white mb-3">Título</h2>
  <p class="text-[#A1A1AA] mb-4">Descrição breve</p>
  <button class="bg-[#88CE11] text-[#161616] font-black px-6 py-3 rounded-xl">Ação</button>
</div>
```

### "Dark Card with Hover"
```html
<div class="group bg-[#272727] border border-white/10 p-6 rounded-xl hover:border-[#88CE11]/50 hover:shadow-lg transition">
  <h3 class="text-xl font-bold text-white group-hover:text-[#88CE11] transition">Título</h3>
  <p class="text-[#A1A1AA]">Descrição</p>
</div>
```

### "3-Column Feature"
```html
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
  <div class="text-center">
    <div class="bg-[#88CE11] rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
      💡
    </div>
    <h3 class="font-bold text-white mb-2">Feature</h3>
    <p class="text-sm text-[#A1A1AA]">Description</p>
  </div>
  <!-- Repeat 2x more -->
</div>
```

---

## 💾 COMO USAR ESTE ARQUIVO

### Opção 1: Carregar Automaticamente (Recomendado)
```bash
# No seu ~/.claude/
cp gama-portable-design-system.md ~/.claude/gama-portable-design-system.md

# Será carregado automaticamente em suas sessões Claude Code
```

### Opção 2: Usar em Qualquer Projeto
```bash
# Copie o arquivo para o seu projeto
cp gama-portable-design-system.md ./projeto/docs/

# Referencie em README ou docs
```

### Opção 3: Usa em Outros PCs
```bash
# Copie via USB, Dropbox, Google Drive, GitHub Gist
# Cole em ~/.claude/ no novo PC
# Automáticamente disponível
```

---

## 🎨 FIGMA / DESIGN TOOL INTEGRATION

Se estiver usando Figma, nomeie seus componentes assim:

```
Componentes/
├── Button/
│   ├── Primary
│   ├── Secondary
│   └── Danger
├── Input/
│   ├── Default
│   ├── Focus
│   └── Error
├── Card/
│   ├── Standard
│   ├── Elevated
│   └── Glass
└── Colors/
    ├── Primary (#88CE11)
    ├── Neutral-900 (#161616)
    └── Surface (#272727)
```

---

## 📋 CHECKLIST: NOVO PROJETO

Quando começar um novo projeto com GAMA:

- [ ] Copiar `gama-portable-design-system.md` para `docs/`
- [ ] Instalar Tailwind CSS: `npm install -D tailwindcss`
- [ ] Copiar cores em `tailwind.config.js`
- [ ] Usar tokens: `bg-[#88CE11]`, `text-[#A1A1AA]`, etc.
- [ ] Começar com dark mode (background `#161616`)
- [ ] Usar Poppins (Google Fonts)
- [ ] Testar em mobile (`md:` breakpoints)
- [ ] Docs — Referenciar este arquivo

---

## 🔄 VERSIONAMENTO

| Versão | Data | Mudanças |
|--------|------|----------|
| 1.0.0 | 2026-04-01 | Release inicial — cores, tipografia, componentes, padrões |

---

## 📞 REFERÊNCIAS

**Arquivo completo do projeto:**
- 📁 `C:\Users\Usuario\Desktop\O_GRANDE_PROJETO\GAMA_DESIGN_SYSTEM\gama-ds-platform\`

**Documentação técnica:**
- 📄 `tokens.yaml` — Design tokens (DTCG format)
- 📄 `tailwind.config.ts` — Configuração Tailwind
- 📄 `src/types/theme.ts` — Tipos TypeScript

**Quando precisar de mais detalhes:**
- Abra `tokens.yaml` para valores exatos
- Consulte componentes em `src/components/atoms/`
- Veja `docs/tokens-mapping.md` para referência completa

---

## ✅ Status

- ✅ **COMPLETO** — Use em produção
- ✅ **NATIVO** — Carregável em qualquer lugar
- ✅ **PORTÁVEL** — Tudo em 1 arquivo `.md`
- ✅ **PRÁTICO** — Copy-paste ready
- ✅ **DARK MODE FIRST** — Padrão GAMA

---

**Made with ❤️ for GAMA**  
**Keep it simple. Keep it fast. Keep it green. #88CE11**
