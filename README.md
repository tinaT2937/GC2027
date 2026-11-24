# GNCTR NAIT website

Static site (no build step). Open `index.html` or host the folder as-is.

```
index.html          page markup
css/styles.css      all styles
js/main.js          all scripts (team lists are at the top of this file)
assets/img/         logo, team, sponsor and gallery photos
assets/docs/        sponsorship package PDF
.nojekyll           tells GitHub Pages to serve files as they are
```

## Host on GitHub Pages
1. Create a repository and upload everything in this folder to the repo root (so `index.html` is at the top level).
2. Repo Settings > Pages > Source: "Deploy from a branch", Branch: `main`, folder `/ (root)`, then Save.
3. After a minute the site is live at `https://<username>.github.io/<repo-name>/`.

## Common edits
- Executive and team leaders: edit the `EXEC` and `LEADERS` lists at the top of `js/main.js`. Put photos in `assets/img/team/`.
- Replace the sponsorship package: overwrite `assets/docs/GNCTR_at_NAIT_2027_Sponsorship_Package.pdf` with the same file name.
- New sponsor logo or gallery photo: add the file under `assets/img/` and copy an existing sponsor chip or gallery item in `index.html`.
