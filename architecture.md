# Architecture du Calculateur de Rentabilité SMMA/IA

## Contexte

Ewen (fondateur Agentscium) a besoin d'une application web pour démontrer le ROI de ses prestations SMMA/IA en call de vente. L'outil simule 5 scénarios (optimiste → pessimiste) avec calculs temps réel, sans backend. Le projet part de zéro.

---

## 1. Structure des fichiers

```
Ads_calculator/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Layout racine (metadata, fonts)
│   │   ├── page.tsx                # Page unique — compose les 3 sections
│   │   └── globals.css             # Directives Tailwind + reset
│   ├── components/
│   │   ├── ClientDataForm.tsx      # Section haute : 6 inputs fixes
│   │   ├── ScenarioTable.tsx       # Section centrale : conteneur 5 colonnes
│   │   ├── ScenarioColumn.tsx      # 1 colonne = inputs + résultats calculés
│   │   ├── RemunerationSection.tsx # Section basse : commission + ROI
│   │   ├── InputField.tsx          # Input réutilisable (label, unité, type number)
│   │   └── ResultRow.tsx           # Ligne de résultat formatée + couleur
│   ├── lib/
│   │   ├── types.ts                # Interfaces TypeScript (state, inputs, résultats)
│   │   ├── calculations.ts         # Fonctions pures de calcul (cœur métier)
│   │   ├── format.ts               # Formatage monétaire/numérique (Intl.NumberFormat fr-FR)
│   │   └── constants.ts            # Valeurs par défaut, couleurs scénarios, labels
│   └── hooks/
│       └── useCalculator.ts        # Hook useReducer centralisé
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
├── package.json
└── PRD.md
```

**11 fichiers source** — chacun a une responsabilité unique, pas d'over-engineering.

---

## 2. Gestion du state

**Choix : `useReducer`** dans un hook `useCalculator` — un seul dispatch propagé par props depuis `page.tsx`. Pas de Context React (un seul écran, 3 sections enfants directs).

### Types clés (`types.ts`)

| Interface | Contenu |
|---|---|
| `ClientData` | 6 champs : panierMoyen, profitPercent, leadToRdvPercent, rdvToVentePercent, budgetAdsAnnuel, fraisInstallation |
| `ScenarioInputs` | 3 champs : cpl, leadToRdvOverride, rdvToVenteOverride |
| `ScenarioResults` | 5 champs calculés : volumeLeads, volumeRdv, volumeTransactions, caGenere, profitGenere |
| `RemunerationResults` | 5 champs calculés : commissionPerformance, remunerationTotale, coutMarketingTotal, profitNetSupplementaire, probabilite50 |
| `AppState` | clientData + scenarios[5] + commissionPercent |
| `AppAction` | 3 actions : UPDATE_CLIENT_DATA, UPDATE_SCENARIO, UPDATE_COMMISSION |

**Les résultats ne sont PAS dans le state** — ils sont dérivés au rendu via les fonctions de `calculations.ts`.

---

## 3. Composants React

| Composant | Responsabilité |
|---|---|
| `page.tsx` | Instancie `useCalculator()`, rend les 3 sections, passe state + dispatch par props |
| `ClientDataForm` | Grille 3×2 de 6 `InputField`, dispatche `UPDATE_CLIENT_DATA` |
| `ScenarioTable` | Conteneur grid 6 colonnes (labels + 5 `ScenarioColumn`) |
| `ScenarioColumn` | 3 inputs + résultats calculés via `computeScenarioResults()` + code couleur |
| `RemunerationSection` | 1 input commission + tableau ROI 5 colonnes via `computeRemunerationResults()` |
| `InputField` | Input number réutilisable avec label, unité (€ ou %), addon visuel |
| `ResultRow` | Affiche un résultat formaté avec couleur conditionnelle (vert/rouge) |

---

## 4. Logique de calcul (`calculations.ts`)

Deux fonctions pures :

### `computeScenarioResults(clientData, scenario)` → ScenarioResults

