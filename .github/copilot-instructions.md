# Tutelia — instructions de projet

- [x] Verify that the copilot-instructions.md file in the .github directory is created.
- [x] Clarify Project Requirements — HTML/CSS/JavaScript, direction B validée, première version locale autorisée le 2026-09-09.
- [x] Scaffold the Project — sources publiques site/, scripts Node locaux, package verrouillé et tests.
- [x] Customize the Project — fil B conservé, refonte premium encre/minéral/champagne sans photo ; accueil, pages légales de travail, formulaire de démonstration et navigation progressive.
- [x] Install Required Extensions — aucune extension supplémentaire nécessaire.
- [x] Compile the Project — HTML et JavaScript validés ; build statique ; 30 tests navigateur passent après la passe de lecture. Tests serveur : 16 passent, 2 ignorés faute de droit de création de symlinks Windows.
- [x] Create and Run Task — tâches créées ; le lancement automatique a échoué, aperçu démarré avec la même commande dans un terminal.
- [x] Launch the Project — aperçu local sur 127.0.0.1:4173, sans publication ni débogueur.
- [x] Ensure Documentation is Complete — README, système de design premium, rapport de vérification et checklist Hostinger disponibles. Revue indépendante : SHIP au périmètre de la préversion locale.

## Règles du projet

- Lire PRODUCT.md et docs/refonte-premium.md. Le fil de progression B est conservé, mais le rendu initial a été rejeté au profit de la refonte premium déléguée le 2026-09-09. Ne pas restaurer l’ancienne palette.
- Site vitrine français pour des écoles d’ingénieurs. Service humain de tutorat académique, pas plateforme étudiante.
- Conserver HTML sémantique, CSS et JavaScript natif ; aucune dépendance JavaScript livrée au navigateur.
- Utiliser les variables --cp-* avec la nouvelle palette bleu encre / blanc minéral / champagne. Typographie de refonte : Libre Bodoni + Public Sans auto-hébergées. Aucune photo demandée ; privilégier une composition géométrique qui explique la méthode.
- Conserver les rôles de lecture --text-small (14 px), --text-nav (15 px), --text-body (16 px) et --text-intro (16–18 px). Ne pas réintroduire de sous-tailles mobiles pour faire tenir les textes ; adapter la disposition.
- Ne jamais inventer de client, témoignage, profil, résultat, adresse ou domaine. Tutelia reste un nom de travail.
- Le contact est une démonstration locale sans envoi. Aucune donnée saisie dans les journaux, les URLs ou le stockage navigateur.
- Ne pas connecter de prestataire, acheter ou publier sans demande explicite. Conserver le noindex jusqu’à la préparation de la version publique.
- Seuls les fichiers générés dans dist/ sont destinés à un hébergement statique. Ne jamais publier les documents internes ou node_modules/.
- Vérifier la compilation, la syntaxe HTML, les tests fonctionnels et l’accessibilité automatique avant d’annoncer une validation.