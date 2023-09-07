import { useState, useEffect } from "react";
import { CustomVideoPlayer } from "../components";
import { Flex } from "../components/ui";
import { getVideoSourcesApi } from "@api/videos";

const Home = () => {
  const [sources, setSources] = useState<Array<string>>([]);

  useEffect(() => {
    (async () => {
      const data = await getVideoSourcesApi();

      setSources(data);
    })();
  }, []);

  return (
    <Flex direction="column">
      <h1>HSL Video Player</h1>
      <CustomVideoPlayer size={900} sources={sources} />
    </Flex>
  );
};

export default Home;
