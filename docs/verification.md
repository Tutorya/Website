# Vérification de la version locale premium

**Date : 2026-09-09. Périmètre : aperçu local, pas autorisation de publication.**

## Vérifications exécutées

| Contrôle | Résultat observé |
| --- | --- |
| Syntaxe JavaScript et validation HTML | Aucune erreur ; `npm run check` réussit |
| Génération statique | 18 fichiers, environ 154,5 Kio au total, dont cinq polices et deux licences |
| Conservation du contrat visuel | Repère de refonte `19a50fda`, origine narrative `750d3a1b` et ligne `FINISH` présents dans la page générée |
| Tests navigateur Chromium | **30 réussis, aucun échec**, après la passe de confort de lecture |
| Tests unitaires du serveur | **16 réussis, aucun échec, 2 ignorés** |
| Commande complète `npm run verify` | Code de sortie 0 |
| Diagnostics de l’éditeur sur les fichiers applicatifs | Aucune erreur signalée |
| Dépendances à l’installation | 0 vulnérabilité signalée par npm à cette date |

Les deux tests ignorés nécessitent la création de liens symboliques de fichiers que Windows n’a pas autorisée. Les tests de traversée, dossiers liés, fichiers cachés, routes, méthodes HTTP et non-exposition du dépôt ont été exécutés. Aucune élévation de privilèges n’a été demandée.

## Couverture navigateur

- Contenu métier, titre unique et quatre étapes du parcours.
- Mention « Plus de 300 apprentis déjà suivis » présente sous les actions de l’accueil, statique et lisible sans JavaScript. Ce contrôle porte sur son affichage, pas sur un audit du décompte fourni par l’utilisateur.
- Équipe pluridisciplinaire : les sept domaines fournis sont présents dans la liste et dans la FAQ utilisable au clavier ; les pictogrammes sont décoratifs et masqués aux technologies d’assistance.
- Liens internes, ancres, pages légales et véritable réponse HTTP 404.
- Absence de débordement horizontal à **320, 390, 768, 1024 et 1440 px**.
- Contenu de la section équipe maintenu à l’intérieur de sa grille, sans empiéter sur les gouttières.
- Grille des expertises en quatre, deux ou une colonne selon la largeur ; aucun chevauchement entre les huit entrées, y compris la mention finale.
- En-tête mobile sur une seule rangée, y compris à 320 px.
- Folio premium : quatre liens vers les chapitres, cibles d’au moins 44 px de haut, aucun élément photographique ou calendrier embarqué.
- Menu mobile : ouverture, Échap, fermeture sur un lien et transfert du focus.
- Lien d’évitement et FAQ utilisables au clavier.
- Formulaire : champs obligatoires, e-mail invalide, message trop court, erreurs liées aux champs et résumé focalisé.
- Message valide : retour explicitement sans envoi, conservation de la saisie, absence de requête d’envoi et de stockage applicatif.
- Rendez-vous désactivé, sans faux lien.
- Ressources locales uniquement ; familles Libre Bodoni et Public Sans réellement chargées et appliquées.
- Contenu et FAQ utilisables sans JavaScript ; formulaire désactivé dans ce cas.
- Thème système, surcharge explicite et préférence de mouvement réduit ; animation du tracé désactivée en mouvement réduit.
- Analyse axe sur l’accueil clair/sombre, les trois pages secondaires et l’état d’erreur du formulaire mobile : aucune violation détectée dans les règles exécutées.

## Passe de confort de lecture

Passe autorisée par « c’est parti » le 2026-09-09 : identité, palette, grands titres et contenu métier conservés. Les textes secondaires sont à 14 px, la navigation à 15 px, les boutons principaux et le contenu courant à 16 px. Les introductions évoluent de 16 à 18 px selon la largeur. Le panneau bleu présente désormais ses étapes à 16 px et leurs descriptions à 14 px ; la mention d’expérience utilise un volume à 28 px et son libellé à 16 px.

Les anciens petits corps spécifiques aux mobiles ont été supprimés. Le premier écran s’empile à 56rem et moins pour éviter de comprimer le panneau ; le descripteur de marque est masqué sur petit mobile plutôt que miniaturisé. Aucun texte ni fait commercial n’a été retiré.

