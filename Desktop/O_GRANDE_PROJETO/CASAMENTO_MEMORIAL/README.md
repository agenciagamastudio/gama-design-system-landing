# 💍 Memorial do Casamento

Um site cinematic, responsivo e elegante para celebrar o seu dia especial. Apresentação com slideshow automático, galeria interativa com lazy-loading e design premium com Gama Design System.

## ✨ Features

### 📱 Experiência
- **Intro cinematic** — Hero elegante com parallax e animações suaves
- **Slideshow automático** — 4s por foto, transições fluidas de 1.2s
- **Galeria interativa** — Grid responsivo com lazy-loading + lightbox
- **Navegação inteligente** — Keyboard shortcuts (← →, ESC)
- **100% responsivo** — Mobile, tablet, desktop, TV (fullscreen)

### 🎨 Design
- **Gama Design System nativo** — Cores, tipografia, espaçamento unificados
- **Animações premium** — Fade-in, scale, glow effects
- **Modo escuro por padrão** — Tema elegante (dark 161616)
- **Tipografia Poppins** — Moderna, legível, profissional

### 🚀 Performance & Tech
- **Next.js 14** — App router, optimizações automáticas
- **TypeScript** — Type-safe, sem bugs de runtime
- **Lazy-loading** — Fotos carregam sob demanda (Intersection Observer)
- **Service Worker** — Funciona offline após primeiro carregamento
- **PWA-ready** — Manifest + app icons (installable)

### 🔗 Integração
- **Google Drive** — Fotos hospedadas online, sem servidor
- **Detecção automática de seções** — Keywords em nomes de arquivo
- **Fallback demo** — Funciona sem fotos reais (para teste)
- **Deploy Vercel** — 1 clique, sem configuração

---

## 🚀 Setup Rápido (5 minutos)

### 1. Preparar fotos no Google Drive

```bash
# 1. Crie uma pasta no Google Drive (ou use uma existente)
# 2. Coloque suas fotos (qualquer nome)
# 3. Compartilhe: botão direito → Compartilhar → "Qualquer pessoa com o link"
# 4. Copie o ID da URL: drive.google.com/drive/folders/[ESSE_ID]
```

### 2. Configurar variáveis de ambiente

```bash
# Copie .env.example para .env.local
cp .env.example .env.local

# Edite:
NEXT_PUBLIC_GOOGLE_DRIVE_FOLDER_ID=seu_id_aqui
NEXT_PUBLIC_GOOGLE_API_KEY=sua_api_key_aqui  # Opcional mas recomendado
```

