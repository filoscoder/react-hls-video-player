# React Custom Video Player

## Getting Started

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
