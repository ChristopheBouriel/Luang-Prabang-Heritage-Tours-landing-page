# Landing Page Visite Audio-guidée - Template Astro

Template optimisé SEO pour landing page de visite touristique audio-guidée avec CTAs WhatsApp et Facebook.

## 🚀 Démarrage rapide

```bash
# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build pour production
npm run build
```

## ⚙️ Personnalisation

### 1. Informations de base

Modifie ces fichiers avec tes informations :

**`astro.config.mjs`** - Ligne 5 :
```js
site: 'https://ton-vrai-domaine.com',
```

**`src/layouts/Layout.astro`** - Lignes 12-22 :
```js
const businessInfo = {
  name: "Nom du Service de Visite",
  description: "Visite audio-guidée de Luang Prabang...",
  phone: "+856XXXXXXXXX",
  whatsapp: "856XXXXXXXXX",  // Sans le +
  address: "Point de départ, Luang Prabang",
  facebook: "https://www.facebook.com/ta-page",
  latitude: "19.XXXXX",      // Coordonnées GPS
  longitude: "102.XXXXX",
  duration: "PT2H",          // Durée format ISO (2h)
  availableLanguages: ["French", "English", "Lao"]
};
```

**`src/pages/index.astro`** - Lignes 5-20 :
```js
const config = {
  businessName: "Nom de la Visite",
  tagline: "Ta phrase d'accroche",
  description: "Description pour Google (150-160 caractères)",
  whatsapp: "856XXXXXXXXX",
  facebookUrl: "https://www.facebook.com/ta-page",
  duration: "2 heures",
  languages: ["Français", "English", "ລາວ"],
  highlights: [
    "Centre historique UNESCO",
    "Temples emblématiques",
    // ...
  ]
};
```

**`public/robots.txt`** - Ligne 4 :
```
Sitemap: https://ton-vrai-domaine.com/sitemap-index.xml
```

### 2. Images à ajouter

Place ces fichiers dans `/public/` :

- `hero.jpg` - Image de fond du hero (1920x1080 recommandé, voiturette ou paysage LP)
- `og-image.jpg` - Image pour partage Facebook/Twitter (1200x630)
- `favicon.svg` - Remplace le placeholder avec ton logo

**Galerie photos** (`/public/gallery/`) :
- `photo1.jpg` à `photo6.jpg` - Photos du parcours (1200x900, ratio 4:3)
- Voir `/public/gallery/README.md` pour les recommandations

### 3. Horaires et Paiement

```js
// Dans index.astro
schedule: {
  days: "Tous les jours",
  hours: "8h00 - 18h00",
  lastDeparture: "16h00",
  note: "Dernier départ à 16h pour profiter de la lumière"
},

payment: {
  methods: ["Cash (USD, LAK, THB)", "À l'hôtel"],
  note: "Paiement sur place uniquement"
},
```

### 4. Tarifs

Édite le tableau `pricing` dans `src/pages/index.astro` :

```js
pricing: [
  {
    name: "Solo / Couple",
    capacity: "1-2 personnes",
    price: "35",           // Ton prix
    currency: "USD",
    note: "Voiturette privée"
  },
  {
    name: "Famille / Amis",
    capacity: "3-4 personnes",
    price: "50",
    currency: "USD",
    note: "Voiturette privée",
    popular: true          // Badge "Populaire"
  },
  // ...
]
```

### 5. Contenu

Édite directement dans `src/pages/index.astro` :
- Texte de la section "L'expérience"
- Points forts du parcours
- Infos pratiques (point de départ, durée)

## 📱 Fonctionnalités incluses

- ✅ SEO optimisé (meta tags, Open Graph, Twitter Cards)
- ✅ Schema.org TouristTrip (rich snippets Google pour activités)
- ✅ Sitemap automatique
- ✅ **Double CTA** : bouton WhatsApp flottant + barre sticky au scroll
- ✅ Design responsive
- ✅ Badges visuels (durée, langues, type de transport)
- ✅ Galerie photos avec effet hover
- ✅ Section tarifs avec cartes et badge "Populaire"
- ✅ Témoignages clients
- ✅ FAQ accordéon (CSS only, pas de JS)
- ✅ Carte OpenStreetMap du parcours
- ✅ Horaires d'ouverture
- ✅ Mention "Paiement sur place" (multi-devises)
- ✅ Structure prête pour multi-tours
- ✅ Performance optimale (HTML statique, lazy loading images)

## 📞 Système de Call-to-Action

Le template utilise un **double système de CTA** pour maximiser les conversions :

1. **Bouton WhatsApp flottant** (toujours visible)
   - Position : coin inférieur droit
   - Discret mais accessible

2. **Barre sticky** (apparaît au scroll)
   - S'affiche après avoir scrollé le hero
   - Affiche le nom + prix de départ
   - Bouton "Réserver" proéminent

Sur mobile, le bouton flottant se masque quand la barre sticky est visible pour éviter la redondance.

Pour désactiver la barre sticky, supprimez le bloc `<!-- Barre CTA sticky -->` et le `<script>` associé dans `index.astro`.

## 🚐 Ajouter un nouveau tour

La structure est prévue pour gérer plusieurs tours facilement.

### Option 1 : Dupliquer la page (le plus simple)

```bash
# Copier la page existante
cp src/pages/index.astro src/pages/tour-sunset.astro
```

Puis modifier la config dans le nouveau fichier :
- `businessName`, `tagline`, `description`
- `duration`, `highlights`, `pricing`
- Créer un dossier `/public/gallery-sunset/` pour les photos

Le nouveau tour sera accessible sur `/tour-sunset`.

### Option 2 : Utiliser le template

Un fichier template est fourni : `src/pages/_template-tour.astro`

1. Copiez-le avec le nom de votre tour
2. Remplissez la config
3. Copiez le HTML de `index.astro`

### Activer la navigation multi-tours

Quand vous avez 2+ tours, activez le menu de navigation :

1. Dans `src/layouts/Layout.astro`, ajoutez :
```astro
---
import Navigation from '../components/Navigation.astro';
---
<body class="has-nav">
  <Navigation />
  <slot />
</body>
```

2. Dans `src/components/Navigation.astro`, listez vos tours :
```js
const tours = [
  { name: "Tour Historique", path: "/" },
  { name: "Tour Sunset", path: "/tour-sunset" },
  { name: "Tour Temples", path: "/tour-temples" },
];
```

## 🌐 Déploiement

### Cloudflare Pages (recommandé)
1. Push le code sur GitHub
2. Connecte le repo dans Cloudflare Pages
3. Build command: `npm run build`
4. Output directory: `dist`
5. Ajoute ton domaine custom

### GitHub Pages
1. Dans `astro.config.mjs`, ajoute :
```js
base: '/nom-du-repo/',  // Si pas de domaine custom
```
2. Utilise GitHub Actions pour déployer

### Hébergement classique (FTP)
```bash
npm run build
# Upload le contenu de /dist/ via FTP
```

## 🔧 Pour ton ami SEO

Structure déjà en place :
- Balises sémantiques (header, main, section, footer)
- H1 unique, hiérarchie H2/H3
- Meta description éditable
- Sitemap XML généré automatiquement
- Schema.org JSON-LD pour TouristTrip (activité touristique)
- URLs canoniques
- Images avec attributs alt et lazy loading
- FAQ structurée (potentiel rich snippet)

À optimiser ensuite :
- Textes et mots-clés (Luang Prabang, visite guidée, UNESCO, etc.)
- Google Search Console
- Google My Business (catégorie "Tour operator")
- Ajouter Schema.org FAQPage pour les rich snippets FAQ
