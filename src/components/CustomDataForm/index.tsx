import { useState } from "react";
import styled from "styled-components";
import useVideoPlayerStore from "@store/video-player-store";
import { Flex } from "@components/ui";
import Input from "./Input";
import { rem } from "@utils";
import Label from "./Label";

const StyledFlex = styled(Flex)`
  flex-direction: column;
  width: 900px;
  height: auto;
  padding: ${rem("16px")};
`;

const CustomDataForm = () => {
  const { posterSrc, setPosterSrc, addNewSource } = useVideoPlayerStore();
  const [newVideoSrc, setNewVideoSrc] = useState<string>("");

  const handlePosterInputChange = ({ target }: any) => {
    const name = target.name;
    const value = target.value;
    switch (name) {
      case "poster":
        return setPosterSrc(value);
      case "new-video":
        return setNewVideoSrc(value);
      default:
        break;
    }
  };

  return (
    <StyledFlex>
      <Label>Poster Image Link</Label>
      <Input
        name="poster"
        value={posterSrc}
        onChange={handlePosterInputChange}
      />
      <Label>
        New Video Link
        <button>Add</button>
      </Label>
      <Input
        name="new-video"
        value={newVideoSrc}
        onChange={handlePosterInputChange}
      />
    </StyledFlex>
  );
};

export default CustomDataForm;
