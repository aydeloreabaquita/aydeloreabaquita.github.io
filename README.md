# Aydelore Abaquita — Portfolio

A single-page portfolio site featuring administration, customer support, technical writing, a Sinking Fund automation, an attendance form connected to an automated sheet, graphic design, and video work.

## Structure

```
index.html
assets/
  graphics/   → project images (webp)
  videos/     → football edits, design-process recordings, and poster frames
```

Everything in `index.html` already points at these exact file paths, so no code changes are needed — just push and go live.

## Put this on GitHub (with Pages)

1. Create a new repo on GitHub (e.g. `portfolio`), **don't** initialize it with a README.
2. In this folder, run:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. On GitHub: go to the repo → **Settings → Pages** → under "Build and deployment", set **Source** to `main` branch, `/ (root)` folder → **Save**.
4. GitHub will give you a live URL, usually:
   `https://<your-username>.github.io/<repo-name>/`
   (takes a minute or two to go live after the first push)

## Notes

- The résumé link in the contact section points to `Aydelore_Abaquita_Resume.pdf`. Add that file to the repo root if you want the "View résumé" button to work — it's not included here since it wasn't uploaded.
- Images were converted to `.webp` and downsized (max 1600px) to keep the repo light and the page fast-loading.
