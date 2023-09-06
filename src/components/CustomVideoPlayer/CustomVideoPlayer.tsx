import { useState, useRef } from "react";
import { Controls } from "./Controls";
import { HlsPlayer } from "./HlsPlayer";
import styled from "styled-components";
import type Hls from "hls.js";

const VideoPlayerContainer = styled.div<{ $size: number }>`
  position: relative;
  max-width: ${({ $size }) => `${$size}px`};
  min-width: ${({ $size }) => `${$size}px`};
  background-color: #303030;
  background: url("https://i.ytimg.com/vi/lJjRF5k--60/maxresdefault.jpg");
  background-position: center;
  background-size: ${({ $size }) => `${$size}px`} auto;
  display: flex;
  flex-direction: column;
  transition: all 0.25s;
`;

const CustomVideoPlayer = ({
  src,
  size = 800,
}: {
  src: string;
  size: number;
}) => {
  const playerRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [hlsInstance, setHlsInstance] = useState<Hls>();

  const pauseToggler = () => {
    if (playerRef.current?.paused) {
      return playerRef.current?.play();
    }
    return playerRef.current?.pause();
  };

  const handleProgressChange = ({ target: { value } }: any) => {
    if (playerRef.current) {
      playerRef.current.currentTime = +value;
    }
    setProgress(value);
  };

  const handleOnPlaying = ({ target: { currentTime, duration } }: any) => {
    if (+duration > 0) {
      setDuration(+duration);
      setProgress(+currentTime);
    }
  };

  return (
    <VideoPlayerContainer ref={playerContainerRef} $size={size}>
      <HlsPlayer
        playerRef={playerRef}
        src={src}
        setHlsInstance={setHlsInstance}
        onClick={pauseToggler}
        onTimeUpdate={handleOnPlaying}
      />
      <Controls
        $size={size}
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
