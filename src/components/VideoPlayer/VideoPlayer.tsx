import { useState, useRef, type ChangeEvent } from "react";
import { Controls } from "./Controls";
import { HlsPlayer } from "./HlsPlayer";
import styled from "styled-components";

const VideoPlayerContainer = styled.div<{ $maxWidth: number }>`
  position: relative;
  max-width: ${({ $maxWidth }) => `${$maxWidth}px`};
  min-width: ${({ $maxWidth }) => `${$maxWidth}px`};
  background-color: #303030;
  display: flex;
  flex-direction: column;
  transition: all 0.25s;
`;

const VideoPlayer = (props: any) => {
  const { hlsConfig } = props;
  const { config, src, playerRef, maxWidth = 800, ...restConfig } = hlsConfig;

  const playerContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, toggleIsPaused] = useState<boolean>(true);
  const [isMuted, toggleIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.65);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const pauseToggler = () => {
    toggleIsPaused((prev) => !prev);
    if (isPaused) {
      return playerRef.current.play();
    }
    return playerRef.current.pause();
  };
  const muteToggler = () => {
    toggleIsMuted((prev) => !prev);
    if (isMuted) {
      playerRef.current.volume = volume;
    } else {
      playerRef.current.volume = 0;
    }
  };
  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const volumeValue = +e.target.value;
    setVolume(volumeValue);
    playerRef.current.volume = volumeValue;
    if (volumeValue === 0) {
      return toggleIsMuted(true);
    }
    return toggleIsMuted(false);
  };

  const handleProgressChange = ({ target: { value } }: any) => {
    playerRef.current.currentTime = +value;
    setProgress(value);
  };

  const handleOnPlaying = ({ target: { currentTime, duration } }: any) => {
    if (+duration > 0) {
      setDuration(+duration);
      setProgress(+currentTime);
    }
  };

  return (
    <VideoPlayerContainer ref={playerContainerRef} $maxWidth={maxWidth}>
      <HlsPlayer
        playerRef={playerRef}
        config={config}
        src={src}
        onClick={pauseToggler}
        onTimeUpdate={handleOnPlaying}
        {...restConfig}
      />
      <Controls
        $range={maxWidth}
        playerContainerRef={playerContainerRef}
        playerRef={playerRef}
        duration={duration}
        progress={progress}
        handleProgressChange={handleProgressChange}
        isPaused={isPaused}
        pauseToggler={pauseToggler}
        isMuted={isMuted}
        muteToggler={muteToggler}
        volume={volume}
        handleVolumeChange={handleVolumeChange}
      />
    </VideoPlayerContainer>
  );
};

export default VideoPlayer;