- Volume leads = budget ads / CPL
- Volume RDV = leads × % lead→RDV
- Volume transactions = RDV × % RDV→vente
- CA = transactions × panier moyen
- Profit = CA × % profit
- Guard : si CPL ≤ 0, retourne tout à 0

### `computeRemunerationResults(scenarioResults, clientData, commissionPercent)` → RemunerationResults

- Commission = profit × % commission
- Rémunération totale = commission + frais installation
- Coût marketing total = budget ads + commission
- Profit net = profit − coût marketing total
- Probabilité 50% = profit net × 0.5

---

## 5. Formatage (`format.ts`)

Utilise `Intl.NumberFormat('fr-FR')` natif :

- `formatCurrency(value)` → `"1 234 €"` (espace insécable, euro à droite)
- `formatNumber(value)` → `"1 234,5"`
- Guard : si `!isFinite(value)` → affiche `"—"`

---

## 6. Design et responsive

### Layout

- **Page** : `max-w-7xl mx-auto`, 3 sections empilées verticalement
- **Tableau scénarios** : `grid grid-cols-6 gap-4`, scroll horizontal sous 1280px
- **Inputs client** : grille 3×2

### Couleurs des scénarios (gradient gauche → droite)

| Scénario | Couleur | Label |
|---|---|---|
| #1 | `bg-emerald-50` / `border-emerald-300` | Excellent |
| #2 | `bg-emerald-50/60` / `border-emerald-200` | Bon |
| #3 | `bg-amber-50` / `border-amber-200` | Moyen |
| #4 | `bg-orange-50` / `border-orange-200` | Difficile |
| #5 | `bg-red-50` / `border-red-200` | Pessimiste |

### Valeurs conditionnelles

- Positif : `text-emerald-600 font-semibold`
- Négatif : `text-red-600 font-semibold`

### Typographie

- Font système Tailwind (`font-sans`)
- Titres : `text-lg font-semibold text-gray-900`
- Labels : `text-sm font-medium text-gray-700`
- Valeurs grandes : `text-xl font-bold`

---

## 7. Valeurs par défaut (`constants.ts`)

### Scénarios

| | #1 | #2 | #3 | #4 | #5 |
|---|---|---|---|---|---|
| CPL | 10€ | 20€ | 50€ | 70€ | 100€ |
| % Lead → RDV | 30% | 30% | 30% | 30% | 20% |
| % RDV → Vente | 10% | 10% | 10% | 10% | 10% |

### Client (pré-remplissage)

- Panier moyen : 5 000 €
- % Profit : 30%
- % Lead → RDV : 30%
- % RDV → Vente : 10%
- Budget ads annuel : 12 000 €
- Frais d'installation : 1 500 €
- % Commission : 10%

---

## 8. Ordre d'implémentation

1. `npx create-next-app` avec TypeScript + Tailwind + App Router
2. `src/lib/types.ts` — interfaces TypeScript
3. `src/lib/constants.ts` — valeurs par défaut
4. `src/lib/calculations.ts` — fonctions de calcul
5. `src/lib/format.ts` — formatage monétaire
6. `src/hooks/useCalculator.ts` — reducer + hook
7. `src/components/InputField.tsx` + `ResultRow.tsx` — composants atomiques
8. `src/components/ClientDataForm.tsx` — section haute
9. `src/components/ScenarioColumn.tsx` + `ScenarioTable.tsx` — section centrale
10. `src/components/RemunerationSection.tsx` — section basse
11. `src/app/page.tsx` — assemblage final
12. Ajustements responsive + polish visuel

---

## 9. Vérification

- [ ] Modifier chaque input → les calculs se mettent à jour instantanément
- [ ] Vérifier les 5 scénarios avec les valeurs par défaut du PRD
- [ ] Tester CPL = 0 → pas de crash, affichage gracieux (`"—"`)
- [ ] Format monétaire : `12 000 €` avec espaces, pas de décimales
- [ ] Viewport 1280px → tout visible sans scroll vertical excessif
- [ ] Code couleur : scénario #1 vert, #5 rouge
- [ ] Aucune requête réseau (tout côté client)
