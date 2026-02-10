# Portfolio — Alexis Cesmat-Belliard

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-4-6E9F18?logo=vitest)](https://vitest.dev/)

Portfolio professionnel développé avec **Next.js 15**, **TypeScript** et **Tailwind CSS**. Interface moderne (glassmorphism, animations), bilingue (FR/EN), contenu piloté par des données JSON, avec pipeline CI/CD et couverture de tests.

---

## Sommaire

- [Aperçu](#aperçu)
- [Fonctionnalités](#fonctionnalités)
- [Stack technique](#stack-technique)
- [Prérequis](#prérequis)
- [Installation et lancement](#installation-et-lancement)
- [Structure du projet](#structure-du-projet)
- [Configuration](#configuration)
- [CI/CD](#cicd)
- [Licence](#licence)

---

## Aperçu

Site vitrine one-page présentant le parcours, les compétences et les réalisations. Conçu pour une lecture fluide sur tous les écrans, avec thème clair/sombre et animations discrètes (Framer Motion, GSAP). Le contenu (projets, expériences, formation) est centralisé dans des fichiers JSON pour faciliter les mises à jour sans toucher au code.

---

## Fonctionnalités

| Domaine | Détails |
|--------|---------|
| **Layout** | One-page avec sections : Accueil, Profil, Expérience, Formation, Projets, Contact |
| **Internationalisation** | Français et anglais avec sélecteur de langue (react-i18next) |
| **Responsive** | Mobile-first, breakpoint principal à 1024px (tablettes / iPad inclus) |
| **Animations** | Framer Motion, GSAP, composants dédiés (BlurText, GlassSurface, meteors) |
| **Thème** | Mode clair / sombre (next-themes) |
| **Contenu** | Données dans `data/*.json` pour projets, expériences et formation |
| **Qualité** | Vitest + React Testing Library, tests dans `**/__tests__/` |
| **CI/CD** | GitHub Actions : lint, tests, build sur push/PR vers `main` et `develop` |

---

## Stack technique

| Catégorie | Technologies |
|-----------|--------------|
| Framework | Next.js 15 (App Router), React 18 |
| Langage | TypeScript |
| Styles | Tailwind CSS 4 |
| Animations | Framer Motion, GSAP, Motion |
| i18n | react-i18next, i18next |
| Composants UI | Radix UI + composants custom (accordion, timeline, glass surface) |
| Tests | Vitest, React Testing Library, happy-dom, @testing-library/jest-dom |
| Outillage | ESLint, Prettier |

---

## Prérequis

- **Node.js** 20 ou supérieur  
- **npm** 9 ou supérieur  

---

## Installation et lancement

### 1. Installer les dépendances

```bash
npm install
```

### 2. Lancer en développement

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000). Le projet utilise Turbopack pour le rechargement à chaud.

### 3. Build de production

```bash
npm run build
npm start
```

### Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm run lint` | Exécuter ESLint |
| `npm run test` | Lancer Vitest en mode watch |
| `npm run test:run` | Exécuter les tests une fois (ex. en CI) |
| `npm run test:ui` | Ouvrir l’interface Vitest |

---

## Structure du projet

```
├── app/
│   ├── (client)/              # Routes principales (page, profile, experience, projects, contact)
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── features/               # Sections (HomeSection, ProfileSection, etc.)
│   ├── ui/                     # Composants réutilisables + __tests__
│   ├── Header.tsx
│   └── SectionWrapper.tsx
├── config/
│   ├── i18n.ts
│   └── locales/                # fr.json, en.json
├── data/
│   ├── experience.json         # Expériences et formation (fr/en)
│   └── projects.json           # Projets (fr/en)
├── hooks/                      # useIsMobile, useHideHeaderOnScroll, etc.
├── lib/                        # Helpers données, utils + __tests__
├── .github/workflows/
│   └── ci.yml                  # Lint, test, build
├── vitest.config.ts
└── next.config.ts
```

---

## Configuration

### Contenu (sans modifier le code)

- **Projets** — Fichier `data/projects.json` : ajout/suppression d’entrées, champs `fr` / `en` (title, shortDescription, detail, date, role, points).
- **Expérience et formation** — Fichier `data/experience.json` : tableaux `experience` et `education`, chaque entrée avec `fr` et `en` (date, title, subtitle, mention?, description?, points).

Détail des champs : voir `data/README.md`.

### Traductions

- Chaînes d’interface (navigation, titres de sections, boutons, etc.) : `config/locales/fr.json` et `config/locales/en.json`.

---

## CI/CD

Le workflow GitHub Actions (`.github/workflows/ci.yml`) s’exécute sur les push et pull requests vers `main` et `develop` :

1. Checkout et configuration Node 20  
2. `npm ci`  
3. `npm run lint`  
4. `npm run test:run`  
5. `npm run build`  

---

## Licence

Projet personnel. Tous droits réservés.
