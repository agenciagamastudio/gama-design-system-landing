# 🎨 Guia de Personalização Rápida

Modifique essas 3 arquivos para customizar completamente o site.

---

## 1. Mudar Data, Nomes, Mensagens

**Arquivo:** `components/IntroScreen.tsx`

```tsx
// Linha 65-66: Mudar data
<p className="text-2xl md:text-3xl font-light font-poppins text-gama-primary">
  23 DE ABRIL • 3 ANOS    ← MUDE AQUI
</p>

// Linha 75-78: Mudar mensagem principal
<p className="text-base sm:text-lg">
  Uma celebração dos momentos que nos definem.
  <br />
  <span className="text-gama-primary font-medium">
    Fotos que contam nossa história.    ← MUDE AQUI
  </span>
</p>

// Linha 101-104: Mudar título "Nossa História"
<h2 className="text-4xl md:text-5xl font-black">
  Nossa História    ← MUDE AQUI (mantém o template)
</h2>
```

---

## 2. Trocar Cores Principais

**Arquivo:** `tailwind.config.ts`

```ts
const config: Config = {
  theme: {
    extend: {
      colors: {
        'gama-primary': '#88CE11',      // ← MUDE para sua cor principal
        'gama-dark': '#161616',         // ← Fundo (deixa preto?)
        'gama-darker': '#0F0F0F',       // ← Fundo mais escuro
        'gama-text': '#FFFFFF',         // ← Texto (deixa branco?)
        'gama-text-secondary': '#A1A1AA',  // ← Texto secundário
      }
    }
  }
}
```

**Exemplos de cores:**
- Verde neon: `#88CE11` (atual)
- Rosa quente: `#E91E63`
- Azul royal: `#4169E1`
- Ouro: `#FFD700`
- Roxo: `#9C27B0`

Mude `gama-primary` e todas as classes vão usar a nova cor.

---

## 3. Adicionar Logo / Foto de Casal

**Arquivo:** `components/IntroScreen.tsx`

Adicione isso logo antes do `<h1>` (linha ~51):

```tsx
{/* Logo ou foto do casal */}
<div className="mb-8 flex justify-center">
  <img 
    src="https://sua-foto-aqui.jpg" 
    alt="Casal"
    className="w-20 h-20 rounded-full border-4 border-gama-primary shadow-lg"
  />
</div>

<h1>NOSSO DIA</h1>
```

---

## 4. Mudar Títulos das Seções

**Arquivo:** `components/IntroScreen.tsx`

```tsx
// Linha 101: Seção "Nossa História"
<h2>Sua Mensagem Aqui</h2>

// Linha 134: Seção "A Galeria"  
<h2>Veja as Fotos</h2>
```

---

## 5. Adicionar Redes Sociais / Links

**Arquivo:** `components/IntroScreen.tsx`

No footer (linha ~212), adicione:

```tsx
{/* Social links */}
<div className="flex gap-4 justify-center mt-4">
  <a href="https://instagram.com/seu-perfil" target="_blank" rel="noopener noreferrer"
    className="text-gama-primary hover:text-gama-text transition">
    Instagram
  </a>
  <a href="https://whatsapp.com/seu-link" target="_blank"
    className="text-gama-primary hover:text-gama-text transition">
    WhatsApp
  </a>
</div>
```

---

## 6. Mudar Duração do Slideshow

**Arquivo:** `components/Slideshow.tsx`

Linha ~37:

```tsx
}, 4000)  // ← Mude para 3000 (3s), 5000 (5s), etc
```

---

## 7. Mudar Mensagens de Erro / Carregamento

**Arquivo:** `components/Slideshow.tsx`

```tsx
// Linha ~46-47: Carregando fotos
<p className="text-gama-text-secondary">
  Carregando apresentação...    ← MUDE AQUI
</p>

// Linha ~56: Nenhuma foto
<p className="text-gama-error">
  Nenhuma foto encontrada    ← MUDE AQUI
</p>
```

**Arquivo:** `components/Gallery.tsx`

```tsx
// Linha ~26-27: Carregando galeria
<p className="text-gama-text-secondary">
  Carregando galeria...    ← MUDE AQUI
</p>
```

---

## 8. Adicionar Analytics

**Arquivo:** `app/layout.tsx`

```tsx
{/* Google Analytics (opcional) */}
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXX"></script>
<script>
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXX');
  `}
</script>
```

---

## 9. Trocar Tipografia

**Arquivo:** `app/globals.css`

```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Lora:wght@400&display=swap');
```

**Arquivo:** `tailwind.config.ts`

```ts
fontFamily: {
  poppins: ['Playfair Display', 'serif'],  // ← Troque a fonte aqui
  mono: ['Lora', 'serif'],
}
```

---

## 10. Deploy com Domínio Customizado

1. Compre domínio (Namecheap, GoDaddy, etc)
2. No Vercel: Project Settings → Domains
3. Adicione seu domínio
4. Configure DNS (Vercel mostra as intruções)

---

## 🎯 Checklist de Customização

- [ ] Data / Nome / Mensagens trocados
- [ ] Cores personalizadas
- [ ] Logo/Foto de casal adicionada
- [ ] Seções nomeadas corretamente
- [ ] Google Drive folder ID configurado
- [ ] .env.local com API Key (opcional)
- [ ] Teste em mobile/TV
- [ ] Deploy em Vercel
- [ ] Domínio customizado (opcional)

---

## 💡 Dicas Finais

1. **Teste localmente primeiro:** `npm run dev`
2. **Verifique em mobile:** Use DevTools (F12)
3. **Teste TV:** Fullscreen (F11) + HDMI
4. **Compartilhe link:** Vercel dá link automaticamente
5. **Backup:** Git commit de tudo

Bom casamento! 💍✨
