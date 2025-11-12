# Modern Calculator

A sleek, responsive calculator with dark mode support and keyboard functionality.

## Features

- **Modern Design**: Clean, gradient-based UI with smooth animations
- **Dark Mode**: Toggle between light and dark themes
- **Responsive**: Works on desktop, tablet, and mobile devices
- **Keyboard Support**: Use keyboard for input (numbers, operators, Enter for equals, Backspace for delete, C for clear)
- **Smooth Animations**: Button hover effects and screen update animations
- **Decimal Support**: Added decimal point functionality

## Controls

- **Mouse**: Click buttons to input
- **Keyboard**:
  - Numbers: 0-9
  - Operators: +, -, *, /
  - Decimal: .
  - Equals: Enter or =
  - Clear: C or c
  - Backspace: Backspace key

## Technologies Used

- HTML5
- CSS3 (with CSS Grid and Flexbox)
- Vanilla JavaScript
- Google Fonts (Inter)

## Running the Calculator

1. Open `index.html` in a web browser
2. Or run a local server: `python3 -m http.server 8000`
3. Navigate to `http://localhost:8000`

## Deploying to GitHub Pages

This repository includes a GitHub Actions workflow that will automatically publish the site to GitHub Pages on every push to the `main` branch.

What I added:
- `.github/workflows/deploy-gh-pages.yml` — action that publishes the repository root to the `gh-pages` branch using `peaceiris/actions-gh-pages`.
- `.nojekyll` — prevents GitHub Pages from processing the site with Jekyll (so files like those starting with `_` won't be filtered).

How to enable deployment:

1. Commit and push your changes to the `main` branch on GitHub.
2. GitHub Actions will run the workflow and push a `gh-pages` branch containing the published site.
3. In your repository on GitHub go to Settings → Pages and set Source to `gh-pages` branch (if GitHub doesn't already show the published site). The Actions workflow usually sets up the `gh-pages` branch automatically but you may need to select it once.

Notes & troubleshooting:
- The workflow uses the built-in `GITHUB_TOKEN` so no extra secrets are required.
- If you prefer the Pages source to be `docs/` on `main`, I can adjust the workflow to publish to that instead.
- I cannot push to your remote from here. After these files are in your repo, push to GitHub to trigger the action:

```bash
git add .
git commit -m "Add GitHub Pages deployment workflow"
git push origin main
```

After the push, open the Actions tab in GitHub to watch the deploy job. Once it completes, visit your repository's Pages URL (often `https://<username>.github.io/<repo>/`).

## Browser Support

Works in all modern browsers that support CSS Grid and ES6+ JavaScript.