PRD.mdJE 
## Calculateur de Rentabilité SMMA/IA

**Projet :** Agentscium
**Auteur :** Ewen
**Date :** Mars 2026
**Version :** 1.0

---

## 1. Objectif du produit

Application web permettant de calculer la rentabilité d'une prestation SMMA/IA pour un client. L'outil génère automatiquement 5 scénarios (du pire au meilleur) afin de démontrer concrètement la valeur apportée et justifier le pricing en call ou en prospection.

### Problème résolu

- Difficulté à justifier son prix face à un prospect
- Manque d'outil visuel et chiffré pour montrer le ROI
- Besoin de simuler plusieurs scénarios pour gérer les objections

### Utilisateur cible

Ewen (fondateur Agentscium) — utilisé en call de vente ou en préparation d'offre commerciale pour des clients dans le secteur nautique et autres niches B2B.

---

## 2. Modèle de données

### 2.1 Inputs fixes — Données client

| Variable | Type | Unité | Description |
|---|---|---|---|
| Panier moyen | Number | € | Valeur moyenne d'une vente/intervention |
| % Profit | Number | % | Marge bénéficiaire du client |
| % Lead → RDV | Number | % | Taux de conversion lead vers rendez-vous (défaut) |
| % RDV → Vente | Number | % | Taux de conversion RDV vers vente (défaut) |
| Budget ads annuel | Number | € | Budget publicitaire annuel du client |
| Frais d'installation | Number | € | Frais one-time de setup |

### 2.2 Inputs par scénario (×5)

| Variable | Type | Unité | Description |
|---|---|---|---|
| Coût par lead (CPL) | Number | € | Coût d'acquisition d'un lead sur Meta Ads |
| % Lead → RDV | Number | % | Override par scénario (optionnel) |
| % RDV → Vente | Number | % | Override par scénario (optionnel) |

Les scénarios sont numérotés de #1 (optimiste — CPL bas) à #5 (pessimiste — CPL élevé).

---

## 3. Formules de calcul

### 3.1 Résultats (par scénario)

| Calcul | Formule |
|---|---|
| Volume de leads | Budget ads annuel ÷ Coût par lead |
| Volume de RDV | Volume de leads × % Lead → RDV |
| Volume de transactions | Volume de RDV × % RDV → Vente |
| CA généré | Volume de transactions × Panier moyen |
| Profit généré | CA généré × % Profit |

### 3.2 Rémunération (pricing)

| Calcul | Formule |
|---|---|
| % de commission | Input — pourcentage sur le profit généré |
| Commission performance | Profit généré × % de commission |
| Rémunération totale | Commission performance + Frais d'installation |

### 3.3 ROI client

| Calcul | Formule |
|---|---|
| Coût marketing total | Budget ads + Commission performance |
| Profit net supplémentaire | Profit généré − Coût marketing total |
| Probabilité de réussite (50%) | Profit net supplémentaire × 0.5 |

---

## 4. Structure de l'application

### 4.1 Écran unique (Single Page App)

L'application tient sur un seul écran divisé en sections :

1. **Section haute — Données client :** formulaire avec les 6 inputs fixes
2. **Section centrale — Tableau des scénarios :** 5 colonnes côte à côte avec inputs variables + résultats calculés en temps réel
3. **Section basse — Rémunération & ROI :** % de commission (input) + calculs automatiques par scénario

### 4.2 Comportement

- Tous les calculs se font en temps réel (à chaque modification d'input)
- Les scénarios sont affichés côte à côte en colonnes
- Code couleur : vert pour les bons scénarios, rouge/orange pour les mauvais
- Format monétaire européen (€, séparateur milliers)
- Responsive (utilisable sur laptop en call)

---

## 5. Stack technique

| Composant | Technologie |
|---|---|
| Framework | Next.js (React) |
| Styling | Tailwind CSS |
| State management | React useState / useReducer |
| Déploiement | Vercel |
| Base de données | Aucune (calculs côté client uniquement) |

---

## 6. Valeurs par défaut des scénarios

Valeurs pré-remplies modifiables par l'utilisateur :

| | Scénario #1 | Scénario #2 | Scénario #3 | Scénario #4 | Scénario #5 |
|---|---|---|---|---|---|
| Coût par lead | 10€ | 20€ | 50€ | 70€ | 100€ |
| % Lead → RDV | 30% | 30% | 30% | 30% | 20% |
| % RDV → Vente | 10% | 10% | 10% | 10% | 10% |

---

## 7. Critères d'acceptation

1. Les calculs se mettent à jour en temps réel sans rechargement
2. Les 5 scénarios sont visibles simultanément
3. Les montants sont formatés en euros avec séparateur de milliers
4. L'application est utilisable sur un écran laptop (min 1280px)
5. Aucune donnée n'est envoyée à un serveur (tout est côté client)
6. Les inputs par scénario sont indépendants et modifiables

---

## 8. Évolutions futures (hors scope v1)

- Export PDF du tableau pour envoyer au client
- Sauvegarde des simulations (localStorage ou Supabase)
- Mode présentation (plein écran pour partage d'écran)
- Graphique visuel comparant les scénarios
- Multi-devises (CAD / EUR)