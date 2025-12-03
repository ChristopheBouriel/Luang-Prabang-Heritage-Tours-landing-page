# Photos de la galerie

Ajoutez vos photos ici avec les noms suivants :
- photo1.jpg
- photo2.jpg
- photo3.jpg
- photo4.jpg
- photo5.jpg
- photo6.jpg

## Recommandations

- **Format** : JPG ou WebP
- **Dimensions** : 1200x900 px minimum (ratio 4:3)
- **Taille** : < 500 Ko par image (compresser avec TinyPNG ou Squoosh)
- **Contenu suggéré** :
  - La voiturette électrique
  - Temples (Wat Xieng Thong, Wat Mai, etc.)
  - Vues sur le Mékong / Nam Khan
  - Architecture coloniale
  - Clients en visite (avec leur accord)

## Pour modifier les photos

Éditez le tableau `gallery` dans `src/pages/index.astro` :

```js
gallery: [
  { src: "/gallery/photo1.jpg", alt: "Description pour le SEO" },
  // ...
]
```

N'oubliez pas de renseigner des `alt` descriptifs pour le référencement !
