# Checklist SEO Complète - LPB Heritage Tour

> Liste exhaustive de tout ce qu'il faut modifier/remplir/vérifier pour un SEO optimum.

---

## 1. Configuration du domaine

### `astro.config.mjs`
| Élément | Valeur actuelle | À remplacer par |
|---------|-----------------|-----------------|
| `site` | `'https://ton-domaine.com'` | URL définitive du site (ex: `'https://luangprabang-tours.com'`) |

### `public/robots.txt`
| Élément | Valeur actuelle | À remplacer par |
|---------|-----------------|-----------------|
| Sitemap URL | `https://ton-domaine.com/sitemap-index.xml` | URL définitive + `/sitemap-index.xml` |

---

## 2. Layout.astro - Informations business (Schema.org)

**Fichier** : `src/layouts/Layout.astro` (lignes 12-24)

| Champ | Valeur actuelle | À remplacer par | Impact SEO |
|-------|-----------------|-----------------|------------|
| `name` | `"Nom du Service de Visite"` | Nom officiel de l'entreprise | Google My Business, recherches locales |
| `description` | `"Visite audio-guidée..."` | Description courte (150-160 caractères) | Snippets Google |
| `phone` | `"+856XXXXXXXXX"` | Numéro de téléphone réel | Click-to-call, SEO local |
| `whatsapp` | `"856XXXXXXXXX"` | Numéro WhatsApp (sans +) | Bouton flottant WhatsApp |
| `address` | `"Point de départ..."` | Adresse exacte du point de départ | SEO local, Maps |
| `facebook` | `"https://www.facebook.com/ta-page"` | URL de la page Facebook | Liens sociaux Schema.org |
| `latitude` | `"19.8856"` | Latitude GPS exacte | Géolocalisation |
| `longitude` | `"102.1347"` | Longitude GPS exacte | Géolocalisation |
| `priceRange` | `"$$"` | Fourchette de prix (`$`, `$$`, `$$$`) | Snippets enrichis |
| `duration` | `"PT2H"` | Durée ISO 8601 (`PT1H` = 1h, `PT1H30M` = 1h30) | Rich snippets |
| `availableLanguages` | `["French", "English", "Lao"]` | Liste des langues audio | Filtres de recherche |

### Langue du document
| Élément | Valeur actuelle | À vérifier |
|---------|-----------------|------------|
| `<html lang="fr">` | `fr` | Changer en `en` si site principalement anglais |

---

## 3. index.astro - Contenu de la page

**Fichier** : `src/pages/index.astro`

### Configuration principale (lignes 5-131)

| Champ | Impact SEO | Recommandations |
|-------|------------|-----------------|
| `businessName` | Titre H1, balise title | Nom exact de l'entreprise |
| `tagline` | Sous-titre hero | Contenir mots-clés principaux |
| `description` | Meta description | 150-160 caractères, mots-clés, call-to-action |
| `whatsapp` | - | Numéro sans le `+` |
| `facebookUrl` | Backlinks sociaux | URL complète de la page |

### Textes à optimiser pour les mots-clés

| Section | Éléments | Mots-clés à inclure |
|---------|----------|---------------------|
| Hero | `tagline` | "Luang Prabang", "heritage tour", "electric buggy" |
| About | `about-intro`, `about-audio` | "UNESCO", "guided tour", "audio guide", "temples" |
| Highlights | `text[]` pour chaque item | Noms des monuments, lieux historiques |
| FAQ | Questions et réponses | Questions naturelles que les touristes posent |

### Images - Attributs alt (SEO images)

| Image | Alt actuel | Recommandation |
|-------|-----------|----------------|
| Logo | `"Luang Prabang Heritage Tours"` | ✅ OK |
| Map | `"Tour route map..."` | ✅ OK - descriptif |
| Casque | `"Audio guide headphones"` | ✅ OK |
| Highlights | `{item.text[0]}` | Vérifier que chaque texte est descriptif |
| Gallery | `""` (vide) | ⚠️ **À REMPLIR** - décrire chaque photo |
| Drapeaux | `"English"`, `"Français"`, etc. | ✅ OK |

---

## 4. Images requises dans `/public/`

### Images obligatoires

| Fichier | Dimensions recommandées | Usage |
|---------|------------------------|-------|
| `/og-image.jpg` | 1200×630 px | Partage Facebook/LinkedIn |
| `/favicon.svg` | 32×32 ou vectoriel | Onglet navigateur |
| `/gallery/banner.jpg` | 1920×1080 px min | Image hero |
| `/gallery/logo.jpg` | 500×500 px | Logo dans le hero |

### Optimisation des images

- [ ] Compresser toutes les images (TinyPNG, Squoosh)
- [ ] Utiliser WebP si possible (fallback JPG)
- [ ] Noms de fichiers descriptifs : `luang-prabang-temple-wat-xieng-thong.jpg`
- [ ] Taille max recommandée : 200-300 Ko par image

---

## 5. Fichiers SEO à créer/vérifier

### `/public/favicon.svg` ou `/public/favicon.ico`
- [ ] Favicon créé avec le logo
- [ ] Tester sur différents navigateurs

