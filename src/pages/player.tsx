import { useState, useEffect } from "react";
import { CustomVideoPlayer } from "../components";
import { Flex } from "../components/ui";
import { getVideoSourcesApi } from "@api/videos";
import StyledHeading from "@components/ui/Heading/Heading";

const Player = () => {
  const [sources, setSources] = useState<Array<string>>([]);

  useEffect(() => {
    (async () => {
      const data = await getVideoSourcesApi();

      setSources(data);
    })();
  }, []);

  return (
    <Flex direction="column">
      <StyledHeading tag="h1">HLS Video Player</StyledHeading>
      <CustomVideoPlayer size={900} sources={sources} />
    </Flex>
  );
};

export default Player;
