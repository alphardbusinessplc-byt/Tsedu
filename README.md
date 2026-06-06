# Happy Birthday, Tsedu 🌹

An interactive React birthday website for **Tsedale Sisay Kefyale ("Tsedu")**.

Built with **React + TypeScript + Vite + Tailwind CSS**, shadcn-style folder
structure (`src/components/ui`).

## Features
- Hero with live **countdown** to June 11
- **"Open your gift"** reveal with confetti
- Heartfelt **love letter** (edit it in `src/App.tsx`)
- **"Watch Her Grow"** timeline (childhood → recent photos)
- **3D rotating photo sphere** — drag to spin, **tap a photo to enlarge** (`src/components/ui/img-sphere.tsx`)
- Full **gallery** with lightbox (arrows / Esc / swipe)
- Background **music** toggle
- Falling rose petals, fully responsive

## How to run it

```bash
cd tsedu-site
npm install      # first time only
npm run dev      # starts a local dev server; open the URL it prints
```

To make a shareable production build:

```bash
npm run build    # output goes to the dist/ folder
npm run preview  # preview the production build locally
```

## Add background music 🎵
Put an audio file named **`music.mp3`** in the **`public/`** folder
(`tsedu-site/public/music.mp3`). It also accepts `song.mp3`, `tsedu.mp3`,
`music.m4a`, or `music.ogg`. Then click the "Play music" button.

## Photos
Tsedu's photos live in `public/tseduchild/` and `public/tsedi_in_semera/`.
The filename lists are in `src/lib/photos.ts` — add/remove there to change which
photos appear.
