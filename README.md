# Aydelore Abaquita Portfolio

A responsive, monochrome portfolio website built with plain HTML, CSS, and JavaScript for deployment through GitHub Pages.

## Files

- `index.html` — all page content and portfolio sections
- `styles.css` — visual design and responsive layout
- `script.js` — tabs, mobile menu, lightbox, modal, and reveal animations
- `assets/images/` — profile image, design samples, favicon, and social-share image
- `assets/videos/` — add role videos and editing samples here
- `assets/Aydelore-Abaquita-Resume.pdf` — current résumé copied from the existing site

## Open the site locally

1. Open the folder in VS Code.
2. Install the **Live Server** extension if it is not installed.
3. Right-click `index.html` and choose **Open with Live Server**.

Opening `index.html` directly in a browser also works, but Live Server is more convenient while editing.

## Deploy to the existing GitHub Pages URL

1. Back up the current repository.
2. Copy these files into the root of the `aydeloreabaquita.github.io` repository.
3. Commit the changes.
4. Push to the branch used by GitHub Pages, normally `main`.
5. Wait a few minutes, then refresh `https://aydeloreabaquita.github.io/`.

## Personalize before publishing

### 1. Add your portrait

Replace:

`assets/images/profile-placeholder.svg`

You can keep the same filename, even if the file is a JPG or PNG, but then update the file extension in `index.html`.

### 2. Manage your design samples

Eight existing design samples from the current portfolio are already included in `assets/images/`.

To add another sample:

1. Put the JPG, PNG, or WebP file in `assets/images/`.
2. Duplicate a `.design-card` block in the Graphic Design panel inside `index.html`.
3. Update the image path, alternative text, project category, title, and lightbox caption.

### 3. Add role videos

The role cards already reference these filenames:

- `assets/videos/futxperform-role.mp4`
- `assets/videos/speak-globally-role.mp4`
- `assets/videos/appeals-assassins-role.mp4`
- `assets/videos/5ca-role.mp4`
- `assets/videos/loving-not-working-role.mp4`
- `assets/videos/signifyd-role.mp4`
- `assets/videos/ebay-role.mp4`
- `assets/videos/qualfon-role.mp4`

The current buttons open a polished placeholder modal. To show actual videos, replace the `.role-video` placeholder block with:

```html
<video class="role-video-player" controls preload="metadata">
  <source src="assets/videos/futxperform-role.mp4" type="video/mp4" />
  Your browser does not support video playback.
</video>
```

Then add this to `styles.css`:

```css
.role-video-player {
  width: 100%;
  border: 1px solid rgba(255,255,255,.14);
  border-radius: 20px;
  background: #000;
}
```

### 4. Add links to Sheets and demos

Search `index.html` for:

`data-placeholder-link`

The Attendance and Sinking Fund links are already connected to the projects from the current portfolio. Replace the remaining `href="#"` values with your player-management sheet, GitHub repository, or live project URLs, then remove `data-placeholder-link`.

### 5. Add LinkedIn

Search for:

`https://www.linkedin.com/`

Replace it with your complete profile URL and change **Add LinkedIn profile** to your preferred label.

### 6. Update the résumé

Replace `assets/Aydelore-Abaquita-Resume.pdf` with your latest résumé using the same filename.

### 7. Change wording

All text is directly inside `index.html`. Search for the role name or section title and edit it there.

## Video recommendations

- Use MP4 with H.264 encoding for broad browser support.
- Keep each role video between 60 and 120 seconds.
- Export at 1080p when possible.
- Compress large videos before pushing them to GitHub.
- Consider YouTube or Vimeo embeds if the repository becomes too large.

## Notes

- The site uses Google Fonts when online and falls back to common local fonts.
- The experience tabs are keyboard accessible.
- The layout adapts to desktop, tablet, and mobile screens.
- No framework or build process is required.
