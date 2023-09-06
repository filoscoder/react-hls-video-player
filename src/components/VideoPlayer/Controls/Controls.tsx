import styled from "styled-components";
import { Icon } from "../../ui/Icon";
import { rem, secToTimeString } from "../../../utils";
import useFullscreen from "../../../hooks/use-fullscreen";

const ControlsContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: none;
  flex-direction: column;
  background-color: black;
  opacity: 0.65;

  &:hover {
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
const ControlBarWrapper = styled.div`
  margin: ${rem("16px")};
  svg {
    margin-right: ${rem("16px")};
  }
`;
const OptionBarWrapper = styled.div`
  margin: ${rem("16px")};
  svg {
    margin-left: ${rem("16px")};
  }
`;
const VolumeWrapper = styled.div`
  #volume-icon {
    margin-right: ${rem("8px")};
  }
  &:hover {
    #volume-icon {
      opacity: 1;
      transform: scale(1.1);
    }
    #volume-icon ~ #volume-slider {
      margin-right: ${rem("16px")};
      width: 100px;
      opacity: 1;
    }
  }
`;
const StyledSlider = styled.input`
  -webkit-appearance: none;
  overflow: hidden;
  outline: none;
  transition: all 0.2s cubic-bezier(0.4, 0, 1, 1);

  &::-webkit-slider-runnable-track {
    opacity: 0.9;
    &:hover {
      opacity: 1;
    }
  }
  &::-webkit-slider-thumb {
    appearance: none;
    &:hover {
      transform: scale(1.2);
    }
  }
  &:focus {
    outline: none;
  }
`;
const VolumeSlider = styled(StyledSlider)`
  width: 0px;

  &::-webkit-slider-runnable-track {
    height: ${rem("6px")};
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 16px;
  }
  &::-webkit-slider-thumb {
    height: 6px;
    width: 1px;
    background-color: #f00;
    box-shadow: -100px 0 0 100px #f00;
  }
`;

const VideoProgressSlider = styled(StyledSlider)<{ $range: number }>`
  width: calc(100% - ${rem("16px")});
  margin: 0 ${rem("8px")};
  border-radius: 2px;

  &::-webkit-slider-runnable-track {
    height: ${rem("10.5px")};
    background-color: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-slider-thumb {
    height: ${rem("11px")};
    width: ${rem("11px")};
    background-color: #fff;
    border-radius: 50%;
    border: ${rem("2px")} solid #f00;
    box-shadow: ${({ $range }) => `-${$range + 7}px 0 0 ${$range}px`} #f00;
  }
`;
const TimeSpan = styled.span`
  font-family: helvetica;
  color: #fff;
`;

const Controls = ({
  $range,
  playerContainerRef,
  playerRef,
  expandable = true,
  duration,
  progress,
  handleProgressChange,
  isPaused,
  pauseToggler,
  isMuted,
  muteToggler,
  volume,
  handleVolumeChange,
}: any) => {
  const [isFullscreen, setFullscreen] = useFullscreen(playerContainerRef);

  return (
    <ControlsContainer>
      <VideoProgressSlider
        $range={$range}
        type="range"
        step="0.01"
        min="0"
        max={duration}
        value={progress}
        onChange={handleProgressChange}
      />
      <ControlsWrapper>
        <ControlBarWrapper>
          {playerRef.current?.ended ? (
            <Icon
              name={"refresh"}
              onClick={() => {
                playerRef.current.currentTime = 0;
                playerRef.current.play();
              }}
            />
          ) : (
            <Icon name={isPaused ? "play" : "pause"} onClick={pauseToggler} />
          )}
          <Icon name={"next"} onClick={muteToggler} />
          <VolumeWrapper>
            <Icon
              id="volume-icon"
              name={isMuted ? "muted" : "volume"}
              onClick={muteToggler}
            />
            <VolumeSlider
              id="volume-slider"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
            />
          </VolumeWrapper>
          <TimeSpan>{secToTimeString(progress)}</TimeSpan>
          <TimeSpan>&nbsp;/&nbsp;</TimeSpan>
          <TimeSpan>{secToTimeString(duration)}</TimeSpan>
        </ControlBarWrapper>
        <OptionBarWrapper>
          {expandable && (
            <Icon
              name={isFullscreen ? "compress" : "expand"}
              // @ts-ignore
              onClick={setFullscreen}
            />
          )}
          <Icon name={"playing"} onClick={muteToggler} />
          <Icon name={"more"} onClick={muteToggler} />
        </OptionBarWrapper>
      </ControlsWrapper>
    </ControlsContainer>
  );
};

export default Controls;
