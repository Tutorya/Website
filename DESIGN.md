---
author: GitHub Copilot
name: Tutorya — Le folio de suivi
description: Relevé du système premium après la passe de confort de lecture ; familles, couleurs et titres conservés, périmètre local sans déploiement.
last_changed: 2026-09-09
colors:
  cp-bg: "#f4f6f7"
  cp-bg-elevated: "#eaf0f3"
  cp-surface: "#ffffff"
  cp-surface-soft: "#f8fafb"
  cp-border: "#d8e0e6"
  cp-border-strong: "#9aa8b5"
  cp-border-control: "#7c8b99"
  cp-text: "#142b45"
  cp-text-muted: "#526278"
  cp-text-soft: "#617185"
  cp-accent: "#142b45"
  cp-accent-hover: "#274662"
  cp-accent-fg: "#ffffff"
  cp-champagne: "#ddc9a3"
  cp-champagne-dark: "#765a2d"
  cp-ink: "#142b45"
  cp-ink-deep: "#102238"
  cp-ink-muted: "#b9c9d9"
  cp-ink-line: "#425973"
  cp-on-ink: "#f4f6f7"
  cp-danger: "#a72e3e"
  cp-danger-soft: "#fff1f2"
typography:
  display:
    fontFamily: '"Libre Bodoni", Georgia, serif'
    fontSize: "clamp(3.25rem, 5.7vw, 5.25rem)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  headline:
    fontFamily: '"Libre Bodoni", Georgia, serif'
    fontSize: "clamp(2.5rem, 3.8vw, 3.75rem)"
    fontWeight: 400
    lineHeight: 1.14
    letterSpacing: "-0.025em"
  title:
    fontFamily: '"Public Sans", "Segoe UI", sans-serif'
    fontSize: "1.375rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "-0.025em"
  body:
    fontFamily: '"Public Sans", "Segoe UI", sans-serif'
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: '"Public Sans", "Segoe UI", sans-serif'
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1.75
  button:
    fontFamily: '"Public Sans", "Segoe UI", sans-serif'
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1.4
  small:
    fontFamily: '"Public Sans", "Segoe UI", sans-serif'
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.75
  nav:
    fontFamily: '"Public Sans", "Segoe UI", sans-serif'
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.75
  intro:
    fontFamily: '"Public Sans", "Segoe UI", sans-serif'
    fontSize: "clamp(1rem, calc(0.875rem + 0.25vw), 1.125rem)"
    fontWeight: 400
    lineHeight: 1.75
  button-small:
    fontFamily: '"Public Sans", "Segoe UI", sans-serif'
    fontSize: "0.9375rem"
    fontWeight: 500
    lineHeight: 1.4
rounded:
  field: "0.375rem"
  control: "0.5rem"
  panel: "1rem"
  circle: "50%"
spacing:
  section: "clamp(4.5rem, 8vw, 7.5rem)"
  gutter: "clamp(1.25rem, 5vw, 5rem)"
