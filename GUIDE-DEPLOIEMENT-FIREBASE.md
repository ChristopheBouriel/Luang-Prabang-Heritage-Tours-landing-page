# Guide Complet : Déployer un site Astro sur Firebase Hosting

> **Contexte** : Le code est sur le GitHub de Christophe, le compte Google/Firebase et le nom de domaine appartiennent aux amis.

---

## Table des matières

1. [Vue d'ensemble des options](#vue-densemble-des-options)
2. [Option A : Déploiement automatique via GitHub Actions (Recommandé)](#option-a--déploiement-automatique-via-github-actions-recommandé)
3. [Option B : Déploiement manuel](#option-b--déploiement-manuel)
4. [Configuration du domaine personnalisé](#configuration-du-domaine-personnalisé)
5. [Tarification Firebase Hosting](#tarification-firebase-hosting)
6. [Dépannage](#dépannage)
7. [Sources](#sources)

---

## Vue d'ensemble des options

### Deux approches possibles

| Aspect | Option A : GitHub Actions | Option B : Manuel |
|--------|---------------------------|-------------------|
| **Automatisation** | ✅ Déploiement auto à chaque push | ❌ Commande manuelle |
| **Prérequis** | GitHub + Firebase liés | Firebase CLI local |
| **Idéal pour** | Mises à jour fréquentes | Déploiement ponctuel |
| **Complexité initiale** | Moyenne | Faible |
| **Maintenance** | Aucune | Action manuelle requise |

### Ce dont vous aurez besoin

- ✅ Un compte Google (celui des amis)
- ✅ Un nom de domaine (déjà réservé via Google → maintenant Squarespace Domains)
- ✅ Accès au repository GitHub (celui de Christophe)
- ✅ Node.js installé localement (pour la configuration initiale)

---

## Option A : Déploiement automatique via GitHub Actions (Recommandé)

Cette option configure un déploiement automatique : à chaque fois que du code est poussé sur la branche `main`, le site se met à jour automatiquement.

### Étape 1 : Créer un projet Firebase

1. **Aller sur la console Firebase**
   - Se rendre sur [https://console.firebase.google.com/](https://console.firebase.google.com/)
   - Se connecter avec le **compte Google des amis**

2. **Créer un nouveau projet**
   - Cliquer sur **"Ajouter un projet"** (ou "Create a project")
   - Nom du projet : `lpb-heritage-tour` (ou autre nom descriptif)
   - Google Analytics : optionnel (peut être désactivé pour simplifier)
   - Cliquer sur **"Créer le projet"**

3. **Attendre la création** (environ 30 secondes)

### Étape 2 : Activer Firebase Hosting

1. Dans le menu de gauche, cliquer sur **"Build"** → **"Hosting"**
2. Cliquer sur **"Get started"** / **"Commencer"**
3. Suivre l'assistant jusqu'à la fin (on configurera les détails après)

### Étape 3 : Installer Firebase CLI (sur l'ordinateur de Christophe)

Ouvrir un terminal et exécuter :

```bash
# Installation globale de Firebase CLI
npm install -g firebase-tools

# Vérifier l'installation
firebase --version
```

### Étape 4 : Connecter Firebase au compte Google des amis

**Important** : Cette étape doit être faite avec les identifiants du compte des amis.

```bash
# Se déconnecter d'un éventuel compte existant
firebase logout

# Se connecter avec le compte Google des amis
firebase login
```

Une fenêtre de navigateur s'ouvrira → se connecter avec le **compte Google des amis**.

### Étape 5 : Initialiser Firebase dans le projet

Dans le dossier du projet (`landing-template/`) :

```bash
cd /chemin/vers/landing-template

# Initialiser Firebase Hosting
firebase init hosting
```

**Réponses à donner lors de l'assistant** :

1. **"Please select an option"** → `Use an existing project`
2. **Sélectionner** → `lpb-heritage-tour` (le projet créé à l'étape 1)
3. **"What do you want to use as your public directory?"** → `dist`
4. **"Configure as a single-page app?"** → `No`
5. **"Set up automatic builds and deploys with GitHub?"** → `Yes` ✅

### Étape 6 : Configurer GitHub Actions

L'assistant continue avec la configuration GitHub :

1. **"For which GitHub repository would you like to set up a GitHub workflow?"**
   - Entrer : `username/landing-template` (remplacer `username` par le nom d'utilisateur GitHub de Christophe)

2. **"Set up the workflow to run a build script before every deploy?"** → `Yes`
   - **"What script should be run before every deploy?"** → `npm ci && npm run build`

3. **"Set up automatic deployment to your site's live channel when a PR is merged?"** → `Yes`
   - **"What is the name of the GitHub branch associated with your site's live channel?"** → `main`

Firebase va automatiquement :
- Créer un compte de service dans Firebase
- Ajouter un secret `FIREBASE_SERVICE_ACCOUNT` dans le repository GitHub
- Créer deux fichiers workflow dans `.github/workflows/`

### Étape 7 : Vérifier les fichiers créés

Deux fichiers ont été créés :

**`.github/workflows/firebase-hosting-pull-request.yml`** (déploiement preview sur PR) :
```yaml
name: Deploy to Firebase Hosting on PR
on: pull_request

jobs:
  build_and_preview:
    if: ${{ github.event.pull_request.head.repo.full_name == github.repository }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT_LPB_HERITAGE_TOUR }}
          projectId: lpb-heritage-tour
```

**`.github/workflows/firebase-hosting-merge.yml`** (déploiement production) :
```yaml
name: Deploy to Firebase Hosting on merge
on:
  push:
    branches:
      - main

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT_LPB_HERITAGE_TOUR }}
          channelId: live
          projectId: lpb-heritage-tour
```

### Étape 8 : Pousser les modifications

```bash
git add .
git commit -m "feat: add Firebase Hosting configuration"
git push origin main
```

Le déploiement se lance automatiquement ! Vérifier dans l'onglet **Actions** du repository GitHub.

### Étape 9 : Vérifier le déploiement

1. Aller sur [Firebase Console](https://console.firebase.google.com/) → Hosting
2. L'URL du site apparaît : `https://lpb-heritage-tour.web.app`
3. Le site est en ligne ! 🎉

---

## Option B : Déploiement manuel

Pour un déploiement ponctuel sans automatisation.

### Étape 1 : Installer Firebase CLI

```bash
npm install -g firebase-tools
```

### Étape 2 : Se connecter (avec le compte des amis)

```bash
firebase logout
firebase login
```

### Étape 3 : Initialiser le projet

```bash
cd /chemin/vers/landing-template
firebase init hosting
```

Réponses :
- Public directory : `dist`
- Single-page app : `No`
- GitHub Actions : `No` (cette fois)

### Étape 4 : Build et déploiement

```bash
# Générer le build de production
npm run build

# Déployer sur Firebase
firebase deploy
```

### Étape 5 : Vérifier

Le terminal affiche l'URL : `https://votre-projet.web.app`

### Pour les prochaines mises à jour

Répéter simplement :

```bash
npm run build
firebase deploy
```

---

## Configuration du domaine personnalisé

Une fois le site déployé sur Firebase, connecter le domaine réservé.

### Étape 1 : Ajouter le domaine dans Firebase

1. Aller sur [Firebase Console](https://console.firebase.google.com/) → **Hosting**
2. Cliquer sur **"Add custom domain"** / **"Ajouter un domaine personnalisé"**
3. Entrer le nom de domaine : `www.votredomaine.com`
4. Cocher éventuellement la redirection du domaine apex (`votredomaine.com` → `www.votredomaine.com`)
5. Cliquer sur **"Continue"**

### Étape 2 : Vérifier la propriété du domaine

Firebase affiche un **enregistrement TXT** à ajouter :

| Type | Host | Valeur |
|------|------|--------|
| TXT | @ | `firebase-site-verification=xxxxxxxxxxxxx` |

### Étape 3 : Configurer les DNS sur Squarespace Domains

> **Note** : Les domaines Google Domains ont été migrés vers Squarespace Domains en 2023.

1. **Accéder aux paramètres DNS**
   - Aller sur [https://domains.squarespace.com/](https://domains.squarespace.com/)
   - Se connecter avec le compte Google des amis
   - Cliquer sur le nom de domaine
   - Cliquer sur **"DNS"** → **"DNS Settings"**

2. **Ajouter l'enregistrement TXT (vérification)**
   - Défiler jusqu'à **"Custom Records"**
   - Cliquer sur **"Add record"**
   - Type : **TXT**
   - Host : **@**
   - Data/Value : coller la valeur donnée par Firebase
   - Cliquer sur **"Save"**

3. **Retourner sur Firebase et cliquer "Verify"**
   - Attendre quelques minutes (parfois jusqu'à 48h, mais souvent < 1h)

### Étape 4 : Ajouter les enregistrements A

Après vérification, Firebase affiche deux adresses IP :

| Type | Host | Valeur |
|------|------|--------|
| A | @ | `151.101.1.195` |
| A | @ | `151.101.65.195` |

**Dans Squarespace Domains** :

1. Supprimer les enregistrements A existants (s'il y en a)
2. Ajouter les deux enregistrements A avec les IP Firebase :
   - Type : **A**
   - Host : **@**
   - Data : première IP (`151.101.1.195`)
   - Répéter pour la seconde IP

3. Ajouter un enregistrement pour `www` :
   - Type : **CNAME**
   - Host : **www**
   - Data : `lpb-heritage-tour.web.app` (votre domaine Firebase)

### Étape 5 : Attendre la propagation

- Les changements DNS peuvent prendre **jusqu'à 48 heures**
- En pratique, souvent **< 1 heure**
- Firebase provisionne automatiquement un **certificat SSL** (HTTPS)

### Étape 6 : Vérifier

1. Retourner sur Firebase Console → Hosting
2. Le domaine doit afficher **"Connected"** avec un cadenas vert
3. Tester : `https://www.votredomaine.com`

---

## Tarification Firebase Hosting

### Plan Gratuit (Spark Plan) - Suffisant pour ce projet

| Ressource | Limite gratuite |
|-----------|-----------------|
| **Stockage** | 10 Go |
| **Transfert de données** | 10 Go / mois |
| **Domaines personnalisés** | Illimité |
| **SSL/HTTPS** | Inclus |
| **CDN global** | Inclus |

> **Pour un site vitrine comme LPB Heritage Tour, le plan gratuit est largement suffisant.**

### Plan Blaze (Pay-as-you-go)

Si dépassement des limites gratuites :
- Stockage : **0,026 $ / Go**
- Transfert : **0,15 $ / Go**

### Estimation pour ce projet

- Taille du site après build : ~5 Mo
- Visiteurs estimés : 1000/mois × 5 Mo = 5 Go de transfert
- **Coût : 0 € / mois** ✅

---

## Dépannage

### Le déploiement GitHub Actions échoue

1. Vérifier que le secret `FIREBASE_SERVICE_ACCOUNT_xxx` existe dans les settings du repo GitHub
2. Aller dans le repo → **Settings** → **Secrets and variables** → **Actions**
3. Le secret doit être présent

### Le domaine personnalisé reste en "Pending"

1. Vérifier que les enregistrements DNS sont corrects
2. Supprimer tout enregistrement A, AAAA ou CNAME conflictuel
3. Attendre 24-48h
4. Si toujours bloqué : supprimer le domaine dans Firebase et le rajouter

### Erreur "Permission denied" lors de `firebase deploy`

```bash
firebase logout
firebase login
# Se reconnecter avec le BON compte Google (celui des amis)
```

### Le site affiche une ancienne version

Firebase garde un historique des versions. Pour forcer un nouveau déploiement :

```bash
npm run build
firebase deploy --only hosting
```

### Erreur SSL / certificat

- Attendre que Firebase provisionne le certificat (peut prendre quelques heures)
- Vérifier qu'aucun enregistrement DNS ne bloque (CAA records)

---

## Checklist finale

### Configuration initiale
- [ ] Projet Firebase créé (compte des amis)
- [ ] Firebase Hosting activé
- [ ] Firebase CLI installé
- [ ] Connecté au bon compte Google
- [ ] `firebase init hosting` exécuté
- [ ] Fichiers `.github/workflows/` créés
- [ ] Premier déploiement réussi

### Domaine personnalisé
- [ ] Domaine ajouté dans Firebase Console
- [ ] Enregistrement TXT ajouté (Squarespace)
- [ ] Domaine vérifié dans Firebase
- [ ] Enregistrements A ajoutés (2 IP)
- [ ] Enregistrement CNAME www ajouté
- [ ] SSL provisionné (cadenas vert)
- [ ] Site accessible via le domaine personnalisé

---

## Sources

### Documentation officielle Firebase
- [Deploy to live & preview channels via GitHub pull requests](https://firebase.google.com/docs/hosting/github-integration)
- [Connect a custom domain - Firebase Hosting](https://firebase.google.com/docs/hosting/custom-domain)
- [Firebase Hosting Pricing](https://firebase.google.com/docs/hosting/usage-quotas-pricing)
- [Firebase Pricing Plans](https://firebase.google.com/docs/projects/billing/firebase-pricing-plans)

### Documentation Squarespace Domains
- [Accessing your Squarespace-managed domain's DNS settings](https://support.squarespace.com/hc/en-us/articles/205812348-Accessing-your-Squarespace-managed-domain-s-DNS-settings)
- [Adding DNS records to your domain](https://support.squarespace.com/hc/en-us/articles/360002101888-Adding-DNS-records-to-your-domain)

### GitHub Actions
- [Deploy to Firebase Hosting - GitHub Marketplace](https://github.com/marketplace/actions/deploy-to-firebase-hosting)
- [Deploying to Firebase using Github actions](https://www.elian.codes/blog/22-08-10-deploy-firebase-using-github-actions/)

### Tutoriels complémentaires
- [Using GitHub Actions to deploy a static site to Firebase](https://nbellocam.dev/blog/github-actions-firebase-site)
- [Connecting Custom Domain To Website Hosted On Firebase - GeeksforGeeks](https://www.geeksforgeeks.org/firebase/connecting-custom-domain-to-website-hosted-on-firebase/)

---

*Guide créé le 3 janvier 2026 - LPB Heritage Tour*
