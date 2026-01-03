# Procédure de Déploiement - Pour Christophe

> Connecter ton repo GitHub au compte Firebase de tes amis pour un déploiement automatique.

---

## Prérequis

### Ce que TU dois avoir :
- [x] Node.js installé
- [x] Firebase CLI installé (`npm install -g firebase-tools`)
- [x] Accès admin à ton repo GitHub

### Ce que TES AMIS doivent avoir :
- [ ] Un compte Google
- [ ] Leur nom de domaine (via Squarespace Domains, ex-Google Domains)

---

## Phase 1 : Préparation avec tes amis

### Étape 1.1 : Créer le projet Firebase (ENSEMBLE ou eux seuls)

**Option A : Tu le fais avec eux (visio/en personne)**

1. Aller sur https://console.firebase.google.com/
2. Se connecter avec **leur compte Google**
3. Cliquer **"Créer un projet"**
4. Nom du projet : `lpb-heritage-tour` (ou autre)
5. Google Analytics : **Désactiver** (simplifie les choses)
6. Attendre la création (~30 sec)
7. Dans le menu gauche : **Build** → **Hosting** → **Get started**
8. Suivre l'assistant jusqu'au bout (juste cliquer Next)

**Option B : Ils le font seuls**

Leur envoyer ces instructions :
```
1. Va sur https://console.firebase.google.com/
2. Connecte-toi avec ton compte Google
3. Clique "Créer un projet"
4. Nom : lpb-heritage-tour
5. Désactive Google Analytics
6. Une fois créé, va dans Build → Hosting → Get started
7. Clique Next jusqu'à la fin
8. Dis-moi quand c'est fait !
```

### Étape 1.2 : Obtenir l'accès à leur projet Firebase

**Option A : Ils t'ajoutent comme collaborateur (RECOMMANDÉ)**

Leur envoyer :
```
1. Va sur https://console.firebase.google.com/
2. Clique sur le projet lpb-heritage-tour
3. Clique sur l'engrenage ⚙️ → "Utilisateurs et autorisations"
4. Clique "Ajouter un membre"
5. Entre mon email : [TON_EMAIL]
6. Rôle : "Éditeur"
7. Clique "Ajouter"
```

**Option B : Session de connexion partagée**

Tu te connectes directement avec leurs identifiants (moins sécurisé, mais plus simple si tu es avec eux).

---

## Phase 2 : Configuration sur ton ordinateur

### Étape 2.1 : Se connecter au bon compte Firebase

```bash
# Se déconnecter de ton compte actuel
firebase logout

# Se connecter
firebase login
```

