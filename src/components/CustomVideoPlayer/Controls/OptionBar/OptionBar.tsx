import styled from "styled-components";
import { rem } from "@utils";
import Hls from "hls.js";
import ExpandOption from "./ExpandOption";
import QualitySelectOption from "./QualitySelectOption";
import PlaylistOption from "./PlaylistOption";

const OptionBarWrapper = styled.div`
  margin: ${rem("16px")};
  svg {
    margin-left: ${rem("16px")};
  }
`;

interface OptionBarProps {
  sources: Array<string>;
  playingSrc: string;
  setPlayingSrc: any;
  hlsInstance?: Hls;
  playerContainerRef: React.RefObject<HTMLDivElement>;
}

const OptionBar = ({
  sources,
  playingSrc,
  setPlayingSrc,
  hlsInstance,
  playerContainerRef,
}: OptionBarProps) => {
  return (
    <OptionBarWrapper>
      <PlaylistOption
        sources={sources}
        playingSrc={playingSrc}
        setPlayingSrc={setPlayingSrc}
      />
      <ExpandOption playerContainerRef={playerContainerRef} />

      <QualitySelectOption
        hlsInstance={hlsInstance}
        currentLevel={hlsInstance?.currentLevel}
      />
    </OptionBarWrapper>
  );
};

export default OptionBar;
