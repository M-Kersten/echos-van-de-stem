# Echoes of the Voice — Soundboard

A single-page, mobile-friendly **soundboard** that provides immersive audio for
the board game *Echoes of the Voice*, set in Utrecht, the Netherlands. It is a
digital companion for play: choose a location and let its soundscape fill the
room while you trigger one-shot effects to bring scenes to life.

Pure HTML, CSS and JavaScript. No backend, no accounts, no build step. It works
offline once loaded and can be added to a phone's home screen.

## Locations

Five locations, each with one looping ambient soundscape and several one-shot
effects:

1. **Marketplace** — *De Markt*
2. **Hospital** — *Het Ziekenhuis*
3. **Café** — *Het Café*
4. **Flat** — *Het Appartement*
5. **Church** — *De Kerk*

## How it works

- Tap a location's large button to **start its ambient loop**. It fades in.
- Tap it again to **stop** it (fades out), or tap another location to
  **cross-fade** to that one. Only one ambient loop ever plays at a time.
- Tap any **effect** button to play a one-shot sound over the ambient. Several
  effects can overlap, and they keep playing while the ambience continues.
- Two sliders set the **ambient** and **effects** volumes independently. Your
  settings are remembered on the device.
- A bar at the bottom always shows what is currently playing, with a quick Stop.

### Placeholder sounds

The app ships with **no audio files** so the repository stays small. Until you
add your own, every button plays a soft synthesised placeholder tone, so the
interface is fully testable straight away. Add real files and the placeholders
disappear automatically (see below).

## Adding your own audio

1. Put your sound files in the `audio/<location>/` folders.
2. Use the exact filenames listed in [`audio/README.md`](audio/README.md)
   (e.g. `audio/marketplace/rain.mp3`).

To rename, add, or remove sounds — or to change the file format — edit
[`sounds.config.js`](sounds.config.js). It is the single place that defines the
locations, labels, and file paths. No other code needs to change.

## Running it

It's a static site, so any of these work:

- **Quickest:** open `index.html` directly in a browser. (Audio plays; the
  offline service worker only activates when served over http/https.)
- **Local server** (recommended, enables offline caching):

  ```sh
  # Python 3
  python3 -m http.server 8000
  # then open http://localhost:8000
  ```

- **Hosting:** upload the folder to any static host (GitHub Pages, Netlify,
  etc.). On a phone, use the browser's *Add to Home Screen* to run it
  full-screen like an app.

> Audio on phones requires a tap to begin — this is a browser rule. Since every
> sound here is started by tapping a button, it just works on iOS and Android.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page structure |
| `styles.css` | Parchment theme and responsive layout |
| `sounds.config.js` | **Edit this** to change locations, sounds, and file paths |
| `app.js` | Audio engine (fades, layering, volumes) and UI |
| `sw.js` | Service worker for offline use |
| `manifest.webmanifest`, `icon.svg` | Add-to-home-screen support |
| `audio/` | Your sound files |

## Design

A warm, contemplative, parchment-inspired look: aged paper, brown ink, muted
earth tones, elegant serif type, and subtle Christian touches (a cross in the
header and icon). No flashy modern UI — just large, touch-friendly controls
meant to sit on the table during play.
