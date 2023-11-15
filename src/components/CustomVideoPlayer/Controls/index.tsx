import styled from "styled-components";
import ControlBar from "./ControlBar";
import OptionBar from "./OptionBar";
import VideoProgressSlider from "./VideoProgressSlider";
import { Flex } from "@components/ui";

const ControlsContainer = styled(Flex)`
  flex-direction: column;
  width: 100%;
  height: 0;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #000;
  visibility: hidden;
  transition: all 0.25s cubic-bezier(0.4, 0, 1, 1);
  transition: height 0.1s cubic-bezier(0.4, 0, 1, 1);

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

const Controls = () => {
  return (
    <ControlsContainer id="player-controls">
      <VideoProgressSlider />
      <ControlsWrapper>
        <ControlBar />
        <OptionBar />
      </ControlsWrapper>
    </ControlsContainer>
  );
};

export default Controls;