### `/public/og-image.jpg`
- [ ] Image attractive pour partage social
- [ ] Dimensions : 1200×630 px
- [ ] Inclure logo + texte accrocheur

### Sitemap (généré automatiquement)
- [ ] Vérifier après build : `/dist/sitemap-index.xml`
- [ ] Soumettre à Google Search Console

---

## 6. Actions post-déploiement

### Google Search Console
1. [ ] Créer un compte/propriété pour le domaine
2. [ ] Vérifier la propriété (DNS ou fichier HTML)
3. [ ] Soumettre le sitemap : `https://votredomaine.com/sitemap-index.xml`
4. [ ] Demander l'indexation de la page principale

### Google My Business
1. [ ] Créer/revendiquer la fiche entreprise
2. [ ] Remplir toutes les informations :
   - [ ] Nom de l'entreprise
   - [ ] Adresse exacte
   - [ ] Numéro de téléphone
   - [ ] Horaires d'ouverture
   - [ ] Catégorie : "Tour Operator" ou "Tourist Attraction"
   - [ ] Photos de qualité
   - [ ] Lien vers le site web
3. [ ] Répondre aux avis

### Réseaux sociaux
- [ ] Lien vers le site sur la page Facebook
- [ ] Partager le site sur les réseaux
- [ ] Encourager les avis Google (lien déjà présent sur le site)

---

## 7. Contenu à enrichir pour le SEO

### Textes des témoignages
- [ ] Ajouter des vrais avis (avec autorisation)
- [ ] Varier les nationalités
- [ ] Inclure des mots-clés naturellement

### FAQ
Questions recommandées à ajouter :
- [ ] "What is the best time to visit Luang Prabang?"
- [ ] "Is the tour wheelchair accessible?"
- [ ] "Can I book a tour in [langue] ?"
- [ ] "What should I bring for the tour?"

### Descriptions gallery (attributs alt)
Pour chaque image dans `config.gallery[]`, remplir le champ `alt` :
```javascript
{ src: "/gallery/photo_4.jpg", alt: "Electric buggy tour near Nam Khan river" },
{ src: "/gallery/photo_5.jpg", alt: "Traditional Lao temple during heritage tour" },
// etc.
```

---

## 8. Performance (impact SEO indirect)

### Vérifications Lighthouse
- [ ] Score Performance > 90
- [ ] Score Accessibility > 90
- [ ] Score Best Practices > 90
- [ ] Score SEO > 90

### Optimisations déjà en place
- ✅ Lazy loading des images
- ✅ Preconnect Google Fonts
- ✅ HTML compressé
- ✅ CSS scopé (pas de fichiers externes lourds)

### À vérifier
- [ ] Temps de chargement < 3 secondes
- [ ] Pas de ressources bloquantes
- [ ] Images correctement dimensionnées

---

## 9. Checklist technique finale

### Avant déploiement
- [ ] `astro.config.mjs` : domaine mis à jour
- [ ] `robots.txt` : URL sitemap correcte
- [ ] `Layout.astro` : toutes les infos business remplies
- [ ] `index.astro` : config complète
- [ ] Images : toutes présentes et optimisées
- [ ] `og-image.jpg` : créé et présent
- [ ] `favicon.svg` : créé et présent
- [ ] Build sans erreur : `npm run build`

### Après déploiement
- [ ] Site accessible via HTTPS
- [ ] Pas de page 404
- [ ] Sitemap accessible : `https://domaine.com/sitemap-index.xml`
- [ ] robots.txt accessible : `https://domaine.com/robots.txt`
- [ ] Test partage Facebook (Facebook Debugger)
- [ ] Test partage Twitter (Twitter Card Validator)
- [ ] Soumission Google Search Console
- [ ] Création/mise à jour Google My Business

---

## 10. Outils de vérification

| Outil | URL | Usage |
|-------|-----|-------|
| Google Search Console | https://search.google.com/search-console | Indexation, erreurs |
| Google PageSpeed Insights | https://pagespeed.web.dev/ | Performance |
| Facebook Debugger | https://developers.facebook.com/tools/debug/ | Aperçu partage FB |
| Twitter Card Validator | https://cards-dev.twitter.com/validator | Aperçu partage Twitter |
| Schema.org Validator | https://validator.schema.org/ | Vérifier JSON-LD |
| Rich Results Test | https://search.google.com/test/rich-results | Tester les snippets enrichis |
| Mobile-Friendly Test | https://search.google.com/test/mobile-friendly | Compatibilité mobile |

---

## Résumé des priorités

### Priorité 1 - Obligatoire
1. Mettre le bon domaine dans `astro.config.mjs` et `robots.txt`
2. Remplir `businessInfo` dans `Layout.astro`
3. Créer `og-image.jpg` et `favicon.svg`
4. Soumettre à Google Search Console

### Priorité 2 - Important
5. Remplir les attributs `alt` des images gallery
6. Créer/optimiser la fiche Google My Business
7. Vérifier les scores Lighthouse

### Priorité 3 - Amélioration continue
8. Ajouter des vrais témoignages
9. Enrichir la FAQ
10. Obtenir des backlinks (TripAdvisor, blogs voyage, etc.)

---

*Checklist créée le 3 janvier 2026*
