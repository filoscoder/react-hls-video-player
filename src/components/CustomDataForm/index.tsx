import { useState } from "react";
import styled from "styled-components";
import useVideoPlayerStore from "@store/video-player-store";
import { Flex } from "@components/ui";
import Input from "./Input";
import { isValidUrl, rem } from "@utils";
import Label from "./Label";

const StyledFlex = styled(Flex)`
  width: 90%;
  max-width: 100%;
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
  const { posterSrc, setPosterSrc, addNewSource, pauseToggler } =
    useVideoPlayerStore();
  const [newPosterSrc, setNewPosterSrc] = useState<string>("");
  const [newVideoSrc, setNewVideoSrc] = useState<string>("");

  const handleInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const name = target.name;
    const value = target.value;
    switch (name) {
      case "poster":
        return setNewPosterSrc(value);
      case "new-video":
        return setNewVideoSrc(value);
    }
  };

  const handleNewInputClick = ({ target }: any) => {
    const name = target.name;
    try {
      switch (name) {
        case "poster":
          isValidUrl(newPosterSrc);
          setPosterSrc(newPosterSrc);
          break;
        case "new-video":
          isValidUrl(newVideoSrc);
          addNewSource(newVideoSrc);
          pauseToggler();
          break;
      }
    } catch (error) {
      const getAlertMsg = (type: string) => `'${type}' link should be HTTPS`;
      alert(getAlertMsg(name));
    } finally {
      setNewVideoSrc("");
    }
  };

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;
    if (key !== "Enter") return;
    return handleNewInputClick(e);
  };

  return (
    <StyledFlex>
      <Label>New Poster Link</Label>
      <Flex>
        <Input
          name="poster"
          value={newPosterSrc || posterSrc}
          onKeyDown={handleEnterKey}
          onChange={handleInputChange}
        />
        <StyledButton name="poster" onClick={handleNewInputClick}>
          Test
        </StyledButton>
      </Flex>
      <Label>Test Video Link</Label>
      <Flex>
        <Input
          name="new-video"
          value={newVideoSrc}
          onChange={handleInputChange}
          onKeyDown={handleEnterKey}
        />
        <StyledButton name="new-video" onClick={handleNewInputClick}>
          Play
        </StyledButton>
      </Flex>
    </StyledFlex>
  );
};

export default CustomDataForm;
