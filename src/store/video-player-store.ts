import type Hls from "hls.js";
import { createRef } from "react";
import { create } from "zustand";

interface State {
  playerRef: React.RefObject<HTMLVideoElement>;
  playerContainerRef: React.RefObject<HTMLDivElement>;
  playingTitle: string;
  playingSrc: string;
  sources: Array<string>;
  isPlaying: boolean;
  progress: number;
  duration: number;
  hlsInstance: Hls | object;
}

interface Actions {
  setSources: (data: Array<string>) => void;
  setPlayingSrc: (src: string) => void;
  updateProgress: (value: number) => void;
  updateDuration: (value: number) => void;
  setPlaying: () => void;
  pauseToggler: () => void;
  setHlsInstance: (hlsInstance: Hls) => void;
}

const useVideoPlayerStore = create<State & Actions>((set) => ({
  hlsInstance: {},
  playerRef: createRef(),
  playerContainerRef: createRef(),
  playingTitle: "",
  playingSrc: "",
  sources: [],
  isPlaying: false,
  isLoading: false,
  progress: 0,
  duration: 0,
  setSources: (data) => set({ sources: data }),
  setPlayingSrc: (src) =>
    set({ playingSrc: src, progress: 0, playingTitle: src.split("/").pop() }),
  updateProgress: (value) => set({ progress: value }),
  updateDuration: (value) => set({ duration: value }),
  setPlaying: () =>
    set((state) => {
      state.playerRef.current?.play();

      return { isPlaying: true };
    }),
  pauseToggler: () =>
    set((state) => {
      const current = state.playerRef.current;
      const durationIsNaN = isNaN(state.duration);
      const trackNotSelected = !state.playingSrc;
      if (current && (durationIsNaN || trackNotSelected))
        return { isPlaying: false };

      current?.paused ? current?.play() : current?.pause();

      return { isPlaying: !state.isPlaying };
    }),
  setHlsInstance: (hlsInstance) => set({ hlsInstance }),
}));

export default useVideoPlayerStore;
