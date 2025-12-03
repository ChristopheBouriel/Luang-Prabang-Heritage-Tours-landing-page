# CLAUDE.md - LPB Heritage Tour Landing Template

## Aperçu du projet

Template Astro 4.x pour landing pages de visites touristiques guidées. Architecture minimaliste avec HTML/CSS pur (pas de Tailwind), optimisé SEO et performance.

## Commandes de développement

```bash
npm run dev      # Serveur de développement (localhost:4321)
npm run build    # Build de production dans /dist
npm run preview  # Prévisualiser le build de production
```

## Structure du projet

```
landing-template/
├── src/
│   ├── layouts/
│   │   └── Layout.astro          # Layout principal (SEO, Schema.org, WhatsApp)
│   ├── components/
│   │   └── Navigation.astro      # Navigation multi-tours (optionnel)
│   ├── pages/
│   │   ├── index.astro           # Page principale
│   │   ├── tour-historique.astro # Exemple page tour secondaire
│   │   └── _template-tour.astro  # Template pour nouveaux tours
│   └── env.d.ts
├── public/
│   ├── gallery/                  # Images de la galerie
│   └── robots.txt
├── astro.config.mjs              # Config Astro (modifier le domaine ici)
└── package.json
```

## Points de configuration clés

### 1. Informations business (Layout.astro lignes 12-24)
```astro
const businessInfo = {
  name, description, phone, whatsapp,
  address, facebook, latitude, longitude,
  priceRange, duration, availableLanguages
};
```

### 2. Configuration de page (index.astro lignes 5-122)
```astro
const config = {
  businessName, tagline, description, whatsapp, facebookUrl,
  heroImage, duration, languages,
  schedule, payment, highlights,
  pricing[], gallery[], testimonials[], faq[],
  map: { centerLat, centerLng, zoom, startPoint }
};
```

### 3. Domaine du site (astro.config.mjs)
```js
site: 'https://ton-domaine.com'  // À modifier pour le sitemap
```

### 4. robots.txt (public/robots.txt)
Modifier l'URL du sitemap avec le vrai domaine.

## Stack technique

- **Framework**: Astro 4.16+
- **Styling**: CSS pur (scoped styles Astro, pas de framework CSS)
- **JavaScript**: Vanilla JS minimal (scroll detection sticky CTA)
- **SEO**: Schema.org TouristTrip, Open Graph, Twitter Cards, sitemap auto
- **Maps**: OpenStreetMap embed
- **Fonts**: Google Fonts (Inter)

## Conventions de code

### Styling
- CSS-in-JS via `<style>` scoped dans chaque composant
- CSS Grid avec `auto-fit` et `minmax()` pour layouts responsifs
- Mobile-first avec breakpoint `@media (max-width: 640px)`
- Pas de Tailwind, pas de SCSS

### Nommage
- Composants: PascalCase (`Layout.astro`, `Navigation.astro`)
- Templates: préfixe underscore (`_template-tour.astro`)
- Dossiers images: `gallery/` ou `gallery-[nom-tour]/`

### Langue
- Interface et documentation en français
- Commentaires en français acceptés

## Créer un nouveau tour

1. Copier `src/pages/_template-tour.astro` vers `src/pages/nouveau-tour.astro`
2. Modifier l'objet `config` avec les nouvelles données
3. Créer le dossier `public/gallery-nouveau-tour/` pour les images
4. (Optionnel) Activer `Navigation.astro` dans `Layout.astro` pour le menu multi-tours

## Fonctionnalités clés

- **Double CTA WhatsApp**: bouton flottant + barre sticky au scroll
- **FAQ accordion**: utilise `<details>` natif (sans JS)
- **Galerie**: lazy loading, effet hover scale
- **Responsive**: CSS Grid fluid, typographie avec `clamp()`

## Build et déploiement

Le build génère des fichiers statiques dans `/dist`:
- HTML compressé automatiquement
- Sitemap généré dans `/dist/sitemap-index.xml`

Hébergement recommandé: Cloudflare Pages, GitHub Pages, ou FTP classique.

## Dépendances

Projet minimaliste avec seulement 2 dépendances:
- `astro` - Framework
- `@astrojs/sitemap` - Génération sitemap SEO
