# Données du portfolio

## Ajouter un projet

1. Ouvrez `projects.json`.
2. Dupliquez un bloc dans le tableau `"projects"`.
3. Renseignez :
   - **id** : identifiant unique (ex. `mon-projet`)
   - **slug** : même valeur que `id`, utilisé dans l’URL `/projects/[slug]`
   - **link** : URL du projet en ligne (vide `""` si pas de lien)
   - **github** : URL du repo GitHub (vide `""` si pas de lien)
   - **tech** : tableau de technologies (ex. `["React", "Node.js"]`)
   - **fr** : `title`, `shortDescription`, `detail` (texte affiché sur la page détail)
   - **en** : mêmes champs en anglais

Exemple :

```json
{
  "id": "mon-app",
  "slug": "mon-app",
  "link": "https://mon-app.fr",
  "github": "https://github.com/user/repo",
  "tech": ["Next.js", "TypeScript"],
  "fr": {
    "title": "Mon application",
    "shortDescription": "Résumé court sur la page d’accueil.",
    "detail": "Description longue sur la page du projet. Vous pouvez mettre plusieurs paragraphes."
  },
  "en": {
    "title": "My application",
    "shortDescription": "Short summary on the home page.",
    "detail": "Long description on the project page."
  }
}
```

## Expérience et formation

- **experience.json** : tableau `"experience"` (stages, emplois).
- **experience.json** : tableau `"education"` (études, diplômes).

Chaque entrée a des objets `fr` et `en` avec : `date`, `title`, `subtitle`, `points` (tableau de lignes).
