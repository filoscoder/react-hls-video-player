import styled from "styled-components";
import Hls from "hls.js";
import { ControlBar } from "./ControlBar";
import { OptionBar } from "./OptionBar";
import { rem } from "@utils";

const ControlsContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: none;
  flex-direction: column;
  background-color: #000;
  opacity: 0.65;

  & {
    display: flex;
  }

  svg,
  input[type="range"] {
    opacity: 0.9;
    cursor: pointer;
  }
`;
const ControlsWrapper = styled.div`
  width: 100%;
  display: flex;
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
  hlsInstance?: Hls;
  playerContainerRef: React.RefObject<HTMLDivElement>;
  playerRef: React.RefObject<HTMLVideoElement>;
  pauseToggler: any;
  progress: number;
  duration: number;
  handleProgressChange: any;
}

const Controls = ({
  $size,
  hlsInstance,
  playerContainerRef,
  playerRef,
  pauseToggler,
  progress,
  duration,
  handleProgressChange,
}: ControlsProps) => {
  return (
    <ControlsContainer>
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
        <ControlBar
          playerRef={playerRef}
          progress={progress}
          duration={duration}
          pauseToggler={pauseToggler}
        />
        <OptionBar
          hlsInstance={hlsInstance}
          playerContainerRef={playerContainerRef}
        />
      </ControlsWrapper>
    </ControlsContainer>
  );
};

export default Controls;
