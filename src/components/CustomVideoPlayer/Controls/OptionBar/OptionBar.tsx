import styled from "styled-components";
import { Icon } from "@components/ui/Icon";
import { rem } from "@utils";
import Hls from "hls.js";
import ExpandOption from "./ExpandOption";
import QualitySelectOption from "./QualitySelectOption";

const OptionBarWrapper = styled.div`
  margin: ${rem("16px")};
  svg {
    margin-left: ${rem("16px")};
  }
`;

interface OptionBarProps {
  hlsInstance?: Hls;
  playerContainerRef: React.RefObject<HTMLDivElement>;
}

const OptionBar = ({ hlsInstance, playerContainerRef }: OptionBarProps) => {
  return (
    <OptionBarWrapper>
      <Icon name="playing" />
      <ExpandOption playerContainerRef={playerContainerRef} />

      <QualitySelectOption
        hlsInstance={hlsInstance}
        currentLevel={hlsInstance?.currentLevel}
      />
    </OptionBarWrapper>
  );
};

export default OptionBar;
