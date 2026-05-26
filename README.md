# GoFisioterapia - Landing Page Premium

Landing page sofisticada e elegante para a GoFisioterapia, empresa de fisioterapia domiciliar premium na zona sul de São Paulo.

## Domínio (placeholder)

URLs canônicas, Open Graph, `sitemap.xml` e `robots.txt` usam **`https://gofisioterapia.com.br/`** como domínio de referência. Ao publicar em produção:

1. Substitua pelo domínio real em `index.html` (canonical, OG, JSON-LD), `sitemap.xml` e `robots.txt`.
2. Envie o sitemap atualizado no Google Search Console.

## Design

- **Cores**: Azul marinho (#1B3A4B), Verde-água (#7BA393) e Branco
- **Tipografia**: Cormorant Garamond (display) + Outfit (corpo)
- **Estilo**: Minimalista, elegante, focado em luxo e sofisticação

## Como usar

1. Abra o arquivo `index.html` em um navegador
2. Ou sirva os arquivos com um servidor local:

```bash
# Com Python
python -m http.server 8000

# Com Node.js (npx)
npx serve .
```

## Estrutura

```
Go-Fisioterapia/
├── index.html          # Página principal (SEO on-page)
├── styles.css          # Estilos e animações
├── script.js           # Interatividade
├── robots.txt          # Diretivas para crawlers
├── sitemap.xml         # Mapa do site (placeholder de domínio)
├── resource/
│   ├── logo.svg        # Logo da marca
│   └── favicon.svg     # Ícone do site
└── README.md
```

## Seções

1. **Hero** — Apresentação + linha SEO local (zona sul / bairros)
2. **Sobre** — História, valores e bloco E-E-A-T (CREFITO, evidências)
3. **Áreas atendidas** — Bairros da zona sul nobre
4. **Serviços** — Especialidades oferecidas
5. **Diferenciais** — Por que escolher a Go Fisioterapia
6. **Processo** — Como funciona o atendimento
7. **Vantagens** — Benefícios do atendimento domiciliar
8. **FAQ** — Perguntas frequentes (+ schema FAQPage)
9. **CTA** — WhatsApp / telefone
10. **Footer** — Links, serviços alinhados ao corpo, contato

## Checklist SEO (implementado)

- [x] Title e meta description com SP, domiciliar premium e bairros
- [x] H1 emocional + subtítulo SEO visível (`hero-seo-line`)
- [x] Seção **Áreas atendidas** com lista de bairros
- [x] `link rel="canonical"` (placeholder `https://gofisioterapia.com.br/`)
- [x] Open Graph + Twitter Card
- [x] JSON-LD `MedicalBusiness` com `areaServed`
- [x] JSON-LD `FAQPage` (5 perguntas)
- [x] `robots.txt` + `sitemap.xml`
- [x] `loading="lazy"` em imagens abaixo da dobra; `fetchpriority="high"` no hero
- [x] `preconnect` para Google Fonts e Pexels
- [x] Favicon SVG em `resource/favicon.svg`
- [x] Alt text com contexto local onde aplicável
- [x] Footer: serviços alinhados ao corpo da página
- [x] Sem meta keywords (evitar stuffing)
- [ ] **Pendente (você)**: substituir telefone/WhatsApp placeholder
- [ ] **Pendente (você)**: trocar imagens Pexels por fotos reais da clínica
- [ ] **Pendente (você)**: confirmar CREFITO e dados no rodapé

## Google Search Console

1. Verifique a propriedade do domínio (DNS ou arquivo HTML).
2. Envie `https://gofisioterapia.com.br/sitemap.xml` (ou URL real) em **Sitemaps**.
3. Use **Inspeção de URL** na home após publicar.
4. Monitore **Cobertura**, **Experiência na página** e **Core Web Vitals**.

## Google Business Profile (GBP)

1. Crie ou reivindique o perfil com nome **Go Fisioterapia**.
2. Categoria sugerida: Fisioterapeuta / Clínica de fisioterapia.
3. Área de atendimento: zona sul de SP e bairros listados no site.
4. Site: mesma URL do canonical.
5. Telefone e horários **iguais** aos do site (evita inconsistência NAP).
6. Peça avaliações a pacientes reais; responda todas as reviews.

## Personalização

### Contato (placeholders)

No `index.html`, substitua:

- WhatsApp: `https://wa.me/5511999999999`
- Telefone: `tel:+5511999999999` e texto `(11) 99999-9999`
- E-mail: `contato@gofisioterapia.com.br` (se diferente do real)

Comentários HTML `<!-- SUBSTITUIR: ... -->` marcam esses pontos.

### Cores

Edite as variáveis CSS no início de `styles.css`:

```css
:root {
    --color-primary: #1B3A4B;
    --color-secondary: #7BA393;
    /* ... */
}
```

### Imagens

As imagens atuais são do Pexels. Substitua por assets reais e atualize `og:image` e JSON-LD `image` com a URL final hospedada no seu domínio.

## Licença

Desenvolvido exclusivamente para GoFisioterapia.
