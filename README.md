# carrefour-tn-automation
Framework d'automatisation de tests E2E pour Carrefour Tunisie (www.carrefour.tn) développé avec Playwright (TypeScript) et Selenium.   Architecture propre basée sur Page Object Model (POM), best practices, configuration multi-environnements et prêt pour CI/CD.   Projet d'entraînement intensif quotidien : 20min coding + architecture + debugging




# Carrefour.tn Automation Framework

**Framework d'automatisation de tests E2E** pour le site e-commerce **Carrefour Tunisie** (`https://www.carrefour.tn`).

Ce projet est mon **entraînement quotidien** pour progresser en test automation avec **Playwright** (principal) et **Selenium**.

---

## 🎯 Objectif du Projet

- Automatiser les parcours utilisateurs critiques du site.
- Appliquer les **best practices** modernes (POM, Config propre, Reporting, etc.).
- Comparer Playwright et Selenium.
- Préparer un portfolio solide avec une architecture claire et maintenable.

---

## 🛠 Technologies

- **Playwright** (TypeScript) → Framework principal
- **Selenium** → Pour comparaison
- Architecture : **Page Object Model (POM)**
- Langage : TypeScript + Python
- Reporting : Playwright HTML + Allure (à venir)

---

## 📁 Structure du Projet

```bash
carrefour-tn-automation/
├── .env.example
├── playwright.config.ts
├── tests/
│   ├── smoke/           # Tests rapides
│   ├── e2e/             # Tests complets
│   └── regression/
├── pages/               # Page Object Model
│   ├── HomePage.ts
│   ├── ProductPage.ts
│   ├── CartPage.ts
│   └── ...
├── fixtures/            # Données de test (users, produits...)
├── utils/               # Helpers communs
├── config/
├── reports/
├── selenium/            # Tests Selenium (comparaison)
└── README.md
