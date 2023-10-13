import styled from "styled-components";
import { rem } from "@utils";
import type { ChangeEvent } from "react";
import useVideoPlayerStore from "@store/video-player-store";

const ProgressSlider = styled.input<{ $size: number }>`
  -webkit-appearance: none;
  overflow: hidden;
  outline: none;
  width: calc(100% - ${rem(16)});
  margin: 0 ${rem(8)};
  border-radius: 2px;

  &::-webkit-slider-runnable-track {
    height: ${rem(10.5)};
    background-color: rgba(255, 255, 255, 0.4);
    opacity: 0.9;
    &:hover {
      opacity: 1;
    }
  }
  &::-webkit-slider-thumb {
    height: ${rem(11)};
    width: ${rem(11)};
    background-color: #fff;
    border-radius: 50%;
    border: ${rem(2)} solid #f00;
    box-shadow: ${({ $size }) => `-${$size + 7}px 0 0 ${$size}px`} #f00;
    appearance: none;
    &:hover {
      transform: scale(1.2);
    }
  }
`;

interface ControlsProps {
  $size: number;
}

const VideoProgressSlider = ({ $size }: ControlsProps) => {
  const { playerRef, progress, duration, updateProgress } =
    useVideoPlayerStore();

  const handleProgressChange = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    if (playerRef.current) {
      playerRef.current.currentTime = +value;
      updateProgress(+value);
    }
  };

  return (
    <ProgressSlider
      $size={$size}
      type="range"
      step="0.01"
      min="0"
      max={duration}
      value={progress}
      onChange={handleProgressChange}
    />
  );
};

export default VideoProgressSlider;
