import styled from "styled-components";
import { Icon } from "@components/ui";
import { rem, secToTimeString } from "@utils";
import VolumeControl from "./VolumeControl";
import useVideoPlayerStore from "@store/video-player-store";

const ControlBarWrapper = styled.div`
  margin: ${rem("16px")} ${rem("24px")};
  span > svg {
    margin-right: ${rem("16px")};
  }
`;

const TimeSpan = styled.span`
  pointer-events: none;
  user-select: none;
  font-family: helvetica;
  color: #fff;
`;

const ControlBar = () => {
  const { playerRef, progress, duration, isPlaying, pauseToggler } =
    useVideoPlayerStore();
  const hasEnded = duration && Math.floor(progress) === Math.floor(duration);

  const handleRestartVideo = () => {
    if (playerRef.current) {
      playerRef.current.currentTime = 0;
      playerRef.current.play();
    }
  };

  return (
    <ControlBarWrapper>
      {hasEnded ? (
        <Icon title="restart" name={"restart"} onClick={handleRestartVideo} />
      ) : (
        <Icon
          title="play"
          name={isPlaying ? "pause" : "play"}
          onClick={pauseToggler}
        />
      )}
      <VolumeControl />
      <TimeSpan>{secToTimeString(progress)}</TimeSpan>
      <TimeSpan>&nbsp;/&nbsp;</TimeSpan>
      <TimeSpan>{secToTimeString(duration)}</TimeSpan>
    </ControlBarWrapper>
  );
};

export default ControlBar;
