import styled from "styled-components";
import { Icon } from "@components/ui/Icon";
import { rem, secToTimeString } from "@utils";
import VolumeControl from "./VolumeControl";

const ControlBarWrapper = styled.div`
  margin: ${rem("16px")};
  svg {
    margin-right: ${rem("16px")};
  }
`;

const TimeSpan = styled.span`
  pointer-events: none;
  user-select: none;
  font-family: helvetica;
  color: #fff;
`;

interface ControlBarProps {
  playerRef: React.RefObject<HTMLVideoElement>;
  pauseToggler: React.MouseEventHandler<SVGElement>;
  progress: number;
  duration: number;
}

const ControlBar = ({
  playerRef,
  pauseToggler,
  progress,
  duration,
}: ControlBarProps) => {
  const handleRestartVideo = () => {
    if (playerRef.current) {
      playerRef.current.currentTime = 0;
      playerRef.current.play();
    }
  };

  return (
    <ControlBarWrapper>
      {playerRef.current?.ended ? (
        <Icon name={"restart"} onClick={handleRestartVideo} />
      ) : (
        <Icon
          name={playerRef.current?.paused ? "play" : "pause"}
          onClick={pauseToggler}
        />
      )}
      <Icon name={"next"} />
      <VolumeControl playerRef={playerRef} />
      <TimeSpan>{secToTimeString(progress)}</TimeSpan>
      <TimeSpan>&nbsp;/&nbsp;</TimeSpan>
      <TimeSpan>{secToTimeString(duration)}</TimeSpan>
    </ControlBarWrapper>
  );
};

export default ControlBar;