Vérification complète : 30 tests navigateur réussis, 16 tests serveur réussis et 2 ignorés sous Windows. Cinq tests supplémentaires vérifient les planchers typographiques et l’absence de chevauchement/troncature dans le panneau, à 320, 390, 768, 1024 et 1440 px. Des contrôles complémentaires autour des seuils (384, 640, 641, 896, 897, 1120 et 1121 px) n’ont pas révélé de débordement du document ou de sortie des libellés hors du panneau. Pas de test de zoom réel ou d’appareil physique revendiqué.

Captures conservées dans le sous-dossier de revue `reading`, sans écraser les preuves de la refonte. Revue indépendante ciblée par agent généraliste : SHIP pour cette passe locale, sans anomalie visuelle matérielle identifiée ; pas de certification générale d’accessibilité ou de publication.

## Nuance du fond de la deuxième section

À la demande de l’utilisateur, seule la section « Trois regards. Un même parcours. » utilise maintenant le fond minéral secondaire existant : `#eaf0f3`, contre `#f4f6f7` pour l’ouverture en thème clair. Les autres couleurs et mises en page ne changent pas.

Validation à cette étape : syntaxe et build réussis, 7 tests ciblés réussis (responsive aux cinq largeurs et analyse axe de l’accueil clair/sombre). Une capture de la transition à 1295 px a été inspectée ; les couleurs calculées correspondent aux deux valeurs ci-dessus. La suite complète a depuis été relancée lors de la passe de confort de lecture, avec ce fond conservé.

## Mention d’expérience — plus de 300 apprentis

L’utilisateur a fourni le volume « plus de 300 apprentis déjà suivis » et demandé de le mettre en valeur. La mention est intégrée une seule fois, sous les actions du premier écran, avec les polices et couleurs existantes. Aucun taux de réussite, période, label ou autre chiffre n’est ajouté.

La vérification complète a réussi : 25 tests navigateur, 16 tests serveur, 2 tests ignorés pour les permissions Windows déjà documentées. Les captures ciblées de l’ouverture ont été inspectées à 1440 et 320 px, ainsi qu’en thème sombre. Le contenu reste présent sans JavaScript et n’utilise aucun compteur animé. La source commerciale du volume est la déclaration de l’utilisateur ; elle n’a pas fait l’objet d’une vérification indépendante.

## Ajout des domaines — charte conservée

Après un retour positif sur la charte, l’utilisateur a demandé cinq domaines supplémentaires : intelligence artificielle, gestion de projet, cybersécurité, biotechnologie et santé. Informatique et mécanique sont conservées. La liste et la FAQ sont synchronisées sans ajout de qualifications, de chiffres ni de prestations médicales.

La liste a été adaptée en grille ouverte sur quatre colonnes, deux à 70rem et moins, une à 40rem et moins. Palette, typographie, navigation et autres sections restent inchangées. Les contrôles existants ont été renforcés pour les sept noms, leurs pictogrammes, la FAQ et l’absence de chevauchement.

`npm run verify` a réussi : 24 tests navigateur, 16 tests serveur et 2 tests de symlinks ignorés sous Windows. Les captures ciblées ont été inspectées à 1440, 768 et 320 px ainsi qu’en thème sombre. Une vérification de position confirme que l’en-tête ne masque pas le titre lorsque la section est rejointe. Les captures ciblées finales sont distinctes de la revue globale de refonte décrite ci-dessous.

## Revue de la refonte premium

L’utilisateur a demandé et délégué une nouvelle identité bleu encre / blanc minéral / champagne, avec une composition graphique sans photo. La direction remplace la première charte, pas le positionnement ni les limites du contact de démonstration.

UI/UX Pro Max a été interrogé pour le système global, les couleurs et les associations typographiques. Le résultat construit utilise Libre Bodoni / Public Sans, un folio géométrique des quatre étapes, des rôles en colonnes ouvertes et une introduction de méthode fixe pendant le défilement sur grand écran.

Neuf captures finales ont été examinées : premiers écrans ordinateur/mobile, pages complètes à 1440, 1024, 865, 768, 390 et 320 px, ainsi que la variante sombre. Un ajustement groupé a corrigé le retour à la ligne de l’en-tête à 320 px et les libellés des acteurs dans le folio sur tablette.