components:
  button-primary:
    backgroundColor: "{colors.cp-accent}"
    textColor: "{colors.cp-accent-fg}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "0.9375rem 1.375rem"
  button-primary-hover:
    backgroundColor: "{colors.cp-accent-hover}"
  button-small:
    backgroundColor: "{colors.cp-accent}"
    textColor: "{colors.cp-accent-fg}"
    typography: "{typography.button-small}"
    rounded: "{rounded.control}"
    padding: "0.75rem 1rem"
  button-outline:
    backgroundColor: "{colors.cp-surface}"
    textColor: "{colors.cp-text}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "0.9375rem 1.375rem"
  button-outline-hover:
    backgroundColor: "{colors.cp-bg-elevated}"
  button-outline-disabled:
    backgroundColor: "{colors.cp-bg}"
    textColor: "{colors.cp-text-muted}"
  text-link:
    textColor: "{colors.cp-text}"
  input-text:
    backgroundColor: "{colors.cp-surface-soft}"
    textColor: "{colors.cp-text}"
    rounded: "{rounded.field}"
    padding: "0.75rem"
    width: "100%"
  navigation:
    textColor: "{colors.cp-text}"
    typography: "{typography.nav}"
  hero-folio:
    backgroundColor: "{colors.cp-ink}"
    textColor: "{colors.cp-on-ink}"
    rounded: "{rounded.panel}"
    padding: "2rem 2.25rem 1.5rem"
  report-preview:
    backgroundColor: "{colors.cp-bg}"
    textColor: "{colors.cp-text}"
    rounded: "{rounded.control}"
    padding: "1.5rem"
  contact-form:
    backgroundColor: "{colors.cp-surface}"
    textColor: "{colors.cp-text}"
    rounded: "{rounded.panel}"
    padding: "2.5rem"
  method-marker:
    backgroundColor: "{colors.cp-surface}"
    textColor: "{colors.cp-text-muted}"
    rounded: "{rounded.circle}"
    width: "3rem"
    height: "3rem"
  method-marker-current:
    backgroundColor: "{colors.cp-ink}"
    textColor: "{colors.cp-champagne}"
  faq-item:
    textColor: "{colors.cp-text}"
---

# Tutorya — design de la refonte premium

