import { useEffect } from "react";
import Controls from "./Controls";
import HlsPlayer from "./HlsPlayer";
import styled from "styled-components";
import useVideoPlayerStore from "@store/video-player-store";

const VideoPlayerContainer = styled.div`
  position: relative;
  width: 98%;
  max-width: 100%;
  background-color: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &:hover > #player-controls {
    height: 65px;
    opacity: 0.65;
    visibility: visible;
  }
  &:hover > #playing-title {
    opacity: 1;
  }
`;
const TitleSpan = styled.span`
  pointer-events: none;
  user-select: none;
  position: absolute;
  top: 8px;
  left: 8px;
  padding: 3px;
  font-family: helvetica;
  color: #fff;
  opacity: 0;
  box-shadow: 0px 0px 10px 8px rgba(0, 0, 0, 0.6);
  background-color: rgba(0, 0, 0, 0.6);

  transition: all 0.2s cubic-bezier(0.4, 0, 1, 1);
`;

interface CustomVideoPlayerProps {
  data: Array<string>;
}

const CustomVideoPlayer = ({ data }: CustomVideoPlayerProps) => {
  const { playerContainerRef, setSources, playingTitle } =
    useVideoPlayerStore();

  useEffect(() => {
    setSources(data);
  }, [data, setSources]);

  return (
    <VideoPlayerContainer ref={playerContainerRef}>
      <TitleSpan id="playing-title">{playingTitle}</TitleSpan>
      <HlsPlayer />
      <Controls />
    </VideoPlayerContainer>
  );
};

export default CustomVideoPlayer;
