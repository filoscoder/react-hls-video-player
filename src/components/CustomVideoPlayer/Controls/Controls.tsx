import styled from "styled-components";
import { Icon } from "../../ui/Icon";
import { rem, secToTimeString, valueToLabel } from "../../../utils";
import useFullscreen from "../../../hooks/use-fullscreen";
import { ChangeEvent, useState, useEffect } from "react";
import Hls from "hls.js";

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

const VideoProgressSlider = styled(StyledSlider)<{ $size: number }>`
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
    box-shadow: ${({ $size }) => `-${$size + 7}px 0 0 ${$size}px`} #f00;
  }
`;
const TimeSpan = styled.span`
  font-family: helvetica;
  color: #fff;
`;
const QualityOptions = styled.ul`
  position: absolute;
  bottom: 70px;
  right: ${rem("8px")};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  min-width: 80px;
  color: #fff;
  background-color: #303030;
  cursor: pointer;
`;
const QualityOption = styled.li`
  font-family: helvetica;
  font-size: ${rem("16px")};
  padding: ${rem("8px")} ${rem("16px")};
  &:hover {
    color: #303030;
    background-color: #fff;
    border-radius: 4px;
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
  const [isFullscreen, setFullscreen] = useFullscreen(playerContainerRef);
  const [isMuted, toggleIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.65);
  const [showLevelOpts, setShowLevelOpts] = useState<boolean>(false);
  const [levelData, setLevelData] = useState({
    current: -1,
    levels: [],
  });

  const muteToggler = () => {
    if (!playerRef.current) return;

    if (isMuted) {
      playerRef.current.volume = volume;
    } else {
      playerRef.current.volume = 0;
    }
    toggleIsMuted((prev) => !prev);
  };

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!playerRef.current) return;
    const volumeValue = +e.target.value;
    playerRef.current.volume = volumeValue;

    setVolume(volumeValue);
    toggleIsMuted(volumeValue === 0);
  };

  useEffect(() => {
    if (hlsInstance) {
      const current = hlsInstance?.currentLevel;
      const levelValues = hlsInstance?.levels
        .reduce((acc: any, l: any) => {
          if (l.height) {
            acc.push(l.height);
          }
          return acc;
        }, [])
        .reverse();

      const levels =
        current === -1 && levelValues.length
          ? [...levelValues, current]
          : levelValues;

      setLevelData({
        current,
        levels,
      });
    }
  }, [hlsInstance]);

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
        <ControlBarWrapper>
          {playerRef.current?.ended ? (
            <Icon
              name={"refresh"}
              onClick={() => {
                if (playerRef.current) {
                  playerRef.current.currentTime = 0;
                  playerRef.current.play();
                }
              }}
            />
          ) : (
            <Icon
              name={playerRef.current?.paused ? "play" : "pause"}
              onClick={pauseToggler}
            />
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
          <Icon
            name={isFullscreen ? "compress" : "expand"}
            // @ts-ignore
            onClick={setFullscreen}
          />
          <Icon name={"playing"} />
          {levelData.levels.length && (
            <>
              <Icon
                name={"more"}
                onClick={() => setShowLevelOpts((prev) => !prev)}
                style={{ position: "relative" }}
              />
              {showLevelOpts && (
                <QualityOptions>
                  {levelData.levels.map((level) => (
                    <QualityOption key={level}>
                      {valueToLabel(level)}
                    </QualityOption>
                  ))}
                </QualityOptions>
              )}
            </>
          )}
        </OptionBarWrapper>
      </ControlsWrapper>
    </ControlsContainer>
  );
};

export default Controls;