**Sommaire** — [Vue d’ensemble](#overview) · [Couleurs](#colors) · [Typographie](#typography) · [Mise en page](#layout) · [Relief](#elevation--depth) · [Formes](#shapes) · [Composants](#components) · [Garde-fous](#dos-and-donts)

## Overview

**Creative North Star: "Le folio de suivi"**

La refonte premium remplace le rendu initial explicitement rejeté par l’utilisateur. La direction déléguée associe bleu encre, blanc minéral et touches champagne, dans une composition graphique sans photo. Tutorya reste une vitrine de tutorat académique pour les écoles d’ingénieurs, pas une plateforme de suivi.

Le folio de suivi donne un cadre éditorial à la méthode réelle : grands titres serif, quatre étapes reliées et compositions ouvertes. Le contraste des séquences sombres et les filets structurent la lecture ; les repères de lecture ne représentent aucune donnée d’apprenti.

**Revue historique, antérieure à la passe de lecture :** le verdict SHIP rapporté le 2026-09-09 concernait uniquement la prévisualisation locale alors examinée par un généraliste en remplacement du spécialiste, sur neuf captures. Il ne constitue pas une nouvelle revue de l’état actuel, une validation de production, une certification d’accessibilité ou une approbation finale de l’utilisateur.

**Passe de confort de lecture autorisée par « c’est parti » :** familles, couleurs et tailles de titres conservées ; textes secondaires, navigation, corps, introductions et contrôles ajustés par rôle. L’ouverture s’empile désormais dès 56rem et le folio adapte sa géométrie aux libellés agrandis. Résultats rapportés de la passe principale : 30 tests navigateur et 16 tests serveur réussis, deux tests serveur ignorés sous Windows. Aucune commande ni nouvelle exécution de tests n’a lieu pendant cette mise à jour documentaire. Le périmètre reste local, sans déploiement.

**Retour utilisateur ultérieur :** la charte premium est appréciée et conservée. L’ajout des cinq domaines demandés porte la liste à sept expertises nommées ; seule sa disposition responsive a été adaptée, sans changement de palette, de polices ou de direction visuelle.

**Mention d’expérience ajoutée à sa demande :** « Plus de 300 apprentis déjà suivis », sous les actions de l’accueil. La ligne `hero-proof` utilise les couleurs existantes, un filet de séparation et Libre Bodoni à 1.75rem (28px) pour le volume. Le libellé en Public Sans à `var(--text-body)` (16px) peut passer à la ligne sur mobile. Le chiffre est statique, fourni par l’utilisateur, sans taux de réussite associé ; les sept domaines restent inchangés.

**Key Characteristics:**
- Bleu encre et surfaces minérales, champagne contextualisé, variante sombre implémentée.
- Libre Bodoni 400 normale/italique et Public Sans 400/500/600, auto-hébergées.
- Folio à quatre étapes, rôles ouverts, introduction latérale de méthode, soutenance sombre et bandeau d’expertises.
- Aucune photo, aucun portrait ni preuve client inventée.

**Autorité des sources :** [PRODUCT.md](PRODUCT.md) fixe les faits métier ; [docs/refonte-premium.md](docs/refonte-premium.md) consigne le remplacement visuel délégué. Le relevé décrit [site/assets/css/theme.css](site/assets/css/theme.css), [site/assets/css/styles.css](site/assets/css/styles.css), [site/index.html](site/index.html) et [site/assets/js/main.js](site/assets/js/main.js). [scripts/build.mjs](scripts/build.mjs) copie les sources sans transformation HTML/CSS/JS et ajoute les fontes locales.

L’en-tête YAML contient un noyau de primitives du thème clair et les styles de base, pas un inventaire exhaustif du CSS. Les surcharges sombres et responsive restent dans les sources ; [.impeccable/design.json](.impeccable/design.json) ajoute métadonnées, ombres, mouvement, seuils et extraits, sans dupliquer une seconde palette. Repères de la série actuelle de captures de lecture, sans nouvelle inspection visuelle pendant cette mise à jour : [.impeccable/review/reading/desktop.png](.impeccable/review/reading/desktop.png), [.impeccable/review/reading/tablet.png](.impeccable/review/reading/tablet.png), [.impeccable/review/reading/small-mobile.png](.impeccable/review/reading/small-mobile.png) et [.impeccable/review/reading/dark.png](.impeccable/review/reading/dark.png).

> [!IMPORTANT]
> La refonte conserve le périmètre local : formulaire sans envoi ni stockage applicatif, rendez-vous désactivé et `noindex, nofollow`. [site/robots.txt](site/robots.txt) interdit aussi l’exploration. Ces directives ne constituent pas un contrôle d’accès ni une autorisation de publication.

## Colors

- **Encre :** `--cp-text` et `--cp-accent` portent le texte principal et les actions du thème clair. `--cp-ink` habille le folio et la soutenance ; `--cp-ink-deep` habille le pied de page. Ces séquences restent sombres dans les deux thèmes, avec leurs propres texte, texte atténué et filets (`--cp-on-ink`, `--cp-ink-muted`, `--cp-ink-line`).
- **Minéral :** `--cp-bg` est le fond général ; `--cp-bg-elevated` distingue la section « Trois regards. Un même parcours. » et la FAQ. À la demande de l’utilisateur, cette deuxième section reprend le fond minéral légèrement plus sombre `#eaf0f3`, contre `#f4f6f7` pour l’ouverture en thème clair. Aucun autre fond n’est modifié. `--cp-surface` accueille la méthode et le formulaire ; `--cp-surface-soft` accueille les champs. Le compte-rendu utilise `--cp-bg`, pas une carte blanche bordée.
- **Champagne :** `--cp-champagne` souligne le tracé et les repères sur encre, ainsi que l’italique de soutenance. `--cp-champagne-dark` sert aux accents sur fond clair, notamment dans l’équipe et les pictogrammes. Le titre principal reste en couleur de texte, y compris son italique.
- **Erreurs :** `--cp-danger` et `--cp-danger-soft` distinguent les erreurs de saisie et leur résumé ; l’accent d’action n’est plus détourné à cet usage.

Le préfixe `--cp` est conservé volontairement ; il n’impose pas l’ancienne palette. Sous `html[data-theme="dark"]`, les mêmes variables prennent les valeurs de [site/assets/css/theme.css](site/assets/css/theme.css) : fonds bleu sombre, texte clair, action champagne et erreur rose clair. Les couleurs sur encre restent définies par leurs rôles dédiés. Aucun nom CSS suffixé artificiellement `-dark` n’est ajouté par ce relevé.

[site/assets/js/theme.js](site/assets/js/theme.js) applique la préférence système au chargement, sauf surcharge `scoutTheme=light` ou `scoutTheme=dark`. Une valeur inconnue revient au clair. Il n’existe ni sélecteur visible, ni stockage de préférence, ni écoute des changements système ultérieurs.

**The Contextual Contrast Rule.** Distinguer le champagne sur encre, le champagne sombre sur fond clair et la couleur d’erreur ; conserver les rôles du thème actif.

## Typography

- **Titres éditoriaux :** Libre Bodoni 400 normale et italique, avec Georgia en secours. Les styles `display` et `headline` relèvent les bases `h1` et `h2` ; le titre d’ouverture possède les surcharges décrites dans Layout.
- **Lecture et contrôles :** Public Sans 400/500/600, avec Segoe UI puis sans-serif en secours. `h3` utilise 500, comme les boutons et libellés ; `strong` utilise 600 sauf surcharge locale. Le corps reste à 1rem sur mobile.
- **Exceptions observées :** le titre du formulaire est en Libre Bodoni 400, à 1.875rem puis 1.625rem à 40rem et moins. Le titre du folio utilise aussi la serif, avec `clamp(1.875rem, 2.8vw, 2.625rem)` par défaut. Les titres de rôles sont en Libre Bodoni à 1.625rem.
- **Mesure et italique :** paragraphes limités à 68ch, description d’ouverture à 46ch, titre d’ouverture à 12ch. « attentif. » occupe un bloc italique distinct ; « De l’entreprise à la soutenance. » est une promesse séparée, avec « à la » insécable. Les grands titres utilisent `text-wrap: balance`.

Les quatre jetons de lecture sont définis dans [site/assets/css/theme.css](site/assets/css/theme.css) et consommés dans [site/assets/css/styles.css](site/assets/css/styles.css). Équivalences en pixels pour une base de 16px ; tailles de titres et surcharges responsive inchangées.

| Rôle | Jeton et valeur actuelle | Usages |
| --- | --- | --- |
| Secondaire | `--text-small: 0.875rem` (14px) | Notes, aides, erreurs, compte-rendu, légendes, pied de page et repères |
| Navigation | `--text-nav: 0.9375rem` (15px) | Liens de navigation, bouton Menu et bouton compact |
| Corps | `--text-body: 1rem` (16px) | Corps, FAQ même sur mobile, boutons standards, liens d’action, libellés de champs et de folio |
| Introduction | `--text-intro: clamp(1rem, calc(0.875rem + 0.25vw), 1.125rem)` (16–18px) | Promesse, description d’ouverture et introductions de sections |

Les libellés de champs sont à 16px/500, leurs mentions facultatives à 14px/400. Les libellés du folio sont à 16px/500 avec interligne 1.4, leurs sous-libellés à 14px/400 avec interligne 1.5. Les boutons standards sont à 16px/500, les compacts à 15px/500, avec interligne 1.4. Les styles de lecture du YAML relèvent l’interligne hérité de 1.75 ; la description d’ouverture le porte à 1.8, les erreurs et lignes du compte-rendu à 1.65. La promesse utilise la taille d’introduction en 500. Le descripteur de marque reste à 0.75rem (12px), masqué selon les seuils ci-dessous ; le lien de légende d’ouverture passe à une icône seule (`font-size: 0`) à 40rem et moins. Les champs de saisie restent explicitement à 1rem dans la source.

Les cinq fichiers WOFF2 sont déclarés avec `font-display: swap` dans [site/assets/css/theme.css](site/assets/css/theme.css). [site/index.html](site/index.html) précharge seulement les graisses 400 normales des deux familles. [scripts/build.mjs](scripts/build.mjs) copie les deux fichiers Libre Bodoni et les trois Public Sans depuis Fontsource, avec les deux licences présentes : [dist/assets/fonts/OFL-libre-bodoni.txt](dist/assets/fonts/OFL-libre-bodoni.txt) et [dist/assets/fonts/OFL-public-sans.txt](dist/assets/fonts/OFL-public-sans.txt).

**The Editorial Hierarchy Rule.** Les styles `h1`/`h2` utilisent Libre Bodoni 400 ; `h3` utilise Public Sans 500, sauf le titre du formulaire en Libre Bodoni 400.

## Layout

Le conteneur centré utilise `width: min(var(--content-width), calc(100% - var(--gutter) * 2))`, avec une largeur maximale de 76rem ; gouttière et rythme de section sont relevés dans le YAML. L’en-tête est sticky à `top: 0`, avec une hauteur minimale de 5.75rem ; le décalage de défilement de la page est de 7rem. Les grilles utilisent `minmax(0, …)` là où la source le prévoit, sans imposer une grille uniforme de cartes.

| Composition par défaut, au-dessus de 70rem | Colonnes et écart |
| --- | --- |
| Ouverture | `1.06fr / 1fr` ; `clamp(2.5rem, 5vw, 5rem)` |
| Introduction des rôles | `1fr / 0.85fr` ; 5rem ; puis trois colonnes égales de rôles |
| Méthode | `0.76fr / 1.24fr` ; 6rem ; chaque étape utilise `3rem / minmax(0, 1fr)` |
| Soutenance | `1fr / 0.85fr` ; 6rem |
| Équipe | `1fr / 0.9fr` ; 5rem |
| Domaines d’expertise | Quatre colonnes `minmax(0, 1fr)` ; écarts de 1.5rem entre rangées et 2rem entre colonnes |
| FAQ | `0.75fr / 1.25fr` ; 5rem |
| Contact | `0.85fr / 1.15fr` ; 5rem ; nom et école sur deux colonnes |

L’introduction de méthode est sticky à `top: 8rem` **uniquement au-dessus de 40rem**, y compris sur tablette. Le folio commence avec une hauteur minimale de 34.5rem et un diagramme de 21.5rem ; son tracé SVG à coudes courbes accompagne quatre liens alternés. Leurs positions verticales sont 0, 5rem, 11rem et 16rem ; chaque élément occupe 55% de la largeur, avec la colonne de droite à `left: 45%`. Le panneau de texte des liens reprend `--cp-ink`, avec `min-width: 0` et `overflow-wrap: anywhere`. Le folio devient une liste verticale à 70rem et moins ; l’ouverture passe sur une seule colonne à 56rem et moins.

Les seuils suivants sont des `max-width` inclusifs ; les surcharges se cumulent dans l’ordre de [site/assets/css/styles.css](site/assets/css/styles.css).

| Seuil | Changements réellement implémentés |
| --- | --- |
| 70rem | Navigation à 1.125rem d’écart ; descripteur de marque masqué. Ouverture à 2.5rem d’écart, folio à 1.5rem de padding horizontal. SVG masqué, liste des quatre étapes en grille verticale avec un filet de 1px ; positions absolues des liens supprimées. Écarts des grilles rôles/méthode/soutenance/équipe/FAQ/contact à 3rem ; expertises sur deux colonnes ; formulaire à 2rem de padding. |
| 56rem | En-tête de 5rem minimum, décalage de défilement à 6.5rem, descripteur réaffiché à 12px. Menu repliable avec JavaScript ; liens visibles sans lui. Ouverture sur une colonne (`minmax(0, 1fr)`, écart 2.5rem), titre `clamp(3rem, 6.4vw, 4rem)`. Folio sans hauteur minimale imposée (`min-height: 0`), padding `1.5rem 1.125rem`, titre 1.875rem ; libellé des acteurs à `max-width: none`, aligné à droite, taille `var(--text-small)` (14px) ; pied du folio en colonne. Les rôles restent en trois colonnes. Introduction des rôles à 2rem d’écart ; méthode `0.7fr / 1.3fr`, écart 2.5rem, introduction encore sticky, marqueurs toujours de 3rem. Soutenance/équipe/FAQ à 2.5rem d’écart. Lignes du compte-rendu empilées ; expertises toujours sur deux colonnes. Contact sur une colonne, mais son introduction garde `1fr / 0.8fr`, avec le rendez-vous à droite ; champs nom/école encore côte à côte. |
| 40rem | Descripteur de marque masqué. Ouverture déjà sur une colonne, titre `clamp(3.125rem, 11vw, 4.25rem)` et bouton principal pleine largeur. Titres `h2` à `clamp(2.25rem, 8vw, 3rem)`. Folio à 1.5rem de padding, titre 2.125rem, acteurs toujours sans limite de largeur à 14px ; pied du folio de nouveau en rangée. Introduction des rôles, méthode, soutenance, équipe et FAQ sur une colonne, écart 1.75rem ; rôles empilés avec filets horizontaux. Introduction de méthode statique ; marqueurs à 2.5rem, axe à 1.25rem du bord gauche. Expertises et pied de page empilés. Introduction de contact en bloc, rendez-vous dessous, champs sur une colonne, formulaire à `1.5rem 1.25rem` de padding. Le corps et la FAQ restent à 16px, les textes secondaires à 14px. |
| 24rem | Descripteur déjà masqué depuis 40rem. Signe de marque à 2rem, nom à 1.875rem, écart de marque à 0.625rem ; le bouton Menu n’a pas de réduction supplémentaire à ce seuil. Navigation ouverte en colonne. Tous les boutons `.button`, y compris compacts, passent à 0.875rem de padding horizontal, sans réduction de texte. Titre d’ouverture à 2.875rem ; promesse conservée à `var(--text-intro)`, acteurs à 14px. Padding horizontal du folio à 1.125rem et pied du folio en colonne. |

Le seuil du contrôleur de menu dans [site/assets/js/main.js](site/assets/js/main.js) est exactement 56rem. Le descripteur est donc visible au-dessus de 70rem et dans l’intervalle `40rem < largeur ≤ 56rem`, pas dans les deux autres intervalles. Le `max-width: none` des acteurs est déjà présent à 56rem, pas seulement sur téléphone.

## Elevation & Depth

La profondeur repose surtout sur les surfaces et les filets, mais **le formulaire applique réellement `--cp-shadow`**. Ses valeurs claire et sombre sont relevées dans [.impeccable/design.json](.impeccable/design.json), à partir de [site/assets/css/theme.css](site/assets/css/theme.css). Le folio, les rôles et le compte-rendu n’ont pas cette ombre. L’en-tête reste opaque, sans flou d’arrière-plan.

**The Targeted Depth Rule.** Réserver l’ombre observée au formulaire de contact ; structurer le folio, les rôles et la méthode par leurs fonds et filets.

## Shapes

- **Panneaux :** rayon `panel` pour le folio et le formulaire ; rayon `control` pour les boutons, le compte-rendu et les messages du formulaire. Les champs ont leur propre rayon `field`, littéral dans le CSS.
- **Repères :** cercles de 2.25rem dans le folio ; cercles de 3rem dans la méthode, réduits à 2.5rem à 40rem et moins. Le filet vertical de méthode mesure 1px, pas 2px.
- **Graphisme :** tracé SVG et pictogrammes en traits, sans photographie. Les rôles sont des colonnes ouvertes séparées par des filets, pas des cartes arrondies. Le signe de marque reste provisoire, comme le nom Tutorya.

## Components

- **Actions et navigation :** bouton plein en accent du thème, variante compacte et liens textuels à flèche. Hauteurs minimales : 3.25rem pour le bouton standard, 2.875rem pour le compact, 2.75rem pour le lien textuel. Le standard et les liens d’action utilisent `--text-body` (16px), le compact `--text-nav` (15px), en Public Sans 500 ; les liens de navigation restent à 400. L’écart texte/icône des boutons est de 0.75rem. Le survol change fond/bordure, sans translation ; le lien textuel épaissit son soulignement. Le seul bouton contour de rendez-vous est désactivé, avec une explication visible à 14px.
- **Menu :** `aria-expanded`, fermeture par Échap avec retour du focus, fermeture sur clic extérieur et sur changement de seuil. Un lien mobile ferme le menu et transfère le focus à sa cible. Le CSS prévoit `aria-current="location"`, mais le script n’attribue pas cet état. Le lien d’évitement reste disponible.
- **Folio et méthode :** Diagnostic → Accompagnement → Suivi continu → Reporting école, avec les ancres réelles `#diagnostic`, `#tutorat`, `#suivi` et `#reporting`. Le folio est une représentation de la méthode, pas un tableau de bord. `IntersectionObserver` applique `is-current` à une étape lue ; son marqueur devient encre/champagne, jamais un statut d’apprenti. L’exemple de compte-rendu reste une structure à adapter, sans données individuelles.
- **Rôles et expertises :** école, apprenti et entreprise forment trois colonnes ouvertes avant l’empilement mobile. La liste d’expertises cite Informatique, Mécanique, Intelligence artificielle, Gestion de projet, Cybersécurité, Biotechnologie et Santé, puis « Et d’autres domaines de l’ingénierie ». Ces domaines proviennent de l’utilisateur. La grille passe de quatre à deux puis une colonne, avec des pictogrammes décoratifs champagne de 2rem en traits de 1.25 ; aucun profil ou niveau de certification n’est inventé. La mention finale utilise la classe explicite `expertise-more`, pas la position du dernier domaine.
- **FAQ :** `details`/`summary` natifs, chevron fin qui pivote à l’ouverture ; aucun JavaScript nécessaire.
- **Démonstration de contact :** champs et soumission désactivés dans le HTML, activés après installation des gestionnaires. Nom/école facultatifs ; e-mail/message obligatoires ; message de 20 à 3 000 caractères, sans dossier étudiant. Chaque soumission est interceptée par `preventDefault()` : validation locale uniquement, aucun appel réseau d’envoi, stockage applicatif ou journalisation des saisies. Erreurs liées aux champs, bordure renforcée en danger et résumé focalisable ; le statut annonce des champs valides, jamais un message livré. Sans JavaScript, le formulaire reste indisponible.
- **Focus et mouvement :** contour de 3px, décalé de 5px, en accent du thème ; champagne sur folio, soutenance et pied de page, avec décalage de 3px dans le folio. Transitions rapides de 180ms ; marqueur de méthode à 320ms. Le tracé du folio apparaît une fois en 1.4s avec `--ease-out`, sans mouvement ambiant continu ; le même easing anime le soulignement de navigation. Le mouvement réduit supprime animations/transitions et défilement doux. `forced-colors` adapte bordures, filets et tracé SVG.

Le complément JSON conserve dix extraits représentatifs, relevés dans [site/assets/css/styles.css](site/assets/css/styles.css), avec les variables de rôle et fontes de [site/assets/css/theme.css](site/assets/css/theme.css), sans réimplémenter les contrôleurs. L’extrait de folio montre les quatre liens dans leur variante verticale de tablette ; la géométrie SVG grand écran reste dans [site/index.html](site/index.html). Les titres des extraits restent inchangés ; les anciennes réductions mobiles des textes de méthode et de FAQ sont retirées comme dans la source. Ces extraits n’ont pas été exécutés pendant cette passe documentaire.

## Do's and Don'ts

- Do — Reprendre les variables du thème actif, les fontes livrées et les seuils de la source.
- Do — Préserver les quatre étapes réelles et le contenu sans mouvement ni JavaScript.
- Do — Garder explicites la démonstration locale, le rendez-vous indisponible et le contact non connecté.
- Don't — Réintroduire la charte rejetée, des photos ou des preuves métier inventées.
- Don't — Confondre repère de lecture et statut d’apprenti, ou validation locale et envoi.
- Don't — Étendre SHIP au-delà de l’aperçu local ou le présenter comme une certification ou une approbation finale.
- Don't — Créer des gammes de couleurs, fontes, géométries ou composants absents des sources.

Non canonisés : les variables déclarées mais non consommées `--cp-accent-soft` et `--cp-champagne-soft`, ainsi que toute gamme tonale synthétique. Le relevé ne transforme pas ces réserves en règles d’interface.