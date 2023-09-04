import styled from "styled-components";
import { Icon } from "../../ui/Icon";
import { rem, secToTimeString } from "../../../utils";
import useFullscreen from "../../../hooks/use-fullscreen";
import { useEffect } from "react";

const ControlsContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: black;
  opacity: 0.6;
  svg {
    cursor: pointer;
    opacity: 0.9;
    &:hover {
      opacity: 1;
    }
  }
`;
const ControlsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  svg {
    cursor: pointer;
    opacity: 0.9;
    &:hover {
      opacity: 1;
    }
  }
`;
const ControlBarWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: ${rem("16px")};
  svg {
    margin-right: ${rem("16px")};
  }
`;
const OptionBarWrapper = styled.div`
  display: flex;
  margin: ${rem("16px")};
  svg {
    margin-left: ${rem("16px")};
  }
`;
const VolumeSlider = styled.input`
  width: 100%;
`;
const VideoProgressBar = styled.progress`
  width: calc(100% - ${rem("32px")});
  margin: 0 ${rem("16px")};
`;
const TimeSpan = styled.span`
  font-family: helvetica;
  color: #fff;
  margin-left: ${rem("8px")};
`;

const Controls = ({
  playerContainerRef,
  progress,
  duration,
  isPaused,
  pauseToggler,
  isMuted,
  muteToggler,
  volume,
  handleVolume,
}: any) => {
  const [isFullscreen, setFullscreen] = useFullscreen(playerContainerRef);

  return (
    <ControlsContainer>
      <VideoProgressBar max={duration} value={progress} />
      <ControlsWrapper>
        <ControlBarWrapper>
          <Icon name={isPaused ? "play" : "pause"} onClick={pauseToggler} />
          <Icon name={"next"} onClick={muteToggler} />
          <Icon name={isMuted ? "muted" : "volume"} onClick={muteToggler} />
          <VolumeSlider
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolume}
          />
          <TimeSpan>{secToTimeString(progress)}</TimeSpan>
          <TimeSpan>/</TimeSpan>
          <TimeSpan>{secToTimeString(duration)}</TimeSpan>
        </ControlBarWrapper>
        <OptionBarWrapper>
          <Icon
            name={isFullscreen ? "compress" : "expand"}
            // @ts-ignore
            onClick={setFullscreen}
          />
          <Icon name={"playing"} onClick={muteToggler} />
          <Icon name={"more"} onClick={muteToggler} />
        </OptionBarWrapper>
      </ControlsWrapper>
    </ControlsContainer>
  );
};

export default Controls;
