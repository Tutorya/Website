# Prérequis — site vitrine Tutelia

Vérification technique initiale du 2026-09-08. Le 2026-09-09 : première version construite, puis refonte premium demandée et déléguée, sans photo. Le fil de progression B est conservé ; l’ancienne charte est remplacée. Voir [la direction actuelle](refonte-premium.md) et [le rapport de vérification](verification.md).

## Compétences disponibles

| Domaine | Compétences présentes | Vérification et usage |
| --- | --- | --- |
| Recherche de compétences | Find Skills | Guide consulté ; aucune installation complémentaire nécessaire pour cette phase |
| Design et UX | UI/UX Pro Max | Recommandations initiales, puis recherches système premium B2B, palette et typographie exécutées pour la refonte |
| Direction artistique | Frontend Design | Guide consulté ; utilisé pour différencier les compositions et éviter une vitrine générique |
| Cadrage et propositions | Impeccable 4.1.2 | Contexte du projet vérifié ; entretien réalisé ; présentation de directions préparée |
| Positionnement et textes | Product Marketing, Copywriting | Guides consultés ; contexte partagé enregistré, faits et hypothèses séparés |
| Structure et SEO | Site Architecture, SEO Audit | Métadonnées locales et liens vérifiés ; indexation volontairement bloquée, contrôles publics à réaliser avant publication |
| Accessibilité | Web Design Guidelines, règles UI/UX | Tests clavier, responsive et analyse axe exécutés ; pas de certification globale |
| Données personnelles | GDPR Compliant | Guide consulté ; minimisation du contact et absence de données étudiantes dans la vitrine |
| Tests et validation | Webapp Testing, Verification Before Completion | Vérification de la version actuelle : 30 tests navigateur réussis après la passe de lecture ; voir le rapport |

Les compétences fournissent des méthodes et des contrôles. Leur présence ne constitue ni une certification d’accessibilité ni une garantie de conformité juridique. Les contrôles réellement exécutés sont distingués des étapes restant à réaliser.

### Particularités de l’outillage de proposition

- Une mise à jour facultative d’Impeccable vers 4.2.3 a été signalée. Elle n’a pas été installée : aucune modification des compétences globales pendant le projet.
- L’afficheur de questions utilise l’option de schéma documentée ; l’option d’aide générique ne fonctionne pas et attend une entrée. Le processus bloqué a été arrêté sans modifier les outils installés.
- L’exploration de directions a retourné ses données, puis rencontré une assertion Node/libuv à la sortie sous Windows. Aucune correction de l’installation globale n’a été tentée. Les directions de travail sont conservées, et le présentateur est vérifié séparément dans le navigateur.
- Pas de génération d’images disponible dans cette session : les planches présentent des palettes et des schémas de composition, pas de faux rendus haute fidélité.

## Environnement local vérifié

- Windows ; dossier de travail initialement vide, hors dépôt Git.
- Node.js 24.13.1.
- npm 11.8.0.
- Python 3.14.3.
- Git 2.55.0.windows.3.
- Dépendances de développement et polices locales installées ; aucune dépendance JavaScript externe chargée par le site. Aucun achat ni déploiement public effectué.

## Choix technique validé

**HTML, CSS et JavaScript léger**, sur un hébergement Hostinger acceptant un site personnalisé. Pas de serveur Node.js nécessaire en production pour les pages statiques. Les outils locaux servent à la création et aux tests.

Avantages : fichiers portables, peu de dépendances, maintenance limitée, maîtrise du design et du poids des pages. Limite assumée : édition des contenus dans les fichiers, sans interface de CMS.

Documentation officielle consultée : [déploiement d’un dépôt sur un hébergement Hostinger](https://www.hostinger.com/support/1583302-how-to-deploy-a-git-repository-in-hostinger/). Elle confirme la prise en charge des projets HTML personnalisés par les offres concernées. Le type d’offre, le domaine et l’accès au gestionnaire de fichiers restent à vérifier avant mise en ligne ; ne pas confondre hébergement web et constructeur de site.

## Prérequis avant développement

- [x] Public principal identifié : écoles d’ingénieurs.
- [x] Équipe constituée confirmée.
- [x] Méthode et missions générales fournies.
- [x] Marque de travail : Tutelia.
- [x] Piste technique et hébergeur envisagé confirmés.
- [x] Formulaire et/ou rendez-vous souhaités.
- [x] Direction visuelle B — Le fil de progression validée le 2026-09-09.
- [x] Lancement de la première version locale confirmé le 2026-09-09 et version construite.
- [x] Refonte premium encre / minéral / champagne déléguée et construite le 2026-09-09, avec Libre Bodoni / Public Sans et sans photo.

## Prérequis avant publication

- [ ] Nom définitif et vérifications de disponibilité juridique / domaine.
- [ ] Offre Hostinger, domaine, HTTPS et accès de déploiement vérifiés par le propriétaire.
- [ ] Coordonnées professionnelles et destinataire du formulaire fournis.
- [ ] Lien de prise de rendez-vous réel fourni si retenu.
- [ ] Profils, spécialités et modalités d’intervention confirmés.
- [ ] Autorisations pour tout portrait, logo client ou témoignage.
- [ ] Informations légales de l’éditeur et de l’hébergeur complétées.
- [ ] Information relative aux données personnelles adaptée au traitement réellement choisi.
- [ ] Solution d’envoi testée de bout en bout : validation côté serveur, anti-abus, erreurs et remise réelle des messages.
- [ ] Navigation clavier, contrastes, responsive, liens, performances et référencement contrôlés sur la version construite.
- [ ] Déploiement explicitement demandé ; ne pas écraser un site existant sans vérification et sauvegarde.

## Contact et confidentialité : principes proposés

- CTA principal proposé : « Échanger sur vos besoins », vers la zone de contact.
- Dans cette zone : court formulaire et lien secondaire de rendez-vous, si les deux sont retenus.
- Champs proposés : e-mail professionnel et message nécessaires ; nom et établissement à discuter. Téléphone facultatif seulement si un rappel est réellement proposé. Pas de pièces jointes étudiantes.
- Pas de données réelles d’étudiants, de suivi publicitaire ou de scripts de rendez-vous chargés automatiquement.
- Préférer initialement un lien simple vers Calendly plutôt qu’une intégration embarquée ; le service externe n’est pas encore choisi ni connecté.
- HTML seul n’envoie pas d’e-mails : un traitement sécurisé ou un prestataire est nécessaire. Aucun message de succès factice ne devra être présenté.
- Base légale, destinataires et durée de conservation à définir selon le fonctionnement réel ; les textes juridiques restent à valider avant publication.

## Livrables de cette étape

- [Contexte produit](../PRODUCT.md).
- [Contexte marketing](../.agents/product-marketing.md).
- [Proposition visuelle](proposition-visuelle.md).
- [Données des planches de décision](../.impeccable/proposals/directions.json).

La première version locale est désormais construite. La connexion des services de contact et la publication restent hors du périmètre autorisé. Consulter [le guide du projet](../README.md) et [la checklist de mise en ligne](mise-en-ligne.md).