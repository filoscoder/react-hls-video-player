import { useState } from "react";
import styled from "styled-components";
import useVideoPlayerStore from "@store/video-player-store";
import { Flex } from "@components/ui";
import Input from "./Input";
import { isValidUrl, rem } from "@utils";
import Label from "./Label";

const StyledFlex = styled(Flex)`
  width: 900px;
  height: auto;
  padding: ${rem("32px")} 0;
  flex-direction: column;
  align-items: flex-start;
`;

const StyledButton = styled.button`
  opacity: 0.9;
  background-color: #f00;
  color: #fff;
  cursor: pointer;
  width: 100px;
  height: ${rem("32px")};
  border: none;
  border-radius: 0 4px 4px 0;
  font-family: helvetica;
  font-size: 1rem;
`;

const CustomDataForm = () => {
  const { posterSrc, setPosterSrc, addNewSource } = useVideoPlayerStore();
  const [newPosterSrc, setNewPosterSrc] = useState<string>("");
  const [newVideoSrc, setNewVideoSrc] = useState<string>("");

  const handleInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const name = target.name;
    const value = target.value;
    switch (name) {
      case "poster":
        return setPosterSrc(value);
      case "new-video":
        return setNewVideoSrc(value);
    }
  };

  const handleNewVideoInputClick = ({ target }: any) => {
    const name = target.name;
    const getAlertMsg = (type: string) => `${type} link is not a valid URL`;

    switch (name) {
      case "poster":
        if (!isValidUrl(newPosterSrc)) break;
        setPosterSrc(newPosterSrc);
        return setNewPosterSrc("");
      case "new-video":
        if (!isValidUrl(newVideoSrc)) break;
        addNewSource(newVideoSrc);
        return setNewVideoSrc("");
    }
    return alert(getAlertMsg(name));
  };

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;
    if (key !== "Enter") return;
    return handleNewVideoInputClick(e);
  };

  return (
    <StyledFlex>
      <Label>Poster Image Link</Label>
      <Flex>
        <Input
          name="poster"
          value={posterSrc}
          onKeyDown={handleEnterKey}
          onChange={handleInputChange}
        />
        <StyledButton onClick={handleNewVideoInputClick}>Add</StyledButton>
      </Flex>
      <Label>New Video Link</Label>
      <Flex>
        <Input
          name="new-video"
          value={newVideoSrc}
          onChange={handleInputChange}
          onKeyDown={handleEnterKey}
        />
        <StyledButton name="new-video" onClick={handleNewVideoInputClick}>
          Add
        </StyledButton>
      </Flex>
    </StyledFlex>
  );
};

export default CustomDataForm;
