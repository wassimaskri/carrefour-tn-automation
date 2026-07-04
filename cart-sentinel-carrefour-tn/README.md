# Cart Sentinel Carrefour TN

Mini projet de test automation e-commerce sur [Carrefour Tunisie](https://www.carrefour.tn/), construit pour démontrer une approche QA Automation propre, maintenable et orientée risque.

Le nom **Cart Sentinel** reflète l'objectif du framework : surveiller les parcours qui impactent directement l'expérience client et la conversion, avec un mindset QA senior.

## Why This Project Stands Out

- Stack moderne : Playwright, Cucumber, TypeScript, Page Object Model.
- Clean Architecture lisible par QA, PO et développeurs.
- Scénarios e-commerce réalistes : home, recherche, fiche produit, panier, navigation, compte, wishlist, newsletter, footer.
- Tags orientés risque : `@smoke`, `@risk`, `@negative`, `@conversion`, `@header`, `@account`, `@footer`.
- Lecture fonctionnelle senior : risques business, contraintes site réel, comportements anonymes et signaux de conversion.
- Screenshots et vidéos en cas d'échec.
- Rapport HTML Cucumber prêt pour partage.
- Configuration via `.env` pour exécution locale, CI ou debug headed.

## Architecture

```txt
Feature files
   ↓
Step definitions
   ↓
Page Objects
   ↓
Base Page
   ↓
Playwright APIs
```

```txt
cart-sentinel-carrefour-tn/
├── features/
├── reports/
├── screenshots/
├── scripts/
├── src/
│   ├── config/
│   ├── core/
│   ├── pages/
│   ├── steps/
│   ├── support/
│   └── utils/
├── videos/
├── cucumber.js
├── playwright.config.ts
├── package.json
└── README.md
```

## Covered Flows

| Area | Scenarios | QA angle |
| --- | --- | --- |
| Home page | Page displayed, search bar visible | Availability and entry point readiness |
| Search | Existing product, no-result product | Conversion and negative UX |
| Product details | Open first result, validate name and price | Decision information integrity |
| Cart | Add, update quantity, remove | Revenue path integrity |
| Navigation | Header, category menu, store locator, help center | Discoverability and support access |
| Customer | Sign in, wishlist, newsletter validation | Account entry and CRM quality |
| Content | Footer service links, social links | Trust, support and brand presence |

## Functional QA Layer

This repository includes a human QA layer, not only automation code:

- [QA Strategy](docs/qa-strategy.md): risk model, scope, constraints and release confidence.
- [Exploratory Test Charter](docs/test-charter.md): personas, heuristics and product questions.

The goal is to show that the framework is driven by business risk and user behavior, not by selector collection.

## Setup

```bash
npm install
npx playwright install
```

Copy `.env.example` to `.env` if needed, then adjust:

```env
BASE_URL=https://www.carrefour.tn
BROWSER=chromium
HEADLESS=true
DEFAULT_TIMEOUT_MS=15000
```

## Commands

```bash
npm run test
npm run test:headed
npm run test:smoke
npm run test:risk
npm run test:navigation
npm run test:customer
npm run test:content
npm run test:cart
npm run test:search
npm run test:product
npm run report
npm run lint
npm run typecheck
```

## Reporting

After execution, Cucumber generates:

- `reports/cucumber-report.html`
- `reports/cucumber-report.json`
- screenshots attached to failed scenarios
- videos in `videos/` when configured

A portfolio-friendly static sample is included at:

```txt
reports/sample-report.html
```

## Senior QA Notes

This project is intentionally small, but the design decisions are professional:

- Gherkin remains business-readable.
- Steps orchestrate behavior only.
- Page Objects own selectors and UI interactions.
- `BasePage` centralizes common Playwright actions.
- `.env` keeps runtime behavior configurable.
- Tags enable risk-based execution.
- Failure evidence is collected automatically.
- Live-site constraints are isolated in Page Objects so the feature language stays clean.
- Anonymous customer behavior is treated as a valid functional path, especially for account and wishlist.
- Negative scenarios validate quality of recovery, not only happy-path coverage.

## LinkedIn Post

Mini projet personnel : **Cart Sentinel Carrefour TN**

J'ai construit un mini-framework de test automation e-commerce autour de Carrefour Tunisie avec Playwright, Cucumber, TypeScript et Page Object Model.

Objectif : montrer une architecture propre, maintenable et proche d'un contexte professionnel, avec un mindset QA orienté risque.

Parcours couverts :

- affichage de la home page
- recherche produit
- gestion du no-result
- fiche produit
- ajout, modification et suppression panier
- navigation header/menu
- compte, wishlist et newsletter
- footer/support/social links

Le projet inclut reporting HTML, screenshots en cas d'échec, exécution headless/headed et tags de risque pour piloter les tests critiques.

## CV Version

**Cart Sentinel Carrefour TN - E-commerce Test Automation Framework**

Conception d'un mini-framework QA Automation avec Playwright, TypeScript, Cucumber, Page Object Model et Clean Architecture. Automatisation de parcours e-commerce critiques : home page, recherche produit, fiche produit, panier, navigation, compte, wishlist, newsletter, footer et support. Mise en place du reporting HTML, screenshots en cas d'échec, configuration multi-environnement via `.env` et exécution orientée risque avec tags Cucumber.

## Author

Wassim Askri - QA Automation Engineer
