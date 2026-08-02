# Aydelore Abaquita Portfolio — Cinematic Brown Theme

A responsive personal portfolio built with plain HTML, CSS, and JavaScript for GitHub Pages. This version uses a dark espresso, warm brown, cream, and muted-gold visual system inspired by editorial film and theater portfolios.

## Main files

- `index.html` — content and page structure
- `styles.css` — complete cinematic theme and responsive layout
- `script.js` — experience tabs, project tabs, mobile menu, lightbox, modal, and reveal effects
- `assets/images/profile-photo.png` — portfolio portrait
- `assets/images/` — graphic-design samples and site artwork
- `assets/videos/` — place future role and editing videos here
- `assets/resume - Aydelore Abaquita.pdf` — résumé download

## Replace the current files in VS Code

1. Extract the ZIP.
2. Copy everything inside the extracted `aydeloreabaquita.github.io-final` folder.
3. Paste the files directly into the root of your local `aydeloreabaquita.github.io` folder.
4. Choose **Replace the files in the destination** when prompted.
5. Keep the hidden `.git` folder in your GitHub repository. Do not delete it.

The correct structure is:

```text
aydeloreabaquita.github.io/
├── assets/
│   ├── images/
│   │   ├── profile-photo.png
│   │   └── portfolio image files...
│   ├── videos/
│   │   └── add your MP4 files here
│   └── resume - Aydelore Abaquita.pdf
├── index.html
├── styles.css
├── script.js
├── README.md
└── .gitignore
```

## Final revision included

- Player Data & Follow-up System removed from the Automations section
- Resume button placed beside Explore Experience and View Portfolio
- Resume link matched to `resume - Aydelore Abaquita.pdf`
- Portrait and portfolio images stored in the correct `assets/images/` folder
- Video modal configured to load MP4 files from `assets/videos/` and show a clear message when a file has not yet been added

**Important:** the ZIP includes the full image set and résumé. Your personal role and editing MP4 files are not included because they have not been provided in this chat. Add them to `assets/videos/` using the filenames below.

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

Place MP4 files inside `assets/videos/`. The role and video-editing cards already use the built-in video modal. Add each MP4 to `assets/videos/` with the exact filename listed below; no HTML change is needed.

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


## Media file setup

All image and video paths are case-sensitive on GitHub Pages. Keep the folders and filenames exactly as written.

### Portfolio images

Place graphic-design images in `assets/images/`. The current design expects these files:

- `delicious-american-food-ad.webp`
- `luxury-home-for-sale.webp`
- `kierstin-bellamiere-first-birthday.webp`
- `hot-wheels-gable-box.webp`
- `messi-sports-poster.webp`
- `tenz-gaming-poster.webp`
- `foodie-restaurant-menu.webp`
- `senior-graphic-artist-hiring-post.webp`

### Role videos

Place MP4 files in `assets/videos/` using these exact names:

- `futxperform-role.mp4`
- `speak-globally-role.mp4`
- `appeals-assassins-role.mp4`
- `5ca-role.mp4`
- `loving-not-working-role.mp4`
- `signifyd-role.mp4`
- `ebay-role.mp4`
- `qualfon-role.mp4`

### Video-editing samples

- `sports-highlight.mp4`
- `motion-graphics.mp4`
- `social-video.mp4`

Use MP4 files encoded with H.264 video and AAC audio for the widest browser compatibility. After adding media, run `git add -A`, commit, and push again.
