# Aydelore Abaquita Portfolio — Cinematic Brown Theme

A responsive personal portfolio built with plain HTML, CSS, and JavaScript for GitHub Pages. This version uses a dark espresso, warm brown, cream, and muted-gold visual system inspired by editorial film and theater portfolios.

## Main files

- `index.html` — content and page structure
- `styles.css` — complete cinematic theme and responsive layout
- `script.js` — experience tabs, project tabs, mobile menu, lightbox, modal, and reveal effects
- `assets/images/profile-photo.png` — portfolio portrait
- `assets/images/` — graphic-design samples and site artwork
- `assets/videos/` — place future role and editing videos here
- `assets/Aydelore-Abaquita-Resume.pdf` — résumé download

## Replace the current files in VS Code

1. Extract the ZIP.
2. Copy everything inside the extracted `aydelore-portfolio` folder.
3. Paste the files directly into the root of your local `aydeloreabaquita.github.io` folder.
4. Choose **Replace the files in the destination** when prompted.
5. Keep the hidden `.git` folder in your GitHub repository. Do not delete it.

The correct structure is:

```text
aydeloreabaquita.github.io/
├── assets/
│   ├── images/
│   │   └── profile-photo.png
│   └── videos/
├── index.html
├── styles.css
├── script.js
├── README.md
└── .gitignore
```

## Preview locally

In VS Code, right-click `index.html` and select **Open with Live Server**.

## Upload the redesign

Run these commands in the VS Code terminal while the `aydeloreabaquita.github.io` folder is open:

```bash
git status
git add -A
git commit -m "Apply cinematic brown portfolio redesign"
git push origin main
```

Then visit `https://aydeloreabaquita.github.io` and use **Ctrl + F5** if the previous design is cached.

## Add LinkedIn and project links

Open `index.html` and search for:

```text
https://www.linkedin.com/
```

Replace it with your full LinkedIn profile URL.

Search for:

```text
data-placeholder-link
```

Replace the placeholder `href="#"` values with the correct Sheet, demo, or GitHub URLs, then remove `data-placeholder-link` from those links.

## Add role videos

Place MP4 files inside `assets/videos/`. The role cards currently open a styled placeholder modal. When a role video is ready, replace that role’s `.role-video` block with a standard HTML `<video>` element.

Recommended export:

- MP4, H.264
- 1080p
- Approximately 60–120 seconds per role
- Compressed before uploading to GitHub

## Change the colors

The main theme colors are at the top of `styles.css`:

```css
--night: #090604;
--brown: #2c170d;
--cream: #f3e8d9;
--gold: #d5aa79;
```

Changing those four values updates most of the site.
