import styled from "styled-components";
import { ControlBar } from "./ControlBar";
import { OptionBar } from "./OptionBar";
import { rem } from "@utils";
import { Flex } from "@components/ui";
import useVideoPlayerStore from "@store/video-player-store";
import { ChangeEvent } from "react";

const ControlsContainer = styled(Flex)`
  height: 0px;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #000;
  opacity: 0.65;
  visibility: hidden;
  transition: all 0.125s cubic-bezier(0.4, 0, 1, 1);

  svg,
  input[type="range"] {
    opacity: 0.9;
    cursor: pointer;
  }
`;
const ControlsWrapper = styled(Flex)`
  justify-content: space-between;
  svg:hover {
    transform: scale(1.1);
    opacity: 1;
  }

  & div {
    display: flex;
    align-items: center;
  }
`;

const VideoProgressSlider = styled.input<{ $size: number }>`
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

const Controls = ({ $size }: ControlsProps) => {
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
    <ControlsContainer direction="column" id="player-controls">
      <VideoProgressSlider
        $size={$size}
        type="range"
        step="0.01"
        min="0"
        max={duration}
        value={progress}
        onChange={handleProgressChange}
      />
      <ControlsWrapper>
        <ControlBar />
        <OptionBar />
      </ControlsWrapper>
    </ControlsContainer>
  );
};

export default Controls;