**Verdict de la revue indépendante : SHIP au périmètre de la préversion locale.** Aucun problème visuel matériel n’a été identifié dans les captures et sources examinées. Ce verdict n’est ni une approbation finale par l’utilisateur, ni une certification d’accessibilité ou de conformité, ni une autorisation de publication. La revue et la documentation ont été effectuées par des agents généralistes en substitution des agents spécialisés indisponibles.

Le serveur de développement avait gardé l’ancienne liste de polices en mémoire et renvoyait une réponse 503 après leur remplacement. Il a été redémarré avec la nouvelle configuration. Les captures invalides ont été remplacées ; [le script de capture](../scripts/capture.mjs) exige désormais HTTP 200, un titre visible et la bonne famille typographique avant toute capture.

## Historique : ajustement éditorial — équipe pluridisciplinaire

Le 2026-09-09, à la demande de l’utilisateur, l’introduction et la section équipe mettent en avant une équipe élargie et pluridisciplinaire. L’informatique et la mécanique sont les spécialités explicitement citées ; aucun autre domaine précis, profil ou chiffre n’a été inventé. Une question de FAQ précise l’adaptation aux filières.

Les captures ciblées de la section équipe ont été contrôlées à 1440 et 320 px. Le titre a été reformulé pour éviter qu’un mot long n’élargisse la grille mobile. La vérification complète a ensuite réussi avec 23 tests navigateur et les résultats serveur indiqués ci-dessus. Aucun style, service externe ou traitement de données n’a été ajouté.

## Revue visuelle initiale

Captures réalisées après chargement des polices, avec mouvement réduit, sur 1440 × 1000, 1024 × 768, 768 × 1024, 390 × 844 et 320 × 780, plus une capture sombre. Les premiers écrans ordinateur/mobile ont également été capturés séparément.

Une revue indépendante a demandé trois corrections, appliquées ensemble puis contrôlées sur de nouvelles captures :

| Point | Correction | Verdict de confirmation |
| --- | --- | --- |
| TUT-FR-01 | Élargissement du libellé des rôles sur écran intermédiaire | Résolu : espace lisible entre « L’entreprise » et son texte à 1024 px |
| TUT-FR-02 | Phrase accentuée du titre dans un bloc distinct ; « à la » insécable | Résolu : plus de « à » isolé, repli autorisé à 320 px |
| TUT-FR-03 | Espaces insécables avant la ponctuation française concernée | Résolu : questions et deux-points ne commencent plus seuls une ligne |

**Verdict de la passe de confirmation : SHIP pour ces trois corrections, dans le périmètre de la première préversion locale.** Ce n’est ni une approbation utilisateur du rendu final ni un audit global de production.

Les agents Impeccable spécialisés n’étaient pas exposés dans cette session. Une revue indépendante et une documentation par agents généralistes ont été utilisées en remplacement ; cette substitution est explicite.

## Limites de vérification

- Le détecteur Impeccable fonctionne **en mode dégradé**, faute de modules d’analyse HTML/CSS. Lors de la refonte, il a signalé 73 écarts avec l’ancienne charte (5 familles de police, 67 tailles, 1 rayon), qui allait être remplacée. Ces écarts attendus ne justifiaient pas de restaurer le design rejeté. Aucun autre type d’alerte n’a été remonté, sans que cela constitue un audit complet. Le système de design a ensuite été documenté depuis la refonte construite.
- Pas de test effectué sur Firefox, Safari ou des appareils physiques.
- Pas de mesure terrain des Core Web Vitals ni de score Lighthouse revendiqué. La taille des fichiers n’est pas une mesure de performance réelle.
- Les tests automatisés et les vérifications clavier ne constituent pas une certification d’accessibilité complète.
- Aucun test de réception d’e-mail, de calendrier, de domaine ou d’hébergement public : ces services ne sont pas connectés.
- Les pages légales décrivent une préversion et restent à compléter ; aucune conformité juridique globale n’est revendiquée.
- Les directives `noindex` empêchent une indexation souhaitée, mais ne protègent pas l’accès à un site publié.

## Étape suivante

Revoir le rendu et les textes avec le porteur du projet, puis renseigner les informations manquantes. La [checklist de mise en ligne](mise-en-ligne.md) détaille les conditions avant une publication autorisée.