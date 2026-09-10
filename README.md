# Tutorya — première version locale

Vitrine française de tutorat académique pour les écoles d’ingénieurs, construite en HTML, CSS et JavaScript natif. Le **fil de progression B** est conservé dans une refonte premium déléguée : **bleu encre, blanc minéral, accents champagne, Libre Bodoni / Public Sans, sans photo**. Voir [la décision de refonte](docs/refonte-premium.md).

**Cette version est un aperçu, pas un site prêt à publier.** Le formulaire vérifie la saisie dans le navigateur, sans envoi ni stockage. La réservation est désactivée, les informations légales sont à compléter et l’indexation est volontairement bloquée.

## Consulter et travailler sur le site

Prérequis local : Node.js 22 ou supérieur. L’environnement a été vérifié avec Node.js 24.13.1 et npm 11.8.0.

1. Pour une nouvelle installation, exécuter `npm ci` à la racine du projet.
2. Dans VS Code, utiliser **Terminal → Exécuter la tâche → Tutorya : aperçu local**, ou `npm run dev`.
3. Consulter [l’aperçu local](http://127.0.0.1:4173/).
4. Modifier les sources, attendre le message de reconstruction, puis actualiser le navigateur. Il n’y a pas de rechargement automatique.
5. Arrêter le serveur avec **Ctrl+C** dans son terminal. Ne pas lancer deux aperçus sur le même port.

Après une modification des scripts de build ou des dépendances de polices, redémarrer le serveur. La surveillance recharge les sources du site, pas les modules Node déjà importés. Le script de capture refuse une réponse HTTP d’erreur et vérifie la police du titre avant de produire une preuve visuelle.

Node.js n’est nécessaire que pour les outils locaux. L’hébergement de la version statique ne nécessite aucun serveur Node.js, aucune base de données et aucun framework.

## Commandes disponibles

| Commande | Effet |
| --- | --- |
| `npm run dev` | Génère les fichiers et sert le site sur la machine locale ; surveille les sources |
| `npm run build` | Copie les pages, styles, scripts, polices et licences dans le dossier de sortie |
| `npm run preview` | Sert la dernière génération, sans reconstruire ni surveiller |
| `npm run check` | Vérifie la syntaxe JavaScript et les règles HTML |
| `npm run test:unit` | Vérifie le serveur local, ses routes et ses restrictions |
| `npm test` | Exécute les tests navigateur sur le port local 4174 ; générer le site auparavant |
| `npm run verify` | Enchaîne syntaxe, génération, tests serveur et tests navigateur |
| `node scripts/capture.mjs` | Capture ordinateur, tablette, mobile et thème sombre ; nécessite l’aperçu sur le port 4173 |

Les tests navigateur utilisent Chromium. Sur une nouvelle machine, installer le navigateur avec `npx playwright install chromium` après les dépendances.

## Où modifier les éléments

| Élément | Source |
| --- | --- |
| Textes, rubriques, formulaire de démonstration | [site/index.html](site/index.html) |
| Palette et polices | [site/assets/css/theme.css](site/assets/css/theme.css) |
| Mise en page et tailles d’écran | [site/assets/css/styles.css](site/assets/css/styles.css) |
| Menu, fil de lecture et validation locale | [site/assets/js/main.js](site/assets/js/main.js) |
| Choix clair/sombre sans stockage | [site/assets/js/theme.js](site/assets/js/theme.js) |
| Informations légales de travail | [site/mentions-legales.html](site/mentions-legales.html) |
| Notice de préversion | [site/confidentialite.html](site/confidentialite.html) |
| Page introuvable | [site/404.html](site/404.html) |
| Génération des fichiers statiques | [scripts/build.mjs](scripts/build.mjs) |
| Tâches VS Code | [.vscode/tasks.json](.vscode/tasks.json) |

Modifier les sources, **pas le dossier de sortie**, qui est entièrement régénéré à chaque build. Les polices sont copiées depuis les paquets locaux ; ouvrir directement les sources HTML ne charge pas leurs fichiers de police. Utiliser l’aperçu construit pour juger le design.

## Ce qui est présent

- Une page d’accueil : promesse, rôles école/apprenti/entreprise, quatre étapes, soutenances, équipe, FAQ et contact.
- Une navigation mobile progressive ; le contenu et la FAQ restent accessibles sans JavaScript.
- Des contrôles clavier, focus visibles, réduction des mouvements et prise en compte du thème de l’appareil.
- Un formulaire de démonstration avec erreurs par champ, résumé focalisé et résultat explicitement sans envoi.
- Cinq fichiers de polices auto-hébergés (Libre Bodoni normale/italique et Public Sans 400/500/600), sans Google Fonts, traceur ou calendrier embarqué.
- Des métadonnées de présentation, une véritable réponse 404 et des en-têtes de sécurité pour la préversion.

## Ce qui reste à fournir

1. Le nom définitif et les validations de marque/domaine.
2. Les coordonnées professionnelles et le destinataire réel du contact.
3. Les profils, spécialités et éventuelles références autorisées de l’équipe.
4. Le lien de réservation si cette option est conservée.
5. Les informations juridiques de l’éditeur et l’offre d’hébergement retenue.
6. La validation des textes et des modalités d’intervention, notamment pour les soutenances.

**Activer le formulaire ne consiste pas à changer son bouton.** Un traitement sécurisé, une validation côté serveur, une protection contre les abus, des informations de confidentialité adaptées et un test de réception réel sont nécessaires. Aucun de ces services n’est connecté dans cette version.

## Hostinger

Le dossier de sortie contient uniquement les fichiers destinés à un hébergement statique. **Ne pas déposer la racine du dépôt sur l’hébergement** : elle contient des documents internes, des outils et des dépendances.

Suivre [la checklist de mise en ligne](docs/mise-en-ligne.md) avant tout transfert. Aucune connexion Hostinger, aucun déploiement et aucun achat n’ont été effectués.

## Vérification et limites

Les tests fonctionnels couvrent 320, 390, 768, 1024 et 1440 px, la navigation clavier, la FAQ, les liens, le formulaire, l’absence d’envoi, le fonctionnement sans JavaScript et les thèmes. Axe contrôle plusieurs pages et états ; cela ne remplace pas un audit humain complet d’accessibilité.

Deux tests de liens symboliques de fichiers peuvent être ignorés sur Windows si leur création nécessite des permissions supplémentaires. Les autres protections du serveur restent testées ; aucune élévation n’est demandée.

Le contrôle automatique de style Impeccable a fonctionné en mode dégradé faute de modules d’analyse disponibles dans son installation. Son résultat n’est pas présenté comme un audit complet. La revue indépendante du design a été réalisée par un agent généraliste suivant les consignes de revue, les agents Impeccable spécialisés n’étant pas exposés dans cette session.

Voir [le rapport de vérification](docs/verification.md) pour le résultat final de cette version.