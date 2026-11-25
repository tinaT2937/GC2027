# GNCTR Club at NAIT website

Static site for GitHub Pages. No build step.

## Publish
1. Create a repo on GitHub (e.g. `gnctr-nait`).
2. Upload everything in this folder to the repo root (keep `index.html` at the top level and keep the `assets`, `css`, `js` folders). Use "Add file > Upload files" and drag in the folder contents, including the hidden `.nojekyll` file.
3. Settings > Pages > Build and deployment: Source "Deploy from a branch", Branch `main`, folder `/ (root)`, Save.
4. The site goes live at `https://<username>.github.io/<repo>/` in a minute or two.

## Edit
- Pages: `index.html`, `about.html`, `team.html`, `sponsors.html`, `gallery.html`
- Styles: `css/styles.css`; behaviour: `js/main.js`
- Images/logos: `assets/img/`; sponsorship package PDF: `assets/docs/`
- Add a sponsor: copy a `<div class="logo">` block in the right tier on `sponsors.html` (and the Home "Thank you" row), and drop the logo in `assets/img/`.