**Como obter Google API Key:**
- [console.cloud.google.com](https://console.cloud.google.com)
- Habilitar Google Drive API
- Criar credenciais (API Key)
- Copiar a chave para `.env.local`

### 3. Instalar e rodar

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

### 4. Deploy no Vercel (opcional)

```bash
git add .
git commit -m "feat: memorial do casamento"
git push origin main
```

Depois conecte em [vercel.com](https://vercel.com):
- Importe seu repo GitHub
- Configure as variáveis de ambiente (mesmas do `.env.local`)
- Deploy automático!

---

## 📸 Estrutura de Fotos

O site detecta **automaticamente** as seções pelo nome do arquivo:

```
📁 Meu Casamento (Google Drive)
├── 📷 making-of-01.jpg          → Making Of
├── 📷 makeup-noiva.jpg           → Making Of
├── 📷 cerimonia-01.jpg           → Cerimônia
├── 📷 troca-aliancas.jpg         → Cerimônia
├── 📷 recepcao-festa.jpg         → Recepção
└── 📷 danca-noivos.jpg           → Recepção
```

**Keywords detectados automaticamente:**
- **Making Of:** `making`, `makeup`, `prep`, `noiva`, `noivo`
- **Cerimônia:** `cerimônia`, `ceremony`, `altar`, `troca`, `aliança`, `beijo`, `entrada`
- **Recepção:** `recepção`, `reception`, `festa`, `dança`, `buffet`, `mesa`

Se não houver keywords, o site divide as fotos em **3 seções iguais**.

---

## 🎨 Personalizações

### Trocar cores (Design System Gama)

Edite `tailwind.config.ts`:

```ts
colors: {
  'gama-primary': '#88CE11',    // Verde neon (principal)
  'gama-dark': '#161616',        // Preto escuro (fundo)
  'gama-text': '#FFFFFF',        // Texto branco
  // ... outras cores
}
```

Depois use nas componentes:
```tsx
<div className="bg-gama-primary text-gama-dark">
  Isso vai usar as novas cores automaticamente
</div>
```

### Mudar data / nome / mensagens

Edite `components/IntroScreen.tsx`:

```tsx
// Linha 65-66: Data e nome
<p>23 DE ABRIL • 3 ANOS</p>

// Linha 75-77: Mensagens
<p>Sua mensagem aqui...</p>
```

### Ajustar duração do slideshow

Edite `components/Slideshow.tsx`:

```tsx
// Linha ~37: Tempo em ms (4000 = 4 segundos)
}, 4000) // Troque o número aqui
```

---

## ⌨️ Keyboard Shortcuts

| Tecla | Ação |
|-------|------|
| `→` | Próxima foto (Slideshow / Lightbox) |
| `←` | Foto anterior (Lightbox) |
| `ESC` | Fechar lightbox / Modal |
| `⌘S` / `Ctrl+S` | Download da foto |

---

## 🔧 Troubleshooting

### "Nenhuma foto encontrada"
- ✅ Verifique se a pasta do Drive está **compartilhada publicamente**
- ✅ Copie o ID correto da URL
- ✅ Teste com fotos demo (deixe `FOLDER_ID` em branco)

### API Key deprecated / rate limit
- ✅ Gere uma nova chave em [console.cloud.google.com](https://console.cloud.google.com)
- ✅ Adicione em `.env.local` (recomendado para produção)

### Fotos carregam lentamente
- ✅ Redimensione as fotos (máx 1200px de largura)
- ✅ Comprima JPGs (qualidade 80-90%)
- ✅ Use API Key (cache melhor, mais rápido)

### PWA não instala
- ✅ Acesse via HTTPS (deploy Vercel funciona)
- ✅ Localhost funciona só em HTTPS (móvel pode não reconhecer)

---

## 📊 Stack Técnico

- **Frontend:** Next.js 14, React 18, TypeScript
- **Styling:** Tailwind CSS 3.3, design system customizado
- **Storage:** Google Drive API (fotos externas)
- **Deploy:** Vercel (recomendado)
- **PWA:** Service Worker, Manifest
- **Animações:** CSS3 nativas (sem bibliotecas)

---

## 📝 Estrutura de Arquivos

```
CASAMENTO_MEMORIAL/
├── app/
│   ├── layout.tsx              # Root layout + PWA setup
│   ├── page.tsx                # Page container
│   └── globals.css             # Global styles + animations
├── components/
│   ├── IntroScreen.tsx         # Hero + Info + Gallery Preview
│   ├── Slideshow.tsx           # Apresentação automática
│   └── Gallery.tsx             # Galeria com lazy-loading + lightbox
├── lib/
│   ├── fetchPhotos.ts          # Google Drive integration
│   └── colorDetect.ts          # (Optional) Color detection
├── public/
│   ├── manifest.json           # PWA manifest
│   └── sw.js                   # Service Worker
├── .env.local                  # Variáveis locais (git ignore)
├── .env.example                # Template (exemplo)
├── next.config.js              # Next.js config
├── tailwind.config.ts          # Gama Design System
└── package.json
```

---

## 🎁 Bônus: Toque Pessoal

Para deixar AINDA mais personalizado:

```tsx
// Em IntroScreen.tsx, customize:
- Data do casamento (linha 65)
- Nomes dos noivos (adicione logo/foto)
- Mensagem especial (linha 75)
- Cores (use tailwind.config.ts)
- Fontes (Google Fonts em globals.css)
```

---

## 📧 FAQ

**P: Preciso de servidor?**  
R: Não! Google Drive + Vercel grátis fazem tudo.

**P: As fotos são públicas?**  
R: Não. Apenas quem tem o link pode acessar (shared link).

**P: Funciona offline?**  
R: Sim! Service Worker cacheia automaticamente. Fotos carregadas ficam offline.

**P: Posso ver em TV?**  
R: Sim! Fullscreen é nativo. Funciona em qualquer navegador.

**P: Como adicionar mais fotos depois?**  
R: Coloque no Google Drive (mesma pasta). Site recarrega a cada 5 min (cache).

---

## 💖 Créditos

**Criado com ❤️ para celebrar momentos que importam.**

Design System: Gama  
Framework: Next.js 14  
Hosting: Vercel  
Fotos: Google Drive

---

**Data de criação:** 2026-01-15  
**Última atualização:** 2026-04-01  
**Status:** ✅ Production Ready
