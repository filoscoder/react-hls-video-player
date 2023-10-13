# React Hls Video Player

Custom Hls Video Player for m3u8 streaming.

- This player example is powered with [HLS.js](https://github.com/video-dev/hls.js).
- Most of the styling is inspired by [Youtube](https://www.youtube.com/)'s player
- Test your _Poster image_ (Image before playing)
- Test your m3u8 video link (Examples [here](https://gist.github.com/Fazzani/8f89546e188f8086a46073dc5d4e2928))

# Stack

- Language: [Typescript](https://www.typescriptlang.org/) (Javascript)
- Client Library: [React](https://react.dev/) (v18)
- Style: [Styled-components](https://styled-components.com/)
- State Management: [Zustand](https://zustand-demo.pmnd.rs/)
- Bundler: [Vite](https://vitejs.dev/)

## Running locally

#### 1. Install Dependencies

```bash
$ yarn
```

#### 2. Run on dev mode

```bash
$ yarn dev # Running at http://localhost:5173/
```

## Folder structure

```bash
📦src
 ┣ 📂api # API request mocks
 ┣ 📂components # components
 ┃ ┣ 📂CustomVideoPlayer # CustomVideoPlayer component
 ┃ ┃ ┣ 📂Controls # Controls component
 ┃ ┃ ┃ ┣ 📂ControlBar
 ┃ ┃ ┃ ┃ ┣ 📜VolumeControl.tsx # Volume control
 ┃ ┃ ┃ ┣ 📂OptionBar
 ┃ ┃ ┃ ┃ ┣ 📜ExpandOption.tsx # Fullscreen option
 ┃ ┃ ┃ ┃ ┣ 📜PlaylistOption.tsx # Playlist option
 ┃ ┃ ┃ ┃ ┣ 📜QualitySelectOption.tsx # Quality Selector option (if available)
 ┃ ┃ ┣ 📂HlsPlayer # Hls Video Player component
 ┃ ┣ 📂RootErrorBoundary # ErrorBoundary component
 ┃ ┣ 📂ui # Reusable UI component
 ┃ ┃ ┣ 📂Icon
 ┃ ┃ ┃ ┣ 📜Icon.tsx # Icon component
 ┃ ┃ ┃ ┣ 📜iconMap.json # SVG path mapper
 ┃ ┃ ┣ 📂Loader
 ┃ ┃ ┃ ┗ 📜Loader.tsx # Loader (Spinner) component
 ┃ ┃ ┣ 📜DynamicTag.tsx
 ┃ ┃ ┣ 📜Flex.tsx
 ┃ ┃ ┣ 📜Heading.tsx
 ┃ ┃ ┗ 📜index.ts
 ┃ ┗ 📜index.ts
 ┣ 📂const
 ┃ ┗ 📜links.ts # Video poster & sources
 ┣ 📂hooks
 ┃ ┗ 📜use-fullscreen.ts # Fullscreen API custom-hook
 ┣ 📂pages
 ┃ ┣ 📜home.tsx # Home page (If something goes wrong redirects to here)
 ┃ ┗ 📜player.tsx # Player page
 ┣ 📂store
 ┃ ┗ 📜video-player-store.ts # Global State Store (Zustand)
 ┣ 📂utils
 ┣ 📜App.tsx
 ┣ 📜main.tsx
 ┣ 📜router.tsx
 ┗ 📜vite-env.d.ts

```
