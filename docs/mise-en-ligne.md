# Checklist de mise en ligne — Hostinger

**Statut : publication non effectuée et non autorisée dans cette étape.** Ce document prépare la suite ; la version actuelle est une démonstration locale.

## 1. Valider les informations

- [ ] Nom définitif et disponibilité du nom de domaine/marque vérifiés.
- [ ] Textes et périmètre des missions approuvés.
- [ ] Expertises de l’équipe vérifiées ; aucune couverture universelle revendiquée sans preuve.
- [ ] Profils, photos, logos ou témoignages utilisés avec autorisation, s’ils sont ajoutés.
- [ ] Informations légales complétées dans [la page dédiée](../site/mentions-legales.html).
- [ ] Notice de confidentialité adaptée aux traitements réellement retenus.

## 2. Rendre le contact réellement utilisable

- [ ] Adresse professionnelle et destinataire réel confirmés.
- [ ] Solution d’envoi choisie et explicitement autorisée : traitement côté serveur ou service adapté.
- [ ] Validation côté serveur, anti-abus, erreurs et succès réels implémentés.
- [ ] Aucun message, e-mail ou donnée d’étudiant dans les URLs et journaux.
- [ ] Finalité, base légale, destinataires, conservation et contact relatif aux droits définis.
- [ ] Envoi testé de bout en bout jusqu’à la réception, pas seulement réponse HTTP.
- [ ] Texte et bouton de démonstration remplacés uniquement lorsque l’envoi est opérationnel.
- [ ] Si souhaité, bouton de rendez-vous remplacé par un lien HTTPS réel et explicite ; pas d’intégration externe automatique.

La politique de sécurité actuelle interdit les connexions et les soumissions de formulaire. L’activation d’un traitement devra modifier **de façon ciblée** la politique dans [site/.htaccess](../site/.htaccess) et le serveur local, sans ajouter de permissions génériques ni de secrets au code public.

## 3. Préparer l’hébergement

- [ ] Offre Hostinger acceptant un site HTML personnalisé confirmée — ne pas confondre avec un constructeur de site fermé.
- [ ] Domaine et racine d’hébergement identifiés.
- [ ] Région d’hébergement, journaux et contrat vérifiés selon le besoin.
- [ ] Site existant sauvegardé avant toute opération de remplacement.
- [ ] Certificat HTTPS et redirection HTTP → HTTPS configurés via l’hébergeur.

Le serveur inclus ici sert uniquement à la prévisualisation et écoute sur la machine locale. **Il ne doit pas être déployé comme serveur de production.**

## 4. Préparer l’indexation

La préversion bloque volontairement l’indexation. Une fois la version publique prête :

- [ ] Retirer les métadonnées `noindex, nofollow` des pages à indexer.
- [ ] Retirer l’en-tête `X-Robots-Tag` de préversion dans [site/.htaccess](../site/.htaccess).
- [ ] Remplacer le blocage global dans [site/robots.txt](../site/robots.txt).
- [ ] Ajouter le domaine réel dans les URLs canoniques et métadonnées pertinentes.
- [ ] Générer un sitemap avec uniquement les URLs publiques réelles.
- [ ] Vérifier les titres, descriptions, liens et réponses 404.

Le `noindex` n’est pas une protection d’accès : si un aperçu est publié avant validation, le protéger au niveau de l’hébergement. Une interdiction de crawl ne doit pas être utilisée pour désindexer à elle seule une page déjà connue d’un moteur.

## 5. Générer, transférer, contrôler

- [ ] Exécuter `npm run verify` et traiter les erreurs.
- [ ] Générer les fichiers avec `npm run build` après les dernières modifications.
- [ ] Autorisation explicite de déploiement obtenue.
- [ ] Transférer uniquement **le contenu du dossier de sortie dist/** vers la racine publique de l’hébergement, généralement public_html, après vérification de l’offre.
- [ ] Inclure les fichiers cachés de configuration, les assets et les licences de polices.
- [ ] Ne pas transférer les documents du dépôt, les dépendances, les captures ni les résultats des tests.
- [ ] Tester en ligne l’accueil, les liens, les polices, les erreurs 404 et HTTPS.
- [ ] Vérifier que les en-têtes sont appliqués par l’hébergeur ; leur présence en local n’en est pas la preuve.
- [ ] Tester de nouveau la réception réelle des messages et le lien de rendez-vous.

Les chemins de la page 404 sont prévus pour un déploiement à la racine du domaine. Adapter ces chemins si le site est placé dans un sous-dossier.