import { useState, useEffect, useRef, ChangeEvent } from "react";
import { Controls } from "./Controls";
import { HlsPlayer } from "./HlsPlayer";
import styled from "styled-components";
import type Hls from "hls.js";

const VideoPlayerContainer = styled.div<{ $size: number }>`
  position: relative;
  max-width: ${({ $size }) => `${$size}px`};
  min-width: ${({ $size }) => `${$size}px`};
  background-color: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: all 0.25s;
`;

interface CustomVideoPlayerProps {
  sources: Array<string>;
  size: number;
}

const CustomVideoPlayer = ({ sources, size = 800 }: CustomVideoPlayerProps) => {
  const playerRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [hlsInstance, setHlsInstance] = useState<Hls>();
  const [playingSrc, setPlayingSrc] = useState<string>("");

  const pauseToggler = () => {
    if (playerRef.current && isNaN(playerRef.current.duration)) return;
    playerRef.current?.paused
      ? playerRef.current?.play()
      : playerRef.current?.pause();
  };

  const handleProgressChange = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    if (playerRef.current) {
      playerRef.current.currentTime = +value;
      setProgress(+value);
    }
  };

  const handleOnPlaying = (e: any) => {
    const { currentTime, duration } = e.target as HTMLVideoElement;
    if (+duration > 0) {
      setDuration(+duration);
      setProgress(+currentTime);
    }
  };

  const handleOnMetadataLoaded = (e: any) => {
    const { duration } = e.target as HTMLVideoElement;
    setDuration(+duration);
  };

  useEffect(() => {
    setPlayingSrc(sources[0]);
  }, [sources]);

  return (
    <VideoPlayerContainer ref={playerContainerRef} $size={size}>
      <HlsPlayer
        src={playingSrc}
        playerRef={playerRef}
        setHlsInstance={setHlsInstance}
        onClick={pauseToggler}
        onTimeUpdate={handleOnPlaying}
        onLoadedMetadata={handleOnMetadataLoaded}
      />
      <Controls
        $size={size}
        sources={sources}
        playingSrc={playingSrc}
        setPlayingSrc={setPlayingSrc}
        hlsInstance={hlsInstance}
        playerContainerRef={playerContainerRef}
        playerRef={playerRef}
        pauseToggler={pauseToggler}
        progress={progress}
        duration={duration}
        handleProgressChange={handleProgressChange}
      />
    </VideoPlayerContainer>
  );
};

export default CustomVideoPlayer;
