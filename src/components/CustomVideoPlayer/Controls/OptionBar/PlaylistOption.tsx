import { Icon } from "@components/ui";
import useVideoPlayerStore from "@store/video-player-store";
import { rem } from "@utils";
import { useState } from "react";
import { styled } from "styled-components";

const PlaylistOptionContainer = styled.div``;
const PlaylistWindow = styled.ul`
  position: absolute;
  right: ${rem("8px")};
  bottom: calc(65px + ${rem("8px")});
  min-width: 200px;
  max-height: 300px;
  background-color: #303030;
  color: #fff;
  border-radius: 4px;
`;
const PlaylistTrack = styled.li`
  display: flex;
  align-items: center;
  font-family: helvetica;
  font-size: ${rem("16px")};
  padding: ${rem("8px")} ${rem("16px")};
  user-select: none;
  svg {
    margin-left: ${rem("8px")};
  }
  &:hover {
    cursor: pointer;
    color: #303030;
    background-color: #fff;
    border-radius: 4px;
    svg > path {
      fill: #303030;
    }
  }
`;

const PlaylistOption = () => {
  const { sources, playingSrc, setPlayingSrc } = useVideoPlayerStore();
  const [showPlaylist, setShowPlaylist] = useState<boolean>(false);

  const handleShowPlaylist = () => {
    setShowPlaylist((prev) => !prev);
  };

  return (
    <PlaylistOptionContainer>
      <Icon title="playlist" name={"playing"} onClick={handleShowPlaylist} />
      {showPlaylist && (
        <PlaylistWindow onMouseLeave={handleShowPlaylist}>
          {sources.map((source, idx) => {
            const filename = source.split("/").pop();
            return (
              <PlaylistTrack
                key={`${idx}_source`}
                title={source}
                onClick={() => setPlayingSrc(source)}
              >
                {filename}
                {source === playingSrc && <Icon name={"check"} size={"16px"} />}
              </PlaylistTrack>
            );
          })}
        </PlaylistWindow>
      )}
    </PlaylistOptionContainer>
  );
};

export default PlaylistOption;