**Si Option A (collaborateur)** : utilise TON compte Google (celui qu'ils ont ajouté)

**Si Option B (leurs identifiants)** : utilise LEUR compte Google

### Étape 2.2 : Vérifier l'accès au projet

```bash
firebase projects:list
```

Tu dois voir `lpb-heritage-tour` (ou le nom choisi) dans la liste.

### Étape 2.3 : Initialiser Firebase dans le projet

```bash
cd /Users/christophebouriel/Documents/LPB\ heritage\ tour/landing-template

firebase init hosting
```

**Réponses à donner :**

| Question | Réponse |
|----------|---------|
| "Please select an option" | `Use an existing project` |
| Sélectionner le projet | `lpb-heritage-tour` |
| "What do you want to use as your public directory?" | `dist` |
| "Configure as a single-page app?" | `No` |
| "Set up automatic builds and deploys with GitHub?" | `Yes` |

### Étape 2.4 : Configurer GitHub Actions

L'assistant continue :

| Question | Réponse |
|----------|---------|
| "For which GitHub repository?" | `ChristopheBouriel/luang-prabang-heritage-tours` |
| "Set up the workflow to run a build script?" | `Yes` |
| "What script should be run?" | `npm ci && npm run build` |
| "Set up automatic deployment when PR is merged?" | `Yes` |
| "What branch for live channel?" | `main` |

**Ce qui se passe automatiquement :**
- Firebase crée un Service Account
- Le secret est ajouté à ton repo GitHub
- Deux fichiers workflow sont créés dans `.github/workflows/`

### Étape 2.5 : Vérifier les fichiers créés

```bash
ls -la .github/workflows/
```

Tu dois voir :
- `firebase-hosting-merge.yml` (déploiement sur push main)
- `firebase-hosting-pull-request.yml` (preview sur PR)

---

## Phase 3 : Premier déploiement

### Étape 3.1 : Commit et push

```bash
git add .
git commit -m "feat: add Firebase Hosting deployment"
git push origin main
```

### Étape 3.2 : Vérifier le déploiement

1. Aller sur ton repo GitHub → onglet **Actions**
2. Tu dois voir un workflow en cours d'exécution
3. Attendre qu'il passe au vert (2-3 minutes)

### Étape 3.3 : Vérifier le site en ligne

1. Aller sur https://console.firebase.google.com/ (avec le compte qui a accès)
2. Projet `lpb-heritage-tour` → **Hosting**
3. L'URL apparaît : `https://lpb-heritage-tour.web.app`

---

## Phase 4 : Connecter le domaine personnalisé

### Étape 4.1 : Ajouter le domaine dans Firebase

1. Firebase Console → Hosting → **"Ajouter un domaine personnalisé"**
2. Entrer : `www.leurdomaine.com`
3. Cocher la redirection du domaine apex si proposé
4. Cliquer **Continue**

### Étape 4.2 : Noter les enregistrements DNS

Firebase affiche :

**Pour la vérification (TXT) :**
| Type | Host | Valeur |
|------|------|--------|
| TXT | @ | `firebase-site-verification=xxxxxx` |

**Pour le site (A records) :**
| Type | Host | Valeur |
|------|------|--------|
| A | @ | `151.101.1.195` |
| A | @ | `151.101.65.195` |

### Étape 4.3 : Configurer les DNS (tes amis doivent faire ça)

Leur envoyer :
```
1. Va sur https://domains.squarespace.com/
2. Connecte-toi et clique sur ton domaine
3. Va dans DNS → DNS Settings
4. Dans "Custom Records", ajoute :

   ENREGISTREMENT 1 (vérification) :
   - Type : TXT
   - Host : @
   - Data : [VALEUR_TXT_DE_FIREBASE]

   ENREGISTREMENT 2 (site) :
   - Type : A
   - Host : @
   - Data : 151.101.1.195

   ENREGISTREMENT 3 (site) :
   - Type : A
   - Host : @
   - Data : 151.101.65.195

   ENREGISTREMENT 4 (www) :
   - Type : CNAME
   - Host : www
   - Data : lpb-heritage-tour.web.app

5. Supprime les anciens enregistrements A s'il y en a
6. Sauvegarde et attends 1-24h
```

### Étape 4.4 : Finaliser dans Firebase

1. Retourner sur Firebase Console → Hosting
2. Cliquer **"Verify"** à côté du domaine
3. Attendre que le statut passe à **"Connected"**
4. Le SSL se provisionne automatiquement (peut prendre quelques heures)

---

## Phase 5 : Mises à jour futures

### Pour toi (développeur)

À chaque modification :
```bash
# Modifier le code
git add .
git commit -m "fix: description du changement"
git push origin main
# → Déploiement automatique !
```

### Pour tes amis

Ils n'ont **RIEN à faire**. Le site se met à jour automatiquement.

---

## Récapitulatif des actions

### Toi
- [ ] Te faire ajouter comme collaborateur sur leur Firebase (ou utiliser leurs identifiants)
- [ ] `firebase logout` puis `firebase login`
- [ ] `firebase init hosting` dans le projet
- [ ] Configurer GitHub Actions
- [ ] Commit et push
- [ ] Vérifier le déploiement sur GitHub Actions
- [ ] Ajouter le domaine personnalisé dans Firebase
- [ ] Envoyer les instructions DNS à tes amis

### Tes amis
- [ ] Créer le projet Firebase
- [ ] T'ajouter comme collaborateur (ou te donner accès)
- [ ] Configurer les DNS sur Squarespace Domains
- [ ] Attendre la propagation (1-24h)

---

## Dépannage

### "Permission denied" lors de `firebase init`
```bash
firebase logout
firebase login
# Vérifier : firebase projects:list
```

### GitHub Actions échoue
1. Vérifier les logs dans l'onglet Actions
2. Le secret `FIREBASE_SERVICE_ACCOUNT_xxx` doit exister dans Settings → Secrets

### Domaine reste en "Pending"
- Vérifier les DNS avec https://dnschecker.org/
- Supprimer et re-ajouter le domaine dans Firebase
- Attendre 24-48h

### SSL ne se provisionne pas
- Vérifier qu'il n'y a pas de CAA record bloquant
- Supprimer tout enregistrement AAAA existant

---

## Commandes utiles

```bash
# Voir les projets Firebase accessibles
firebase projects:list

# Déployer manuellement (sans GitHub Actions)
npm run build && firebase deploy

# Voir l'historique des déploiements
firebase hosting:channel:list

# Ouvrir le site déployé
firebase open hosting:site
```

---

## Timeline estimée

| Étape | Durée |
|-------|-------|
| Création projet Firebase | 5 min |
| Configuration `firebase init` | 10 min |
| Premier déploiement | 5 min |
| Configuration DNS | 10 min |
| Propagation DNS | 1-24h |
| Provisionnement SSL | 1-2h |

**Total actif : ~30 minutes**
**Attente passive : 1-24 heures**

---

*Procédure créée le 3 janvier 2026*
