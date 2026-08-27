# Aydelore Abaquita Portfolio — Animated Morphic Glass Theme

This is the multi-page portfolio revised to match the smooth morphic/glass reference while preserving the existing black, pastel pink, and pastel violet palette.

## What changed

- Added large animated pink and violet circles behind every page
- Added a floating translucent glass shape to reinforce the morphic effect
- Made cards and panels more transparent with brighter glass highlights
- Preserved the compact typography and multi-page navigation
- Added a reduced-motion fallback for visitors who disable animation

## Pages

- `index.html` — Home
- `about.html` — About
- `experience.html` — Experience
- `work.html` — Portfolio work
- `skills.html` — Skills
- `contact.html` — Contact

## Replace your current portfolio

1. Extract the ZIP.
2. Copy everything inside the extracted folder.
3. Paste it into your existing `aydeloreabaquita.github.io` folder.
4. Keep the existing hidden `.git` folder.
5. Preview `index.html` with Live Server.

## Publish

```bash
git add -A
git commit -m "Apply animated morphic glass theme"
git push origin main
```

## Change the circle motion

The moving circles are controlled near the bottom of `styles.css`. Search for:

```text
orbFloatOne
```

The animation durations are set on `.orb-one`, `.orb-two`, and the other orb classes. A larger number means slower movement.

Example:

```css
.orb-one {
  animation: orbFloatOne 24s ease-in-out infinite alternate;
}
```

## Media paths

Keep the résumé at the repository root as `resume - Aydelore Abaquita.pdf`. Existing media files are also stored at the repository root.

## Continuous background motion across pages

The animated circles now use one shared session timeline. When you move from Home to Skills, Work, About, or another page, the new page calculates how far the animation has already progressed and resumes the circles at the same phase and direction instead of restarting them.

This continuity works while navigating within the same browser tab. Opening the site in a new tab starts a new animation session.
