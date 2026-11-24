# GNCTR NAIT website

Static multi-page site, no build step. Open `index.html`, or host the folder as-is.

Pages: `index.html` (home), `about.html`, `teams.html`, `sponsors.html`, `letter.html`, `gallery.html`
Shared: `css/styles.css`, `js/main.js`, `assets/` (images, sponsorship package PDF), `.nojekyll`

## GitHub Pages
1. Upload everything in this folder to the root of a repo.
2. Settings > Pages > Deploy from a branch > `main` / root > Save.
3. Live at `https://<username>.github.io/<repo-name>/` after a minute.

## Edits
- Headline font: change `--display` at the top of `css/styles.css`.
- Navigation and footer are repeated in each page, so edit them in all six files.
- Add a sponsor: copy a `.logo` block in `sponsors.html` and `index.html`, and add the file to `assets/img/sponsors/`.
